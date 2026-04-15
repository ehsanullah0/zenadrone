"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

const slides = [
  {
    id: 1,
    heading: "Intelligent Drone Technology",
    subheading: "ZenaDrone 1000 is composed of artificial intelligence (AI) and machine learning software system for autonomous flight.",
    image: "/03.png",
  },
  {
    id: 2,
    heading: "Remote Aerial Surveillance Solutions",
    subheading: "Programmable Flight Routes and Long-lasting Battery to Cover Acres of Farm Fields.",
    image: "/11.png",
  },
  {
    id: 3,
    heading: "Autonomous Inspection and Monitoring",
    subheading: "ZenaDrone is equipped with Multi spectral Sensors and 4K Cameras to Capture Vivid Videos and Images.",
    image: "/Drone15.png",
  },
  {
    id: 4,
    heading: "Field Scanning and Terrain Mapping Capabilities",
    subheading: "ZenaDrone Field Scanning and Terrain Mapping Capabilities provide Complete and Accurate Real-Time Data.",
    image: "/03.png",
  }
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // 6 seconds slide change
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image with slow continuous zoom & blur to clear */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            initial={{ scale: 1.15, filter: "blur(20px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 7, 
              ease: "easeOut",
              filter: { duration: 1.5, ease: "easeOut" } 
            }}
          />
          {/* Dark Overlay gradient for premium readable text */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 lg:px-20">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
                  }
                }}
                className="max-w-2xl text-white"
              >
                <motion.div variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md shadow-lg shadow-black/20">
                    <span className="flex h-2 w-2 rounded-full bg-[#8DC63F] animate-pulse"></span>
                    <span className="text-xs font-bold tracking-widest text-[#e8f6d7] uppercase">ZenaDrone 1000</span>
                  </div>
                </motion.div>

                <motion.h1 
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] drop-shadow-2xl"
                >
                  {slides[currentIndex].heading}
                </motion.h1>
                
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-lg md:text-xl text-gray-200 mb-10 font-medium max-w-xl drop-shadow-md border-l-4 border-[#1e609a] pl-5 py-2 bg-black/10 rounded-r-lg backdrop-blur-[2px]"
                >
                  {slides[currentIndex].subheading}
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="flex flex-wrap gap-5"
                >
                  <Button variant="blue" className="px-8 py-3.5 rounded text-sm uppercase tracking-wider shadow-2xl font-bold hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                    Contact Us
                  </Button>
                  <Button variant="outline" className="px-8 py-3.5 rounded text-sm uppercase tracking-wider shadow-2xl font-bold bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105">
                    Book A Service
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modern Active Progress Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-500 shadow-md"
            style={{ width: currentIndex === index ? "48px" : "12px" }}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="absolute inset-0 bg-white/30" />
            {currentIndex === index && (
              <motion.div 
                className="absolute inset-0 bg-[#8DC63F]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
