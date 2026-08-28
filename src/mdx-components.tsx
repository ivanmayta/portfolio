import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import { Callout, Figure } from "@/components/figure"

const components: MDXComponents = {
    h2: (props) => (
        <h2
            className="mt-11 mb-4 font-serif text-[27px] leading-[1.2] tracking-[-0.01em] scroll-mt-24"
            {...props}
        />
    ),
    h3: (props) => (
        <h3
            className="mt-9 mb-3 text-lg font-medium tracking-[-0.01em] scroll-mt-24"
            {...props}
        />
    ),
    p: (props) => (
        <p
            className="my-5 text-[16.5px] leading-[1.75] text-foreground/80 text-pretty"
            {...props}
        />
    ),
    ul: (props) => (
        <ul
            className="my-5 flex flex-col gap-2.5 list-disc pl-5 text-[16.5px] leading-[1.7] text-foreground/80 marker:text-faint"
            {...props}
        />
    ),
    ol: (props) => (
        <ol
            className="my-5 flex flex-col gap-2.5 list-decimal pl-5 text-[16.5px] leading-[1.7] text-foreground/80 marker:text-dim marker:font-mono marker:text-[13px]"
            {...props}
        />
    ),
    li: (props) => <li className="pl-1 text-pretty" {...props} />,
    a: ({ href = "", ...props }) =>
        href.startsWith("/") ? (
            <Link
                href={href}
                className="border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                {...props}
            />
        ) : (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-faint pb-px hover:text-accent hover:border-accent transition-colors"
                {...props}
            />
        ),
    strong: (props) => (
        <strong className="font-medium text-foreground" {...props} />
    ),
    code: (props) => (
        <code
            className="font-mono text-[0.88em] px-1.5 py-0.5 rounded border border-line bg-surface text-foreground/90"
            {...props}
        />
    ),
    pre: (props) => (
        <pre
            className="my-7 p-5 overflow-x-auto rounded-lg border border-line bg-surface font-mono text-[13px] leading-[1.75] text-foreground/85 [&_code]:p-0 [&_code]:border-0 [&_code]:bg-transparent [&_code]:text-[13px]"
            {...props}
        />
    ),
    blockquote: (props) => (
        <blockquote
            className="my-7 pl-5 border-l border-line text-[16px] leading-[1.7] text-muted italic"
            {...props}
        />
    ),
    hr: () => <hr className="my-10 border-hairline" />,
    table: (props) => (
        <div className="my-7 overflow-x-auto">
            <table className="w-full text-[14.5px] border-collapse" {...props} />
        </div>
    ),
    th: (props) => (
        <th
            className="py-2.5 pr-5 text-left font-mono text-[10.5px] uppercase tracking-[0.08em] text-subtle border-b border-line"
            {...props}
        />
    ),
    td: (props) => (
        <td
            className="py-2.5 pr-5 align-top border-b border-hairline text-foreground/80"
            {...props}
        />
    ),
    Figure,
    Callout,
}

export function useMDXComponents(): MDXComponents {
    return components
}
