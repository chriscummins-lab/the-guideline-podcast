"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTENT } from "@/data/content";
import { episodeKey, isListened, onListenedChange } from "@/lib/listened";
import { getProgress, getProgressRatio, onProgressChange } from "@/lib/progress";
import type { Episode } from "@/data/types";

type FlatEpisode = {
  episode: Episode;
  categoryId: string;
  categoryName: string;
  guidelineId: string;
  guidelineName: string;
  storageKey: string;
};

type ListEntry = FlatEpisode & {
  listened: boolean;
  ratio: number;
  updatedAt: number;
};

function flattenEpisodes(): FlatEpisode[] {
  const out: FlatEpisode[] = [];
  for (const category of CONTENT.categories) {
    for (const guideline of category.guidelines) {
      for (const episode of guideline.episodes) {
        out.push({
          episode,
          categoryId: category.id,
          categoryName: category.name,
          guidelineId: guideline.id,
          guidelineName: guideline.name,
          storageKey: episodeKey(category.id, guideline.id, episode.id),
        });
      }
    }
  }
  return out;
}

const ALL_EPISODES = flattenEpisodes();

function buildList(): ListEntry[] {
  return ALL_EPISODES.map((item) => {
    const listened = isListened(item.storageKey);
    const ratio = getProgressRatio(item.storageKey);
    const updatedAt = getProgress(item.storageKey)?.updatedAt ?? 0;
    return { ...item, listened, ratio, updatedAt };
  })
    .filter((item) => item.listened || item.ratio > 0)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export default function GehoertPage() {
  const [entries, setEntries] = useState<ListEntry[] | null>(null);

  useEffect(() => {
    const refresh = () => setEntries(buildList());
    refresh();
    const offListened = onListenedChange(refresh);
    const offProgress = onProgressChange(refresh);
    return () => {
      offListened();
      offProgress();
    };
  }, []);

  return (
    <section>
      <div className="page-eyebrow">Dein Fortschritt</div>
      <h1 className="page-heading">Gehört</h1>
      <p className="page-sub">
        Alle Folgen, die du begonnen oder bereits abgeschlossen hast — geräteweise gespeichert.
      </p>

      {entries === null ? null : entries.length === 0 ? (
        <p className="placeholder-box" style={{ maxWidth: "none" }}>
          Du hast noch keine Folge gestartet. Sobald du einen Podcast abspielst, erscheint er hier.
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
                  {item.listened ? (
                    <span className="listened-badge">✓ Gehört</span>
                  ) : (
                    <span>{Math.round(item.ratio * 100)}% gehört</span>
                  )}
                </div>
              </div>
              <div className="episode-arrow">→</div>
              {!item.listened && (
                <div className="episode-progress-bar">
                  <div
                    className="episode-progress-fill"
                    style={{ width: `${Math.round(item.ratio * 100)}%` }}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
