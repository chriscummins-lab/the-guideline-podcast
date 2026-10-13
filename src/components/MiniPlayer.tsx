"use client";

import Link from "next/link";
import { usePlayer } from "./PlayerProvider";

function formatTime(sec: number): string {
  if (!sec || Number.isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MiniPlayer() {
  const { track, playing, currentTime, duration, toggle, skip, queue, toggleQueueOpen } =
    usePlayer();

  if (!track) return null;

  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="mini-player">
      <div className="mini-player-progress">
        <div className="mini-player-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="mini-player-row">
        <button
          className="mini-player-skipbtn"
          onClick={() => skip(-10)}
          aria-label="10 Sekunden zurück"
        >
          <i className="ti ti-rewind-backward-10" aria-hidden="true" />
        </button>
        <button
          className="mini-player-playbtn"
          onClick={toggle}
          aria-label={playing ? "Pause" : "Abspielen"}
        >
          <i className={`ti ${playing ? "ti-player-pause" : "ti-player-play"}`} aria-hidden="true" />
        </button>
        <button
          className="mini-player-skipbtn"
          onClick={() => skip(10)}
          aria-label="10 Sekunden vor"
        >
          <i className="ti ti-rewind-forward-10" aria-hidden="true" />
        </button>
        <Link href={track.href} className="mini-player-info">
          <span className="mini-player-title">{track.title}</span>
          <span className="mini-player-sub">{track.subtitle}</span>
        </Link>
        <span className="mini-player-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <button
          className="mini-player-queuebtn"
          onClick={toggleQueueOpen}
          aria-label="Warteschlange anzeigen"
        >
          <i className="ti ti-playlist" aria-hidden="true" />
          {queue.length > 0 && <span className="mini-player-queue-badge">{queue.length}</span>}
        </button>
      </div>
    </div>
  );
}
