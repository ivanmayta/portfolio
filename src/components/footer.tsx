export function Footer() {
    return (
        <footer className="flex items-center justify-between py-8 border-t border-hairline">
            <a
                className="font-mono text-[11.5px] text-dim hover:text-accent transition-colors"
                href="https://github.com/iversedev"
                target="_blank"
                rel="noopener noreferrer"
            >
                built with Next.js · hosted on Vercel
            </a>
            <span className="font-mono text-[11.5px] text-faint">
                © {new Date().getFullYear()} iverse.dev
            </span>
        </footer>
    )
}
