"use client";

import { useEffect, useState } from "react";
import { isListened, onListenedChange } from "@/lib/listened";

export default function ListenedBadge({ storageKey }: { storageKey: string }) {
  const [listened, setListenedState] = useState(false);

  useEffect(() => {
    setListenedState(isListened(storageKey));
    return onListenedChange(() => setListenedState(isListened(storageKey)));
  }, [storageKey]);

  if (!listened) return null;

  return (
    <span className="listened-badge" title="Bereits gehört">
      ✓ Gehört
    </span>
  );
}
