import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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
        description: "Software Developer | Modern technologies | Building modern web experiences. Let's connect!",
        images: ["https://iverse.dev/openg.webp"],
    },
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className="antialiased flex flex-col max-w-2xl mx-auto  min-h-screen px-4 sm:px-0">
                <Header />
                <main className="flex flex-col flex-1 ">{children}</main>
                <Footer />
                <img
                    src="/logo.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute top-0 left-0 w-screen h-screen opacity-25 -z-50 brightness-10 pointer-events-none"
                />
            </body>
        </html>
    )
}
