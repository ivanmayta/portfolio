import { completePath } from "./fs"
import type { Command, Host } from "./types"

export function tokenize(line: string): string[] {
    return line.trim().split(/\s+/).filter(Boolean)
}

export function commonPrefix(items: string[]): string {
    if (items.length === 0) return ""
    let prefix = items[0]
    for (const item of items.slice(1)) {
        while (!item.startsWith(prefix)) prefix = prefix.slice(0, -1)
        if (!prefix) break
    }
    return prefix
}

/** Levenshtein distance, for "did you mean" on a typo. */
export function distance(a: string, b: string): number {
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i)

    for (let i = 1; i <= a.length; i++) {
        const curr = [i]
        for (let j = 1; j <= b.length; j++) {
            curr[j] = Math.min(
                prev[j] + 1,
                curr[j - 1] + 1,
                prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            )
        }
        prev = curr
    }

    return prev[b.length]
}

export function closest(input: string, names: string[]): string | null {
    let best: string | null = null
    let score = Infinity

    for (const name of names) {
        const next = distance(input.toLowerCase(), name)
        if (next < score) {
            score = next
            best = name
        }
    }

    return score <= 2 ? best : null
}

export type Completion = {
    /** The partial word being completed. */
    partial: string
    matches: string[]
}

/**
 * What the word under the cursor could become: command names in the first
 * position, otherwise whatever the command declares — a fixed list, or the
 * virtual file tree.
 */
export function completionsFor(
    buffer: string,
    cursor: number,
    registry: Command[],
    lookup: Map<string, Command>,
    host: Host
): Completion {
    const head = buffer.slice(0, cursor)
    const words = head.split(/\s+/)
    const partial = words[words.length - 1] ?? ""
    const first = words.length <= 1

    if (first) {
        const names = registry.filter((c) => !c.hidden).map((c) => c.name)
        return { partial, matches: names.filter((n) => n.startsWith(partial)) }
    }

    const command = lookup.get(words[0].toLowerCase())
    if (!command?.complete) return { partial, matches: [] }

    if (command.complete === "path") {
        return { partial, matches: completePath(host.root, host.cwd, partial) }
    }

    return {
        partial,
        matches: command.complete.filter((item) => item.startsWith(partial)),
    }
}
