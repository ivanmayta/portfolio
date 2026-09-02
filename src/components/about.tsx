import { Section } from "./section"

export function About({ className }: { className?: string }) {
    return (
        <Section id="about" label="about" className={className}>
            <div className="flex flex-col gap-3.5 max-w-[600px] text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                <p>
                    Web products for import logistics, ad reporting, and the
                    internal software around them — built and maintained from
                    Perú.
                </p>
                <p className="text-muted">
                    TypeScript throughout: Astro when a site can be static,
                    Next.js when it has to render on the server, Node.js or
                    FastAPI behind it.
                </p>
                <p className="text-muted">
                    Trained through the{" "}
                    <a
                        href="https://www.ibo.org/programmes/diploma-programme/what-is-the-dp/"
                        className="text-foreground/85 border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        IB Diploma Programme
                    </a>{" "}
                    and{" "}
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
