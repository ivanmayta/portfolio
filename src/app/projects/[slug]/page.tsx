import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ImagesSlider } from "@/components/ui/images-slider"
import { projects } from "@/data/projects"

export const dynamicParams = false

export async function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) return {}
    return {
        title: `${project.name} | iverse.dev`,
        description: project.description,
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)
    if (!project) notFound()

    const { name, description, type, url, highlights, images } = project

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-2.5 pt-14 pb-6 font-mono text-[11px] text-dim"
            >
                <Link
                    href="/projects"
                    scroll={false}
                    className="text-subtle hover:text-accent transition-colors"
                >
                    projects
                </Link>
                <span>/</span>
                <span className="text-muted">{name.toLowerCase()}</span>
            </nav>

            <section className="pb-9">
                <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.08] tracking-[-0.015em] text-pretty">
                    {name}
                </h2>
                <p className="mt-5 max-w-[540px] text-base leading-[1.62] text-muted text-pretty">
                    {description}
                </p>
            </section>

            <dl className="flex flex-col gap-4 py-8 border-t border-hairline">
                <div className="grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] gap-1 sm:gap-5 sm:items-baseline">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                        Platform
                    </dt>
                    <dd className="font-mono text-[12.5px] text-muted">{type}</dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] gap-1 sm:gap-5 sm:items-baseline">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                        Stack
                    </dt>
                    <dd className="flex flex-wrap gap-x-4 gap-y-2">
                        {highlights?.map(({ name: tech, icon: Icon }) => (
                            <span
                                key={tech}
                                className="flex items-center gap-1.5 font-mono text-[12.5px] text-muted"
                            >
                                <Icon className="h-4 w-4" />
                                {tech}
                            </span>
                        ))}
                    </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] gap-1 sm:gap-5 sm:items-baseline">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                        Website
                    </dt>
                    <dd>
                        <a
                            className="font-mono text-[12.5px] text-muted hover:text-accent transition-colors"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {url} ↗
                        </a>
                    </dd>
                </div>
            </dl>

            <div className="py-8 border-t border-hairline">
                <ImagesSlider
                    className="w-full h-auto aspect-video rounded-lg border border-line"
                    images={images}
                >
                    <div />
                </ImagesSlider>
            </div>

            <div className="pb-10">
                <Link
                    href="/projects"
                    scroll={false}
                    className="font-mono text-[11.5px] text-subtle hover:text-accent transition-colors"
                >
                    ← all projects
                </Link>
            </div>
        </>
    )
}
