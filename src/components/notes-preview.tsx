import Link from "next/link"
import { routes, recentLessons } from "@/data/routes"
import { Section } from "./section"

export function NotesPreview() {
    const recent = recentLessons(3)

    return (
        <Section
            id="notes"
            label="notes"
            aside={
                <Link
                    href="/notes"
                    className="font-mono text-[11px] text-subtle hover:text-accent transition-colors"
                >
                    all notes →
                </Link>
            }
        >
            <p className="max-w-[520px] text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                Learning in public. One page per Frontend Masters lesson I work
                through, grouped into routes and subtopics so it reads like a
                syllabus, not a feed.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
                {routes.map((route) => (
                    <Link
                        key={route.slug}
                        href={`/notes/${route.slug}`}
                        className="font-mono text-[11px] px-2.5 py-1.5 rounded-full border border-line text-muted hover:border-accent hover:text-accent transition-colors"
                    >
                        {route.name}{" "}
                        <span className="text-dim">
                            {route.topics.reduce(
                                (n, topic) => n + topic.lessons.length,
                                0
                            )}
                        </span>
                    </Link>
                ))}
            </div>

            {recent.length > 0 && (
                <ul className="mt-5">
                    {recent.map(({ lesson, topic, route }) => (
                        <li
                            key={`${route.slug}-${lesson.slug}`}
                            className="group/row grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_172px_58px] gap-4 items-baseline py-3 border-t border-hairline"
                        >
                            <Link
                                href={`/notes/${route.slug}`}
                                className="text-[15px] group-hover/row:text-accent transition-colors text-pretty"
                            >
                                {lesson.title}{" "}
                                <span className="inline-block text-faint transition-transform duration-200 group-hover/row:translate-x-0.5">
                                    →
                                </span>
                            </Link>
                            <span className="hidden sm:block font-mono text-[10.5px] text-dim">
                                {route.name} / {topic.name}
                            </span>
                            <span className="font-mono text-[10.5px] text-dim sm:text-right">
                                {lesson.date}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </Section>
    )
}
