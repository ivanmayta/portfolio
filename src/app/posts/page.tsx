import type { Metadata } from "next"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { IndexHead, IndexRow, IndexYear, markYears } from "@/components/index-table"
import { Section } from "@/components/section"
import { courses } from "@/data/courses"
import { courseProgress, publishedPosts } from "@/lib/content"
import { CourseStatus, Progress } from "@/components/course-status"

export const metadata: Metadata = {
    title: "Posts | iverse.dev",
    description:
        "Study write-ups from the courses behind the work — one post per lesson, grouped by course and topic.",
}

/** year · title · topic · date */
const COLS =
    "grid-cols-[36px_minmax(0,1fr)_auto] sm:grid-cols-[52px_minmax(0,1fr)_170px_58px]"

export default async function PostsPage() {
    const published = await publishedPosts()
    const rows = markYears(published, (post) =>
        Number(post.meta.date.slice(0, 4))
    )

    return (
        <>
            <PageHeader
                label="posts"
                title="Posts"
                stats={[
                    `${courses.length} ${courses.length === 1 ? "course" : "courses"}`,
                    `${published.length} written`,
                ]}
            />

            <Section label="courses">
                <ul className="flex flex-col gap-6">
                    {courses.map((course) => {
                        const { published: done, listed } = courseProgress(course)
                        return (
                            <li key={course.slug}>
                                <div className="flex items-baseline justify-between gap-5">
                                    <Link
                                        href={`/posts/${course.slug}`}
                                        className="text-[19px] font-medium tracking-[-0.01em] leading-tight hover:text-accent transition-colors"
                                    >
                                        {course.name}
                                    </Link>
                                    <span className="font-mono text-[11px] text-subtle whitespace-nowrap">
                                        {done} / {listed}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mt-2.5">
                                    <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                                        {course.teacher}
                                    </span>
                                    <span className="block w-px h-2.5 bg-line" />
                                    <CourseStatus published={done} listed={listed} />
                                </div>
                                <div className="mt-3.5">
                                    <Progress published={done} listed={listed} />
                                </div>
                                <p className="mt-3.5 max-w-[560px] text-[14.5px] leading-[1.6] text-muted text-pretty">
                                    {course.summary}
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </Section>

            <Section label="all posts">
                <IndexHead className={COLS}>
                    <span>year</span>
                    <span>title</span>
                    <span>topic</span>
                    <span className="text-right">date</span>
                </IndexHead>

                {rows.map(({ row: post, year, first }) => (
                    <IndexRow
                        key={`${post.course.slug}-${post.lesson.slug}`}
                        className={COLS}
                    >
                        <IndexYear>{first ? year : ""}</IndexYear>

                        <Link
                            href={`/posts/${post.course.slug}/${post.lesson.slug}`}
                            className="col-start-2 row-start-1 sm:col-start-2 text-[15px] text-pretty group-hover/row:text-accent transition-colors"
                        >
                            {post.meta.title}
                            <span className="inline-block ml-1.5 text-faint transition-transform duration-200 group-hover/row:translate-x-0.5">
                                →
                            </span>
                        </Link>

                        <span className="col-start-3 row-start-1 sm:col-start-4 justify-self-end font-mono text-[10.5px] text-dim whitespace-nowrap">
                            {new Date(`${post.meta.date}T00:00:00`).toLocaleDateString(
                                "en-GB",
                                { day: "2-digit", month: "2-digit" }
                            )}
                        </span>

                        <span className="col-start-2 col-span-2 row-start-2 sm:col-start-3 sm:col-span-1 sm:row-start-1 font-mono text-[10.5px] text-dim truncate">
                            {post.topic.name}
                        </span>
                    </IndexRow>
                ))}
            </Section>

            <div className="pt-9" />
        </>
    )
}
