'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function AmbientPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  // Show after 1s on page load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const toggle = useCallback(() => {
    // TODO: Replace src with real ambient cafe audio file from Shishir (2-3 min loop, ~2MB)
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/cafe-ambience.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {/* browser blocked autoplay */});
    }
    setPlaying((p) => !p);
  }, [playing, volume]);

  // Cleanup on unmount
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const positionClass = isMobile
    ? 'bottom-6 left-1/2 -translate-x-1/2'
    : 'bottom-8 right-8';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed ${positionClass} z-50 flex items-center gap-3`}
          role="region"
          aria-label="Ambient cafe soundscape player"
        >
          {/* Label — desktop only, hidden after first play */}
          {!playing && !isMobile && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-espresso/60 text-xs bg-cream/90 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm"
            >
              Tap to listen
            </motion.span>
          )}

          {/* Play button */}
          <button
            onClick={toggle}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: playing ? '#8B6D4A' : '#F2E8D9', border: '1px solid rgba(184,179,148,0.4)' }}
            aria-label={playing ? 'Pause cafe ambience' : 'Play cafe ambience'}
            aria-pressed={playing}
          >
            {playing ? <WaveformIcon /> : <SoundIcon />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WaveformIcon() {
  return (
    <motion.div className="flex items-center gap-[2px]" aria-hidden="true">
      {[4, 8, 6, 10, 5, 8, 4].map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-cream"
          animate={{ scaleY: [1, h / 6, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
          style={{ height: `${h}px`, transformOrigin: 'center' }}
        />
      ))}
    </motion.div>
  );
}

function SoundIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B6D4A" strokeWidth="1.5" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
}
