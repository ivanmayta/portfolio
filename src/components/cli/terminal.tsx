"use client"

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { profile } from "@/data/profile"
import { buildFs, formatPath } from "@/lib/cli/fs"
import {
    closest,
    commonPrefix,
    completionsFor,
    tokenize,
} from "@/lib/cli/shell"
import type { CliData, Command, Host, Theme } from "@/lib/cli/types"
import { cn } from "@/lib/utils"
import { Banner, buildCommands } from "./commands"
import { Key, Note, Out, Run, RunContext, Warn } from "./format"

const HISTORY_KEY = "iversh:history"
const THEME_KEY = "theme"
const MAX_HISTORY = 200

type Block = {
    id: number
    path: string
    input: string
    output: ReactNode
}

type Menu = {
    prefix: string
    tail: string
    matches: string[]
    index: number
}

type Search = {
    saved: string
    index: number
}

const QUICK = ["help", "about", "projects", "posts", "neofetch", "clear"]

export function Terminal({ data }: { data: CliData }) {
    const router = useRouter()

    const root = useMemo(() => buildFs(data), [data])
    const registry = useMemo(() => buildCommands(data), [data])
    const lookup = useMemo(() => {
        const map = new Map<string, Command>()
        for (const command of registry) {
            map.set(command.name, command)
            for (const alias of command.aliases ?? []) map.set(alias, command)
        }
        return map
    }, [registry])

    const [blocks, setBlocks] = useState<Block[]>([])
    const [value, setValue] = useState("")
    const [cwd, setCwdState] = useState<string[]>([])
    const [history, setHistory] = useState<string[]>([])
    const [cursor, setCursor] = useState(-1)
    const [menu, setMenu] = useState<Menu | null>(null)
    const [search, setSearch] = useState<Search | null>(null)
    const [busy, setBusy] = useState(false)
    const [boot, setBoot] = useState(0)
    const [showBoot, setShowBoot] = useState(true)

    const inputRef = useRef<HTMLInputElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const caretRef = useRef<number | null>(null)
    const draftRef = useRef("")
    const idRef = useRef(0)
    const bootedAt = useRef(Date.now())

    // Output keeps the callbacks it was rendered with, so a button in an old
    // block would otherwise resolve its path against a stale directory.
    const cwdRef = useRef<string[]>([])
    const historyRef = useRef<string[]>([])

    const setCwd = useCallback((segments: string[]) => {
        cwdRef.current = segments
        setCwdState(segments)
    }, [])

    useEffect(() => {
        historyRef.current = history
    }, [history])

    // ------------------------------------------------------------------ boot

    const bootParts: ReactNode[] = useMemo(
        () => [
            <span key="v" className="text-dim">
                iversh 1.0.0 · {profile.site}
            </span>,
            <span key="p" className="text-dim">
                loading projects … {data.projects.length}
            </span>,
            <span key="w" className="text-dim">
                loading posts … {data.posts.length}
            </span>,
            <span key="m" className="text-dim">
                mounting ~ … ok
            </span>,
            <Banner key="b" />,
            <span key="h" className="text-muted">
                type <Run cmd="help" /> for the commands,{" "}
                <Run cmd="about" /> to start, or <Run cmd="gui" /> for the normal
                site.
            </span>,
        ],
        [data.projects.length, data.posts.length]
    )

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (reduced) {
            setBoot(bootParts.length)
            return
        }
        let step = 0
        const timer = setInterval(() => {
            step += 1
            setBoot(step)
            if (step >= bootParts.length) clearInterval(timer)
        }, 90)
        return () => clearInterval(timer)
    }, [bootParts.length])

    const skipBoot = useCallback(() => {
        setBoot((current) =>
            current < bootParts.length ? bootParts.length : current
        )
    }, [bootParts.length])

    // --------------------------------------------------------------- history

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(HISTORY_KEY)
            if (stored) setHistory(JSON.parse(stored) as string[])
        } catch {
            // A blocked or corrupt store just means the session starts empty.
        }
    }, [])

    const remember = useCallback((entry: string) => {
        setHistory((current) => {
            if (current[current.length - 1] === entry) return current
            const next = [...current, entry].slice(-MAX_HISTORY)
            try {
                window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
            } catch {
                // Not being able to persist is not worth interrupting anyone.
            }
            return next
        })
    }, [])

    // ----------------------------------------------------------------- theme

    const readTheme = useCallback((): Theme => {
        const attr = document.documentElement.dataset.theme
        return attr === "dark" || attr === "light" ? attr : "system"
    }, [])

    const writeTheme = useCallback((theme: Theme) => {
        if (theme === "system") {
            delete document.documentElement.dataset.theme
            window.localStorage.removeItem(THEME_KEY)
            return
        }
        document.documentElement.dataset.theme = theme
        try {
            window.localStorage.setItem(THEME_KEY, theme)
        } catch {
            // Same as above — the class on <html> still applies for this visit.
        }
    }, [])

    // --------------------------------------------------------------- execute

    const execute = useCallback(
        async (raw: string) => {
            const path = formatPath(cwdRef.current)
            const trimmed = raw.trim()

            if (!trimmed) {
                setBlocks((current) => [
                    ...current,
                    { id: idRef.current++, path, input: raw, output: null },
                ])
                return
            }

            remember(trimmed)

            const [name, ...args] = tokenize(trimmed)
            const command = lookup.get(name.toLowerCase())

            let cleared = false
            let nextCwd: string[] | null = null

            const host: Host = {
                data,
                cwd: cwdRef.current,
                root,
                bootedAt: bootedAt.current,
                setCwd: (segments) => {
                    nextCwd = segments
                },
                openUrl: (url) => window.open(url, "_blank", "noopener,noreferrer"),
                navigate: (target) => router.push(target),
                clear: () => {
                    cleared = true
                },
                history: () => historyRef.current,
                clearHistory: () => {
                    setHistory([])
                    try {
                        window.localStorage.removeItem(HISTORY_KEY)
                    } catch {
                        // Nothing to recover from — the in-memory list is gone.
                    }
                },
                theme: readTheme,
                setTheme: writeTheme,
                run: (input) => void execute(input),
            }

            let output: ReactNode

            if (!command) {
                const hint = closest(
                    name,
                    registry.filter((c) => !c.hidden).map((c) => c.name)
                )
                output = (
                    <Out>
                        <Warn>command not found: {name}</Warn>
                        {hint ? (
                            <Note>
                                Did you mean <Run cmd={hint} />?
                            </Note>
                        ) : (
                            <Note>
                                Run <Run cmd="help" /> to see everything available.
                            </Note>
                        )}
                    </Out>
                )
            } else {
                const result = command.run(args, host)
                if (result instanceof Promise) {
                    setBusy(true)
                    try {
                        output = await result
                    } finally {
                        setBusy(false)
                    }
                } else {
                    output = result
                }
            }

            if (nextCwd) setCwd(nextCwd)

            if (cleared) setShowBoot(false)

            setBlocks((current) =>
                cleared
                    ? []
                    : [...current, { id: idRef.current++, path, input: raw, output }]
            )
        },
        [data, lookup, readTheme, registry, remember, root, router, setCwd, writeTheme]
    )

    const run = useCallback(
        (input: string) => {
            skipBoot()
            setValue("")
            setMenu(null)
            setSearch(null)
            setCursor(-1)
            void execute(input)
            inputRef.current?.focus()
        },
        [execute, skipBoot]
    )

    // ------------------------------------------------------------ suggestion

    /** fish-style ghost text: the newest matching history entry, else a command. */
    const suggestion = useMemo(() => {
        if (!value || search || menu) return ""
        for (let i = history.length - 1; i >= 0; i--) {
            if (history[i].startsWith(value) && history[i] !== value) {
                return history[i].slice(value.length)
            }
        }
        if (value.includes(" ")) return ""
        const match = registry.find(
            (command) => !command.hidden && command.name.startsWith(value)
        )
        return match && match.name !== value ? match.name.slice(value.length) : ""
    }, [history, menu, registry, search, value])

    const searchMatches = useMemo(() => {
        if (!search) return []
        const query = value.toLowerCase()
        const seen = new Set<string>()
        const out: string[] = []
        for (let i = history.length - 1; i >= 0; i--) {
            const entry = history[i]
            if (seen.has(entry)) continue
            if (!query || entry.toLowerCase().includes(query)) {
                seen.add(entry)
                out.push(entry)
            }
            if (out.length >= 6) break
        }
        return out
    }, [history, search, value])

    // ------------------------------------------------------------ completion

    const setCaret = (position: number) => {
        caretRef.current = position
    }

    useLayoutEffect(() => {
        if (caretRef.current === null) return
        inputRef.current?.setSelectionRange(caretRef.current, caretRef.current)
        caretRef.current = null
    })

    const complete = useCallback(() => {
        const input = inputRef.current
        if (!input) return

        if (menu) {
            const index = (menu.index + 1) % menu.matches.length
            const word = menu.matches[index]
            setMenu({ ...menu, index })
            setValue(menu.prefix + word + menu.tail)
            setCaret(menu.prefix.length + word.length)
            return
        }

        const caret = input.selectionStart ?? value.length
        const host = { root, cwd } as Host
        const { partial, matches } = completionsFor(
            value,
            caret,
            registry,
            lookup,
            host
        )
        if (matches.length === 0) return

        const prefix = value.slice(0, caret - partial.length)
        const tail = value.slice(caret)

        if (matches.length === 1) {
            const word = matches[0]
            const suffix = word.endsWith("/") ? "" : " "
            setValue(prefix + word + suffix + tail)
            setCaret(prefix.length + word.length + suffix.length)
            return
        }

        const shared = commonPrefix(matches)
        const head = shared.length > partial.length ? shared : partial
        setValue(prefix + head + tail)
        setCaret(prefix.length + head.length)
        setMenu({ prefix, tail, matches, index: -1 })
    }, [cwd, lookup, menu, registry, root, value])

    // ------------------------------------------------------------------ keys

    const recall = (direction: -1 | 1) => {
        if (!history.length) return

        if (cursor === -1) {
            if (direction === 1) return
            draftRef.current = value
            const index = history.length - 1
            setCursor(index)
            setValue(history[index])
            return
        }

        const next = cursor + direction
        if (next >= history.length) {
            setCursor(-1)
            setValue(draftRef.current)
            return
        }
        const index = Math.max(0, next)
        setCursor(index)
        setValue(history[index])
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const input = event.currentTarget
        const caret = input.selectionStart ?? value.length
        skipBoot()

        if (event.key !== "Tab" && menu) setMenu(null)

        // ----- reverse history search
        if (search) {
            if (event.key === "Escape" || (event.ctrlKey && event.key === "g")) {
                event.preventDefault()
                setValue(search.saved)
                setSearch(null)
                return
            }
            if (event.key === "Enter") {
                event.preventDefault()
                const picked = searchMatches[search.index]
                setSearch(null)
                setValue(picked ?? search.saved)
                return
            }
            if (event.key === "ArrowUp" || (event.ctrlKey && event.key === "r")) {
                event.preventDefault()
                setSearch({
                    ...search,
                    index: Math.min(search.index + 1, searchMatches.length - 1),
                })
                return
            }
            if (event.key === "ArrowDown") {
                event.preventDefault()
                setSearch({ ...search, index: Math.max(0, search.index - 1) })
                return
            }
        }

        if (event.ctrlKey && event.key === "r") {
            event.preventDefault()
            setSearch({ saved: value, index: 0 })
            setValue("")
            return
        }

        switch (true) {
            case event.key === "Enter": {
                event.preventDefault()
                const line = value
                setValue("")
                setCursor(-1)
                draftRef.current = ""
                void execute(line)
                return
            }
            case event.key === "Tab":
                event.preventDefault()
                complete()
                return
            case event.key === "ArrowUp":
                event.preventDefault()
                recall(-1)
                return
            case event.key === "ArrowDown":
                event.preventDefault()
                recall(1)
                return
            case event.key === "ArrowRight" && caret === value.length && !!suggestion:
                event.preventDefault()
                setValue(value + suggestion)
                return
            case event.key === "Escape":
                event.preventDefault()
                setValue("")
                setCursor(-1)
                return
            case event.ctrlKey && event.key === "l":
                event.preventDefault()
                setBlocks([])
                setShowBoot(false)
                return
            case event.ctrlKey && event.key === "c":
                event.preventDefault()
                setBlocks((current) => [
                    ...current,
                    {
                        id: idRef.current++,
                        path: formatPath(cwd),
                        input: `${value}^C`,
                        output: null,
                    },
                ])
                setValue("")
                setCursor(-1)
                return
            case event.ctrlKey && event.key === "u":
                event.preventDefault()
                setValue(value.slice(caret))
                setCaret(0)
                return
            case event.ctrlKey && event.key === "k":
                event.preventDefault()
                setValue(value.slice(0, caret))
                return
            case event.ctrlKey && event.key === "w": {
                event.preventDefault()
                const head = value.slice(0, caret).replace(/\s*\S+\s*$/, "")
                setValue(head + value.slice(caret))
                setCaret(head.length)
                return
            }
            case event.ctrlKey && event.key === "a":
                event.preventDefault()
                input.setSelectionRange(0, 0)
                return
            case event.ctrlKey && event.key === "e":
                event.preventDefault()
                input.setSelectionRange(value.length, value.length)
                return
            case event.ctrlKey && event.key === "d":
                if (!value) {
                    event.preventDefault()
                    void execute("exit")
                }
                return
        }
    }

    // ---------------------------------------------------------------- render

    useEffect(() => {
        const el = scrollRef.current
        if (el) el.scrollTop = el.scrollHeight
    }, [blocks, boot, menu, search])

    const focusInput = () => {
        if (window.getSelection()?.toString()) return
        inputRef.current?.focus()
    }

    const path = formatPath(cwd)

    return (
        <RunContext.Provider value={run}>
            <div className="flex flex-col h-[min(68dvh,600px)] min-h-[360px] rounded-[10px] border border-line bg-surface overflow-hidden">
                <div className="shrink-0 flex items-center gap-2 px-3.5 py-2.5 border-b border-hairline">
                    <span className="flex gap-1.5" aria-hidden>
                        <span className="w-2.5 h-2.5 rounded-full bg-line" />
                        <span className="w-2.5 h-2.5 rounded-full bg-line" />
                        <span className="w-2.5 h-2.5 rounded-full bg-line" />
                    </span>
                    <span className="flex-1 text-center font-mono text-[11px] text-dim truncate">
                        {profile.handle}@{profile.site} — iversh — {path}
                    </span>
                    <span className="w-[38px]" aria-hidden />
                </div>

                <div
                    ref={scrollRef}
                    onMouseUp={focusInput}
                    className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3.5 py-3.5 font-mono text-[12.5px] leading-[1.75] cursor-text"
                >
                    {showBoot && (
                        <div className="flex flex-col gap-1 pb-3">
                            {bootParts.slice(0, boot).map((part, i) => (
                                <div key={i}>{part}</div>
                            ))}
                        </div>
                    )}

                    <div aria-live="polite" aria-atomic="false">
                        {blocks.map((block) => (
                            <div key={block.id} className="pb-3">
                                <Prompt path={block.path}>
                                    <span className="text-foreground break-all">
                                        {block.input}
                                    </span>
                                </Prompt>
                                {block.output && (
                                    <div className="pt-1.5">{block.output}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/*
                 * The prompt is pinned below the scrollback rather than living
                 * at the end of it — scrolling back through a long `projects`
                 * never takes the place you type away with it.
                 */}
                <div className="shrink-0 border-t border-hairline font-mono text-[12.5px] leading-[1.75]">
                    {menu && menu.matches.length > 1 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1 px-3.5 pt-2.5">
                            {menu.matches.map((match, i) => (
                                <span
                                    key={match}
                                    className={cn(
                                        "text-dim",
                                        i === menu.index && "text-accent"
                                    )}
                                >
                                    {match}
                                </span>
                            ))}
                        </div>
                    )}

                    {search && (
                        <div className="flex flex-col gap-0.5 px-3.5 pt-2.5">
                            {searchMatches.length ? (
                                searchMatches.map((match, i) => (
                                    <span
                                        key={match}
                                        className={cn(
                                            "text-dim",
                                            i === search.index && "text-accent"
                                        )}
                                    >
                                        {i === search.index ? "› " : "  "}
                                        {match}
                                    </span>
                                ))
                            ) : (
                                <span className="text-dim">no matching history</span>
                            )}
                        </div>
                    )}

                    <div className="px-3.5 py-2.5">
                        <Prompt
                            path={path}
                            label={
                                search
                                    ? `(reverse-i-search)\`${value}':`
                                    : undefined
                            }
                        >
                            <span className="relative flex-1 min-w-0">
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 whitespace-pre text-dim overflow-hidden"
                                >
                                    <span className="invisible">{value}</span>
                                    {!search && suggestion}
                                </span>
                                <input
                                    ref={inputRef}
                                    value={value}
                                    onChange={(event) => {
                                        setValue(event.target.value)
                                        setMenu(null)
                                        setCursor(-1)
                                    }}
                                    onKeyDown={onKeyDown}
                                    disabled={busy}
                                    autoFocus
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    aria-label="Terminal input — type help for the commands"
                                    className="relative w-full bg-transparent outline-none text-foreground caret-accent"
                                />
                            </span>
                        </Prompt>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto px-3.5 pb-2.5">
                        {QUICK.map((cmd) => (
                            <button
                                key={cmd}
                                type="button"
                                onClick={() => run(cmd)}
                                className="shrink-0 rounded-[5px] border border-line px-2 py-1 font-mono text-[11px] text-subtle hover:text-accent hover:border-accent transition-colors cursor-pointer"
                            >
                                {cmd}
                            </button>
                        ))}
                        <span className="ml-auto hidden sm:flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-faint">
                            <Key>tab</Key> completes
                        </span>
                    </div>
                </div>
            </div>
        </RunContext.Provider>
    )
}

function Prompt({
    path,
    label,
    children,
}: {
    path: string
    label?: string
    children: ReactNode
}) {
    return (
        <div className="flex items-baseline gap-1.5">
            {label ? (
                <span className="shrink-0 text-dim">{label}</span>
            ) : (
                <span className="shrink-0">
                    <span className="hidden sm:inline text-signal">
                        {profile.handle}@{profile.site}
                    </span>{" "}
                    <span className="text-accent">{path}</span>{" "}
                    <span className="text-dim">$</span>
                </span>
            )}
            {children}
        </div>
    )
}
