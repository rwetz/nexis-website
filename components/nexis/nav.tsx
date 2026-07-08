"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Btn } from "@/components/nexis/ui/btn";
import { GitHubIcon, NexisLogo } from "@/components/nexis/ui/logo";
import signatureImg from "@/assets/signature.png";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Shortcuts", href: "#shortcuts" },
  { label: "Screenshots", href: "#showcase" },
  { label: "Demo", href: "#demo" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="dot-grid sticky top-0 z-50 border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        {/* Left: signature / logo / wordmark */}
        <div className="flex items-center gap-3">
          <a href="#hero" aria-label="Back to top" className="inline-flex">
            <Image
              src={signatureImg}
              alt="Signature"
              width={79}
              height={25}
              priority
              className="h-[25px] w-auto opacity-80 transition-opacity hover:opacity-100"
            />
          </a>
          <span className="select-none text-lg text-muted-soft">/</span>
          <a href="#hero" className="flex items-center gap-2">
            <NexisLogo size={28} />
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              Nexis
            </span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-body transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={SITE.repo}
            target="_blank"
            rel="noreferrer"
            className="text-body transition-colors hover:text-ink"
            aria-label="Nexis on GitHub"
          >
            <GitHubIcon className="size-[18px]" />
          </a>
          <Btn href={SITE.releases} target="_blank" rel="noreferrer" size="md">
            Download
          </Btn>
        </nav>

        {/* Mobile toggle */}
        <button
          className="text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-hairline bg-canvas md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-5 py-4 sm:px-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm font-medium text-body hover:bg-surface-strong hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3">
            <Btn href={SITE.repo} target="_blank" rel="noreferrer" variant="secondary">
              <GitHubIcon className="size-4" /> GitHub
            </Btn>
            <Btn href={SITE.releases} target="_blank" rel="noreferrer">
              Download
            </Btn>
          </div>
        </nav>
      </div>
    </header>
  );
}
