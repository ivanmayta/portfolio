import type { Metadata } from "next"
import Link from "next/link"
import { routes, lessonCounts } from "@/data/routes"
import { Progress, RouteStatus } from "@/components/route-status"

export const metadata: Metadata = {
    title: "Notes | iverse.dev",
    description:
        "Summaries of the Frontend Masters lessons I work through, grouped by route.",
}

export default function NotesPage() {
    const written = routes.reduce((n, r) => n + lessonCounts(r).written, 0)

    return (
        <>
            <section className="pt-[76px] pb-10">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                    / notes
                </p>
                <h2 className="mt-6 font-serif text-[36px] sm:text-[46px] leading-[1.08] tracking-[-0.015em] max-w-[560px] text-pretty">
                    Frontend Masters, <em className="text-accent">in public.</em>
                </h2>
                <p className="mt-5 max-w-[520px] text-base leading-[1.62] text-muted text-pretty">
                    A route is a course I am working through. Every lesson gets
                    one page — what it taught, the code that made it click, and
                    where I was wrong. Written for the version of me who
                    forgets.
                </p>
                <div className="flex items-center gap-3.5 mt-7 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                    <span>{routes.length} routes</span>
                    <span className="block w-px h-[11px] bg-line" />
                    <span>{written} notes</span>
                </div>
            </section>

            <ul className="flex flex-col">
                {routes.map((route) => {
                    const { written, listed } = lessonCounts(route)
                    return (
                        <li
                            key={route.slug}
                            className="group/route py-8 border-t border-hairline last:border-b"
                        >
                            <div className="flex items-baseline justify-between gap-5">
                                <Link
                                    href={`/notes/${route.slug}`}
                                    className="font-serif text-[27px] leading-tight hover:text-accent transition-colors"
                                >
                                    {route.name}
                                </Link>
                                <span className="font-mono text-[11px] text-subtle whitespace-nowrap">
                                    {written} / {route.total}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                                    {route.teacher}
                                </span>
                                <span className="block w-px h-2.5 bg-line" />
                                <RouteStatus status={route.status} />
                            </div>
                            <div className="mt-4">
                                <Progress written={written} total={route.total} />
                            </div>
                            <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.6] text-muted text-pretty">
                                {route.summary}
                            </p>
                            <div className="flex flex-wrap gap-[7px] mt-4">
                                {route.topics.map((topic) => (
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
                            <p className="sr-only">
                                {listed} lessons listed so far
                            </p>
                        </li>
                    )
                })}
            </ul>
            <div className="pt-9" />
        </>
    )
}
