import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Latin subsets of Inter and JetBrains Mono, weights 400-600.
// Original sources and OFL licenses live beside the subsets.
const inter = localFont({
  src: "../assets/fonts/nexis-sans.woff2",
  variable: "--font-inter",
  preload: false,
  weight: "400 600",
  display: "optional",
});
const jetbrains = localFont({
  src: "../assets/fonts/nexis-mono.woff2",
  variable: "--font-jetbrains",
  weight: "400 600",
  display: "optional",
  preload: false,
});
export const metadata: Metadata = {
  title: "Nexis",
  description: "Nexis is an open-source, AI-native terminal and developer environment with local ML, repository intelligence, SVG tools, and no built-in usage analytics.",
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <head><link rel="preload" as="image" type="image/avif" media="(max-width: 767px)" href="/nexis/editor-mobile.avif" fetchPriority="high" /><link rel="preload" media="(min-width: 768px)" as="image" type="image/avif" href="/nexis/editor-800.avif" imageSrcSet="/nexis/editor-480.avif 480w, /nexis/editor-800.avif 800w, /nexis/editor-1200.avif 1200w" imageSizes="(min-width: 1024px) 760px, (min-width: 768px) 90vw, 100vw" fetchPriority="high" /><meta name="referrer" content="strict-origin-when-cross-origin" /></head>
      <body className="min-h-full">{children}<script src="/site.js" defer /></body>
    </html>
  );
}
