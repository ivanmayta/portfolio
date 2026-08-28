export function Hero() {
    return (
        <section className="pt-[92px] pb-[76px]">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                Ivan Mayta — Perú
            </p>
            <h2 className="mt-7 font-serif text-[42px] sm:text-[56px] leading-[1.06] tracking-[-0.015em] text-pretty max-w-[620px]">
                Hi, I’m Ivan. I build for the web and{" "}
                <em className="text-accent">write down</em> what I learn doing
                it.
            </h2>
            <p className="mt-7 max-w-[500px] text-base leading-[1.62] text-muted text-pretty">
                This is where both live — the projects I’ve shipped, the notes
                from courses I’m working through, and whatever I’m curious
                about at the moment.
            </p>
            <div className="flex items-center gap-3.5 flex-wrap mt-10 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                <span>UTC−5</span>
                <span className="block w-px h-[11px] bg-line" />
                <span>Fullstack, mostly frontend</span>
                <span className="block w-px h-[11px] bg-line" />
                <span className="flex items-center gap-[7px] text-muted">
                    <span className="block w-1.5 h-1.5 rounded-full bg-signal" />
                    Open to work
                </span>
            </div>
        </section>
    )
}
