import type { Route } from "@/types/types"

/**
 * A route is a course being worked through; a topic is one of its modules and
 * a lesson is a single class — one page each. Lessons flip from "planned" to
 * "written" once their note exists.
 */
export const routes: Route[] = [
    {
        slug: "react-performance",
        name: "React Performance",
        teacher: "Steve Kinney",
        courseUrl: "https://frontendmasters.com/courses/react-performance/",
        status: "in-progress",
        summary:
            "Where React actually spends its time, and which of the classic fixes still matter once the compiler ships.",
        total: 12,
        topics: [
            {
                id: "rendering",
                name: "Rendering & reconciliation",
                summary:
                    "What triggers a render, and what React does with the tree once it starts.",
                lessons: [
                    { slug: "how-react-decides-to-rerender", title: "How React decides to re-render", status: "planned" },
                    { slug: "reconciliation-and-keys", title: "Reconciliation and the cost of keys", status: "planned" },
                    { slug: "batching-and-the-two-phases", title: "Batching, and the two phases", status: "planned" },
                    { slug: "finding-wasted-renders", title: "Finding wasted renders", status: "planned" },
                ],
            },
            {
                id: "memoization",
                name: "Memoization",
                summary:
                    "Caching work, and the referential-equality traps that make it useless.",
                lessons: [
                    { slug: "usememo-vs-usecallback", title: "useMemo vs. useCallback", status: "planned" },
                    { slug: "react-memo-referential-equality", title: "React.memo and referential equality", status: "planned" },
                    { slug: "what-the-react-compiler-retires", title: "What the React Compiler retires", status: "planned" },
                ],
            },
            {
                id: "concurrent",
                name: "Concurrent React",
                summary:
                    "Letting the browser interrupt React so typing never waits on a list.",
                lessons: [
                    { slug: "usetransition", title: "useTransition and stale UI", status: "planned" },
                    { slug: "usedeferredvalue", title: "useDeferredValue", status: "planned" },
                    { slug: "suspense-as-a-perf-tool", title: "Suspense boundaries as a perf tool", status: "planned" },
                ],
            },
            {
                id: "measuring",
                name: "Measuring",
                summary:
                    "Numbers before opinions — profiling a render instead of guessing at it.",
                lessons: [
                    { slug: "the-profiler-api", title: "The Profiler API", status: "planned" },
                    { slug: "reading-a-flamegraph", title: "Reading a React DevTools flamegraph", status: "planned" },
                ],
            },
        ],
    },
    {
        slug: "typescript",
        name: "TypeScript",
        teacher: "Mike North",
        courseUrl:
            "https://frontendmasters.com/courses/typescript-v4/",
        status: "queued",
        summary:
            "From inference to declaration files — the parts I kept guessing at instead of knowing.",
        total: 18,
        topics: [
            {
                id: "types-and-inference",
                name: "Types & inference",
                summary: "What the compiler works out on its own, and when to stop helping it.",
                lessons: [
                    { slug: "inference-and-widening", title: "Inference and widening", status: "planned" },
                    { slug: "type-vs-interface", title: "type vs. interface", status: "planned" },
                ],
            },
            {
                id: "narrowing",
                name: "Narrowing",
                summary: "Getting from a union to the one member you actually have.",
                lessons: [
                    { slug: "satisfies", title: "satisfies, and when a type is too wide", status: "planned" },
                    { slug: "type-guards", title: "Type guards and predicates", status: "planned" },
                ],
            },
            {
                id: "generics",
                name: "Generics",
                summary: "Parameterizing types without making them unreadable.",
                lessons: [
                    { slug: "generic-constraints", title: "Constraints and defaults", status: "planned" },
                    { slug: "conditional-types", title: "Conditional types", status: "planned" },
                ],
            },
        ],
    },
    {
        slug: "web-performance",
        name: "Web Performance",
        teacher: "Todd Gardner",
        courseUrl:
            "https://frontendmasters.com/courses/web-perf/",
        status: "queued",
        summary:
            "Core Web Vitals as a budget, not a score — and what actually moves them on a real network.",
        total: 14,
        topics: [
            {
                id: "core-web-vitals",
                name: "Core Web Vitals",
                summary: "LCP, INP and CLS — what each one is really measuring.",
                lessons: [
                    { slug: "lcp", title: "LCP and the critical path", status: "planned" },
                    { slug: "inp", title: "INP and long tasks", status: "planned" },
                ],
            },
            {
                id: "loading",
                name: "Loading & bundling",
                summary: "Shipping less JavaScript, and shipping it in the right order.",
                lessons: [
                    { slug: "code-splitting", title: "Code splitting that pays off", status: "planned" },
                    { slug: "preload-vs-prefetch", title: "preload vs. prefetch", status: "planned" },
                ],
            },
        ],
    },
]

export const routeBySlug = (slug: string) =>
    routes.find((route) => route.slug === slug)

export const lessonCounts = (route: Route) => {
    const lessons = route.topics.flatMap((topic) => topic.lessons)
    return {
        written: lessons.filter((l) => l.status === "written").length,
        listed: lessons.length,
    }
}

export const recentLessons = (limit: number) =>
    routes
        .flatMap((route) =>
            route.topics.flatMap((topic) =>
                topic.lessons
                    .filter((lesson) => lesson.status === "written")
                    .map((lesson) => ({ lesson, topic, route }))
            )
        )
        .sort((a, b) => (b.lesson.date ?? "").localeCompare(a.lesson.date ?? ""))
        .slice(0, limit)
