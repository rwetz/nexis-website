"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { NexisGithub } from "@/lib/use-nexis-github";

function Stat({
  value,
  label,
  loading,
}: {
  value: React.ReactNode;
  label: string;
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="font-mono text-[26px] leading-none tracking-tight text-ink">
        {loading ? <Skeleton className="h-6 w-16" /> : value}
      </div>
      <div className="caption-label text-ink-muted">{label}</div>
    </div>
  );
}

export function StatsStrip({ gh }: { gh: NexisGithub }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:flex lg:items-start lg:gap-12">
      <Stat value={gh.version} label="Latest release" loading={gh.loading && gh.version === undefined} />
      <Stat value="< 10 MB" label="App size" />
      <Stat value="0" label="Telemetry" />
      <Stat value="3" label="Platforms" />
      {gh.stars !== null && (
        <Stat value={gh.stars.toLocaleString()} label="GitHub stars" />
      )}
    </div>
  );
}
