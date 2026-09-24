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
      <div className="font-mono text-[26px] leading-none tracking-tight text-white">
        {loading ? <Skeleton className="h-6 w-16" /> : value}
      </div>
      <div className="caption-label text-white/45">{label}</div>
    </div>
  );
}

export function StatsStrip({ gh }: { gh: NexisGithub }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4 lg:flex lg:items-start lg:gap-12">
      <Stat value={gh.version} label="Latest release" loading={gh.loading && gh.version === undefined} />
      <Stat value="7" label="Workbench presets" />
      <Stat value="0" label="App analytics" />
      <Stat value="3" label="Platforms" />
      {gh.stars !== null && (
        <Stat value={gh.stars.toLocaleString()} label="GitHub stars" />
      )}
    </div>
  );
}
