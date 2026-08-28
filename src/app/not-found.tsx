import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-32 text-center">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-subtle">
                404
            </p>
            <h2 className="font-serif text-[36px] leading-[1.08] tracking-[-0.015em]">
                Nothing here.
            </h2>
            <p className="max-w-[380px] text-[15.5px] leading-[1.62] text-muted text-pretty">
                This page doesn&apos;t exist — or it did, and the link outlived
                it.
            </p>
            <Link
                href="/"
                className="font-mono text-[11.5px] text-subtle hover:text-accent transition-colors"
            >
                ← back home
            </Link>
        </div>
    )
}
