import { CONTENT } from "@/data/content";
import { episodeKey } from "@/lib/listened";
import type { Episode } from "@/data/types";

export type FlatEpisode = {
  episode: Episode;
  categoryId: string;
  categoryName: string;
  guidelineId: string;
  guidelineName: string;
  storageKey: string;
};

let cache: FlatEpisode[] | null = null;

export function flattenEpisodes(): FlatEpisode[] {
  if (cache) return cache;
  const out: FlatEpisode[] = [];
  for (const category of CONTENT.categories) {
    if (!category.available) continue;
    for (const guideline of category.guidelines) {
      if (!guideline.available) continue;
      for (const episode of guideline.episodes) {
        out.push({
          episode,
          categoryId: category.id,
          categoryName: category.name,
          guidelineId: guideline.id,
          guidelineName: guideline.name,
          storageKey: episodeKey(category.id, guideline.id, episode.id),
        });
      }
    }
  }
  cache = out;
  return out;
}
