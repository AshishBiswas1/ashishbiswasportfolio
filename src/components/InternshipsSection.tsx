"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function InternshipsSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-end justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl text-right">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ EXPERIENCE ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8">
     Internships
    </h2>
    <div className="border-r-2 border-white/20 pr-4 sm:pr-6 py-2 space-y-3 sm:space-y-4">
     <div>
      <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight">
       KPMG Greece
      </h3>
      <p className="text-base sm:text-lg md:text-xl text-white/70 font-light">
       Summer Internship Program
      </p>
      <p className="text-xs sm:text-sm text-white/40 font-mono tracking-wide mt-1">
       APRIL 2026
      </p>
     </div>

     <div className="pt-3 sm:pt-4 border-t border-white/10">
      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight">
       South Asian University (SAU)
      </h3>
      <p className="text-sm sm:text-base md:text-lg text-white/70 font-light">
       Research & Development Intern
      </p>
     </div>
    </div>
   </div>
  </motion.section>
 );
}
