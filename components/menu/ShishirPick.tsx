import Image from 'next/image';
import { menuItems } from '@/data/menu';
import { TastingChart } from './TastingChart';

const pick = menuItems.find((i) => i.isShishirsPick)!;

export function ShishirPick() {
  if (!pick) return null;
  return (
    <div
      className="rounded-2xl overflow-hidden mt-20"
      style={{ backgroundColor: '#2A2320' }}
      aria-label="Shishir's current pick"
    >
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left: accent stripe */}
        <div className="w-full lg:w-1 bg-rattan flex-shrink-0" aria-hidden="true" />

        <div className="flex flex-col md:flex-row gap-8 p-8 lg:p-10 flex-1">
          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <p className="text-rattan text-[10px] font-sans tracking-[0.2em] uppercase">
                Shishir's current pick
              </p>
              <div aria-hidden="true" className="flex-shrink-0">
                <Image
                  src="/mascot/tasting.svg"
                  alt=""
                  width={64}
                  height={64}
                  className="opacity-50"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            <h3
              className="text-cream text-2xl md:text-3xl font-medium"
              style={{ fontFamily: 'var(--font-lora), Georgia, serif' }}
            >
              {pick.name}
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              {/* TODO: Replace with Shishir's actual personal note — updated periodically */}
              "I've been drinking this three times a day for the last two weeks. The beans are from a small estate in Coorg. The farmer does a natural process that most roasters won't touch because it's inconsistent. Ours isn't inconsistent. It's just a little wild, which is the whole point."
            </p>
            {pick.origin && (
              <p className="text-cream/40 text-xs">
                Origin: {pick.origin}, {pick.originRegion}
                {pick.brewMethod && <> · {pick.brewMethod}</>}
              </p>
            )}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono text-rattan">₹{pick.price}</span>
              {pick.tags?.map((tag) => (
                <span key={tag} className="text-[11px] bg-cream/10 text-cream/50 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Tasting chart */}
          {pick.tastingNotes && (
            <div className="flex flex-col items-center justify-center gap-3 flex-shrink-0">
              <TastingChart notes={pick.tastingNotes} size={130} />
              <p className="text-cream/30 text-[10px] uppercase tracking-widest">Tasting notes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
