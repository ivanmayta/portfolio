import { Section } from "./section"

const stack = [
    {
        group: "Frontend",
        items: "Astro · Next.js · React · Tailwind · shadcn/ui · HTML · CSS · Bootstrap",
    },
    {
        group: "Backend",
        items: "Node.js · Express · Python · FastAPI · Django · Kotlin",
    },
    {
        group: "Data",
        items: "PostgreSQL · Supabase · MySQL · Prisma · Firebase · Power BI",
    },
    {
        group: "Tooling",
        items: "Git · GitHub · Vercel · Vite · VS Code · Android Studio · DigitalOcean",
    },
]

export function Technologies() {
    return (
        <Section label="stack" className="border-t-0 sm:border-t">
            <div className="flex flex-col gap-4">
                {stack.map((row) => (
                    <div
                        key={row.group}
                        className="grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] gap-1 sm:gap-5 sm:items-baseline"
                    >
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-faint">
                            {row.group}
                        </span>
                        <span className="font-mono text-[12.5px] leading-[1.9] text-muted">
                            {row.items}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    )
}
