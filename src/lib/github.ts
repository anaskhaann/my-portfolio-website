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

