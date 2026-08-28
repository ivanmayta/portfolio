import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Interests } from "@/components/interests"
import { PostsPreview } from "@/components/posts-preview"
import { Projects } from "@/components/projects"
import Contributions from "@/components/contributions"
import { Network } from "@/components/network"

export default async function Home() {
    return (
        <>
            <Hero />
            <About />
            <Interests />
            <PostsPreview />
            <Projects />
            <Contributions />
            <Network />
        </>
    )
}
