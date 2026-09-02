import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { courses, courseBySlug } from "@/data/courses"
import { isPublished, loadPost } from "@/lib/content"

export const dynamicParams = false

export function generateStaticParams() {
    return courses.flatMap((course) =>
        course.topics.flatMap((topic) =>
            topic.lessons
                .filter((lesson) => isPublished(course.slug, lesson.slug))
                .map((lesson) => ({ course: course.slug, lesson: lesson.slug }))
        )
    )
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ course: string; lesson: string }>
}): Promise<Metadata> {
    const { course, lesson } = await params
    const post = await loadPost(course, lesson)
    if (!post) return {}
    return { title: `${post.meta.title} | iverse.dev`, description: post.meta.summary }
}

export default async function LessonPage({
    params,
}: {
    params: Promise<{ course: string; lesson: string }>
}) {
    const { course: courseSlug, lesson: lessonSlug } = await params
    const course = courseBySlug(courseSlug)
    const post = await loadPost(courseSlug, lessonSlug)
    if (!course || !post) notFound()

    const { Body, meta } = post
    const topic = course.topics.find((t) =>
        t.lessons.some((l) => l.slug === lessonSlug)
    )

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2.5 flex-wrap pt-14 pb-6 font-mono text-[11px] text-dim"
            >
                <Link href="/posts" className="text-subtle hover:text-accent transition-colors">
                    posts
                </Link>
                <span>/</span>
                <Link
                    href={`/posts/${course.slug}`}
                    className="text-subtle hover:text-accent transition-colors"
                >
                    {course.slug}
                </Link>
                {topic && (
                    <>
                        <span>/</span>
                        <span className="text-muted">{topic.id}</span>
                    </>
                )}
            </nav>

            <article className="max-w-[640px]">
                <header className="pb-2">
                    <h1 className="font-serif text-[34px] sm:text-[42px] leading-[1.1] tracking-[-0.015em] text-pretty">
                        {meta.title}
                    </h1>
                    <div className="flex items-center gap-3 flex-wrap mt-5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                        <span>{course.teacher}</span>
                        <span className="block w-px h-2.5 bg-line" />
                        <time dateTime={meta.date}>
                            {new Date(`${meta.date}T00:00:00`).toLocaleDateString(
                                "en-GB",
                                { day: "numeric", month: "short", year: "numeric" }
                            )}
                        </time>
                        <span className="block w-px h-2.5 bg-line" />
                        <span>{meta.minutes} min</span>
                    </div>
                </header>

                <div className="grid grid-cols-[60px_minmax(0,1fr)] gap-5 my-8 py-[18px] border-y border-line">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
                        tl;dr
                    </p>
                    <p className="text-[15.5px] leading-[1.6] text-foreground/85 text-pretty">
                        {meta.summary}
                    </p>
                </div>

                <Body />

                <div className="flex items-center gap-2.5 mt-10 pt-5 border-t border-hairline">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                        Source
                    </span>
                    <a
                        href={course.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[12px] text-subtle hover:text-accent transition-colors"
                    >
                        Frontend Masters — {course.name}, {course.teacher} ↗
                    </a>
                </div>
            </article>

            <div className="mt-10 mb-12">
                <Link
                    href={`/posts/${course.slug}`}
                    className="font-mono text-[11.5px] text-subtle hover:text-accent transition-colors"
                >
                    ← all {course.name} posts
                </Link>
            </div>
        </>
    )
}
