import { mplus1code } from "@/font/fonts"

export function About() {
    return (
        <section
            id="about"
            className={`group/about text-base text-pretty flex flex-col py-4 gap-4`}
        >
            <div className={`${mplus1code.className} flex items-center`}>
                <h2 className="group-hover/about:text-[#9d4cfa] dark:text-zinc-400 text-zinc-600">
                    / About
                </h2>
            </div>
            <div className="space-y-[0.5lh]">
                <p className="">
                    Fullstack Developer focused on frontend, specialized in
                    high-performance React applications. Experience in
                    collaborative work methodologies such as SCRUM. Knowledge in
                    artificial intelligence (AI), business intelligence (BI),
                    algorithms, data structures, mobile, desktop and video game
                    development.
                </p>
                <p className="">
                    I successfully completed the{" "}
                    <a
                        href="https://www.ibo.org/programmes/diploma-programme/what-is-the-dp/"
                        className="italic hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        International Baccalaureate Diploma Program
                    </a>
                    -technology and english skills.
                </p>
                <p className="">
                    {`Focused in full-stack ecosystems: TypeScript (Astro/SSG +
                React/Next.js/SSR/ISR), Node.js (Express), Python (FastAPI) –
                crafting performant web experiences.`}
                </p>
                <p className="">
                    Frontend Developer with React by{" "}
                    <a
                        href="https://app.aluracursos.com/user/ivan-rodrigo-mayta/fullCertificate/ba09891c8eb9ec46e6989c4c5fccd2a6"
                        className="italic hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Oracle Next Education.
                    </a>
                </p>
            </div>
        </section>
    )
}
