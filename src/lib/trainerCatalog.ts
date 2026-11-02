import { CONTENT } from "@/data/content";
import { episodeKey } from "@/lib/listened";
import { questionKey } from "@/lib/quizAnswers";
import type { QuizQuestion } from "@/data/types";

export type FlatQuestion = {
  key: string;
  categoryId: string;
  categoryName: string;
  guidelineId: string;
  guidelineName: string;
  episodeId: string;
  episodeName: string;
  question: QuizQuestion;
};

let cache: FlatQuestion[] | null = null;

export function flattenQuestions(): FlatQuestion[] {
  if (cache) return cache;
  const out: FlatQuestion[] = [];
  for (const category of CONTENT.categories) {
    if (!category.available) continue;
    for (const guideline of category.guidelines) {
      if (!guideline.available) continue;
      for (const episode of guideline.episodes) {
        const storageKey = episodeKey(category.id, guideline.id, episode.id);
        episode.quiz.forEach((question, index) => {
          out.push({
            key: questionKey(storageKey, index),
            categoryId: category.id,
            categoryName: category.name,
            guidelineId: guideline.id,
            guidelineName: guideline.name,
            episodeId: episode.id,
            episodeName: episode.name,
            question,
          });
        });
      }
    }
  }
  cache = out;
  return out;
}
