import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/ic_episoden.json";
import quizF01 from "@/data/quizzes/ic/F01.json";
import quizF02 from "@/data/quizzes/ic/F02.json";
import quizF03 from "@/data/quizzes/ic/F03.json";
import quizF04 from "@/data/quizzes/ic/F04.json";
import quizF05 from "@/data/quizzes/ic/F05.json";
import quizF06 from "@/data/quizzes/ic/F06.json";
import quizF07 from "@/data/quizzes/ic/F07.json";
import quizF08 from "@/data/quizzes/ic/F08.json";
import quizF09 from "@/data/quizzes/ic/F09.json";
import quizF10 from "@/data/quizzes/ic/F10.json";
import quizF11 from "@/data/quizzes/ic/F11.json";

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
  10: quizF10,
  11: quizF11,
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/02-benigne-funktionell/03-s2k-interstitielle-zystitis/";

export const icEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: `${BASE_URL}${ep.stem}/${ep.stem}.mp3`,
  schaubildUrl: `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png`,
  quiz: quizByFolge[ep.folge] ?? [],
}));
