import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/uro_episoden.json";
import quizF01 from "@/data/quizzes/uro/F01.json";
import quizF02 from "@/data/quizzes/uro/F02.json";
import quizF03 from "@/data/quizzes/uro/F03.json";
import quizF04 from "@/data/quizzes/uro/F04.json";
import quizF05 from "@/data/quizzes/uro/F05.json";
import quizF06 from "@/data/quizzes/uro/F06.json";
import quizF07 from "@/data/quizzes/uro/F07.json";
import quizF08 from "@/data/quizzes/uro/F08.json";
import quizF09 from "@/data/quizzes/uro/F09.json";
import quizF10 from "@/data/quizzes/uro/F10.json";
import quizF11 from "@/data/quizzes/uro/F11.json";
import quizF12 from "@/data/quizzes/uro/F12.json";
import quizF13 from "@/data/quizzes/uro/F13.json";
import quizF14 from "@/data/quizzes/uro/F14.json";

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
  12: quizF12,
  13: quizF13,
  14: quizF14,
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/02-benigne-funktionell/04-s2k-urolithiasis/";

export const uroEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: `${BASE_URL}${ep.stem}/${ep.stem}.mp3`,
  schaubildUrl: `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png`,
  quiz: quizByFolge[ep.folge] ?? [],
}));
