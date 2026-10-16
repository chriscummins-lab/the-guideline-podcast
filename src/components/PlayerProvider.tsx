"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { setListened } from "@/lib/listened";
import { getProgress, setProgress } from "@/lib/progress";

export type Track = {
  src: string;
  title: string;
  subtitle: string;
  href: string;
  storageKey: string;
  // Nächste Folge derselben Leitlinie, für automatisches Weiterspielen nach Ende.
  autoNext?: Track;
};

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75] as const;
const RATE_STORAGE_KEY = "tgp:playbackRate";

type PlayerContextValue = {
  track: Track | null;
  playing: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  queue: Track[];
  queueOpen: boolean;
  toggleQueueOpen: () => void;
  loadAndPlay: (track: Track) => void;
  toggle: () => void;
  seekTo: (time: number) => void;
  skip: (deltaSeconds: number) => void;
  cycleSpeed: () => void;
  enqueue: (track: Track) => void;
  removeFromQueue: (storageKey: string) => void;
  clearQueue: () => void;
  playFromQueue: (storageKey: string) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer muss innerhalb von PlayerProvider verwendet werden.");
  return ctx;
}

export default function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueOpen, setQueueOpen] = useState(false);
  const lastSaveRef = useRef(0);
  const pendingResumeRef = useRef<number | null>(null);
  const queueRef = useRef<Track[]>([]);
  // Hält den geladenen Track fest, unabhängig vom React-State: setState-Updater
  // dürfen in Strict Mode doppelt laufen, Seiteneffekte wie audio.src gehören da nicht hinein.
  const currentKeyRef = useRef<string | null>(null);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(RATE_STORAGE_KEY);
      if (saved) setPlaybackRateState(parseFloat(saved));
    } catch {}
  }, []);

  const applyTrack = useCallback((next: Track) => {
    const audio = audioRef.current;
    if (!audio) return;
    currentKeyRef.current = next.storageKey;
    const resume = getProgress(next.storageKey);
    pendingResumeRef.current = resume && resume.time < resume.duration - 5 ? resume.time : null;
    audio.src = next.src;
    audio.playbackRate = playbackRate;
    setTrack(next);
    audio.play().catch(() => {});
  }, [playbackRate]);

  const loadAndPlay = useCallback(
    (next: Track) => {
      const audio = audioRef.current;
      if (!audio) return;
      if (currentKeyRef.current !== next.storageKey) {
        applyTrack(next);
      } else {
        audio.play().catch(() => {});
      }
    },
    [applyTrack]
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [track]);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
  }, []);

  const skip = useCallback((deltaSeconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = audio.duration || Infinity;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + deltaSeconds), max);
  }, []);

  const cycleSpeed = useCallback(() => {
    setPlaybackRateState((prev) => {
      const idx = SPEEDS.indexOf(prev as (typeof SPEEDS)[number]);
      const next = SPEEDS[(idx + 1) % SPEEDS.length];
      const audio = audioRef.current;
      if (audio) audio.playbackRate = next;
      try {
        window.localStorage.setItem(RATE_STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const enqueue = useCallback((next: Track) => {
    setQueue((prev) =>
      prev.some((t) => t.storageKey === next.storageKey) ? prev : [...prev, next]
    );
  }, []);

  const removeFromQueue = useCallback((storageKey: string) => {
    setQueue((prev) => prev.filter((t) => t.storageKey !== storageKey));
  }, []);

  const clearQueue = useCallback(() => setQueue([]), []);
  const toggleQueueOpen = useCallback(() => setQueueOpen((v) => !v), []);

  const playFromQueue = useCallback(
    (storageKey: string) => {
      const item = queueRef.current.find((t) => t.storageKey === storageKey);
      if (!item) return;
      setQueue((prev) => prev.filter((t) => t.storageKey !== storageKey));
      applyTrack(item);
    },
    [applyTrack]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      if (pendingResumeRef.current !== null) {
        audio.currentTime = pendingResumeRef.current;
        pendingResumeRef.current = null;
      }
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      const now = Date.now();
      if (track && now - lastSaveRef.current > 4000) {
        lastSaveRef.current = now;
        setProgress(track.storageKey, audio.currentTime, audio.duration || 0);
      }
    };
    const onEnded = () => {
      if (track) {
        setListened(track.storageKey, true);
        setProgress(track.storageKey, audio.duration || 0, audio.duration || 0);
      }
      const next = queueRef.current[0];
      if (next) {
        setQueue((prev) => prev.slice(1));
        applyTrack(next);
      } else if (track?.autoNext) {
        applyTrack(track.autoNext);
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [track, applyTrack]);

  return (
    <PlayerContext.Provider
      value={{
        track,
        playing,
        currentTime,
        duration,
        playbackRate,
        queue,
        queueOpen,
        toggleQueueOpen,
        loadAndPlay,
        toggle,
        seekTo,
        skip,
        cycleSpeed,
        enqueue,
        removeFromQueue,
        clearQueue,
        playFromQueue,
      }}
    >
      {children}
      <audio ref={audioRef} preload="metadata" style={{ display: "none" }} />
    </PlayerContext.Provider>
  );
}
