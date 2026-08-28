import type { Metadata } from "next"
import Link from "next/link"
import { courses } from "@/data/courses"
import { courseProgress, publishedPosts } from "@/lib/content"
import { CourseStatus, Progress } from "@/components/course-status"

export const metadata: Metadata = {
    title: "Posts | iverse.dev",
    description:
        "Study write-ups from the courses I work through — one post per lesson, grouped by course and topic.",
}

export default async function PostsPage() {
    const published = await publishedPosts()

    return (
        <>
            <section className="pt-[76px] pb-10">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                    / posts
                </p>
                <h2 className="mt-6 font-serif text-[36px] sm:text-[46px] leading-[1.08] tracking-[-0.015em] max-w-[560px] text-pretty">
                    What I’m studying, <em className="text-accent">written down.</em>
                </h2>
                <p className="mt-5 max-w-[520px] text-base leading-[1.62] text-muted text-pretty">
                    Not tutorials — study write-ups. I take a lesson, work out
                    what it was actually saying, and rebuild it here with the
                    diagrams I wish it had come with.
                </p>
                <div className="flex items-center gap-3.5 mt-7 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                    <span>{courses.length} courses</span>
                    <span className="block w-px h-[11px] bg-line" />
                    <span>{published.length} posts</span>
                </div>
            </section>

            <ul className="flex flex-col">
                {courses.map((course) => {
                    const { published, listed } = courseProgress(course)
                    return (
                        <li
                            key={course.slug}
                            className="py-8 border-t border-hairline last:border-b"
                        >
                            <div className="flex items-baseline justify-between gap-5">
                                <Link
                                    href={`/posts/${course.slug}`}
                                    className="font-serif text-[27px] leading-tight hover:text-accent transition-colors"
                                >
                                    {course.name}
                                </Link>
                                <span className="font-mono text-[11px] text-subtle whitespace-nowrap">
                                    {published} / {listed}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                                    {course.teacher}
                                </span>
                                <span className="block w-px h-2.5 bg-line" />
                                <CourseStatus published={published} listed={listed} />
                            </div>
                            <div className="mt-4">
                                <Progress published={published} listed={listed} />
                            </div>
                            <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.6] text-muted text-pretty">
                                {course.summary}
                            </p>
                            <div className="flex flex-wrap gap-[7px] mt-4">
                                {course.topics.map((topic) => (
                                    <span
                                        key={topic.id}
                                        className="font-mono text-[10.5px] px-2.5 py-1 rounded-full border border-line text-muted"
                                    >
                                        {topic.name}{" "}
                                        <span className="text-dim">
                                            {topic.lessons.length}
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </li>
                    )
                })}
            </ul>
            <div className="pt-9" />
        </>
    )
}
