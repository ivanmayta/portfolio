import Link from "next/link"
import { courses } from "@/data/courses"
import { publishedPosts } from "@/lib/content"
import { Section } from "./section"

export async function PostsPreview() {
    const recent = (await publishedPosts()).slice(0, 3)

    return (
        <Section
            id="posts"
            label="posts"
            aside={
                <Link
                    href="/posts"
                    className="font-mono text-[11px] text-subtle hover:text-accent transition-colors"
                >
                    all posts →
                </Link>
            }
        >
            <p className="max-w-[520px] text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                Study write-ups from the courses behind the work. One post
                per lesson, grouped by course and topic, rebuilt with the
                diagrams the original should have come with.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
                {courses.map((course) => (
                    <Link
                        key={course.slug}
                        href={`/posts/${course.slug}`}
                        className="font-mono text-[11px] px-2.5 py-1.5 rounded-full border border-line text-muted hover:border-accent hover:text-accent transition-colors"
                    >
                        {course.name}{" "}
                        <span className="text-dim">
                            {course.topics.reduce(
                                (n, topic) => n + topic.lessons.length,
                                0
                            )}
                        </span>
                    </Link>
                ))}
            </div>

            {recent.length > 0 && (
                <ul className="mt-5">
                    {recent.map(({ course, topic, lesson, meta }) => (
                        <li
                            key={`${course.slug}-${lesson.slug}`}
                            className="group/row grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_172px_58px] gap-4 items-baseline py-3 border-t border-hairline"
                        >
                            <Link
                                href={`/posts/${course.slug}/${lesson.slug}`}
                                className="text-[15px] group-hover/row:text-accent transition-colors text-pretty"
                            >
                                {meta.title}{" "}
                                <span className="inline-block text-faint transition-transform duration-200 group-hover/row:translate-x-0.5">
                                    →
                                </span>
                            </Link>
                            <span className="hidden sm:block font-mono text-[10.5px] text-dim truncate">
                                {topic.name}
                            </span>
                            <span className="font-mono text-[10.5px] text-dim sm:text-right">
                                {new Date(`${meta.date}T00:00:00`).toLocaleDateString(
                                    "en-GB",
                                    { day: "numeric", month: "short" }
                                )}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Section>
    )
}
