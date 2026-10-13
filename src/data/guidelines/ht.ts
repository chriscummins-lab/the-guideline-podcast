import type { Episode, QuizQuestion } from "@/data/types";
import manifest from "@/data/manifests/ht_episoden.json";

import quizF01 from "@/data/quizzes/ht/F01.json";
import quizF02 from "@/data/quizzes/ht/F02.json";
import quizF03 from "@/data/quizzes/ht/F03.json";
import quizF04 from "@/data/quizzes/ht/F04.json";
import quizF05 from "@/data/quizzes/ht/F05.json";
import quizF06 from "@/data/quizzes/ht/F06.json";
import quizF07 from "@/data/quizzes/ht/F07.json";
import quizF08 from "@/data/quizzes/ht/F08.json";
import quizF09 from "@/data/quizzes/ht/F09.json";
import quizF10 from "@/data/quizzes/ht/F10.json";
import quizF11 from "@/data/quizzes/ht/F11.json";
import quizF12 from "@/data/quizzes/ht/F12.json";
import quizF13 from "@/data/quizzes/ht/F13.json";
import quizF14 from "@/data/quizzes/ht/F14.json";
import quizF15 from "@/data/quizzes/ht/F15.json";
import quizF16 from "@/data/quizzes/ht/F16.json";
import quizF17 from "@/data/quizzes/ht/F17.json";
import quizF18 from "@/data/quizzes/ht/F18.json";
import quizF19 from "@/data/quizzes/ht/F19.json";

const quizByFolge: Record<number, QuizQuestion[]> = {
  1: quizF01 as QuizQuestion[],
  2: quizF02 as QuizQuestion[],
  3: quizF03 as QuizQuestion[],
  4: quizF04 as QuizQuestion[],
  5: quizF05 as QuizQuestion[],
  6: quizF06 as QuizQuestion[],
  7: quizF07 as QuizQuestion[],
  8: quizF08 as QuizQuestion[],
  9: quizF09 as QuizQuestion[],
  10: quizF10 as QuizQuestion[],
  11: quizF11 as QuizQuestion[],
  12: quizF12 as QuizQuestion[],
  13: quizF13 as QuizQuestion[],
  14: quizF14 as QuizQuestion[],
  15: quizF15 as QuizQuestion[],
  16: quizF16 as QuizQuestion[],
  17: quizF17 as QuizQuestion[],
  18: quizF18 as QuizQuestion[],
  19: quizF19 as QuizQuestion[],
};

const BASE_URL =
  "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/01-uroonko/S3_Hodentumor/";

export const htEpisodes: Episode[] = manifest.episoden.map((ep) => ({
  id: ep.stem.toLowerCase(),
  name: `Folge ${ep.folge} – ${ep.titel}`,
  num: String(ep.folge).padStart(2, "0"),
  duration: ep.dauerMin ? `ca. ${ep.dauerMin} min` : undefined,
  audioUrl: `${BASE_URL}${ep.stem}/${ep.stem}.mp3`,
  schaubildUrl: `${BASE_URL}${ep.stem}/${ep.stem}_Schaubild.png`,
  quiz: quizByFolge[ep.folge] ?? [],
}));
