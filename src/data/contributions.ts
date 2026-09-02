export type Contribution = {
    name: string
    url: string
    github: string
    description: string
    contribution: string
}

export const contributions: Contribution[] = [
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
