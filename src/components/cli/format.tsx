"use client"

import { createContext, useContext, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Lets rendered output offer clickable commands — `<Run cmd="projects" />`. */
export const RunContext = createContext<(input: string) => void>(() => {})

export function Out({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
}

export function Head({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center gap-3 pb-0.5">
            <span className="text-foreground">{children}</span>
            <span className="h-px flex-1 bg-hairline" />
        </div>
    )
}

export function Line({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return <p className={cn("text-muted text-pretty", className)}>{children}</p>
}

export function Note({ children }: { children: ReactNode }) {
    return <p className="text-dim text-pretty">{children}</p>
}

export function Warn({ children }: { children: ReactNode }) {
    return <p className="text-amber-600 dark:text-amber-500">{children}</p>
}

export function Ok({ children }: { children: ReactNode }) {
    return (
        <p className="text-muted">
            <span className="text-signal">✓ </span>
            {children}
        </p>
    )
}

/** Label/value rows. Stacks under the label on narrow screens. */
export function KV({ rows }: { rows: [ReactNode, ReactNode][] }) {
    return (
        <dl className="grid grid-cols-1 sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-4 gap-y-0.5">
            {rows.map((row, i) => (
                <div key={i} className="contents">
                    <dt className="text-dim">{row[0]}</dt>
                    <dd className="text-muted mb-1.5 sm:mb-0">{row[1]}</dd>
                </div>
            ))}
        </dl>
    )
}

/** `ls`-style column list that reflows with the width available. */
export function Cols({ children }: { children: ReactNode }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-x-4 gap-y-0.5">
            {children}
        </div>
    )
}

export function Ext({
    href,
    children,
    arrow = false,
}: {
    href: string
    children?: ReactNode
    arrow?: boolean
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-faint underline-offset-[3px] hover:text-accent hover:decoration-accent transition-colors"
        >
            {children ?? href}
            {arrow && <span className="text-faint"> ↗</span>}
        </a>
    )
}

/** A command you can click instead of type. */
export function Run({ cmd, label }: { cmd: string; label?: ReactNode }) {
    const run = useContext(RunContext)
    return (
        <button
            type="button"
            onClick={() => run(cmd)}
            className="text-left text-accent hover:underline underline-offset-[3px] cursor-pointer"
        >
            {label ?? cmd}
        </button>
    )
}

export function Key({ children }: { children: ReactNode }) {
    return (
        <kbd className="rounded-[4px] border border-line px-1 py-px text-[10.5px] text-subtle">
            {children}
        </kbd>
    )
}
