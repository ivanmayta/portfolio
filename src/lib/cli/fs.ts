import { contributions } from "@/data/contributions"
import type { CliData, FsDir, FsNode } from "./types"

/**
 * A read-only home directory built from the same data the site renders, so
 * `ls`, `cd`, `cat` and `tree` stay in sync with the pages for free.
 */
export function buildFs(data: CliData): FsDir {
    return {
        type: "dir",
        name: "~",
        children: [
            { type: "file", name: "about.txt", doc: { kind: "about" } },
            { type: "file", name: "stack.txt", doc: { kind: "stack" } },
            { type: "file", name: "interests.txt", doc: { kind: "interests" } },
            { type: "file", name: "contact.txt", doc: { kind: "contact" } },
            { type: "file", name: "social.txt", doc: { kind: "social" } },
            { type: "file", name: "now.txt", doc: { kind: "now" } },
            { type: "file", name: ".secret", doc: { kind: "secret" } },
            {
                type: "dir",
                name: "projects",
                children: data.projects.map((project) => ({
                    type: "file",
                    name: `${project.slug}.md`,
                    doc: { kind: "project", slug: project.slug },
                })),
            },
            {
                type: "dir",
                name: "posts",
                children: data.courses.map((course) => ({
                    type: "dir",
                    name: course.slug,
                    children: [
                        {
                            type: "file",
                            name: "syllabus.md",
                            doc: { kind: "course", slug: course.slug },
                        },
                        ...data.posts
                            .filter((post) => post.course === course.slug)
                            .map((post) => ({
                                type: "file" as const,
                                name: `${post.slug}.mdx`,
                                doc: {
                                    kind: "post" as const,
                                    course: course.slug,
                                    slug: post.slug,
                                },
                            })),
                    ],
                })),
            },
            {
                type: "dir",
                name: "contributions",
                children: contributions.map((item) => ({
                    type: "file",
                    name: `${item.name}.md`,
                    doc: { kind: "contribution", name: item.name },
                })),
            },
        ],
    }
}

export function isDir(node: FsNode): node is FsDir {
    return node.type === "dir"
}

/** `~` for the home directory, `~/projects` below it. */
export function formatPath(segments: string[]): string {
    return segments.length ? `~/${segments.join("/")}` : "~"
}

/**
 * Resolve `input` against `cwd`. Returns the new segment list, or null when the
 * path climbs above the home directory.
 */
export function resolvePath(cwd: string[], input: string): string[] | null {
    const raw = input.trim()
    const absolute = raw.startsWith("/") || raw === "~" || raw.startsWith("~/")
    const parts = raw.replace(/^~\/?|^\//, "").split("/")
    const segments = absolute ? [] : [...cwd]

    for (const part of parts) {
        if (!part || part === ".") continue
        if (part === "..") {
            if (segments.length === 0) return null
            segments.pop()
            continue
        }
        segments.push(part)
    }

    return segments
}

export function lookup(root: FsDir, segments: string[]): FsNode | null {
    let node: FsNode = root
    for (const segment of segments) {
        if (!isDir(node)) return null
        const next: FsNode | undefined = node.children.find(
            (child) => child.name === segment
        )
        if (!next) return null
        node = next
    }
    return node
}

/** The directory a partial path is being typed into, for tab completion. */
export function completePath(
    root: FsDir,
    cwd: string[],
    partial: string
): string[] {
    const cut = partial.lastIndexOf("/")
    const dirPart = cut === -1 ? "" : partial.slice(0, cut + 1)
    const namePart = cut === -1 ? partial : partial.slice(cut + 1)

    const segments = resolvePath(cwd, dirPart || ".")
    if (!segments) return []
    const dir = lookup(root, segments)
    if (!dir || !isDir(dir)) return []

    return dir.children
        .filter((child) => child.name.startsWith(namePart))
        .filter((child) => namePart.startsWith(".") || !child.name.startsWith("."))
        .map((child) => dirPart + child.name + (isDir(child) ? "/" : ""))
}
