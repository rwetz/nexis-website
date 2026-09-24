import Link from "next/link";

export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-canvas px-5 text-center text-ink">
    <p className="font-mono text-sm text-primary">404 / PAGE NOT FOUND</p>
    <h1 className="text-4xl font-semibold tracking-tight">Lost your way?</h1>
    <p className="max-w-md text-body">This page may have moved. Start at the homepage or find the answer in the wiki.</p>
    <div className="flex gap-4 text-sm font-semibold">
      <Link href="/" className="rounded-lg bg-primary px-5 py-3 text-white">Go home</Link>
      <a href="https://wiki.nexisdev.org" className="rounded-lg border border-hairline px-5 py-3">Open wiki</a>
    </div>
  </main>;
}
