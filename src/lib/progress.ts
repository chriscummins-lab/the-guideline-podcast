const STORAGE_KEY = "tgp:progress";
const CHANGE_EVENT = "tgp:progress-changed";

export type ProgressEntry = {
  time: number;
  duration: number;
  updatedAt: number;
};

type ProgressMap = Record<string, ProgressEntry>;

function readMap(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeMap(map: ProgressMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getProgress(key: string): ProgressEntry | undefined {
  return readMap()[key];
}

export function setProgress(key: string, time: number, duration: number) {
  if (!duration || Number.isNaN(duration)) return;
  const map = readMap();
  map[key] = { time, duration, updatedAt: Date.now() };
  writeMap(map);
}

export function clearProgress(key: string) {
  const map = readMap();
  delete map[key];
  writeMap(map);
}

/** 0..1, oder 0 wenn keine Daten vorhanden. */
export function getProgressRatio(key: string): number {
  const entry = getProgress(key);
  if (!entry || !entry.duration) return 0;
  return Math.min(1, Math.max(0, entry.time / entry.duration));
}

export function onProgressChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
