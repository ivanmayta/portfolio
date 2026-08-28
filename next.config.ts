import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
}

// Plugins are named as strings: Turbopack can't take JS functions across the
// Rust boundary.
const withMDX = createMDX({
    options: {
        remarkPlugins: ["remark-gfm"],
        rehypePlugins: ["rehype-slug"],
    },
})

export default withMDX(nextConfig)
