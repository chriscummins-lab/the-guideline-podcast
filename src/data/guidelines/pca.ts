import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/pca_episoden.json";
import quizF01 from "@/data/quizzes/pca/F01.json";
import quizF02 from "@/data/quizzes/pca/F02.json";
import quizF03 from "@/data/quizzes/pca/F03.json";
import quizF04 from "@/data/quizzes/pca/F04.json";
import quizF05 from "@/data/quizzes/pca/F05.json";
import quizF06 from "@/data/quizzes/pca/F06.json";
import quizF07 from "@/data/quizzes/pca/F07.json";
import quizF08 from "@/data/quizzes/pca/F08.json";
import quizF09 from "@/data/quizzes/pca/F09.json";
import quizF10 from "@/data/quizzes/pca/F10.json";
import quizF11 from "@/data/quizzes/pca/F11.json";
import quizF12 from "@/data/quizzes/pca/F12.json";
import quizF13 from "@/data/quizzes/pca/F13.json";
import quizF14 from "@/data/quizzes/pca/F14.json";
import quizF15 from "@/data/quizzes/pca/F15.json";

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
  15: quizF15,
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/01-uroonko/01-s3-prostatakarzinom/";

export const pcaEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}.mp3` : null,
  schaubildUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png` : null,
  quiz: quizByFolge[ep.folge] ?? [],
}));
