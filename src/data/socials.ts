export type Social = {
    /** Short name used as a CLI target: `open github`. */
    name: string
    handle: string
    url: string
    /** Hover colour for the /connect list on the site. */
    hover: string
}

export const socials: Social[] = [
    { name: "cv", handle: "cv.iverse.dev", url: "https://cv.iverse.dev", hover: "hover:text-fuchsia-500" },
    { name: "github", handle: "github.com/ivanmayta", url: "https://github.com/ivanmayta", hover: "hover:text-amber-500" },
    { name: "x", handle: "x.com/ivanRdgo", url: "https://x.com/ivanRdgo", hover: "hover:text-lime-500" },
    { name: "linkedin", handle: "linkedin.com/in/ivanRdgo", url: "https://www.linkedin.com/in/ivanRdgo/", hover: "hover:text-sky-400" },
    { name: "iversedev", handle: "github.com/iversedev", url: "https://github.com/iversedev", hover: "hover:text-amber-500" },
    { name: "x-iverse", handle: "x.com/iversedev", url: "https://x.com/iversedev", hover: "hover:text-blue-500" },
]
