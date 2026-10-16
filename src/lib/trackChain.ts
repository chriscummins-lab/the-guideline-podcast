import type { Episode } from "@/data/types";
import type { Track } from "@/components/PlayerProvider";
import { episodeKey } from "@/lib/listened";

// Baut eine verkettete Track-Liste ab der angegebenen Folge, damit der Player nach
// Ende einer Folge automatisch mit der nächsten Folge derselben Leitlinie fortfährt.
export function buildTrackChain(
  categoryId: string,
  guidelineId: string,
  guidelineName: string,
  episodes: Episode[],
  startEpisodeId: string
): Track | null {
  const startIdx = episodes.findIndex((e) => e.id === startEpisodeId);
  const rest = startIdx >= 0 ? episodes.slice(startIdx) : episodes.filter((e) => e.id === startEpisodeId);
  const withAudio = rest.filter((e) => e.audioUrl);
  const tracks: Track[] = withAudio.map((e) => ({
    src: e.audioUrl!,
    title: e.name,
    subtitle: guidelineName,
    href: `/${episodeKey(categoryId, guidelineId, e.id)}`,
    storageKey: episodeKey(categoryId, guidelineId, e.id),
  }));
  for (let i = 0; i < tracks.length - 1; i++) {
    tracks[i].autoNext = tracks[i + 1];
  }
  return tracks[0] ?? null;
}
