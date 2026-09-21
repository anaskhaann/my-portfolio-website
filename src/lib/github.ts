export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export async function fetchContributions(
  _username: string
): Promise<ContributionDay[] | null> {
  try {
    return null; // Phase 1 stub: section renders without the heatmap (spec §11)
  } catch {
    return null;
  }
}

export function parseRepoSlug(githubUrl: string): string | null {
  const match = githubUrl.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git)?\/?$/);
  return match ? match[1] : null;
}

export async function fetchStarCount(slug: string): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${slug}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: unknown };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}
