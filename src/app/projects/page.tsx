import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Projects } from "@/components/projects"
import { Technologies } from "@/components/technologies"
import { projects } from "@/data/projects"

export const metadata: Metadata = {
    title: "Projects | iverse.dev",
    description:
        "Import logistics, ad reporting, landing pages, one videogame and one data warehouse.",
}

export default function ProjectsPage() {
    const live = projects.filter((project) => project.isActive).length

    return (
        <>
            <PageHeader
                label="projects"
                title="Projects"
                stats={[
                    `${projects.length} projects`,
                    live === projects.length ? "all live" : `${live} live`,
                ]}
                className="pb-2"
            />
            <Projects />
            <Technologies />
        </>
    )
}
