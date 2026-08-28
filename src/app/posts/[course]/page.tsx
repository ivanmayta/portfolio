import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { courses, courseBySlug } from "@/data/courses"
import { courseProgress, isPublished } from "@/lib/content"
import { Progress } from "@/components/course-status"
import { cn } from "@/lib/utils"

export const dynamicParams = false

export function generateStaticParams() {
    return courses.map((course) => ({ course: course.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ course: string }>
}): Promise<Metadata> {
    const { course } = await params
    const found = courseBySlug(course)
    if (!found) return {}
    return {
        title: `${found.name} | posts | iverse.dev`,
        description: found.summary,
    }
}

export default async function CoursePage({
    params,
}: {
    params: Promise<{ course: string }>
}) {
    const { course: slug } = await params
    const course = courseBySlug(slug)
    if (!course) notFound()

    const { published, listed } = courseProgress(course)

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2.5 pt-14 pb-6 font-mono text-[11px] text-dim"
            >
                <Link href="/posts" className="text-subtle hover:text-accent transition-colors">
                    posts
                </Link>
                <span>/</span>
                <span className="text-muted">{course.slug}</span>
            </nav>

            <section className="pb-8">
                <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.08] tracking-[-0.015em] text-pretty">
                    {course.name}
                </h2>
                <p className="mt-5 max-w-[540px] text-base leading-[1.62] text-muted text-pretty">
                    {course.summary}
                </p>
                <div className="flex items-center gap-3.5 flex-wrap mt-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                    <span>{course.teacher}</span>
                    <span className="block w-px h-2.5 bg-line" />
                    <span>Frontend Masters</span>
                    <span className="block w-px h-2.5 bg-line" />
                    <a
                        href={course.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-subtle hover:text-accent transition-colors"
                    >
                        course ↗
                    </a>
                </div>
                <div className="flex items-center gap-4 mt-5">
                    <div className="grow">
                        <Progress published={published} listed={listed} />
                    </div>
                    <span className="font-mono text-[11px] text-subtle whitespace-nowrap">
                        {published} of {listed} written
                    </span>
                </div>
            </section>

            {course.topics.map((topic, index) => {
                const done = topic.lessons.filter((lesson) =>
                    isPublished(course.slug, lesson.slug)
                ).length
                return (
                    <section
                        key={topic.id}
                        className="grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] gap-4 sm:gap-10 py-10 border-t border-hairline"
                    >
                        <div className="flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-2">
                            <span className="font-mono text-[11px] tracking-[0.1em] text-faint">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                                className={cn(
                                    "font-mono text-[10.5px] uppercase tracking-[0.06em]",
                                    done > 0 ? "text-accent" : "text-dim"
                                )}
                            >
                                {done} / {topic.lessons.length}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium tracking-[-0.01em]">
                                {topic.name}
                            </h3>
                            {topic.summary && (
                                <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.6] text-subtle text-pretty">
                                    {topic.summary}
                                </p>
                            )}
                            <ul className="mt-4">
                                {topic.lessons.map((lesson) => {
                                    const live = isPublished(course.slug, lesson.slug)
                                    return (
                                        <li
                                            key={lesson.slug}
                                            className="group/row grid grid-cols-[14px_minmax(0,1fr)] gap-3.5 items-baseline py-2.5 border-t border-hairline"
                                        >
                                            <span
                                                className={cn(
                                                    "block w-1.5 h-1.5 mt-1.5 rounded-full",
                                                    live ? "bg-accent" : "border border-faint"
                                                )}
                                            />
                                            {live ? (
                                                <Link
                                                    href={`/posts/${course.slug}/${lesson.slug}`}
                                                    className="text-[15px] text-foreground/85 group-hover/row:text-accent transition-colors text-pretty"
                                                >
                                                    {lesson.title}{" "}
                                                    <span className="inline-block text-faint transition-transform duration-200 group-hover/row:translate-x-0.5">
                                                        →
                                                    </span>
                                                </Link>
                                            ) : (
                                                <span className="text-[15px] text-dim text-pretty">
                                                    {lesson.title}
                                                </span>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </section>
                )
            })}
            <div className="pt-4" />
        </>
    )
}
