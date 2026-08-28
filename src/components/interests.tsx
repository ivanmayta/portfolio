import { Section } from "./section"

/**
 * Placeholder seeded from the About copy — swap these for what you actually
 * want the site to say you're into.
 */
const interests = [
    "Artificial intelligence",
    "Business intelligence",
    "Algorithms & data structures",
    "Mobile development",
    "Desktop development",
    "Game development",
    "Import & logistics tooling",
    "Learning in public",
]

export function Interests() {
    return (
        <Section id="interests" label="interests">
            <p className="max-w-[520px] text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                Things I keep circling back to, in and out of work.
            </p>
            <ul className="flex flex-wrap gap-2 mt-5">
                {interests.map((interest) => (
                    <li
                        key={interest}
                        className="font-mono text-[11px] px-2.5 py-1.5 rounded-full border border-line text-muted"
                    >
                        {interest}
                    </li>
                ))}
            </ul>
        </Section>
    )
}
