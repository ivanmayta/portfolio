import { LucideIcon } from "lucide-react"

export type Project = {
    name: string
    slug: string
    /** Year it shipped — groups the index. Undated projects sort last. */
    year?: number
    type: "web" | "mobile" | "bi" | "videogame"
    isActive: boolean
    description: string
    stack: Highlight[] | string[]
    url: string
    github: string
    images: string[]
    icon: string
    highlights: Highlight[]
}

type Highlight = {
    name: string
    icon: LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export type Lesson = {
    slug: string
    title: string
    /** Course videos this post is written from — the scope it may cover. */
    videos: string[]
}

export type Topic = {
    id: string
    name: string
    /** Written once the topic has been worked through. */
    summary?: string
    lessons: Lesson[]
}

export type Course = {
    slug: string
    name: string
    teacher: string
    courseUrl: string
    summary: string
    topics: Topic[]
}

/** Frontmatter of a post, exported as `meta` from its .mdx file. */
export type PostMeta = {
    title: string
    summary: string
    date: string
    minutes: number
}
