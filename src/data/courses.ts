import type { Course } from "@/types/types"

/**
 * A course is something being worked through; a topic is one of its sections
 * and a lesson is a single class. Each lesson is one post at
 * `src/content/<course>/<lesson>.mdx` — a lesson with no file yet simply reads
 * as pending, so this file is the syllabus and nothing else.
 */
export const courses: Course[] = [
    {
        slug: "fullstack-v3",
        name: "Complete Intro to Full Stack",
        teacher: "Jem Young",
        courseUrl: "https://frontendmasters.com/courses/fullstack-v3/",
        summary:
            "Everything under the app: the terminal, a real server, the network it sits on, and the pieces you normally let a platform hide.",
        topics: [
            {
                id: "command-line",
                name: "The command line",
                summary:
                    "Talking to the operating system directly — the terminal, the shell behind it, and the handful of commands that carry most of the work.",
                lessons: [
                    {
                        slug: "terminal-and-the-commands-that-matter",
                        title: "The terminal, and the commands that matter",
                    },
                ],
            },
            {
                id: "vim",
                name: "Vim",
                summary:
                    "Editing files on a machine that has no editor but this one.",
                lessons: [{ slug: "editing-files-with-vim", title: "Editing files with Vim" }],
            },
            {
                id: "shells",
                name: "Shells",
                summary:
                    "What the terminal is actually running, and how it talks to the computer.",
                lessons: [{ slug: "bash-zsh-and-the-shell", title: "bash, zsh, and what a shell does" }],
            },
        ],
    },
]

export const courseBySlug = (slug: string) =>
    courses.find((course) => course.slug === slug)

export const listedLessons = (course: Course) =>
    course.topics.flatMap((topic) => topic.lessons)
