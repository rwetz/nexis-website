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

const CACHE_KEY = "nexis_gh_v1";
const REPO_API = "https://api.github.com/repos/rwetz/Nexis";
const RELEASE_API = "https://api.github.com/repos/rwetz/Nexis/releases/latest";

/**
 * Live GitHub stats for rwetz/Nexis (nexis-site.md §2).
 * Shows the sessionStorage-cached value immediately, then refreshes in the
 * background. Falls back to SITE.fallbackVersion when the network is down.
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

    // 1. Hydrate from cache immediately for instant paint.
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as NexisGithub;
        setData({ ...parsed, loading: false });
      }
    } catch {
      /* ignore malformed cache */
    }

    // 2. Refresh from the API in the background.
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
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(next));
        } catch {
          /* storage may be unavailable */
        }
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
