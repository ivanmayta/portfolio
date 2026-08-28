import { Section } from "./section"

const networks = [
    { handle: "cv.iverse.dev", url: "https://cv.iverse.dev", hover: "hover:text-fuchsia-500" },
    { handle: "github.com/ivanmayta", url: "https://github.com/ivanmayta", hover: "hover:text-amber-500" },
    { handle: "x.com/ivanRdgo", url: "https://x.com/ivanRdgo", hover: "hover:text-lime-500" },
    { handle: "linkedin.com/in/ivanRdgo", url: "https://www.linkedin.com/in/ivanRdgo/", hover: "hover:text-sky-400" },
    { handle: "github.com/iversedev", url: "https://github.com/iversedev", hover: "hover:text-amber-500" },
    { handle: "x.com/iversedev", url: "https://x.com/iversedev", hover: "hover:text-blue-500" },
]

export function Network() {
    return (
        <Section id="connect" label="connect">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {networks.map((network) => (
                    <li key={network.url}>
                        <a
                            href={network.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between font-mono text-[13px] text-muted transition-colors ${network.hover}`}
                        >
                            <span>{network.handle}</span>
                            <span className="text-faint">↗</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Section>
    )
}
