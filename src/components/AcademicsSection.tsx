"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function AcademicsSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-start justify-center px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-6">
     [ EDUCATION ]
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
     Academia
    </h2>
    <div className="border-l-2 border-white/20 pl-6 py-2 space-y-2">
     <h3 className="text-3xl font-bold uppercase tracking-tight">
      COER University
     </h3>
     <p className="text-xl text-white/70 font-light">Bachelor of Technology</p>
     <p className="text-lg text-white/50 font-mono tracking-wide">
      Computer Science & Engineering
     </p>
     <div className="mt-4 inline-block px-4 py-1 border border-white/20 rounded-full text-sm tracking-wider uppercase bg-white/5">
      Currently in 6th Semester
     </div>
    </div>
   </div>
  </motion.section>
 );
}
