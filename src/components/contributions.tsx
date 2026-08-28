import { Section } from "./section"

const contributions = [
    {
        name: "jsconf.es",
        url: "https://jsconf.es",
        github: "https://github.com/midudev/jsconf.es/pull/32",
        description:
            "Web development event for the JavaScript community, organized by Midudev.",
        contribution: "Improved the web design against the Figma source.",
    },
    {
        name: "crafter-station",
        url: "https://github.com/crafter-station",
        github: "https://github.com/crafter-station",
        description: "Developer community building open source projects.",
        contribution:
            "Favicon redesign and responsive layout fixes across several repositories.",
    },
    {
        name: "coolify.io",
        url: "https://coolify.io",
        github: "https://github.com/coollabsio/coolify.io/pull/16",
        description: "Open-source self-hosting and deployment platform.",
        contribution:
            "Fixed the sponsor section layout and its mouse interaction.",
    },
]

export default function Contributions() {
    return (
        <Section label="contributions">
            <ul className="flex flex-col">
                {contributions.map((item, index) => (
                    <li
                        key={item.name}
                        className={`group/row grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)] gap-2 sm:gap-6 py-5 first:pt-0 last:pb-0 ${
                            index > 0 ? "border-t border-hairline" : ""
                        }`}
                    >
                        <div className="flex items-baseline gap-3 whitespace-nowrap">
                            <a
                                className="font-mono text-[13px] whitespace-nowrap hover:text-accent transition-colors"
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.name}{" "}
                                <span className="inline-block text-faint transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-accent">
                                    ↗
                                </span>
                            </a>
                            <a
                                className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint hover:text-accent transition-colors"
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                pr
                            </a>
                        </div>
                        <div>
                            <h3 className="text-[14.5px] leading-[1.55] text-foreground/85 text-pretty">
                                {item.description}
                            </h3>
                            <p className="mt-1.5 text-[13px] leading-[1.5] text-subtle text-pretty">
                                {item.contribution}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </Section>
    )
}
