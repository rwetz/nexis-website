import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages (no Node server at runtime).
  output: "export",
  // GitHub Pages can't run the Next.js image optimizer.
  images: { unoptimized: true },
  // Emit /path/index.html so deep links work on static hosting.
  trailingSlash: true,
};

export default nextConfig;
