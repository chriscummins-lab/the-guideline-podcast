import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/nbfs_episoden.json";
import quizF01 from "@/data/quizzes/nbfs/F01.json";
import quizF02 from "@/data/quizzes/nbfs/F02.json";
import quizF03 from "@/data/quizzes/nbfs/F03.json";
import quizF04 from "@/data/quizzes/nbfs/F04.json";
import quizF05 from "@/data/quizzes/nbfs/F05.json";
import quizF06 from "@/data/quizzes/nbfs/F06.json";
import quizF07 from "@/data/quizzes/nbfs/F07.json";
import quizF08 from "@/data/quizzes/nbfs/F08.json";
import quizF09 from "@/data/quizzes/nbfs/F09.json";

const quizByFolge: Record<number, QuizQuestion[]> = {
  1: quizF01,
  2: quizF02,
  3: quizF03,
  4: quizF04,
  5: quizF05,
  6: quizF06,
  7: quizF07,
  8: quizF08,
  9: quizF09,
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/04-kinderuro/03-s2k-spinale-dysraphie/";

export const nbfsEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}.mp3` : null,
  schaubildUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png` : null,
  quiz: quizByFolge[ep.folge] ?? [],
}));
