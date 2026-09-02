"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { projects } from "@/data/projects"
import { IndexHead, IndexRow, IndexYear, markYears } from "./index-table"
import { Section } from "./section"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/types"

const FILTERS: { label: string; type: Project["type"] | "all" }[] = [
    { label: "all", type: "all" },
    { label: "web", type: "web" },
    { label: "mobile", type: "mobile" },
    { label: "bi", type: "bi" },
    { label: "game", type: "videogame" },
]

/**
 * year · name · type · description · links — the year gutter is only worth its
 * width once projects carry one, so the columns shift left without it.
 */
const DATED = {
    cols: "grid-cols-[36px_minmax(0,1fr)_auto] sm:grid-cols-[52px_minmax(0,170px)_60px_minmax(0,1fr)_auto]",
    name: "col-start-2 row-start-1",
    link: "col-start-3 row-start-1 sm:col-start-5",
    type: "sm:col-start-3 sm:row-start-1",
    description:
        "col-start-2 col-span-2 row-start-2 sm:col-start-4 sm:col-span-1 sm:row-start-1",
}

const UNDATED = {
    cols: "grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,170px)_60px_minmax(0,1fr)_auto]",
    name: "col-start-1 row-start-1",
    link: "col-start-2 row-start-1 sm:col-start-4",
    type: "sm:col-start-2 sm:row-start-1",
    description:
        "col-start-1 col-span-2 row-start-2 sm:col-start-3 sm:col-span-1 sm:row-start-1",
}

export function Projects() {
    const pathname = usePathname()
    const isInProjectsPage = pathname === "/projects"
    const [active, setActive] = useState<Project["type"] | "all">("all")

    const filtered =
        active === "all"
            ? projects
            : projects.filter((project) => project.type === active)
    const shown = isInProjectsPage ? filtered : projects.slice(0, 6)

    // Newest first; anything without a year keeps its place at the end.
    const ordered = [...shown].sort(
        (a, b) => (b.year ?? -Infinity) - (a.year ?? -Infinity)
    )
    const rows = markYears(ordered, (project) => project.year)
    const dated = ordered.some((project) => project.year !== undefined)
    const col = dated ? DATED : UNDATED

    return (
        <Section
            id="projects"
            // The /projects page header already names the section.
            label={isInProjectsPage ? undefined : "projects"}
            aside={
                !isInProjectsPage ? (
                    <Link
                        href="/projects"
                        className="font-mono text-[11px] text-subtle hover:text-accent transition-colors"
                    >
                        view all →
                    </Link>
                ) : null
            }
        >
            {isInProjectsPage && (
                <div className="flex items-center gap-4 flex-wrap pb-6 font-mono text-[11.5px]">
                    {FILTERS.map((filter) => {
                        const count =
                            filter.type === "all"
                                ? projects.length
                                : projects.filter((p) => p.type === filter.type)
                                      .length
                        if (count === 0) return null
                        return (
                            <button
                                key={filter.type}
                                type="button"
                                onClick={() => setActive(filter.type)}
                                aria-pressed={active === filter.type}
                                className={cn(
                                    "transition-colors hover:text-accent",
                                    active === filter.type
                                        ? "text-accent"
                                        : "text-subtle"
                                )}
                            >
                                {filter.label}{" "}
                                <span className="text-dim">{count}</span>
                            </button>
                        )
                    })}
                </div>
            )}

            <IndexHead className={col.cols}>
                {dated && <span>year</span>}
                <span>name</span>
                <span>type</span>
                <span>description</span>
                <span />
            </IndexHead>

            {rows.map(({ row: project, year, first }) => (
                <IndexRow key={project.slug} className={col.cols}>
                    {dated && <IndexYear>{first && year ? year : ""}</IndexYear>}

                    <Link
                        href={`/projects/${project.slug}`}
                        scroll={false}
                        className={cn(
                            col.name,
                            "text-[14.5px] font-medium hover:text-accent transition-colors"
                        )}
                    >
                        {project.name}
                        <span className="sm:hidden ml-2 font-mono text-[10px] uppercase tracking-[0.07em] text-faint">
                            {project.type}
                        </span>
                    </Link>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name}`}
                        className={cn(
                            col.link,
                            "justify-self-end text-[13px] text-dim hover:text-accent transition-colors"
                        )}
                    >
                        ↗
                    </a>

                    <span className={cn(
                            col.type,
                            "hidden sm:block font-mono text-[10px] uppercase tracking-[0.07em] text-faint"
                        )}>
                        {project.type}
                    </span>

                    <p className={cn(
                            col.description,
                            "text-[13.5px] leading-[1.5] text-muted text-pretty"
                        )}>
                        {project.description}
                    </p>
                </IndexRow>
            ))}
        </Section>
    )
}
