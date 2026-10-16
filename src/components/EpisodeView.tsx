"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import QuizPlayer from "./QuizPlayer";
import type { Episode } from "@/data/types";
import { isListened, onListenedChange, setListened } from "@/lib/listened";
import { isBookmarked, onBookmarksChange, setBookmarked } from "@/lib/bookmarks";
import { getProgressRatio, onProgressChange } from "@/lib/progress";
import { buildTrackChain } from "@/lib/trackChain";
import { usePlayer } from "./PlayerProvider";

function formatTime(sec: number): string {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const PANELS = [
  { key: "player", label: "Player" },
  { key: "schaubild", label: "Schaubild" },
  { key: "quiz", label: "Quiz" },
] as const;

export default function EpisodeView({
  episode,
  episodes,
  categoryId,
  guidelineId,
  guidelineName,
  storageKey,
}: {
  episode: Episode;
  episodes: Episode[];
  categoryId: string;
  guidelineId: string;
  guidelineName: string;
  storageKey: string;
}) {
  const [index, setIndex] = useState(0);
  const [listened, setListenedState] = useState(false);
  const [bookmarked, setBookmarkedState] = useState(false);
  const [fallbackRatio, setFallbackRatio] = useState(0);
  const [panelHeight, setPanelHeight] = useState<number | undefined>(undefined);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const player = usePlayer();

  const href = `/${storageKey}`;
  const isCurrent = player.track?.storageKey === storageKey;
  const inQueue = player.queue.some((t) => t.storageKey === storageKey);

  useEffect(() => {
    const refresh = () => setListenedState(isListened(storageKey));
    refresh();
    return onListenedChange(refresh);
  }, [storageKey]);

  useEffect(() => {
    const refresh = () => setBookmarkedState(isBookmarked(storageKey));
    refresh();
    return onBookmarksChange(refresh);
  }, [storageKey]);

  useEffect(() => {
    const refresh = () => setFallbackRatio(getProgressRatio(storageKey));
    refresh();
    return onProgressChange(refresh);
  }, [storageKey]);

  useLayoutEffect(() => {
    const el = panelRefs.current[index];
    if (!el) return;
    const update = () => setPanelHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen]);

  function openLightbox() {
    setLightboxZoomed(false);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxZoomed(false);
  }

  function toggleListened() {
    const next = !listened;
    setListenedState(next);
    setListened(storageKey, next);
  }

  function toggleBookmark() {
    const next = !bookmarked;
    setBookmarkedState(next);
    setBookmarked(storageKey, next);
  }

  function handlePlayToggle() {
    if (!episode.audioUrl) return;
    if (isCurrent) {
      player.toggle();
    } else {
      const chain = buildTrackChain(categoryId, guidelineId, guidelineName, episodes, episode.id);
      player.loadAndPlay(
        chain ?? {
          src: episode.audioUrl,
          title: episode.name,
          subtitle: guidelineName,
          href,
          storageKey,
        }
      );
    }
  }

  function handleEnqueue() {
    if (!episode.audioUrl) return;
    if (inQueue) {
      player.removeFromQueue(storageKey);
    } else {
      player.enqueue({
        src: episode.audioUrl,
        title: episode.name,
        subtitle: guidelineName,
        href,
        storageKey,
      });
    }
  }

  const shownTime = isCurrent ? player.currentTime : 0;
  const shownDuration = isCurrent && player.duration > 0 ? player.duration : 0;
  const shownRatio = isCurrent && shownDuration > 0 ? shownTime / shownDuration : fallbackRatio;
  const isPlayingThis = isCurrent && player.playing;

  function goTo(i: number) {
    setIndex(Math.max(0, Math.min(PANELS.length - 1, i)));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }

  function onTouchEnd() {
    const threshold = 50;
    if (touchDeltaX.current > threshold) {
      goTo(index - 1);
    } else if (touchDeltaX.current < -threshold) {
      goTo(index + 1);
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  }

  return (
    <section>
      <div className="page-eyebrow">{guidelineName}</div>
      <h1 className="page-heading">{episode.name}</h1>

      <div className="swipe-shell">
        <div
          className="swipe-viewport"
          style={{ height: panelHeight ? `${panelHeight}px` : undefined }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="swipe-track"
            style={{
              width: `${PANELS.length * 100}%`,
              transform: `translateX(-${index * (100 / PANELS.length)}%)`,
            }}
          >
            <div
              className="swipe-panel"
              style={{ width: `${100 / PANELS.length}%` }}
              ref={(el) => {
                panelRefs.current[0] = el;
              }}
            >
              <div className="player-card-v2">
                <button
                  className="player-art-v2"
                  onClick={handlePlayToggle}
                  disabled={!episode.audioUrl}
                  aria-label={isPlayingThis ? "Pause" : "Abspielen"}
                >
                  <i
                    className={`ti ${isPlayingThis ? "ti-player-pause" : "ti-player-play"}`}
                    aria-hidden="true"
                  />
                </button>

                <div className="player-chapter-name">{episode.name}</div>

                {episode.audioUrl ? (
                  <>
                    <div className="player-progress-wrap">
                      <div className="player-progress-bar">
                        <div
                          className="player-progress-fill"
                          style={{ width: `${Math.min(100, shownRatio * 100)}%` }}
                        />
                      </div>
                      <div className="player-progress-time">
                        <span>{formatTime(shownTime)}</span>
                        <span>
                          {shownDuration ? formatTime(shownDuration) : episode.duration ?? ""}
                        </span>
                      </div>
                    </div>

                    <div className="player-controls-row">
                      <button onClick={() => player.skip(-10)} aria-label="10 Sekunden zurück">
                        <i className="ti ti-rewind-backward-10" aria-hidden="true" />
                      </button>
                      <button className="player-controls-main" onClick={handlePlayToggle}>
                        <i
                          className={`ti ${isPlayingThis ? "ti-player-pause" : "ti-player-play"}`}
                          aria-hidden="true"
                        />
                      </button>
                      <button onClick={() => player.skip(10)} aria-label="10 Sekunden vor">
                        <i className="ti ti-rewind-forward-10" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="player-actions-row">
                      <button
                        className={inQueue ? "active" : ""}
                        onClick={handleEnqueue}
                        aria-label="Zur Warteschlange hinzufügen"
                      >
                        <i className="ti ti-playlist-add" aria-hidden="true" />
                        <span>Queue</span>
                      </button>
                      <button onClick={player.cycleSpeed} aria-label="Wiedergabegeschwindigkeit ändern">
                        <i className="ti ti-gauge" aria-hidden="true" />
                        <span>{player.playbackRate}x</span>
                      </button>
                      <button
                        className={listened ? "active" : ""}
                        onClick={toggleListened}
                        aria-label="Als gehört markieren"
                      >
                        <i className="ti ti-check" aria-hidden="true" />
                        <span>Gehört</span>
                      </button>
                      <button
                        className={bookmarked ? "active" : ""}
                        onClick={toggleBookmark}
                        aria-label={bookmarked ? "Nicht mehr merken" : "Merken"}
                      >
                        <i className="ti ti-bookmark" aria-hidden="true" />
                        <span>Merken</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="placeholder-box">Der Podcast zu dieser Episode wird noch vorbereitet.</p>
                )}
              </div>
            </div>

            <div
              className="swipe-panel"
              style={{ width: `${100 / PANELS.length}%` }}
              ref={(el) => {
                panelRefs.current[1] = el;
              }}
            >
              <div className="schaubild-card">
                {episode.schaubildUrl ? (
                  <>
                    <button
                      type="button"
                      className="schaubild-zoom-trigger"
                      onClick={openLightbox}
                      aria-label="Schaubild vergrößern"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={episode.schaubildUrl} alt={`Schaubild ${episode.name}`} />
                      <span className="schaubild-zoom-icon">
                        <i className="ti ti-zoom-in" aria-hidden="true" />
                      </span>
                    </button>
                    <p className="schaubild-ai-note">KI-generiertes Schaubild</p>
                  </>
                ) : (
                  <p className="placeholder-box">
                    Für diese Episode ist noch kein Schaubild verfügbar.
                  </p>
                )}
              </div>
            </div>

            <div
              className="swipe-panel"
              style={{ width: `${100 / PANELS.length}%` }}
              ref={(el) => {
                panelRefs.current[2] = el;
              }}
            >
              <QuizPlayer questions={episode.quiz} />
            </div>
          </div>
        </div>

        {index > 0 && (
          <button
            className="swipe-arrow swipe-arrow-left"
            onClick={() => goTo(index - 1)}
            aria-label="Zurück"
          >
            <i className="ti ti-chevron-left" aria-hidden="true" />
          </button>
        )}
        {index < PANELS.length - 1 && (
          <button
            className="swipe-arrow swipe-arrow-right"
            onClick={() => goTo(index + 1)}
            aria-label="Weiter"
          >
            <i className="ti ti-chevron-right" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="swipe-dots">
        {PANELS.map((p, i) => (
          <button
            key={p.key}
            type="button"
            className={`swipe-dot-item ${i === index ? "active" : ""}`}
            onClick={() => goTo(i)}
          >
            <span className="swipe-dot" />
            {p.label}
          </button>
        ))}
      </div>

      <p className="ai-disclaimer">
        Dieser Podcast wurde mit KI erstellt und fachlich geprüft. Er ersetzt nicht die
        Originalleitlinie.
      </p>

      {lightboxOpen && episode.schaubildUrl && (
        <div className="schaubild-lightbox" onClick={closeLightbox}>
          <button
            type="button"
            className="schaubild-lightbox-close"
            onClick={closeLightbox}
            aria-label="Schließen"
          >
            <i className="ti ti-x" aria-hidden="true" />
          </button>
          <div className="schaubild-lightbox-scroll">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={episode.schaubildUrl}
              alt={`Schaubild ${episode.name}`}
              className={lightboxZoomed ? "zoomed" : ""}
              onClick={(e) => {
                e.stopPropagation();
                setLightboxZoomed((z) => !z);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
