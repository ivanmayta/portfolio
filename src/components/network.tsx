import { Section } from "./section"
import { socials } from "@/data/socials"

export function Network() {
    return (
        <Section id="connect" label="connect">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {socials.map((network) => (
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
