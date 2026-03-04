import { mplus1code } from "@/font/fonts"
import { Github } from "@/icons/github"
import { Linkedin } from "@/icons/linkedin"
import { X } from "@/icons/x"
import { Cv } from "@/icons/cv"
export function Network() {
    const networks = [
        {
            name: "cv.iverse.dev",
            url: "https://cv.iverse.dev",
            icon: <Cv />,
            color: " hover:text-fuchsia-500",
        },

        {
            name: "ivanmayta",
            url: "https://github.com/ivanmayta",
            icon: <Github />,
            color: " hover:text-amber-500",
        },
        {
            name: "ivanRdgo",
            url: "https://x.com/ivanRdgo",
            icon: <X />,
            color: "hover:text-lime-500",
        },
        {
            name: "ivanRdgo",
            url: "https://www.linkedin.com/in/ivanRdgo/",
            icon: <Linkedin />,
            color: "hover:text-sky-400",
        },
        {
            name: "iversedev",
            url: "https://github.com/iversedev",
            icon: <Github />,
            color: " hover:text-amber-500",
        },
        {
            name: "iversedev",
            url: "https://x.com/iversedev",
            icon: <X />,
            color: "hover:text-blue-500",
        },
    ]

    return (
        <section
            id="connect"
            className="group/network  flex flex-col py-4 gap-4"
        >
            <div className={`${mplus1code.className} flex items-center`}>
                <h2
                    className={` group-hover/network:text-[#9d4cfa] dark:text-zinc-400 text-zinc-600`}
                >
                    <span>/ Connect</span>
                </h2>
            </div>
            <ul className="flex items-center gap-5 justify-center flex-wrap">
                {networks.map((network, index) => (
                    <li
                        key={index}
                        className={`flex items-center text-sm ${network.color}`}
                    >
                        <a
                            href={network.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" flex items-center gap-1 hover:underline hover:underline-offset-2"
                        >
                            {network.icon}
                            {network.name}
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    )
}
