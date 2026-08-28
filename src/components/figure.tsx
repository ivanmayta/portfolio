/**
 * Diagrams ship as light and dark .svg exports under public/diagrams; the pair
 * is swapped by theme so one figure reads correctly in both.
 */
export function Figure({
    src,
    alt,
    caption,
}: {
    /** Path without extension — `-dark.svg` is picked up for the dark theme. */
    src: string
    alt: string
    caption?: string
}) {
    return (
        <figure className="my-9">
            <div className="overflow-hidden rounded-lg border border-line">
                <img src={`${src}.svg`} alt={alt} className="w-full h-auto dark:hidden" />
                <img
                    src={`${src}-dark.svg`}
                    alt={alt}
                    className="w-full h-auto hidden dark:block"
                />
            </div>
            {caption && (
                <figcaption className="mt-3 font-mono text-[11px] leading-[1.6] text-subtle text-pretty">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}

export function Callout({
    label,
    children,
}: {
    label: string
    children: React.ReactNode
}) {
    return (
        <aside className="my-8 rounded-lg border border-line bg-surface px-5 py-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-subtle">
                {label}
            </p>
            <div className="mt-2.5 text-[15.5px] leading-[1.65] text-foreground/85 text-pretty [&>p+p]:mt-3">
                {children}
            </div>
        </aside>
    )
}
