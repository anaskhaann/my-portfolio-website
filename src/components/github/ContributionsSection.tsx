import { Suspense } from "react";
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions";
import { getCachedContributions } from "@/lib/get-cached-contributions";

export default async function ContributionsSection() {
  const data = await getCachedContributions("anaskhaann");
  if (!data.length) return null;

  return (
    <section className="py-8" aria-label="GitHub activity">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-semibold text-foreground">
          Activity
        </h2>
        <Suspense fallback={<GitHubContributionsFallback />}>
          <GitHubContributions
            contributions={Promise.resolve(data)}
            githubProfileUrl="https://github.com/anaskhaann"
          />
        </Suspense>
      </div>
    </section>
  );
}
