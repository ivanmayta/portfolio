import type { ReactNode } from "react"

/**
 * The CLI runs in the browser, so it never touches the filesystem helpers in
 * `lib/content`. `app/cli/page.tsx` reads everything on the server and hands
 * down this plain, serialisable snapshot instead.
 */

export type CliProject = {
    name: string
    slug: string
    type: "web" | "mobile" | "bi" | "videogame"
    isActive: boolean
    description: string
    stack: string[]
    url: string
    github: string
    /** Route on this site. */
    href: string
}

export type CliPost = {
    slug: string
    title: string
    summary: string
    date: string
    minutes: number
    course: string
    courseName: string
    topic: string
    href: string
}

export type CliLesson = {
    slug: string
    title: string
    published: boolean
}

export type CliCourse = {
    slug: string
    name: string
    teacher: string
    courseUrl: string
    summary: string
    published: number
    listed: number
    href: string
    topics: {
        id: string
        name: string
        summary?: string
        lessons: CliLesson[]
    }[]
}

export type CliData = {
    projects: CliProject[]
    posts: CliPost[]
    courses: CliCourse[]
}

/** What `cat` prints for a given file in the virtual home directory. */
export type Doc =
    | { kind: "about" }
    | { kind: "stack" }
    | { kind: "interests" }
    | { kind: "contact" }
    | { kind: "social" }
    | { kind: "now" }
    | { kind: "secret" }
    | { kind: "project"; slug: string }
    | { kind: "post"; course: string; slug: string }
    | { kind: "course"; slug: string }
    | { kind: "contribution"; name: string }

export type FsFile = { type: "file"; name: string; doc: Doc }
export type FsDir = { type: "dir"; name: string; children: FsNode[] }
export type FsNode = FsFile | FsDir

export type Theme = "dark" | "light" | "system"

/** Everything a command is allowed to do to the world outside its output. */
export type Host = {
    data: CliData
    /** Current directory, as segments below `~`. */
    cwd: string[]
    setCwd(segments: string[]): void
    root: FsDir
    /** Open an external URL in a new tab. */
    openUrl(url: string): void
    /** Client-side navigation inside the site. */
    navigate(path: string): void
    clear(): void
    history(): string[]
    clearHistory(): void
    theme(): Theme
    setTheme(theme: Theme): void
    /** Run another command as if it had been typed. */
    run(input: string): void
    bootedAt: number
}

export type Command = {
    name: string
    aliases?: string[]
    usage?: string
    summary: string
    /** Longer text for `man <command>`. */
    details?: string
    hidden?: boolean
    /** Completions for the argument being typed, or "path" for the file tree. */
    complete?: string[] | "path"
    run(args: string[], host: Host): ReactNode | Promise<ReactNode>
}
