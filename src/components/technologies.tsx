import { Section } from "./section"
import { stack } from "@/data/stack"

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
