import { LucideIcon } from "lucide-react"

export type Project = {
    name: string
    slug: string
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

export type NoteStatus = "written" | "planned"

export type Lesson = {
    slug: string
    title: string
    status: NoteStatus
    date?: string
}

export type Topic = {
    id: string
    name: string
    summary: string
    lessons: Lesson[]
}

export type Route = {
    slug: string
    name: string
    teacher: string
    courseUrl: string
    status: "in-progress" | "queued" | "finished"
    summary: string
    total: number
    topics: Topic[]
}
