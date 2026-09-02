import { Signal, Stats } from "@/components/page-header"
import { About } from "@/components/about"
import { Interests } from "@/components/interests"
import { PostsPreview } from "@/components/posts-preview"
import { Projects } from "@/components/projects"
import { Network } from "@/components/network"
import { profile } from "@/data/profile"

export default async function Home() {
    return (
        <>
            {/*
             * No page header here — the home page opens on the work. Just the
             * standing facts, and the heading the other pages get from
             * `PageHeader` kept for the document outline.
             */}
            <section className="pt-14 pb-1">
                <h1 className="sr-only">{profile.site}</h1>
                <Stats
                    items={[
                        profile.location,
                        profile.timezone,
                        profile.available ? (
                            <Signal key="status">Taking on work</Signal>
                        ) : (
                            "Heads down"
                        ),
                    ]}
                />
            </section>
            <About className="border-t-0" />
            <Interests />
            <PostsPreview />
            <Projects />
            <Network />
        </>
    )
}
