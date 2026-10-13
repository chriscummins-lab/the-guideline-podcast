const STORAGE_KEY = "tgp:listened";
const CHANGE_EVENT = "tgp:listened-changed";

function readSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeSet(set: Set<string>) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function isListened(key: string): boolean {
  return readSet().has(key);
}

export function setListened(key: string, value: boolean) {
  const set = readSet();
  if (value) {
    set.add(key);
  } else {
    set.delete(key);
  }
  writeSet(set);
}

export function onListenedChange(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function episodeKey(categoryId: string, guidelineId: string, episodeId: string) {
  return `${categoryId}/${guidelineId}/${episodeId}`;
}
