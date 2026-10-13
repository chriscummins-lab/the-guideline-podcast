"use client";

import { usePlayer } from "./PlayerProvider";

export default function QueuePanel() {
  const { queue, queueOpen, toggleQueueOpen, playFromQueue, removeFromQueue, clearQueue, track } =
    usePlayer();

  if (!queueOpen) return null;

  return (
    <div className="queue-overlay" onClick={toggleQueueOpen}>
      <div className="queue-panel" onClick={(e) => e.stopPropagation()}>
        <div className="queue-panel-header">
          <span>Warteschlange</span>
          <button className="queue-panel-close" onClick={toggleQueueOpen} aria-label="Schließen">
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        {track && (
          <div className="queue-now-playing">
            <i className="ti ti-player-play" aria-hidden="true" />
            <div className="queue-item-info">
              <div className="queue-item-title">{track.title}</div>
              <div className="queue-item-sub">{track.subtitle}</div>
            </div>
            <span className="queue-now-label">läuft</span>
          </div>
        )}

        {queue.length === 0 ? (
          <p className="queue-empty">Die Warteschlange ist leer.</p>
        ) : (
          <>
            <div className="queue-list">
              {queue.map((t) => (
                <div className="queue-item" key={t.storageKey}>
                  <button
                    className="queue-item-play"
                    onClick={() => playFromQueue(t.storageKey)}
                    aria-label={`${t.title} jetzt abspielen`}
                  >
                    <i className="ti ti-player-play" aria-hidden="true" />
                  </button>
                  <div className="queue-item-info">
                    <div className="queue-item-title">{t.title}</div>
                    <div className="queue-item-sub">{t.subtitle}</div>
                  </div>
                  <button
                    className="queue-item-remove"
                    onClick={() => removeFromQueue(t.storageKey)}
                    aria-label={`${t.title} aus Warteschlange entfernen`}
                  >
                    <i className="ti ti-x" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
            <button className="queue-clear-btn" onClick={clearQueue}>
              Warteschlange leeren
            </button>
          </>
        )}
      </div>
    </div>
  );
}
