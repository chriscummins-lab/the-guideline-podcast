const STORAGE_KEY = "tgp:quiz-answers";
const CHANGE_EVENT = "tgp:quiz-answers-changed";

type AnswerMap = Record<string, { correct: boolean; answeredAt: number }>;

function readMap(): AnswerMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnswerMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: AnswerMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function questionKey(storageKey: string, index: number): string {
  return `${storageKey}#${index}`;
}

export function markAnswered(key: string, correct: boolean) {
  const map = readMap();
  map[key] = { correct, answeredAt: Date.now() };
  writeMap(map);
}

export function isAnswered(key: string): boolean {
  return Boolean(readMap()[key]);
}

export function getAnsweredKeys(): Set<string> {
  return new Set(Object.keys(readMap()));
}

export function onAnswersChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
