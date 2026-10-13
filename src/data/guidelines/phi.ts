import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/phi_episoden.json";

import quizF01 from "@/data/quizzes/phi/F01.json";
import quizF02 from "@/data/quizzes/phi/F02.json";
import quizF03 from "@/data/quizzes/phi/F03.json";
import quizF04 from "@/data/quizzes/phi/F04.json";
import quizF05 from "@/data/quizzes/phi/F05.json";

const quizByFolge: Record<number, QuizQuestion[]> = {
  1: quizF01 as QuizQuestion[],
  2: quizF02 as QuizQuestion[],
  3: quizF03 as QuizQuestion[],
  4: quizF04 as QuizQuestion[],
  5: quizF05 as QuizQuestion[],
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/04-kinderuro/01-s2k-phimose-paraphimose/";

export const phiEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: `${BASE_URL}${ep.stem}/${ep.stem}.mp3`,
  schaubildUrl: `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png`,
  quiz: quizByFolge[ep.folge] ?? [],
}));
