export type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  tip?: string;
  explanation?: string;
};

export type Episode = {
  id: string;
  name: string;
  group?: string;
  num: string;
  duration?: string;
  audioUrl?: string | null;
  schaubildUrl?: string | null;
  quiz: QuizQuestion[];
};

export type Guideline = {
  id: string;
  name: string;
  badge?: string;
  available: boolean;
  description: string;
  episodes: Episode[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  available: boolean;
  description: string;
  guidelines: Guideline[];
};
