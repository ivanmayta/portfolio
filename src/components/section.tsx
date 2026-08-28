import { cn } from "@/lib/utils"

export function Section({
    id,
    label,
    aside,
    className,
    children,
}: {
    id?: string
    label: string
    aside?: React.ReactNode
    className?: string
    children: React.ReactNode
}) {
    return (
        <section
            id={id}
            className={cn(
                "group/section grid grid-cols-1 sm:grid-cols-[112px_minmax(0,1fr)] gap-4 sm:gap-10 py-10 border-t border-hairline",
                className
            )}
        >
            <div className="flex flex-col gap-2.5">
                <h2 className="font-mono text-xs text-subtle group-hover/section:text-accent transition-colors">
                    / {label}
                </h2>
                {aside}
            </div>
            <div>{children}</div>
        </section>
    )
}
