/**
 * Identity, in one place. The site renders most of this inside prose (see
 * `about.tsx`, `hero.tsx`); the CLI needs the same facts as plain strings, so
 * they live here and both read from it.
 */
export const profile = {
    name: "Ivan Mayta",
    handle: "ivan",
    site: "iverse.dev",
    role: "Web products, mostly frontend",
    location: "Perú",
    timezone: "UTC−5",
    email: "ivan.rodrigo.dev@gmail.com",
    resume: "https://cv.iverse.dev",
    available: true,
    tagline:
        "Web products for import logistics, ad reporting, and the software around them.",
    /** The About section as plain text — same claims, no inline links. */
    bio: [
        "Web products for import logistics, ad reporting, and the internal software around them — built and maintained from Perú.",
        "TypeScript throughout: Astro when a site can be static, Next.js when it has to render on the server, Node.js or FastAPI behind it.",
        "Trained through the IB Diploma Programme and Oracle Next Education.",
    ],
    education: [
        {
            name: "International Baccalaureate Diploma Programme",
            url: "https://www.ibo.org/programmes/diploma-programme/what-is-the-dp/",
        },
        {
            name: "Oracle Next Education — React frontend track",
            url: "https://app.aluracursos.com/user/ivan-rodrigo-mayta/fullCertificate/ba09891c8eb9ec46e6989c4c5fccd2a6",
        },
    ],
}
