"use client";

import { motion, HTMLMotionProps, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "red" | "blue" | "white";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Magnetic Hover Hooks
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = left + width / 2;
    const middleY = top + height / 2;
    
    // Magnetic pull ratio
    x.set((clientX - middleX) * 0.25);
    y.set((clientY - middleY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-colors duration-200 rounded-lg px-8 py-4 overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-dark hover:bg-primary-hover shadow-lg shadow-primary/20",
    secondary: "bg-dark-lighter text-white hover:bg-white/10",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    red: "bg-[#cc2027] text-white hover:bg-[#a61a20]",
    blue: "bg-[#19619c] text-white hover:bg-[#124976]",
    white: "bg-white text-[#145d94] hover:bg-gray-100 shadow-md",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
