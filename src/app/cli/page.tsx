import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Terminal } from "@/components/cli/terminal"
import { courses } from "@/data/courses"
import { projects } from "@/data/projects"
import { courseProgress, isPublished, publishedPosts } from "@/lib/content"
import type { CliData } from "@/lib/cli/types"

export const metadata: Metadata = {
    title: "cli | iverse.dev",
    description:
        "This site as a terminal — projects, posts and contact behind a prompt. Type `help` to look around.",
    openGraph: {
        title: "iverse.dev — cli",
        description:
            "This site as a terminal. Type `help` to look around.",
        url: "https://iverse.dev/cli",
        siteName: "iverse.dev",
        type: "website",
    },
}

/**
 * The terminal runs in the browser, so everything it can print is read here on
 * the server and handed down as plain data — no `fs` and no icon components in
 * the client bundle.
 */
export default async function CliPage() {
    const published = await publishedPosts()

    const data: CliData = {
        projects: projects.map((project) => ({
            name: project.name,
            slug: project.slug,
            type: project.type,
            isActive: project.isActive,
            description: project.description,
            stack: project.stack.map((item) =>
                typeof item === "string" ? item : item.name
            ),
            url: project.url,
            github: project.github,
            href: `/projects/${project.slug}`,
        })),
        posts: published.map(({ course, topic, lesson, meta }) => ({
            slug: lesson.slug,
            title: meta.title,
            summary: meta.summary,
            date: meta.date,
            minutes: meta.minutes,
            course: course.slug,
            courseName: course.name,
            topic: topic.name,
            href: `/posts/${course.slug}/${lesson.slug}`,
        })),
        courses: courses.map((course) => {
            const progress = courseProgress(course)
            return {
                slug: course.slug,
                name: course.name,
                teacher: course.teacher,
                courseUrl: course.courseUrl,
                summary: course.summary,
                published: progress.published,
                listed: progress.listed,
                href: `/posts/${course.slug}`,
                topics: course.topics.map((topic) => ({
                    id: topic.id,
                    name: topic.name,
                    summary: topic.summary,
                    lessons: topic.lessons.map((lesson) => ({
                        slug: lesson.slug,
                        title: lesson.title,
                        published: isPublished(course.slug, lesson.slug),
                    })),
                })),
            }
        }),
    }

    return (
        <>
            <PageHeader
                label="cli"
                title="Terminal"
                stats={["type help to start", "tab completes"]}
            />

            <div className="pb-14">
                <noscript>
                    <p className="rounded-[10px] border border-line bg-surface px-4 py-3 font-mono text-[12.5px] text-muted">
                        This terminal needs JavaScript — the rest of the site does
                        not, and has all the same things.
                    </p>
                </noscript>
                <Terminal data={data} />
            </div>
        </>
    )
}
