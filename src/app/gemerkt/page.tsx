"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { flattenEpisodes, type FlatEpisode } from "@/lib/catalog";
import { isBookmarked, onBookmarksChange } from "@/lib/bookmarks";
import { isListened, onListenedChange } from "@/lib/listened";

type Entry = FlatEpisode & { listened: boolean };

function buildList(): Entry[] {
  return flattenEpisodes()
    .filter((fe) => isBookmarked(fe.storageKey))
    .map((fe) => ({ ...fe, listened: isListened(fe.storageKey) }));
}

export default function GemerktPage() {
  const [entries, setEntries] = useState<Entry[] | null>(null);

  useEffect(() => {
    const refresh = () => setEntries(buildList());
    refresh();
    const off1 = onBookmarksChange(refresh);
    const off2 = onListenedChange(refresh);
    return () => {
      off1();
      off2();
    };
  }, []);

  return (
    <section>
      <div className="page-eyebrow">Deine Auswahl</div>
      <h1 className="page-heading">Gemerkt</h1>
      <p className="page-sub">
        Alle Folgen, die du mit dem Lesezeichen-Symbol markiert hast.
      </p>

      {entries === null ? null : entries.length === 0 ? (
        <p className="placeholder-box" style={{ maxWidth: "none" }}>
          Du hast noch keine Folge gemerkt. Tippe auf der Episodenseite auf das Lesezeichen-Symbol.
        </p>
      ) : (
        <div className="episode-list">
          {entries.map((item) => (
            <Link
              key={item.storageKey}
              href={`/${item.categoryId}/${item.guidelineId}/${item.episode.id}`}
              className="episode-row"
            >
              <div className="episode-num">{item.episode.num}</div>
              <div className="episode-info">
                <div className="episode-name">{item.episode.name}</div>
                <div className="episode-meta">
                  <span>{item.guidelineName}</span>
                  {item.listened && <span className="listened-badge">✓ Gehört</span>}
                </div>
              </div>
              <div className="episode-arrow">→</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
