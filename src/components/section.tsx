import { cn } from "@/lib/utils"

/**
 * One rhythm for the whole site: a rule, the `/ label`, then the content at
 * full width. The label sits above rather than in a gutter so every section
 * lines up with the header and with `PageHeader`.
 */
export function Section({
    id,
    label,
    aside,
    className,
    children,
}: {
    id?: string
    label?: string
    /** Sits opposite the label — usually a "view all" link. */
    aside?: React.ReactNode
    className?: string
    children: React.ReactNode
}) {
    return (
        <section
            id={id}
            className={cn(
                "group/section py-10 border-t border-hairline",
                className
            )}
        >
            {(label || aside) && (
                <div className="flex items-baseline justify-between gap-5 pb-5">
                    {label ? (
                        <h2 className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle group-hover/section:text-accent transition-colors">
                            / {label}
                        </h2>
                    ) : (
                        <span />
                    )}
                    {aside}
                </div>
            )}
            {children}
        </section>
    )
}
