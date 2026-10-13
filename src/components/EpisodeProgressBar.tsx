"use client";

import { useEffect, useState } from "react";
import { isListened, onListenedChange } from "@/lib/listened";
import { getProgressRatio, onProgressChange } from "@/lib/progress";

export default function EpisodeProgressBar({ storageKey }: { storageKey: string }) {
  const [ratio, setRatio] = useState(0);
  const [listened, setListenedState] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setRatio(getProgressRatio(storageKey));
      setListenedState(isListened(storageKey));
    };
    refresh();
    const offProgress = onProgressChange(refresh);
    const offListened = onListenedChange(refresh);
    return () => {
      offProgress();
      offListened();
    };
  }, [storageKey]);

  if (listened || ratio <= 0) return null;

  return (
    <div className="episode-progress-bar">
      <div className="episode-progress-fill" style={{ width: `${Math.round(ratio * 100)}%` }} />
    </div>
  );
}
