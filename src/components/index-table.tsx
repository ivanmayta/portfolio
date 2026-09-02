import { cn } from "@/lib/utils"

/**
 * The dense index layout the listing pages share: mono column headers, rows
 * split by hairlines, and a year gutter that only prints where the year
 * changes. Each page supplies its own grid template so the columns can differ.
 */
export function IndexHead({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "hidden sm:grid items-baseline gap-x-4 pb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-faint",
                className
            )}
        >
            {children}
        </div>
    )
}

export function IndexRow({
    className,
    children,
}: {
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "group/row grid items-baseline gap-x-4 gap-y-1 py-3 border-t border-hairline",
                className
            )}
        >
            {children}
        </div>
    )
}

/** Column 1 of every row — blank unless this row starts a new year. */
export function IndexYear({ children }: { children?: React.ReactNode }) {
    return (
        <span className="col-start-1 row-start-1 font-mono text-[10.5px] text-faint">
            {children}
        </span>
    )
}

/**
 * Marks the first row of each year in a list already ordered by it, so the
 * gutter prints the year once instead of on every line.
 */
export function markYears<T>(rows: T[], year: (row: T) => number | undefined) {
    let previous: number | undefined | null = null
    return rows.map((row) => {
        const value = year(row)
        const first = value !== previous
        previous = value
        return { row, year: value, first }
    })
}
