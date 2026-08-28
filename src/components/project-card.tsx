import Link from "next/link"
import { Project } from "@/types/types"

export function ProjectCard({ project }: { project: Project }) {
    const { slug, name, description, stack } = project
    const stackNames = stack.map((tech) =>
        typeof tech === "string" ? tech : tech.name
    )

    return (
        <Link
            href={`/projects/${slug}`}
            scroll={false}
            className="group/card flex flex-col gap-2.5 p-4 rounded-lg border border-line bg-surface hover:border-faint hover:bg-hairline transition-colors"
        >
            <div className="flex items-center justify-between gap-2.5">
                <span className="text-[14.5px] font-medium">{name}</span>
                <span className="text-[13px] text-dim transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:text-accent">
                    ↗
                </span>
            </div>
            <p className="text-[13.5px] leading-[1.5] text-muted text-pretty">
                {description}
            </p>
            <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.07em] text-dim">
                {stackNames.join(" · ")}
            </p>
        </Link>
    )
}
