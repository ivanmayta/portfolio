import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { NotesPreview } from "@/components/notes-preview"
import { Projects } from "@/components/projects"
import Contributions from "@/components/contributions"
import { Network } from "@/components/network"

export default async function Home() {
    return (
        <>
            <Hero />
            <About />
            <NotesPreview />
            <Projects />
            <Contributions />
            <Network />
        </>
    )
}
