"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTENT, getGuideline } from "@/data/content";
import { flattenEpisodes } from "@/lib/catalog";
import { isListened, onListenedChange } from "@/lib/listened";
import { getProgress, getProgressRatio, onProgressChange } from "@/lib/progress";
import { usePlayer } from "@/components/PlayerProvider";
import { categoryIconClass } from "@/lib/categoryIcons";
import { buildTrackChain } from "@/lib/trackChain";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return "Guten Morgen";
  if (h < 18) return "Guten Tag";
  return "Guten Abend";
}

function useContinueListening() {
  const [item, setItem] = useState<ReturnType<typeof flattenEpisodes>[number] | null>(null);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const all = flattenEpisodes();
      let best: typeof all[number] | null = null;
      let bestUpdatedAt = 0;
      for (const fe of all) {
        if (isListened(fe.storageKey)) continue;
        const p = getProgress(fe.storageKey);
        if (p && p.time > 5 && p.updatedAt > bestUpdatedAt) {
          best = fe;
          bestUpdatedAt = p.updatedAt;
        }
      }
      setItem(best);
      setRatio(best ? getProgressRatio(best.storageKey) : 0);
    };
    refresh();
    const off1 = onProgressChange(refresh);
    const off2 = onListenedChange(refresh);
    return () => {
      off1();
      off2();
    };
  }, []);

  return { item, ratio };
}

function useCategoryStats(categoryId: string, episodeKeys: string[]) {
  const [listenedCount, setListenedCount] = useState(0);

  useEffect(() => {
    const refresh = () => {
      setListenedCount(episodeKeys.filter((k) => isListened(k)).length);
    };
    refresh();
    return onListenedChange(refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, episodeKeys.length]);

  return listenedCount;
}

function CategoryCard({ cat }: { cat: (typeof CONTENT.categories)[number] }) {
  const keys = flattenEpisodes()
    .filter((fe) => fe.categoryId === cat.id)
    .map((fe) => fe.storageKey);
  const listenedCount = useCategoryStats(cat.id, keys);

  const inner = (
    <>
      <div className="cat-card-icon">
        <i className={`ti ${categoryIconClass(cat.id)}`} aria-hidden="true" />
      </div>
      <div className="cat-card-name">{cat.name}</div>
      <div className="cat-card-progress">
        {cat.available
          ? keys.length > 0
            ? `${listenedCount}/${keys.length} gehört`
            : "Verfügbar"
          : "Kommt bald"}
      </div>
    </>
  );

  return cat.available ? (
    <Link href={`/${cat.id}`} className="cat-card">
      {inner}
    </Link>
  ) : (
    <div className="cat-card locked" aria-disabled="true">
      {inner}
    </div>
  );
}

export default function HomePage() {
  const { item, ratio } = useContinueListening();
  const player = usePlayer();

  function handleContinue() {
    if (!item || !item.episode.audioUrl) return;
    const { guideline } = getGuideline(item.categoryId, item.guidelineId);
    const chain = guideline
      ? buildTrackChain(
          item.categoryId,
          item.guidelineId,
          item.guidelineName,
          guideline.episodes,
          item.episode.id
        )
      : null;
    player.loadAndPlay(
      chain ?? {
        src: item.episode.audioUrl,
        title: item.episode.name,
        subtitle: item.guidelineName,
        href: `/${item.storageKey}`,
        storageKey: item.storageKey,
      }
    );
  }

  return (
    <section>
      <div className="home-greeting-row">
        <div className="home-greeting-name">{greeting()}</div>
      </div>

      <Link href="/suche" className="search-box home-search-link">
        <i className="ti ti-search" aria-hidden="true" />
        <span className="home-search-placeholder">Leitlinie suchen</span>
      </Link>

      {item && (
        <button className="continue-card" onClick={handleContinue}>
          <span className="continue-card-play">
            <i className="ti ti-player-play" aria-hidden="true" />
          </span>
          <span className="continue-card-info">
            <span className="continue-card-label">Weiter hören</span>
            <span className="continue-card-title">{item.episode.name}</span>
            <span className="continue-card-progress-bar">
              <span
                className="continue-card-progress-fill"
                style={{ width: `${Math.round(ratio * 100)}%` }}
              />
            </span>
          </span>
        </button>
      )}

      <div className="section-label">Themen</div>
      <div className="cat-grid">
        {CONTENT.categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} />
        ))}
      </div>
    </section>
  );
}
