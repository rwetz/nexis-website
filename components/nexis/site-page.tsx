import Link from "next/link";

export function SitePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="border-b border-hairline bg-canvas px-5 py-5 sm:px-8">
        <nav aria-label="Site" className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link href="/" className="font-semibold text-ink">Nexis</Link>
          <Link href="/" className="text-sm text-body underline-offset-4 hover:underline">Back to home</Link>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 py-14 text-body sm:px-8">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-ink">{title}</h1>
        <div className="space-y-5 leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
    </>
  );
}
