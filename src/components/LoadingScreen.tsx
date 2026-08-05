"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F3040]"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-1.5 text-center px-4"
          >
            <h1 className="font-sans font-bold text-xl sm:text-2xl tracking-wide text-white uppercase leading-tight">
              PANKAJ AGRAWAL &amp; CO
            </h1>
            <p className="font-sans font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#D99B7F]">
              CHARTERED ACCOUNTANTS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
