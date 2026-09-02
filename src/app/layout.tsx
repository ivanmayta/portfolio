import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { instrumentSerif, jetbrainsMono, publicSans } from "@/font/fonts"

export const metadata: Metadata = {
    title: "iverse.dev",
    description:
        "Web products for import logistics, ad reporting, and the internal software around them.",
    openGraph: {
        title: "iverse.dev",
        description:
            "Web products for import logistics, ad reporting, and the internal software around them. Built and maintained from Perú.",
        url: "https://iverse.dev",
        siteName: "iverse.dev",
        images: [
            {
                url: "https://iverse.dev/openg.webp",
                width: 1200,
                height: 630,
                alt: "iverse.dev - Developer Website",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@iversedev",
        title: "iverse.dev",
        description:
            "Web products for import logistics, ad reporting, and the internal software around them.",
        images: ["https://iverse.dev/openg.webp"],
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${instrumentSerif.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
        >
            <body className="antialiased flex flex-col max-w-[760px] mx-auto min-h-screen px-6">
                {/* Applies the theme the /cli `theme` command stored, before paint. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`,
                    }}
                />
                <Header />
                <main className="flex flex-col flex-1">{children}</main>
                <Footer />
                <img
                    src="/logo.svg"
                    alt=""
                    aria-hidden="true"
                    className="fixed inset-0 w-screen h-screen object-contain opacity-[0.035] dark:opacity-[0.03] dark:invert -z-50 pointer-events-none"
                />
            </body>
        </html>
    )
}
