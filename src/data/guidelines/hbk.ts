import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/hbk_episoden.json";
import quizF01 from "@/data/quizzes/hbk/F01.json";
import quizF02 from "@/data/quizzes/hbk/F02.json";
import quizF03 from "@/data/quizzes/hbk/F03.json";
import quizF04 from "@/data/quizzes/hbk/F04.json";
import quizF05 from "@/data/quizzes/hbk/F05.json";
import quizF06 from "@/data/quizzes/hbk/F06.json";
import quizF07 from "@/data/quizzes/hbk/F07.json";
import quizF08 from "@/data/quizzes/hbk/F08.json";
import quizF09 from "@/data/quizzes/hbk/F09.json";
import quizF10 from "@/data/quizzes/hbk/F10.json";
import quizF11 from "@/data/quizzes/hbk/F11.json";
import quizF12 from "@/data/quizzes/hbk/F12.json";
import quizF13 from "@/data/quizzes/hbk/F13.json";
import quizF14 from "@/data/quizzes/hbk/F14.json";
import quizF15 from "@/data/quizzes/hbk/F15.json";
import quizF16 from "@/data/quizzes/hbk/F16.json";
import quizF17 from "@/data/quizzes/hbk/F17.json";
import quizF18 from "@/data/quizzes/hbk/F18.json";
import quizF19 from "@/data/quizzes/hbk/F19.json";
import quizF20 from "@/data/quizzes/hbk/F20.json";

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
  16: quizF16,
  17: quizF17,
  18: quizF18,
  19: quizF19,
  20: quizF20,
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/01-uroonko/03-s3-harnblasenkarzinom/";

export const hbkEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}.mp3` : null,
  schaubildUrl: ep.erstellt ? `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png` : null,
  quiz: quizByFolge[ep.folge] ?? [],
}));
