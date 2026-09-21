import { unstable_cache } from "next/cache";

import type { Activity } from "@/components/contribution-graph";

type GitHubContributionsResponse = {
  contributions: Activity[];
};

async function fetchContributions(username: string): Promise<Activity[]> {
  const apiUrl = process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL;
  if (!apiUrl) {
    return [];
  }

  const res = await fetch(`${apiUrl}/${username}?y=last`);
  if (!res.ok) {
    return [];
  }
  try {
    const data = (await res.json()) as GitHubContributionsResponse;
    return data.contributions ?? [];
  } catch {
    return [];
  }
}

export const getCachedContributions = unstable_cache(
  fetchContributions,
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
);
