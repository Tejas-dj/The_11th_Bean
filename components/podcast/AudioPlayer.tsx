'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface AudioPlayerProps {
  audioUrl?: string;
  duration: string;
  compact?: boolean;
  onPlay?: () => void;
  externalPlaying?: boolean;
  onToggleExternal?: (playing: boolean) => void;
}

export function AudioPlayer({ audioUrl, duration, compact = false, onPlay, externalPlaying, onToggleExternal }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSecs, setCurrentSecs] = useState(0);
  const [speed, setSpeed] = useState(1);
  const SPEEDS = [0.5, 1, 1.5, 2] as const;

  const isPlaying = externalPlaying !== undefined ? externalPlaying : playing;

  const init = useCallback(() => {
    if (!audioRef.current) {
      // TODO: Replace with real audio URL from Shishir's podcast
      audioRef.current = new Audio(audioUrl ?? '');
      audioRef.current.playbackRate = speed;
      audioRef.current.addEventListener('timeupdate', () => {
        const a = audioRef.current!;
        if (a.duration) {
          setProgress((a.currentTime / a.duration) * 100);
          setCurrentSecs(Math.floor(a.currentTime));
        }
      });
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false);
        onToggleExternal?.(false);
        setProgress(0);
        setCurrentSecs(0);
      });
    }
  }, [audioUrl, speed, onToggleExternal]);

  const toggle = useCallback(() => {
    init();
    const a = audioRef.current!;
    if (isPlaying) {
      a.pause();
      setPlaying(false);
      onToggleExternal?.(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
      onToggleExternal?.(true);
      onPlay?.();
    }
  }, [init, isPlaying, onPlay, onToggleExternal]);

  const seek = useCallback((pct: number) => {
    init();
    const a = audioRef.current!;
    if (a.duration) a.currentTime = (pct / 100) * a.duration;
    setProgress(pct);
  }, [init]);

  const cycleSpeed = useCallback(() => {
    const next = SPEEDS[(SPEEDS.indexOf(speed as typeof SPEEDS[number]) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }, [speed]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const [durMins, durSecs] = duration.split(':').map(Number);
  const totalSecs = durMins * 60 + (durSecs ?? 0);
  const curMins = Math.floor(currentSecs / 60);
  const curSec  = currentSecs % 60;
  const fmt = (m: number, s: number) => `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  if (compact) {
    return (
      <div className="flex items-center gap-3 w-full" role="region" aria-label="Audio player">
        <PlayPauseBtn playing={isPlaying} onToggle={toggle} size={36} />
        <ProgressBar progress={progress} onSeek={seek} accentColor="#C8A96E" />
        <span className="font-mono text-xs text-cream/50 flex-shrink-0 w-10 text-right">{fmt(curMins, curSec)}</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full" role="region" aria-label="Audio player">
      <div className="flex items-center gap-4">
        <PlayPauseBtn playing={isPlaying} onToggle={toggle} size={44} />
        <div className="flex-1 space-y-1.5">
          <ProgressBar progress={progress} onSeek={seek} accentColor="#C8A96E" />
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs text-cream/45" aria-live="polite">{fmt(curMins, curSec)}</span>
            <div className="flex items-center gap-3">
              <button onClick={cycleSpeed} className="font-mono text-[10px] text-cream/40 hover:text-rattan transition-colors px-1.5 py-0.5 rounded border border-cream/20" aria-label={`Playback speed: ${speed}x`}>
                {speed}x
              </button>
              <span className="font-mono text-xs text-cream/45">{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayPauseBtn({ playing, onToggle, size }: { playing: boolean; onToggle: () => void; size: number }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      className="rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: '#C8A96E' }}
      aria-label={playing ? 'Pause episode' : 'Play episode'}
    >
      {playing
        ? <svg width="12" height="12" viewBox="0 0 12 12" fill="#2A2320" aria-hidden="true"><rect x="1.5" y="1" width="3.5" height="10" rx="1"/><rect x="7" y="1" width="3.5" height="10" rx="1"/></svg>
        : <svg width="12" height="12" viewBox="0 0 12 12" fill="#2A2320" aria-hidden="true"><path d="M2.5 1.5L10.5 6L2.5 10.5V1.5Z"/></svg>
      }
    </motion.button>
  );
}

function ProgressBar({ progress, onSeek, accentColor }: { progress: number; onSeek: (p: number) => void; accentColor: string }) {
  return (
    <div
      className="w-full h-1 rounded-full cursor-pointer overflow-hidden"
      style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
      role="slider" aria-label="Seek" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onSeek(((e.clientX - rect.left) / rect.width) * 100);
      }}
    >
      <motion.div className="h-full rounded-full" style={{ backgroundColor: accentColor, width: `${progress}%` }} transition={{ duration: 0.1 }} />
    </div>
  );
}
