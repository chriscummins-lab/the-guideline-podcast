"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Episode } from "@/data/types";
import { episodeKey, isListened, onListenedChange } from "@/lib/listened";
import { usePlayer } from "./PlayerProvider";
import EpisodeProgressBar from "./EpisodeProgressBar";

export default function GuidelineEpisodeList({
  categoryId,
  guidelineId,
  episodes,
}: {
  categoryId: string;
  guidelineId: string;
  episodes: Episode[];
}) {
  const [listenedKeys, setListenedKeys] = useState<Set<string>>(new Set());
  const player = usePlayer();

  useEffect(() => {
    const refresh = () => {
      setListenedKeys(
        new Set(
          episodes
            .map((ep) => episodeKey(categoryId, guidelineId, ep.id))
            .filter((k) => isListened(k))
        )
      );
    };
    refresh();
    return onListenedChange(refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, guidelineId, episodes.length]);

  const total = episodes.length;
  const listenedCount = listenedKeys.size;
  const pct = total > 0 ? Math.round((listenedCount / total) * 100) : 0;

  let lastGroup: string | undefined;

  return (
    <>
      {total > 0 && (
        <div className="guideline-progress-summary">
          <div className="guideline-progress-text">
            {listenedCount} von {total} Folgen gehört · {pct}%
          </div>
          <div className="guideline-progress-bar">
            <div className="guideline-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="episode-list">
        {episodes.map((ep) => {
          const storageKey = episodeKey(categoryId, guidelineId, ep.id);
          const showGroupLabel = ep.group && ep.group !== lastGroup;
          lastGroup = ep.group ?? lastGroup;

          const listened = listenedKeys.has(storageKey);
          const isCurrent = player.track?.storageKey === storageKey;
          const unavailable = !ep.audioUrl;

          let statusIcon = null;
          if (listened) {
            statusIcon = <i className="ti ti-check episode-status-icon status-done" aria-hidden="true" />;
          } else if (isCurrent) {
            statusIcon = (
              <i
                className={`ti ${player.playing ? "ti-player-pause" : "ti-player-play"} episode-status-icon status-playing`}
                aria-hidden="true"
              />
            );
          } else if (unavailable) {
            statusIcon = <i className="ti ti-plus episode-status-icon status-pending" aria-hidden="true" />;
          }

          return (
            <div key={ep.id}>
              {showGroupLabel && <div className="episode-group-label">{ep.group}</div>}
              <Link
                href={`/${categoryId}/${guidelineId}/${ep.id}`}
                className={`episode-row ${isCurrent ? "now-playing" : ""} ${unavailable ? "unavailable" : ""}`}
              >
                <div className="episode-num">{ep.num}</div>
                <div className="episode-info">
                  <div className="episode-name">{ep.name}</div>
                  <div className="episode-meta">
                    {ep.duration && <span>{ep.duration}</span>}
                    {unavailable && <span>Podcast folgt</span>}
                    {ep.quiz.length > 0 && (
                      <span>{isCurrent ? "läuft · " : ""}{ep.quiz.length} Quizfragen</span>
                    )}
                  </div>
                </div>
                {statusIcon}
                <EpisodeProgressBar storageKey={storageKey} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
