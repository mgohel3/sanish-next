"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after a short cinematic delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Four pastel brand colors for the logo icon dots
  const dots = [
    { color: "#8EA9C4", delay: 0 },    // Accent Blue
    { color: "#D9C5B2", delay: 0.15 }, // Soft Bronze
    { color: "#E0E5DF", delay: 0.3 },  // Sage Green
    { color: "#D4C4C7", delay: 0.45 }, // Soft Rose
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
          {/* Soft animated pastel gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[#F6F1F8] via-[#EFE7F3] to-[#FBF8F5] opacity-80"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          />

          <div className="relative flex items-center gap-5 z-10">
            {/* Logo Icon Grid */}
            <div className="grid grid-cols-2 gap-[1.5px]">
              {dots.map((dot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1], 
                    scale: [0, 1.1, 1] 
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: dot.delay,
                    ease: "easeInOut"
                  }}
                  className="w-[18px] h-[18px] rounded-full shadow-sm"
                  style={{ backgroundColor: dot.color }}
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
