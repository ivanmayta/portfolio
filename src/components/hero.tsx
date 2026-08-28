export function Hero() {
    return (
        <section className="pt-[92px] pb-[76px]">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                Ivan Mayta — Fullstack developer
            </p>
            <h2 className="mt-7 font-serif text-[42px] sm:text-[58px] leading-[1.04] tracking-[-0.015em] text-pretty max-w-[640px]">
                I build web interfaces that stay fast{" "}
                <em className="text-accent">after</em> the demo.
            </h2>
            <p className="mt-7 max-w-[500px] text-base leading-[1.62] text-muted text-pretty">
                React and Next.js applications for import logistics, ad
                reporting and B2B catalogs — shipped end to end, from the query
                to the paint.
            </p>
            <div className="flex items-center gap-3.5 flex-wrap mt-10 font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">
                <span>Perú · UTC−5</span>
                <span className="block w-px h-[11px] bg-line" />
                <span className="flex items-center gap-[7px] text-muted">
                    <span className="block w-1.5 h-1.5 rounded-full bg-signal" />
                    Open to work
                </span>
                <span className="block w-px h-[11px] bg-line" />
                <span>TS · React · Next · Python</span>
            </div>
        </section>
    )
}
