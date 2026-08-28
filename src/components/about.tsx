import { Section } from "./section"

export function About() {
    return (
        <Section id="about" label="about">
            <div className="flex flex-col gap-4 text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                <p>
                    I’m a fullstack developer from Perú, most at home in the
                    frontend and in React applications that have to stay fast
                    under real data.
                </p>
                <p className="text-muted">
                    Day to day that means TypeScript — Astro when it can be
                    static, Next.js when it has to render on the server — with
                    Node.js or FastAPI behind it. I’ve also spent time in
                    artificial intelligence, business intelligence, algorithms
                    and data structures, and built for mobile, desktop and
                    games. I work in SCRUM teams.
                </p>
                <p className="text-muted">
                    I came out of the{" "}
                    <a
                        href="https://www.ibo.org/programmes/diploma-programme/what-is-the-dp/"
                        className="text-foreground/85 border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        International Baccalaureate Diploma Programme
                    </a>
                    , and did the React frontend track at{" "}
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
