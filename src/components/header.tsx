"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navItems = [
    { label: "home", href: "/" },
    { label: "projects", href: "/projects" },
    { label: "posts", href: "/posts" },
    { label: "open source", href: "/open-source" },
    { label: "cli", href: "/cli" },
]

export function Header() {
    const pathname = usePathname()
    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href)

    return (
        <header className="flex items-center justify-between pt-9">
            <Link href="/" className="flex items-center gap-2.5 group/header">
                <span className="flex items-center justify-center w-[30px] h-[30px] rounded-[7px] bg-foreground">
                    <img
                        src="/logo.svg"
                        alt="iverse.dev"
                        className="w-[27px] h-[27px] dark:invert-0 invert group-hover/header:scale-110 transition-transform duration-300"
                    />
                </span>
                <span className="font-mono text-sm font-medium tracking-tight">
                    iverse.dev
                </span>
            </Link>

            <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 sm:gap-x-[22px]">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "font-mono text-[12.5px] text-muted hover:text-accent transition-colors",
                            isActive(item.href) && "text-accent"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    )
}
