"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const isDev = process.env.NODE_ENV === "development";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(!isDev);

  useEffect(() => {
    if (isDev) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Brand monogram colours — matches the 2×2 dot grid exactly
  const dots = [
    { color: "#fabf7d", delay: 0 },    // top-left  — apricot
    { color: "#ac8cc0", delay: 0.12 }, // top-right — purple
    { color: "#f39ba2", delay: 0.24 }, // bottom-left — pink
    { color: "#85addc", delay: 0.36 }, // bottom-right — blue
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Soft animated pastel gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white via-[#f3f4f6] to-[#e5e7eb] opacity-90"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          <div className="relative flex items-center gap-5 z-10">
            {/* Logo Icon Grid */}
            <div className="grid grid-cols-2" style={{ gap: "1.3px" }}>
              {dots.map((dot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: dot.delay, ease: "easeOut" }}
                  className="rounded-full"
                  style={{ width: 20, height: 20, backgroundColor: dot.color }}
                />
              ))}
            </div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-end pt-1"
            >
              <div className="font-sans text-[42px] leading-none font-normal tracking-[0.05em] text-[#2A2A2A] lowercase">
                sanish
              </div>
              <div className="font-sans text-[15px] leading-none font-normal tracking-[0.08em] text-[#4A4A4A] lowercase mt-1 pr-1">
                laminate
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
