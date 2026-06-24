"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PremiumLoader({ progress }: { progress: number }) {
 // Prevent page scroll while loading
 useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
   document.body.style.overflow = "";
  };
 }, []);

 const name = "ASHISH BISWAS";
 const nameLetters = name.split("");

 return (
  <motion.div
   initial={{ opacity: 1 }}
   exit={{
    opacity: 0,
    y: "-100vh",
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
   }}
   className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center font-sans select-none overflow-hidden"
  >
   {/* Background ambient glow */}
   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none" />
   <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_30%,rgba(120,119,198,0.04)_0%,transparent_50%)] pointer-events-none animate-pulse duration-[8000ms]" />

   <div className="flex flex-col items-center gap-8 z-10">
    {/* Animated Name Logo */}
    <div className="flex gap-[0.1em] md:gap-[0.25em]">
     {nameLetters.map((char, index) => (
      <motion.span
       key={index}
       initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
       animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
       transition={{
        duration: 0.7,
        delay: index * 0.04,
        ease: [0.215, 0.61, 0.355, 1]
       }}
       className="text-lg md:text-xl font-bold tracking-[0.2em] text-white"
      >
       {char === " " ? "\u00A0" : char}
      </motion.span>
     ))}
    </div>

    {/* Loading details */}
    <div className="flex flex-col items-center gap-2">
     <div className="text-[10px] uppercase tracking-[0.3em] text-white/45 animate-pulse">
      Initializing Experience
     </div>
     
     {/* Sleek Glowing Linear Progress Bar */}
     <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
      <motion.div 
       className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
       style={{ width: `${progress}%` }}
      />
     </div>

     {/* Percentage */}
     <motion.div 
      key={progress}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      className="text-[11px] font-medium tracking-widest text-white/60 tabular-nums mt-1"
     >
      {progress}%
     </motion.div>
    </div>
   </div>
  </motion.div>
 );
}
