import type { Guideline } from "@/data/types";
import manifest from "@/data/manifests/and_episoden.json";

const BASE_URL = `https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/${manifest.r2Ordner}/`;

// Themengebiete der Andrologie – bisher nur Podcast, ohne Schaubild und Quiz.
export const andrologieGuidelines: Guideline[] = manifest.themen.map((thema) => ({
  id: thema.id,
  name: thema.name,
  available: true,
  description: thema.beschreibung,
  episodes: thema.episoden.map((ep) => ({
    id: ep.stem.toLowerCase(),
    name: `Folge ${ep.folge} – ${ep.titel}`,
    num: String(ep.folge).padStart(2, "0"),
    duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
    audioUrl: `${BASE_URL}${thema.r2Ordner}/${ep.stem}/${ep.stem}.mp3`,
    schaubildUrl: null,
    quiz: [],
  })),
}));
