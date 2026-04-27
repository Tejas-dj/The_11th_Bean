'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioPlayer } from './AudioPlayer';
import type { Episode } from '@/data/episodes';

interface PersistentPlayerProps {
  episode: Episode | null;
  playing: boolean;
  onToggle: (playing: boolean) => void;
  onClose: () => void;
}

export function PersistentPlayer({ episode, playing, onToggle, onClose }: PersistentPlayerProps) {
  return (
    <AnimatePresence>
      {episode && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[990]"
          role="region"
          aria-label={`Now playing: ${episode.title}`}
          aria-live="polite"
        >
          <div
            className="px-4 md:px-8 py-3 flex items-center gap-4"
            style={{ backgroundColor: '#1e1a17', borderTop: '1px solid rgba(200,169,110,0.15)' }}
          >
            {/* Thumbnail */}
            <div
              className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: '#3a3028' }}
              aria-hidden="true"
            >
              <span className="font-mono text-cream/40 text-[9px]">EP{episode.number}</span>
            </div>

            {/* Episode title */}
            <div className="hidden md:block flex-shrink-0 w-48 lg:w-64">
              <p className="text-cream text-xs font-medium truncate">{episode.title}</p>
              <p className="text-cream/35 text-[10px] font-mono">Ep. {episode.number}</p>
            </div>

            {/* Player — takes remaining space */}
            <div className="flex-1">
              <AudioPlayer
                duration={episode.duration}
                audioUrl={episode.audioUrl}
                compact
                externalPlaying={playing}
                onToggleExternal={onToggle}
              />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-cream/40 hover:text-cream transition-colors"
              aria-label="Close player"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
