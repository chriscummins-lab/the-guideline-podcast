"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { flattenEpisodes } from "@/lib/catalog";

export default function SuchePage() {
  const [query, setQuery] = useState("");
  const all = useMemo(() => flattenEpisodes(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return all.filter(
      (fe) =>
        fe.episode.name.toLowerCase().includes(q) ||
        fe.guidelineName.toLowerCase().includes(q) ||
        fe.categoryName.toLowerCase().includes(q)
    );
  }, [all, query]);

  return (
    <section>
      <div className="page-eyebrow">Durchsuchen</div>
      <h1 className="page-heading">Suche</h1>
      <p className="page-sub">Finde Episoden über alle Leitlinien hinweg.</p>

      <div className="search-box">
        <i className="ti ti-search" aria-hidden="true" />
        <input
          type="text"
          placeholder="Leitlinie oder Episode suchen…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {query.trim().length >= 2 && (
        <>
          {results.length === 0 ? (
            <p className="placeholder-box" style={{ maxWidth: "none", marginTop: 20 }}>
              Keine Treffer für „{query}".
            </p>
          ) : (
            <div className="episode-list" style={{ marginTop: 20 }}>
              {results.map((fe) => (
                <Link
                  key={fe.storageKey}
                  href={`/${fe.categoryId}/${fe.guidelineId}/${fe.episode.id}`}
                  className="episode-row"
                >
                  <div className="episode-num">{fe.episode.num}</div>
                  <div className="episode-info">
                    <div className="episode-name">{fe.episode.name}</div>
                    <div className="episode-meta">
                      <span>{fe.guidelineName}</span>
                    </div>
                  </div>
                  <div className="episode-arrow">→</div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
