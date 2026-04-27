import { SectionReveal } from '@/components/shared/SectionReveal';

export function NeighborhoodMap() {
  return (
    <section aria-labelledby="neighborhood-heading" className="py-20 lg:py-28 px-6 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <SectionReveal className="mb-12">
          <p className="text-espresso/40 text-[10px] tracking-[0.2em] uppercase mb-3">Where we are</p>
          <h2
            id="neighborhood-heading"
            className="text-espresso text-3xl md:text-4xl"
            style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
          >
            Basavanagudi
          </h2>
        </SectionReveal>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Text — 40% on desktop */}
          <SectionReveal direction="left" className="w-full lg:w-[40%] space-y-6">
            <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
              The Tata Silk Farm address carries history most people in the city have forgotten. JRD Tata started a silk cultivation venture here in 1896. The mulberry trees are gone, but the name stayed. A cafe here felt right, building something new in a place that has always been about making things.
            </p>
            <p className="text-espresso/70 text-base md:text-lg leading-relaxed">
              Basavanagudi has a particular pace. Slower than Koramangala, less self-conscious than Indiranagar. Lalbagh is a five-minute walk. Gandhi Bazaar is the kind of market that makes you feel like the city is still human-sized. The 11th Bean belongs here.
            </p>
            <div className="space-y-2 pt-2">
              {['Lalbagh Botanical Garden', 'Gandhi Bazaar', 'Bull Temple', 'South End Circle Metro'].map((landmark) => (
                <div key={landmark} className="flex items-center gap-2 text-sm text-espresso/55">
                  <span className="w-1.5 h-1.5 rounded-full bg-rattan flex-shrink-0" aria-hidden="true"/>
                  {landmark}
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Map — 60% on desktop */}
          <SectionReveal direction="right" delay={0.1} className="w-full lg:w-[60%]">
            <div className="w-full rounded-2xl overflow-hidden shadow-sm" style={{ height: 'clamp(280px, 45vh, 500px)' }}>
              <iframe
                title="The 11th Bean neighborhood map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'sepia(0.25) saturate(1.15) hue-rotate(8deg) brightness(0.97)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=12.936961,77.57711&output=embed&z=16"
                aria-label="Map of Basavanagudi neighborhood showing The 11th Bean location"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
