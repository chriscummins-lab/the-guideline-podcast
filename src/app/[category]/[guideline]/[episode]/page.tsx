import Link from "next/link";
import { notFound } from "next/navigation";
import { getEpisode } from "@/data/content";
import { episodeKey } from "@/lib/listened";
import EpisodeView from "@/components/EpisodeView";

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ category: string; guideline: string; episode: string }>;
}) {
  const { category: categoryId, guideline: guidelineId, episode: episodeId } = await params;
  const { category, guideline, episode } = getEpisode(categoryId, guidelineId, episodeId);
  if (!category || !guideline || !episode) notFound();

  return (
    <div>
      <Link href={`/${category.id}/${guideline.id}`} className="crumb-back">
        ← Zurück zu {guideline.name}
      </Link>
      <EpisodeView
        episode={episode}
        guidelineName={guideline.name}
        storageKey={episodeKey(category.id, guideline.id, episode.id)}
      />
    </div>
  );
}
