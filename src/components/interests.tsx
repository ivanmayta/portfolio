import { Section } from "./section"
import { interests } from "@/data/interests"

export function Interests() {
    return (
        <Section id="interests" label="interests">
            <p className="max-w-[520px] text-[15.5px] leading-[1.68] text-foreground/85 text-pretty">
                Areas the work keeps returning to, inside client projects
                and outside them.
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
