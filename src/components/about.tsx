import { Section } from "./section"

export function About() {
    return (
        <Section id="about" label="about">
            <div className="flex flex-col gap-4 text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                <p>
                    Fullstack developer focused on the frontend, specialized in
                    high-performance React applications. I work in SCRUM teams
                    and reach into AI, business intelligence, algorithms and
                    data structures when a product needs it — plus mobile,
                    desktop and game development.
                </p>
                <p className="text-muted">
                    Full-stack ecosystems: TypeScript with Astro (SSG) and
                    React / Next.js (SSR, ISR), Node.js with Express, Python
                    with FastAPI.
                </p>
                <p className="text-muted">
                    Graduate of the{" "}
                    <a
                        href="https://www.ibo.org/programmes/diploma-programme/what-is-the-dp/"
                        className="text-foreground/85 border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        International Baccalaureate Diploma Programme
                    </a>
                    , and Frontend Developer with React through{" "}
                    <a
                        href="https://app.aluracursos.com/user/ivan-rodrigo-mayta/fullCertificate/ba09891c8eb9ec46e6989c4c5fccd2a6"
                        className="text-foreground/85 border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Oracle Next Education
                    </a>
                    .
                </p>
            </div>
        </Section>
    )
}
