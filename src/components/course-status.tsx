import { cn } from "@/lib/utils"

export function CourseStatus({
    published,
    listed,
}: {
    published: number
    listed: number
}) {
    const label =
        published === 0
            ? "not started"
            : published >= listed
              ? "caught up"
              : "in progress"
    const active = published > 0

    return (
        <span
            className={cn(
                "flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em]",
                active ? "text-signal" : "text-dim"
            )}
        >
            <span
                className={cn(
                    "block w-[5px] h-[5px] rounded-full",
                    active ? "bg-signal" : "border border-current"
                )}
            />
            {label}
        </span>
    )
}

export function Progress({
    published,
    listed,
}: {
    published: number
    listed: number
}) {
    const pct = listed > 0 ? Math.round((published / listed) * 100) : 0
    return (
        <div className="h-0.5 bg-hairline" aria-hidden="true">
            <div className="h-0.5 bg-accent" style={{ width: `${pct}%` }} />
        </div>
    )
}
