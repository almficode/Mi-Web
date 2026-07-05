"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader({ tagline }: { tagline: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("almficode-loaded")) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("almficode-loaded", "1");
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 bg-[var(--color-dark)]"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl text-white sm:text-5xl"
          >
            Alm<span className="text-[var(--color-accent)]">fi</span>code
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm text-[var(--color-dark-text-muted)]"
          >
            {tagline}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
