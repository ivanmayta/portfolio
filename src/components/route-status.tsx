import { cn } from "@/lib/utils"
import type { Route } from "@/types/types"

const labels: Record<Route["status"], string> = {
    "in-progress": "in progress",
    queued: "queued",
    finished: "finished",
}

export function RouteStatus({ status }: { status: Route["status"] }) {
    const active = status !== "queued"
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
            {labels[status]}
        </span>
    )
}

export function Progress({ written, total }: { written: number; total: number }) {
    const pct = total > 0 ? Math.round((written / total) * 100) : 0
    return (
        <div className="h-0.5 bg-hairline" aria-hidden="true">
            <div className="h-0.5 bg-accent" style={{ width: `${pct}%` }} />
        </div>
    )
}
