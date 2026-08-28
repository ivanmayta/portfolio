"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { projects } from "@/data/projects"
import { ProjectCard } from "./project-card"
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

export function Projects() {
    const pathname = usePathname()
    const isInProjectsPage = pathname === "/projects"
    const [active, setActive] = useState<Project["type"] | "all">("all")

    const filtered =
        active === "all"
            ? projects
            : projects.filter((project) => project.type === active)
    const projectsToShow = isInProjectsPage ? filtered : projects.slice(0, 4)

    return (
        <Section
            id="projects"
            label="projects"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectsToShow.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </Section>
    )
}
