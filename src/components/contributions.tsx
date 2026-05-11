import { mplus1code } from "@/font/fonts"
import { Jsconf } from "@/icons/jsconf"
import { Github } from "@/icons/github"
import { CornerDownRight } from "lucide-react"

const contributions = [
    {
        name: "jsconf.es",
        url: "https://jsconf.es",
        github: "https://github.com/midudev/jsconf.es/pull/32",
        icon: <Jsconf />,
        description: "🎊 Web development event with javascript, organized by Midudev.",
        contribution: "Improved web design based on the Figma.",
    },
    {
        name: "crafter-station",
        url: "https://github.com/crafter-station",
        github: "https://github.com/crafter-station",
        icon: null,
        description: "🛠️ Developer community building open source projects.",
        contribution: "Favicon redesign and responsive layout improvements across multiple repositories.",
    },
    {
        name: "coollabsio/coolify.io",
        url: "https://coolify.io",
        github: "https://github.com/coollabsio/coolify.io/pull/16",
        icon: null,
        description: "☁️ Open-source self-hosting and deployment platform.",
        contribution: "Fixed sponsor section layout and mouse interaction.",
    },
]

export default function Contributions() {
    return (
        <section className="group/contributions flex flex-col py-4 gap-4">
            <h2
                className={` group-hover/contributions:text-[#9d4cfa] dark:text-zinc-400 text-zinc-600 ${mplus1code.className}`}
            >
                / Contributions
            </h2>
            <div>
                <ul className="flex flex-col gap-3">
                    {contributions.map((item) => (
                        <li key={item.name}>
                            <article>
                                <header className="flex gap-4 items-center">
                                    <a
                                        className="flex gap-2 font-medium group hover:underline underline-offset-4 items-center text-base"
                                        href={item.url}
                                        target="_blank"
                                    >
                                        <CornerDownRight className="w-4 opacity-50 duration-200 group-hover:translate-x-[1.5px] group-hover:opacity-100" />
                                        {item.icon}
                                        <h3>{item.name}</h3>
                                    </a>
                                    <a
                                        className="hover:text-white text-zinc-400"
                                        target="_blank"
                                        href={item.github}
                                        aria-label="github pull request"
                                    >
                                        <Github />
                                    </a>
                                </header>

                                <p className="font-medium">{item.description}</p>

                                <footer>
                                    <span className="text-zinc-400 text-sm">
                                        {item.contribution}
                                    </span>
                                </footer>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
