'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Minimum display time so the mascot isn't just a flash
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Mascot — fills most of the viewport */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
            className="w-[68vw] h-[68vw] max-w-md max-h-[65vh]"
          >
            <Image
              src="/mascot/namaste.svg"
              alt="The 11th Bean mascot greeting you"
              width={500}
              height={500}
              priority
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Wordmark — width-matched to mascot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.35, duration: 0.5 } }}
            className="w-[68vw] max-w-md flex flex-col items-center gap-1 mt-2"
          >
            <p className="font-serif italic text-espresso/55 text-lg md:text-xl tracking-widest w-full text-center">
              to the 11th bean
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-caramel/60"
            initial={{ width: '0%' }}
            animate={{ width: '100%', transition: { duration: 1.6, ease: 'easeInOut' } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
