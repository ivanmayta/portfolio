import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { routes, routeBySlug, lessonCounts } from "@/data/routes"
import { Progress } from "@/components/route-status"
import { cn } from "@/lib/utils"

export const dynamicParams = false

export function generateStaticParams() {
    return routes.map((route) => ({ route: route.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ route: string }>
}): Promise<Metadata> {
    const { route } = await params
    const found = routeBySlug(route)
    if (!found) return {}
    return {
        title: `${found.name} | notes | iverse.dev`,
        description: found.summary,
    }
}

export default async function RoutePage({
    params,
}: {
    params: Promise<{ route: string }>
}) {
    const { route: slug } = await params
    const route = routeBySlug(slug)
    if (!route) notFound()

    const { written } = lessonCounts(route)

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2.5 pt-14 pb-6 font-mono text-[11px] text-dim"
            >
                <Link href="/notes" className="text-subtle hover:text-accent transition-colors">
                    notes
                </Link>
                <span>/</span>
                <span className="text-muted">{route.name.toLowerCase()}</span>
            </nav>

            <section className="pb-8">
                <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.08] tracking-[-0.015em] text-pretty">
                    {route.name}
                </h2>
                <p className="mt-5 max-w-[540px] text-base leading-[1.62] text-muted text-pretty">
                    {route.summary}
                </p>
                <div className="flex items-center gap-3.5 flex-wrap mt-6 font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                    <span>{route.teacher}</span>
                    <span className="block w-px h-2.5 bg-line" />
                    <span>Frontend Masters</span>
                    <span className="block w-px h-2.5 bg-line" />
                    <a
                        href={route.courseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-subtle hover:text-accent transition-colors"
                    >
                        course ↗
                    </a>
                </div>
                <div className="flex items-center gap-4 mt-5">
                    <div className="grow">
                        <Progress written={written} total={route.total} />
                    </div>
                    <span className="font-mono text-[11px] text-subtle whitespace-nowrap">
                        {written} of {route.total} written
                    </span>
                </div>
            </section>

            {route.topics.map((topic, index) => {
                const done = topic.lessons.filter((l) => l.status === "written").length
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
                            <p className="mt-2 max-w-[520px] text-[14.5px] leading-[1.6] text-subtle text-pretty">
                                {topic.summary}
                            </p>
                            <ul className="mt-4">
                                {topic.lessons.map((lesson) => (
                                    <li
                                        key={lesson.slug}
                                        className="grid grid-cols-[14px_minmax(0,1fr)_56px] gap-3.5 items-baseline py-2.5 border-t border-hairline"
                                    >
                                        <span
                                            className={cn(
                                                "block w-1.5 h-1.5 mt-1.5 rounded-full",
                                                lesson.status === "written"
                                                    ? "bg-accent"
                                                    : "border border-faint"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                "text-[15px] text-pretty",
                                                lesson.status === "written"
                                                    ? "text-foreground/85"
                                                    : "text-dim"
                                            )}
                                        >
                                            {lesson.title}
                                        </span>
                                        <span className="font-mono text-[10.5px] text-dim text-right">
                                            {lesson.date ?? "—"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                )
            })}
            <div className="pt-4" />
        </>
    )
}
