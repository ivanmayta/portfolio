"use client"

import type { ReactNode } from "react"
import {
    File,
    FileCode2,
    FileLock2,
    FileText,
    Folder,
} from "lucide-react"
import { profile } from "@/data/profile"
import { socials } from "@/data/socials"
import { stack } from "@/data/stack"
import { interests } from "@/data/interests"
import { contributions } from "@/data/contributions"
import { BANNER, BANNER_SMALL, LOGO } from "@/lib/cli/banner"
import { formatPath, isDir, lookup, resolvePath } from "@/lib/cli/fs"
import { closest } from "@/lib/cli/shell"
import type {
    CliData,
    CliPost,
    CliProject,
    Command,
    Doc,
    FsDir,
    FsNode,
} from "@/lib/cli/types"
import { Cols, Ext, Head, KV, Key, Line, Note, Ok, Out, Run, Warn } from "./format"

const TYPES = ["web", "mobile", "bi", "videogame"]

/**
 * JetBrains Mono ships a latin subset, so block and box-drawing glyphs fall
 * back per character to a font with a different advance and the art shears
 * apart. Column-aligned output asks for a stack that has them — as a utility,
 * so it outranks preflight's `pre { font-family }` base rule.
 */
const ASCII = "font-[ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]"

/** The glyph `ls` and `tree` put in front of an entry. */
function iconFor(node: FsNode) {
    if (isDir(node)) return Folder
    if (node.name.startsWith(".")) return FileLock2
    if (node.name.endsWith(".txt")) return FileText
    if (/\.mdx?$/.test(node.name)) return FileCode2
    return File
}

function Entry({
    node,
    onOpen,
    className,
}: {
    node: FsNode
    onOpen: () => void
    className?: string
}) {
    const Icon = iconFor(node)
    const dir = isDir(node)
    return (
        <button
            type="button"
            onClick={onOpen}
            className={`group/entry flex min-w-0 items-center gap-1.5 text-left cursor-pointer ${
                className ?? ""
            }`}
        >
            <Icon
                className={`h-3.5 w-3.5 shrink-0 ${dir ? "text-accent" : "text-faint"}`}
            />
            <span
                className={`truncate transition-colors ${
                    dir
                        ? "text-accent"
                        : "text-muted group-hover/entry:text-accent"
                }`}
            >
                {node.name}
                {dir && "/"}
            </span>
        </button>
    )
}

function date(iso: string) {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

function duration(ms: number) {
    const total = Math.floor(ms / 1000)
    const minutes = Math.floor(total / 60)
    const seconds = total % 60
    return minutes ? `${minutes}m ${seconds}s` : `${seconds}s`
}

export function buildCommands(data: CliData): Command[] {
    const { projects, posts, courses } = data
    const commands: Command[] = []
    const byName = new Map<string, Command>()

    const projectSlugs = projects.map((p) => p.slug)
    const postSlugs = posts.map((p) => p.slug)
    const courseSlugs = courses.map((c) => c.slug)
    const routes = [
        "/",
        "/projects",
        "/posts",
        ...courses.map((c) => c.href),
        ...projects.map((p) => p.href),
    ]

    // ---------------------------------------------------------------- renders

    const about = () => (
        <Out>
            <Head>about</Head>
            {profile.bio.map((paragraph) => (
                <Line key={paragraph}>{paragraph}</Line>
            ))}
            <KV
                rows={profile.education.map((item) => [
                    "studied",
                    <Ext key={item.url} href={item.url} arrow>
                        {item.name}
                    </Ext>,
                ])}
            />
            <Note>
                See <Run cmd="projects" />, <Run cmd="posts" /> and{" "}
                <Run cmd="stack" /> for the details.
            </Note>
        </Out>
    )

    const stackDoc = () => (
        <Out>
            <Head>stack</Head>
            <KV rows={stack.map((row) => [row.group.toLowerCase(), row.items])} />
        </Out>
    )

    const interestsDoc = () => (
        <Out>
            <Head>interests</Head>
            <Cols>
                {interests.map((item) => (
                    <span key={item} className="text-muted">
                        <span className="text-faint">· </span>
                        {item}
                    </span>
                ))}
            </Cols>
        </Out>
    )

    const contact = () => (
        <Out>
            <Head>contact</Head>
            <KV
                rows={[
                    ["name", profile.name],
                    ["role", profile.role],
                    ["location", `${profile.location} · ${profile.timezone}`],
                    [
                        "email",
                        <Ext key="mail" href={`mailto:${profile.email}`}>
                            {profile.email}
                        </Ext>,
                    ],
                    [
                        "resume",
                        <Ext key="cv" href={profile.resume} arrow>
                            {profile.resume.replace("https://", "")}
                        </Ext>,
                    ],
                    [
                        "status",
                        profile.available ? (
                            <span className="text-signal">taking on work</span>
                        ) : (
                            "heads down"
                        ),
                    ],
                ]}
            />
            <Note>
                <Run cmd="open email" /> starts a message.
            </Note>
        </Out>
    )

    const social = () => (
        <Out>
            <Head>social</Head>
            <KV
                rows={socials.map((item) => [
                    item.name,
                    <Ext key={item.url} href={item.url} arrow>
                        {item.handle}
                    </Ext>,
                ])}
            />
            <Note>
                <Run cmd="open github" /> opens one in a new tab.
            </Note>
        </Out>
    )

    const now = () => {
        const latest = posts[0]
        const course = courses[0]
        return (
            <Out>
                <Head>now</Head>
                <KV
                    rows={[
                        [
                            "studying",
                            course
                                ? `${course.name} — ${course.published}/${course.listed} written up`
                                : "—",
                        ],
                        [
                            "last post",
                            latest ? `${latest.title} · ${date(latest.date)}` : "—",
                        ],
                        [
                            "shipping",
                            projects
                                .filter((p) => p.isActive)
                                .map((p) => p.name)
                                .join(" · "),
                        ],
                        [
                            "status",
                            profile.available
                                ? "taking on work — say hi"
                                : "heads down",
                        ],
                    ]}
                />
            </Out>
        )
    }

    const secret = () => (
        <Out>
            <Line className="text-accent">You went looking. Good instinct.</Line>
            <Line>
                Everything on this site started as a note to myself. The posts are
                courses I was working through anyway; writing them down is how I
                find out whether I actually understood the lesson.
            </Line>
            <Note>
                Now try <Run cmd="neofetch" />.
            </Note>
        </Out>
    )

    const projectLine = (project: CliProject) => (
        <div key={project.slug} className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2 flex-wrap">
                <Run cmd={`project ${project.slug}`} label={project.name} />
                <span className="text-faint text-[11px] uppercase tracking-[0.08em]">
                    {project.type}
                </span>
                {project.isActive && (
                    <span className="text-signal text-[11px]">● live</span>
                )}
            </div>
            <p className="text-muted text-pretty">{project.description}</p>
            <p className="text-dim">{project.stack.join(" · ")}</p>
        </div>
    )

    const projectDoc = (slug: string) => {
        const project = projects.find((p) => p.slug === slug)
        if (!project) {
            return (
                <Out>
                    <Warn>project: no project named {slug}</Warn>
                    <Note>
                        Run <Run cmd="projects" /> for the list.
                    </Note>
                </Out>
            )
        }

        return (
            <Out>
                <Head>{project.name}</Head>
                <Line>{project.description}</Line>
                <KV
                    rows={[
                        ["type", project.type],
                        ["status", project.isActive ? "live" : "archived"],
                        ["stack", project.stack.join(" · ")],
                        [
                            "site",
                            <Ext key="url" href={project.url} arrow>
                                {project.url.replace(/^https?:\/\//, "")}
                            </Ext>,
                        ],
                        [
                            "source",
                            <Ext key="gh" href={project.github} arrow>
                                {project.github.replace("https://", "")}
                            </Ext>,
                        ],
                    ]}
                />
                <Note>
                    <Run cmd={`goto ${project.href}`} label="read the case study" />{" "}
                    or <Run cmd={`open ${project.slug}`} label="open the site" />.
                </Note>
            </Out>
        )
    }

    const postLine = (post: CliPost) => (
        <div key={`${post.course}/${post.slug}`} className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-2 flex-wrap">
                <Run cmd={`post ${post.slug}`} label={post.title} />
                <span className="text-faint">
                    {date(post.date)} · {post.minutes} min
                </span>
            </div>
            <p className="text-muted text-pretty">{post.summary}</p>
            <p className="text-dim">
                {post.courseName} / {post.topic}
            </p>
        </div>
    )

    const postDoc = (slug: string) => {
        const post = posts.find((p) => p.slug === slug)
        if (!post) {
            return (
                <Out>
                    <Warn>post: no post named {slug}</Warn>
                    <Note>
                        Run <Run cmd="posts" /> for the list.
                    </Note>
                </Out>
            )
        }

        return (
            <Out>
                <Head>{post.title}</Head>
                <Line>{post.summary}</Line>
                <KV
                    rows={[
                        ["course", post.courseName],
                        ["topic", post.topic],
                        ["published", date(post.date)],
                        ["read time", `${post.minutes} min`],
                    ]}
                />
                <Note>
                    <Run cmd={`goto ${post.href}`} label="read it" /> — it renders
                    with the diagrams.
                </Note>
            </Out>
        )
    }

    const courseDoc = (slug: string) => {
        const course = courses.find((c) => c.slug === slug)
        if (!course) return <Warn>no course named {slug}</Warn>

        return (
            <Out>
                <Head>{course.name}</Head>
                <Line>{course.summary}</Line>
                <KV
                    rows={[
                        ["teacher", course.teacher],
                        ["written", `${course.published} / ${course.listed} lessons`],
                        [
                            "source",
                            <Ext key="url" href={course.courseUrl} arrow>
                                {course.courseUrl.replace("https://", "")}
                            </Ext>,
                        ],
                    ]}
                />
                <div className="flex flex-col gap-2 pt-1">
                    {course.topics.map((topic) => (
                        <div key={topic.id} className="flex flex-col gap-0.5">
                            <p className="text-foreground">{topic.name}</p>
                            {topic.lessons.map((lesson) =>
                                lesson.published ? (
                                    <p key={lesson.slug} className="text-muted">
                                        <span className="text-signal">✓ </span>
                                        <Run
                                            cmd={`post ${lesson.slug}`}
                                            label={lesson.title}
                                        />
                                    </p>
                                ) : (
                                    <p key={lesson.slug} className="text-dim">
                                        <span className="text-faint">○ </span>
                                        {lesson.title}
                                    </p>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </Out>
        )
    }

    const contributionDoc = (name: string) => {
        const item = contributions.find((c) => c.name === name)
        if (!item) return <Warn>no contribution named {name}</Warn>
        return (
            <Out>
                <Head>{item.name}</Head>
                <Line>{item.description}</Line>
                <KV
                    rows={[
                        ["did", item.contribution],
                        [
                            "pr",
                            <Ext key="pr" href={item.github} arrow>
                                {item.github.replace("https://github.com/", "")}
                            </Ext>,
                        ],
                    ]}
                />
            </Out>
        )
    }

    const renderDoc = (doc: Doc): ReactNode => {
        switch (doc.kind) {
            case "about":
                return about()
            case "stack":
                return stackDoc()
            case "interests":
                return interestsDoc()
            case "contact":
                return contact()
            case "social":
                return social()
            case "now":
                return now()
            case "secret":
                return secret()
            case "project":
                return projectDoc(doc.slug)
            case "post":
                return postDoc(doc.slug)
            case "course":
                return courseDoc(doc.slug)
            case "contribution":
                return contributionDoc(doc.name)
        }
    }

    // --------------------------------------------------------------- registry

    const add = (command: Command) => {
        commands.push(command)
        byName.set(command.name, command)
        for (const alias of command.aliases ?? []) byName.set(alias, command)
    }

    add({
        name: "help",
        aliases: ["?", "commands"],
        usage: "help [command]",
        summary: "list every command",
        complete: [],
        run: (args) => {
            if (args[0]) return manPage(args[0])
            const visible = commands.filter((c) => !c.hidden)
            return (
                <Out>
                    <Head>commands</Head>
                    <KV
                        rows={visible.map((c) => [
                            <Run key={c.name} cmd={c.name} />,
                            c.summary,
                        ])}
                    />
                    <Note>
                        <span className="text-dim">
                            man &lt;command&gt; for its flags and aliases
                        </span>
                    </Note>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-dim">
                        <span>
                            <Key>tab</Key> completes
                        </span>
                        <span>
                            <Key>↑</Key> <Key>↓</Key> history
                        </span>
                        <span>
                            <Key>ctrl</Key> <Key>r</Key> search history
                        </span>
                        <span>
                            <Key>ctrl</Key> <Key>l</Key> clear
                        </span>
                        <span>
                            <Key>ctrl</Key> <Key>c</Key> cancel
                        </span>
                    </div>
                    <Note>
                        Try <Run cmd="about" />, <Run cmd="ls" /> or{" "}
                        <Run cmd="neofetch" />. <Run cmd="gui" /> leaves the
                        terminal.
                    </Note>
                </Out>
            )
        },
    })

    const manPage = (name: string): ReactNode => {
        const command = byName.get(name.toLowerCase())
        if (!command) {
            const hint = closest(
                name,
                commands.filter((c) => !c.hidden).map((c) => c.name)
            )
            return (
                <Out>
                    <Warn>no help for {name}</Warn>
                    {hint && (
                        <Note>
                            Did you mean <Run cmd={hint} />?
                        </Note>
                    )}
                </Out>
            )
        }

        return (
            <Out>
                <Head>{command.name}</Head>
                <KV
                    rows={[
                        ["usage", command.usage ?? command.name],
                        ["summary", command.summary],
                        ...(command.aliases?.length
                            ? ([["aliases", command.aliases.join(", ")]] as [
                                  ReactNode,
                                  ReactNode,
                              ][])
                            : []),
                    ]}
                />
                {command.details && <Line>{command.details}</Line>}
            </Out>
        )
    }

    add({
        name: "man",
        usage: "man <command>",
        summary: "read one command's manual",
        complete: [],
        run: (args) =>
            args[0] ? (
                manPage(args[0])
            ) : (
                <Note>usage: man &lt;command&gt;</Note>
            ),
    })

    add({ name: "about", aliases: ["bio", "info"], summary: "who I am", run: about })

    add({
        name: "whoami",
        summary: "print the current user",
        run: () => (
            <Out>
                <Line className="text-foreground">
                    {profile.handle}
                    <span className="text-dim"> — {profile.name}</span>
                </Line>
                <Note>
                    {profile.role} · {profile.location} · {profile.timezone}
                </Note>
            </Out>
        ),
    })

    add({
        name: "projects",
        aliases: ["work", "portfolio"],
        usage: "projects [--type <type>] [--live]",
        summary: "everything I have shipped",
        details:
            "Filter by --type (web, mobile, bi, videogame) or --live for the ones still running.",
        complete: ["--type", "--live", ...TYPES],
        run: (args) => {
            const typeIndex = args.indexOf("--type")
            const type = typeIndex === -1 ? null : args[typeIndex + 1]
            const live = args.includes("--live")

            if (type && !TYPES.includes(type)) {
                return (
                    <Out>
                        <Warn>projects: unknown type {type}</Warn>
                        <Note>types: {TYPES.join(", ")}</Note>
                    </Out>
                )
            }

            const list = projects.filter(
                (p) => (!type || p.type === type) && (!live || p.isActive)
            )

            if (!list.length) return <Note>no projects match that filter.</Note>

            return (
                <Out className="gap-3">
                    <Head>
                        projects
                        <span className="text-dim"> · {list.length}</span>
                    </Head>
                    {list.map(projectLine)}
                    <Note>
                        <span className="text-dim">
                            project &lt;slug&gt; for one in full · open &lt;slug&gt;
                            to visit it
                        </span>
                    </Note>
                </Out>
            )
        },
    })

    add({
        name: "project",
        aliases: ["show"],
        usage: "project <slug>",
        summary: "one project in full",
        complete: projectSlugs,
        run: (args) =>
            args[0] ? (
                projectDoc(args[0])
            ) : (
                <Out>
                    <Note>usage: project &lt;slug&gt;</Note>
                    <Note>{projectSlugs.join(" · ")}</Note>
                </Out>
            ),
    })

    add({
        name: "posts",
        aliases: ["blog", "notes"],
        usage: "posts [--course <slug>]",
        summary: "study write-ups, newest first",
        complete: ["--course", ...courseSlugs],
        run: (args) => {
            const index = args.indexOf("--course")
            const course = index === -1 ? null : args[index + 1]
            const list = course ? posts.filter((p) => p.course === course) : posts

            if (!list.length) {
                return (
                    <Out>
                        <Warn>posts: nothing published for {course ?? "that"}</Warn>
                        <Note>
                            Run <Run cmd="courses" /> to see what is planned.
                        </Note>
                    </Out>
                )
            }

            return (
                <Out className="gap-3">
                    <Head>
                        posts
                        <span className="text-dim"> · {list.length}</span>
                    </Head>
                    {list.map(postLine)}
                    <Note>
                        <span className="text-dim">
                            post &lt;slug&gt; for one · courses for the syllabus
                        </span>
                    </Note>
                </Out>
            )
        },
    })

    add({
        name: "post",
        usage: "post <slug>",
        summary: "one write-up in full",
        complete: postSlugs,
        run: (args) =>
            args[0] ? (
                postDoc(args[0])
            ) : (
                <Out>
                    <Note>usage: post &lt;slug&gt;</Note>
                    <Note>
                        Run <Run cmd="posts" /> for the list.
                    </Note>
                </Out>
            ),
    })

    add({
        name: "courses",
        aliases: ["syllabus"],
        usage: "courses [slug]",
        summary: "what I am working through",
        complete: courseSlugs,
        run: (args) => {
            if (args[0]) return courseDoc(args[0])
            return (
                <Out className="gap-3">
                    <Head>courses</Head>
                    {courses.map((course) => (
                        <div key={course.slug} className="flex flex-col gap-0.5">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <Run
                                    cmd={`courses ${course.slug}`}
                                    label={course.name}
                                />
                                <span className="text-faint">
                                    {course.published}/{course.listed}
                                </span>
                            </div>
                            <p className="text-muted text-pretty">{course.summary}</p>
                            <p className="text-dim">{course.teacher}</p>
                        </div>
                    ))}
                </Out>
            )
        },
    })

    add({ name: "stack", aliases: ["skills", "tech"], summary: "tools I reach for", run: stackDoc })
    add({ name: "interests", summary: "what I keep circling back to", run: interestsDoc })
    add({ name: "contact", aliases: ["email"], summary: "how to reach me", run: contact })
    add({ name: "social", aliases: ["links"], summary: "where to find me online", run: social })
    add({ name: "now", summary: "what I am doing at the moment", run: now })

    add({
        name: "contributions",
        aliases: ["oss"],
        summary: "open source I have touched",
        run: () => (
            <Out className="gap-3">
                <Head>contributions</Head>
                {contributions.map((item) => (
                    <div key={item.name} className="flex flex-col gap-0.5">
                        <Ext href={item.url} arrow>
                            {item.name}
                        </Ext>
                        <p className="text-muted text-pretty">{item.description}</p>
                        <p className="text-dim">{item.contribution}</p>
                    </div>
                ))}
            </Out>
        ),
    })

    add({
        name: "search",
        aliases: ["grep", "find"],
        usage: "search <query>",
        summary: "search projects and posts",
        run: (args) => {
            const query = args.join(" ").toLowerCase().trim()
            if (!query) return <Note>usage: search &lt;query&gt;</Note>

            const hitProjects = projects.filter((p) =>
                [p.name, p.description, p.type, ...p.stack]
                    .join(" ")
                    .toLowerCase()
                    .includes(query)
            )
            const hitPosts = posts.filter((p) =>
                [p.title, p.summary, p.topic, p.courseName]
                    .join(" ")
                    .toLowerCase()
                    .includes(query)
            )

            if (!hitProjects.length && !hitPosts.length) {
                return (
                    <Out>
                        <Warn>search: no matches for “{query}”</Warn>
                        <Note>
                            Try <Run cmd="search react" /> or{" "}
                            <Run cmd="search server" />.
                        </Note>
                    </Out>
                )
            }

            const hits = hitProjects.length + hitPosts.length

            return (
                <Out className="gap-3">
                    <Head>
                        search
                        <span className="text-dim">
                            {" "}
                            · {hits} {hits === 1 ? "match" : "matches"}
                        </span>
                    </Head>
                    {hitProjects.map(projectLine)}
                    {hitPosts.map(postLine)}
                </Out>
            )
        },
    })

    add({
        name: "open",
        aliases: ["visit"],
        usage: "open <target>",
        summary: "open a link in a new tab",
        details:
            "Targets are project slugs, social names, `email`, `cv` or a full URL.",
        complete: [
            ...projectSlugs,
            ...socials.map((s) => s.name),
            "email",
            "cv",
            "site",
        ],
        run: (args, host) => {
            const target = args.join(" ").toLowerCase().trim()

            if (!target) {
                return (
                    <Out>
                        <Note>usage: open &lt;target&gt;</Note>
                        <Note>
                            {[
                                ...projectSlugs,
                                ...socials.map((s) => s.name),
                                "email",
                                "cv",
                            ].join(" · ")}
                        </Note>
                    </Out>
                )
            }

            if (target === "email" || target === "mail") {
                host.openUrl(`mailto:${profile.email}`)
                return <Ok>opening a message to {profile.email}</Ok>
            }

            if (target === "cv" || target === "resume") {
                host.openUrl(profile.resume)
                return <Ok>opening {profile.resume}</Ok>
            }

            if (target === "site" || target === "home") {
                host.navigate("/")
                return <Ok>heading home</Ok>
            }

            if (/^https?:\/\//.test(target)) {
                host.openUrl(target)
                return <Ok>opening {target}</Ok>
            }

            const project = projects.find((p) => p.slug === target)
            if (project) {
                host.openUrl(project.url)
                return <Ok>opening {project.name} — {project.url}</Ok>
            }

            const link = socials.find((s) => s.name === target)
            if (link) {
                host.openUrl(link.url)
                return <Ok>opening {link.handle}</Ok>
            }

            return (
                <Out>
                    <Warn>open: no target named {target}</Warn>
                    <Note>
                        Run <Run cmd="open" /> with no argument for the list.
                    </Note>
                </Out>
            )
        },
    })

    add({
        name: "goto",
        usage: "goto <route>",
        summary: "navigate this site",
        complete: routes,
        run: (args, host) => {
            const route = args[0]
            if (!route) {
                return (
                    <Out>
                        <Note>usage: goto &lt;route&gt;</Note>
                        <Note>{routes.slice(0, 5).join(" · ")} …</Note>
                    </Out>
                )
            }
            const path = route.startsWith("/") ? route : `/${route}`
            host.navigate(path)
            return <Ok>loading {path}</Ok>
        },
    })

    add({
        name: "gui",
        aliases: ["web", "exit-terminal"],
        summary: "leave the terminal for the normal site",
        run: (_args, host) => {
            host.navigate("/")
            return <Ok>dropping back to the GUI…</Ok>
        },
    })

    add({
        name: "theme",
        usage: "theme [dark|light|system]",
        summary: "switch the colour scheme",
        complete: ["dark", "light", "system", "toggle"],
        run: (args, host) => {
            const requested = args[0]?.toLowerCase()
            const current = host.theme()

            if (!requested || requested === "toggle") {
                const resolved =
                    current === "system"
                        ? window.matchMedia("(prefers-color-scheme: dark)").matches
                            ? "dark"
                            : "light"
                        : current
                const next = resolved === "dark" ? "light" : "dark"
                host.setTheme(next)
                return <Ok>theme set to {next}</Ok>
            }

            if (!["dark", "light", "system"].includes(requested)) {
                return <Warn>theme: unknown theme {requested} — try dark, light or system</Warn>
            }

            host.setTheme(requested as "dark" | "light" | "system")
            return <Ok>theme set to {requested}</Ok>
        },
    })

    add({
        name: "ls",
        aliases: ["dir"],
        usage: "ls [-a] [path]",
        summary: "list what is here",
        complete: "path",
        run: (args, host) => {
            const all = args.some((a) => /^-[a-z]*a/.test(a))
            const target = args.find((a) => !a.startsWith("-")) ?? "."
            const segments = resolvePath(host.cwd, target)
            const node = segments && lookup(host.root, segments)

            if (!node) return <Warn>ls: {target}: No such file or directory</Warn>
            if (!isDir(node)) return <p className="text-muted">{node.name}</p>

            const children = node.children.filter(
                (child) => all || !child.name.startsWith(".")
            )

            const at = (name: string) =>
                target === "." ? name : `${target}/${name}`

            return (
                <Out>
                    <Cols>
                        {children.map((child) => (
                            <Entry
                                key={child.name}
                                node={child}
                                onOpen={() =>
                                    host.run(
                                        `${isDir(child) ? "cd" : "cat"} ${at(
                                            child.name
                                        )}`
                                    )
                                }
                            />
                        ))}
                    </Cols>
                    <Note>
                        <span className="text-dim">
                            cd &lt;dir&gt; to go in · cat &lt;file&gt; to read one
                            · tree for all of it
                        </span>
                    </Note>
                </Out>
            )
        },
    })

    add({
        name: "cd",
        usage: "cd [path]",
        summary: "change directory",
        complete: "path",
        run: (args, host) => {
            const target = args[0] ?? "~"
            const segments = resolvePath(host.cwd, target)
            if (!segments) return <Warn>cd: {target}: Permission denied</Warn>

            const node = lookup(host.root, segments)
            if (!node) return <Warn>cd: {target}: No such file or directory</Warn>
            if (!isDir(node)) return <Warn>cd: {target}: Not a directory</Warn>

            host.setCwd(segments)
            return null
        },
    })

    add({
        name: "pwd",
        summary: "print the working directory",
        run: (_args, host) => (
            <p className="text-muted">
                /home/{profile.handle}
                {host.cwd.length ? `/${host.cwd.join("/")}` : ""}
            </p>
        ),
    })

    add({
        name: "cat",
        aliases: ["less", "head", "open-file"],
        usage: "cat <file>",
        summary: "read a file",
        complete: "path",
        run: (args, host) => {
            const target = args[0]
            if (!target) {
                return (
                    <Out>
                        <Note>usage: cat &lt;file&gt;</Note>
                        <Note>
                            Run <Run cmd="ls" /> to see what is here.
                        </Note>
                    </Out>
                )
            }

            const segments = resolvePath(host.cwd, target)
            const node = segments && lookup(host.root, segments)
            if (!node) return <Warn>cat: {target}: No such file or directory</Warn>
            if (isDir(node)) return <Warn>cat: {target}: Is a directory</Warn>

            return renderDoc(node.doc)
        },
    })

    add({
        name: "tree",
        usage: "tree [path]",
        summary: "the whole directory, at once",
        complete: "path",
        run: (args, host) => {
            const target = args[0] ?? "."
            const segments = resolvePath(host.cwd, target)
            const node = segments && lookup(host.root, segments)
            if (!node) return <Warn>tree: {target}: No such file or directory</Warn>

            type Row = { prefix: string; node: FsNode; path: string }
            const rows: Row[] = []

            const walk = (dir: FsDir, prefix: string, base: string) => {
                const children = dir.children.filter(
                    (child) => !child.name.startsWith(".")
                )
                children.forEach((child: FsNode, i) => {
                    const last = i === children.length - 1
                    const path = base ? `${base}/${child.name}` : child.name
                    rows.push({
                        prefix: `${prefix}${last ? "└── " : "├── "}`,
                        node: child,
                        path,
                    })
                    if (isDir(child)) {
                        walk(child, `${prefix}${last ? "    " : "│   "}`, path)
                    }
                })
            }

            if (isDir(node)) walk(node, "", target === "." ? "" : target)

            const dirs = rows.filter((row) => isDir(row.node)).length

            return (
                <Out>
                    <div className="flex flex-col overflow-x-auto">
                        <span className="text-dim">
                            {isDir(node) ? formatPath(segments) : node.name}
                        </span>
                        {rows.map((row) => (
                            <div key={row.path} className="flex items-center">
                                <span
                                    className={`${ASCII} shrink-0 whitespace-pre text-faint`}
                                >
                                    {row.prefix}
                                </span>
                                <Entry
                                    node={row.node}
                                    // Let the row overflow into the container's
                                    // scroll rather than ellipsising the name.
                                    className="shrink-0"
                                    onOpen={() =>
                                        host.run(
                                            `${isDir(row.node) ? "cd" : "cat"} ${
                                                row.path
                                            }`
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <Note>
                        <span className="text-dim">
                            {dirs} directories, {rows.length - dirs} files
                        </span>
                    </Note>
                </Out>
            )
        },
    })

    add({
        name: "neofetch",
        aliases: ["fetch", "sysinfo"],
        summary: "the summary, with the logo",
        run: (_args, host) => {
            const rows: [string, ReactNode][] = [
                ["role", profile.role],
                ["location", `${profile.location} · ${profile.timezone}`],
                ["shell", "iversh 1.0.0 (react)"],
                ["host", "next.js 16 · vercel"],
                ["projects", `${projects.length} shipped`],
                ["posts", `${posts.length} written`],
                ["uptime", duration(Date.now() - host.bootedAt)],
                [
                    "contact",
                    <Ext key="mail" href={`mailto:${profile.email}`}>
                        {profile.email}
                    </Ext>,
                ],
            ]

            return (
                <div className="flex flex-col sm:flex-row sm:gap-6 gap-3">
                    <pre className={`${ASCII} text-accent shrink-0 leading-none text-[13px]`}>
                        {LOGO.join("\n")}
                    </pre>
                    <div className="min-w-0 flex-1">
                        <p className="text-foreground pb-1">
                            {profile.handle}
                            <span className="text-dim">@</span>
                            {profile.site}
                        </p>
                        <KV rows={rows} />
                    </div>
                </div>
            )
        },
    })

    add({
        name: "banner",
        summary: "print the banner again",
        run: () => <Banner />,
    })

    add({
        name: "history",
        usage: "history [-c]",
        summary: "commands from this session",
        complete: ["-c"],
        run: (args, host) => {
            if (args.includes("-c")) {
                host.clearHistory()
                return <Ok>history cleared</Ok>
            }
            const list = host.history()
            if (!list.length) return <Note>no history yet</Note>
            return (
                <div className="flex flex-col">
                    {list.map((entry, i) => (
                        <p key={`${i}-${entry}`} className="text-muted">
                            <span className="text-faint">
                                {String(i + 1).padStart(3, " ")}{" "}
                            </span>
                            <Run cmd={entry} />
                        </p>
                    ))}
                </div>
            )
        },
    })

    add({
        name: "echo",
        usage: "echo <text>",
        summary: "print some text",
        run: (args) => <p className="text-muted">{args.join(" ")}</p>,
    })

    add({
        name: "date",
        summary: "print the current date",
        run: () => <p className="text-muted">{new Date().toString()}</p>,
    })

    add({
        name: "uptime",
        summary: "how long this session has been open",
        run: (_args, host) => (
            <p className="text-muted">
                up {duration(Date.now() - host.bootedAt)}, 1 user, load average:
                0.00
            </p>
        ),
    })

    add({
        name: "uname",
        usage: "uname [-a]",
        summary: "print system information",
        complete: ["-a"],
        run: () => (
            <p className="text-muted">
                iversh {profile.site} 1.0.0 react/next x86_64 GNU/Web
            </p>
        ),
    })

    add({
        name: "clear",
        aliases: ["cls"],
        summary: "clear the screen",
        run: (_args, host) => {
            host.clear()
            return null
        },
    })

    add({
        name: "exit",
        aliases: ["quit", "logout"],
        summary: "end the session",
        run: () => (
            <Note>
                There is no exit — but <Run cmd="gui" /> takes you back to the
                normal site.
            </Note>
        ),
    })

    add({
        name: "sudo",
        hidden: true,
        summary: "nice try",
        run: () => (
            <Out>
                <Warn>sudo: {profile.handle} is not in the sudoers file.</Warn>
                <Note>This incident has been reported.</Note>
            </Out>
        ),
    })

    add({
        name: "vim",
        aliases: ["nvim", "vi"],
        hidden: true,
        summary: "the editor",
        run: () => (
            <Note>
                :q! — there is a whole post about this. Try{" "}
                <Run cmd="search vim" />.
            </Note>
        ),
    })

    add({
        name: "rm",
        hidden: true,
        summary: "no",
        run: () => <Warn>rm: this filesystem is read-only. Nothing to break.</Warn>,
    })

    add({
        name: "whois",
        hidden: true,
        summary: "domain lookup",
        run: () => (
            <KV
                rows={[
                    ["domain", profile.site],
                    ["registrant", profile.name],
                    ["country", profile.location],
                    ["status", "active"],
                ]}
            />
        ),
    })

    // help and man complete on the names of everything registered above.
    const names = commands.filter((c) => !c.hidden).map((c) => c.name)
    byName.get("help")!.complete = names
    byName.get("man")!.complete = names

    return commands
}

export function Banner() {
    return (
        <div className="flex flex-col gap-2">
            <pre
                aria-hidden
                className={`${ASCII} hidden sm:block overflow-x-auto text-accent leading-none text-[9px] md:text-[11px]`}
            >
                {BANNER.join("\n")}
            </pre>
            <pre
                aria-hidden
                className={`${ASCII} sm:hidden text-accent leading-none text-[10px]`}
            >
                {BANNER_SMALL.join("\n")}
            </pre>
            <p className="text-muted">{profile.tagline}</p>
            <p className="text-dim">
                {profile.location} · {profile.timezone} ·{" "}
                {profile.available ? "taking on work" : "heads down"}
            </p>
        </div>
    )
}
