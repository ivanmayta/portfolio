import type { Metadata } from "next"
import { Projects } from "@/components/projects"
import { Technologies } from "@/components/technologies"

export const metadata: Metadata = {
    title: "Projects | iverse.dev",
    description:
        "Import logistics, ad reporting, landing pages, one videogame and one data warehouse.",
}

export default function ProjectsPage() {
    return (
        <>
            <section className="pt-[76px] pb-2">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                    / projects
                </p>
                <h2 className="mt-6 font-serif text-[36px] sm:text-[46px] leading-[1.08] tracking-[-0.015em] max-w-[560px] text-pretty">
                    Ten things I <em className="text-accent">shipped</em>, and
                    what they cost.
                </h2>
                <p className="mt-5 max-w-[520px] text-base leading-[1.62] text-muted text-pretty">
                    Import logistics, ad reporting, landing pages, one
                    videogame and one data warehouse.
                </p>
            </section>
            <Projects />
            <Technologies />
        </>
    )
}
