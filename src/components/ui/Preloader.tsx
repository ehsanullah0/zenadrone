"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "lucide-react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide scrollbar while preloader is active to prevent scrolling early
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 2200); // 2.2 seconds preloader

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-[#0b101e] flex flex-col items-center justify-center text-white"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="mb-8 relative"
          >
            {/* Cool tech scope / drone targeting symbol */}
            <Crosshair size={72} strokeWidth={1.5} className="text-[#8DC63F]" />
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#8DC63F] blur-2xl rounded-full mix-blend-screen z-[-1]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl font-extrabold tracking-widest uppercase mb-4 shadow-black drop-shadow-lg">
              Zena<span className="text-[#145d94]">Drone</span>
            </h1>
            <div className="h-1.5 w-40 bg-white/10 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-[#145d94] to-[#8DC63F]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
