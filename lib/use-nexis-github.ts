"use client";

import { useEffect, useState } from "react";
import { SITE } from "./content";

export type NexisGithub = {
  version: string;
  stars: number | null;
  forks: number | null;
  pushedAt: string | null;
  loading: boolean;
};

const REPO_API = "https://api.github.com/repos/rwetz/Nexis";
const RELEASE_API = "https://api.github.com/repos/rwetz/Nexis/releases/latest";

/**
 * Live GitHub stats for rwetz/Nexis (nexis-site.md §2).
 * Fetches public stats in the background without writing browser storage.
 * Falls back to SITE.fallbackVersion when the network is down.
 */
export function useNexisGithub(): NexisGithub {
  const [data, setData] = useState<NexisGithub>({
    version: SITE.fallbackVersion,
    stars: null,
    forks: null,
    pushedAt: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;

    // Refresh from the API in the background.
    (async () => {
      try {
        const [repoRes, relRes] = await Promise.all([
          fetch(REPO_API, { headers: { Accept: "application/vnd.github+json" } }),
          fetch(RELEASE_API, { headers: { Accept: "application/vnd.github+json" } }),
        ]);
        const repo = repoRes.ok ? await repoRes.json() : null;
        const rel = relRes.ok ? await relRes.json() : null;
        if (cancelled) return;

        const next: NexisGithub = {
          version: rel?.tag_name ?? SITE.fallbackVersion,
          stars: typeof repo?.stargazers_count === "number" ? repo.stargazers_count : null,
          forks: typeof repo?.forks_count === "number" ? repo.forks_count : null,
          pushedAt: repo?.pushed_at ?? null,
          loading: false,
        };
        setData(next);
      } catch {
        if (!cancelled) setData((d) => ({ ...d, loading: false }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
