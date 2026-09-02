import { Fragment, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Every index page opens the same way: the `/ label` the sections use, a rule,
 * and a flat title with facts beside it. Counts and status, never prose — the
 * content below says what the page is.
 */
export function PageHeader({
    label,
    title,
    stats,
    className,
}: {
    label: string
    title: ReactNode
    stats?: ReactNode[]
    className?: string
}) {
    return (
        <section className={cn("pt-14 pb-8", className)}>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                / {label}
            </p>
            <div className="mt-3.5 h-px bg-hairline" />
            <div className="mt-4 flex items-baseline justify-between gap-x-6 gap-y-2 flex-wrap">
                <h1 className="text-[27px] sm:text-[32px] font-medium leading-[1.15] tracking-[-0.02em] text-pretty">
                    {title}
                </h1>
                {stats && stats.length > 0 && <Stats items={stats} />}
            </div>
        </section>
    )
}

/**
 * Facts in a row, divided by hairlines. The home page uses this on its own —
 * it wants the status without a title or the rules around one.
 */
export function Stats({
    items,
    className,
}: {
    items: ReactNode[]
    className?: string
}) {
    return (
        <p
            className={cn(
                "flex items-center gap-3.5 flex-wrap font-mono text-[10.5px] uppercase tracking-[0.08em] text-subtle",
                className
            )}
        >
            {items.map((item, i) => (
                <Fragment key={i}>
                    {i > 0 && (
                        <span aria-hidden className="block w-px h-[11px] bg-line" />
                    )}
                    <span className="flex items-center gap-[7px]">{item}</span>
                </Fragment>
            ))}
        </p>
    )
}

/** The status pill used in the stats row — a dot plus a word. */
export function Signal({ children }: { children: ReactNode }) {
    return (
        <span className="flex items-center gap-[7px] text-muted">
            <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-signal" />
            {children}
        </span>
    )
}
