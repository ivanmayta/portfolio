import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { instrumentSerif, jetbrainsMono, publicSans } from "@/font/fonts"

export const metadata: Metadata = {
    title: "iverse.dev",
    description:
        "Software Developer | Modern technologies | Building modern web experiences",
    openGraph: {
        title: "iverse.dev | Software Developer",
        description:
            "Software Developer | Modern technologies | Building modern web experiences. Let's build something amazing.",
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
        title: "iverse.dev | Software Developer",
        description:
            "Software Developer | Modern technologies | Building modern web experiences. Let's connect!",
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
            className={`${instrumentSerif.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
        >
            <body className="antialiased flex flex-col max-w-[760px] mx-auto min-h-screen px-6">
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
