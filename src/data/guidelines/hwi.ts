import type { Episode } from "@/data/types";
import manifest from "@/data/manifests/hwi_episoden.json";

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/03-infektio/01-s3-hwi/";

export const hwiEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}.mp3` : null,
  schaubildUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png` : null,
  quiz: [],
}));
