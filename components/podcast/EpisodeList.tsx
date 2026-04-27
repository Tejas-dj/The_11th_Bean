import { SectionReveal } from '@/components/shared/SectionReveal';
import { episodes } from '@/data/episodes';
import type { Episode } from '@/data/episodes';

interface EpisodeListProps {
  nowPlayingId?: string;
  onPlay: (ep: Episode) => void;
}

export function EpisodeList({ nowPlayingId, onPlay }: EpisodeListProps) {
  return (
    <section aria-labelledby="archive-heading" className="px-6 py-16 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="mb-8">
          <h2
            id="archive-heading"
            className="text-espresso text-2xl md:text-3xl"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            All episodes
          </h2>
        </SectionReveal>

        <div className="divide-y divide-sage/20">
          {[...episodes].reverse().map((ep, i) => (
            <SectionReveal key={ep.id} delay={i * 0.05}>
              <EpisodeRow ep={ep} playing={nowPlayingId === ep.id} onPlay={() => onPlay(ep)} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EpisodeRow({ ep, playing, onPlay }: { ep: Episode; playing: boolean; onPlay: () => void }) {
  return (
    <div className={`flex items-center gap-4 py-5 group ${playing ? 'bg-sage/10 -mx-4 px-4 rounded-xl' : ''}`}>
      {/* Thumbnail */}
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
        style={{ backgroundColor: playing ? '#C8A96E' : '#B8B394' }}
        aria-hidden="true"
      >
        <span className="font-mono text-cream text-[10px]">EP{ep.number}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-espresso/40 text-[10px] font-mono">
            {new Date(ep.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          {ep.isLatest && (
            <span className="text-[10px] bg-board-red/80 text-cream px-1.5 py-0.5 rounded-full">New</span>
          )}
        </div>
        <h3
          className="text-espresso font-medium text-sm md:text-base truncate"
          style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
        >
          {ep.title}
        </h3>
        <p className="text-espresso/50 text-xs mt-0.5 line-clamp-1">{ep.description}</p>
      </div>

      {/* Duration + play */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-espresso/35 font-mono text-xs hidden md:block">{ep.duration}</span>
        <button
          onClick={onPlay}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: playing ? '#C8A96E' : 'rgba(184,179,148,0.25)' }}
          aria-label={playing ? `Now playing: ${ep.title}` : `Play ${ep.title}`}
          aria-pressed={playing}
        >
          {playing
            ? <svg width="10" height="10" viewBox="0 0 10 10" fill="#2A2320" aria-hidden="true"><rect x="1" y="1" width="3" height="8" rx="0.5"/><rect x="6" y="1" width="3" height="8" rx="0.5"/></svg>
            : <svg width="10" height="10" viewBox="0 0 10 10" fill="#2A2320" aria-hidden="true"><path d="M2 1L9 5L2 9V1Z"/></svg>
          }
        </button>
      </div>
    </div>
  );
}
