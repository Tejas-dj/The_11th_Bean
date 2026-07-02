'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const DISMISS_KEY = 'bean_renovation_popup_dismissed';

export function RenovationPopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    // If the user already saw it this session, don't show it again
    if (dismissed === 'true') return;

    // Show after page loader finishes (1.8s) + a small delay
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
            onClick={dismiss}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-cream rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-cream/80 hover:bg-cream text-espresso transition-colors backdrop-blur-md shadow-sm"
              aria-label="Close popup"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            {/* Image Section */}
            <div className="relative w-full h-64 md:h-auto md:w-1/2 shrink-0 bg-[#Fdfbf7] p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-caramel/20">
              <div className="relative w-full h-full min-h-[250px]">
                <Image
                  src="/images/poster_renovation.webp"
                  alt="Renovation Notice Poster"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 overflow-y-auto">
              <div className="mb-6 inline-flex">
                <span className="px-3 py-1 bg-caramel/10 text-caramel rounded-full text-[10px] font-bold tracking-widest uppercase border border-caramel/20">
                  Important Update
                </span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 leading-tight italic">
                We're Renovating!
              </h2>
              
              <div className="space-y-4 text-espresso/80 font-sans text-sm md:text-base leading-relaxed">
                <p>
                  <strong>The 11th Bean is temporarily closed for renovations.</strong>
                </p>
                <p>
                  Good things take time... and a little renovation. We are working hard to create an even better space for you to sip, relax, and make memories.
                </p>
                <p className="font-serif text-lg text-caramel font-medium tracking-wide">
                  BIGGER SPACE. SAME HEART.
                </p>
                <p>
                  Thank you for your love and patience. We'll be brewing again very soon!
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-caramel/20">
                <button
                  onClick={dismiss}
                  className="w-full py-3.5 bg-espresso text-cream rounded-xl font-medium tracking-wide hover:bg-caramel transition-colors focus:outline-none focus:ring-2 focus:ring-caramel focus:ring-offset-2 focus:ring-offset-cream"
                >
                  Got it, I'll be back!
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
