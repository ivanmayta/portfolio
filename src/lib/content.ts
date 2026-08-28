import fs from "node:fs"
import path from "node:path"
import { courses } from "@/data/courses"
import type { Course, Lesson, PostMeta, Topic } from "@/types/types"

const CONTENT_DIR = path.join(process.cwd(), "src/content")

/** A lesson is published once its .mdx exists — no status flag to keep in sync. */
export function isPublished(course: string, lesson: string) {
    return fs.existsSync(path.join(CONTENT_DIR, course, `${lesson}.mdx`))
}

export async function loadPost(course: string, lesson: string) {
    if (!isPublished(course, lesson)) return null
    const { default: Body, meta } = await import(`../content/${course}/${lesson}.mdx`)
    return { Body, meta: meta as PostMeta }
}

export type PublishedPost = {
    course: Course
    topic: Topic
    lesson: Lesson
    meta: PostMeta
}

/** Every published post, newest first. */
export async function publishedPosts(): Promise<PublishedPost[]> {
    const posts: PublishedPost[] = []
    for (const course of courses) {
        for (const topic of course.topics) {
            for (const lesson of topic.lessons) {
                const post = await loadPost(course.slug, lesson.slug)
                if (post) posts.push({ course, topic, lesson, meta: post.meta })
            }
        }
    }
    return posts.sort((a, b) => b.meta.date.localeCompare(a.meta.date))
}

export function courseProgress(course: Course) {
    const lessons = course.topics.flatMap((topic) => topic.lessons)
    return {
        published: lessons.filter((lesson) =>
            isPublished(course.slug, lesson.slug)
        ).length,
        listed: lessons.length,
    }
}
