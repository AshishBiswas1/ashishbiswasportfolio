"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function AcademicsSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ EDUCATION ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8">
     Academia
    </h2>
    <div className="border-l-2 border-white/20 pl-4 sm:pl-6 py-2 space-y-2">
     <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight">
      COER University
     </h3>
     <p className="text-base sm:text-lg md:text-xl text-white/70 font-light">
      Bachelor of Technology
     </p>
     <p className="text-sm sm:text-base md:text-lg text-white/50 font-mono tracking-wide">
      Computer Science & Engineering
     </p>
     <div className="mt-4 inline-block px-3 sm:px-4 py-1 sm:py-1.5 border border-white/20 rounded-full text-xs sm:text-sm tracking-wider uppercase bg-white/5">
      Currently in 6th Semester
     </div>
    </div>
   </div>
  </motion.section>
 );
}
