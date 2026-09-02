import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { IndexHead, IndexRow } from "@/components/index-table"
import { contributions } from "@/data/contributions"

export const metadata: Metadata = {
    title: "Open source | iverse.dev",
    description:
        "Patches and design fixes sent to projects built by other people.",
}

/** project · what it is · contribution · pr */
const COLS =
    "grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)_minmax(0,1fr)_32px]"

export default function OpenSourcePage() {
    return (
        <>
            <PageHeader
                label="open source"
                title="Open source"
                stats={[
                    `${contributions.length} projects`,
                    `${contributions.length} merged`,
                ]}
            />

            <div className="pb-14">
                <IndexHead className={COLS}>
                    <span>project</span>
                    <span>what it is</span>
                    <span>contribution</span>
                    <span />
                </IndexHead>

                {contributions.map((item) => (
                    <IndexRow key={item.name} className={COLS}>
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-start-1 row-start-1 font-mono text-[13px] whitespace-nowrap hover:text-accent transition-colors"
                        >
                            {item.name}
                            <span className="inline-block ml-1 text-faint transition-transform duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-accent">
                                ↗
                            </span>
                        </a>

                        <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Pull request on ${item.name}`}
                            className="col-start-2 row-start-1 sm:col-start-4 justify-self-end font-mono text-[10px] uppercase tracking-[0.08em] text-faint hover:text-accent transition-colors"
                        >
                            pr
                        </a>

                        <p className="col-start-1 col-span-2 row-start-2 sm:col-start-2 sm:col-span-1 sm:row-start-1 text-[14px] leading-[1.55] text-foreground/85 text-pretty">
                            {item.description}
                        </p>

                        <p className="col-start-1 col-span-2 row-start-3 sm:col-start-3 sm:col-span-1 sm:row-start-1 text-[13px] leading-[1.5] text-subtle text-pretty">
                            {item.contribution}
                        </p>
                    </IndexRow>
                ))}
            </div>
        </>
    )
}
