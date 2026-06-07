"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function InternshipsSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-end justify-center px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl text-right">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-6">
     [ EXPERIENCE ]
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
     Internships
    </h2>
    <div className="border-r-2 border-white/20 pr-6 py-2 space-y-4">
     <div>
      <h3 className="text-3xl font-bold uppercase tracking-tight">
       KPMG Greece
      </h3>
      <p className="text-xl text-white/70 font-light">
       Summer Internship Program
      </p>
      <p className="text-sm text-white/40 font-mono tracking-wide mt-1">
       APRIL 2026
      </p>
     </div>

     <div className="pt-4 border-t border-white/10">
      <h3 className="text-2xl font-bold uppercase tracking-tight">
       South Asian University (SAU)
      </h3>
      <p className="text-lg text-white/70 font-light">
       Research & Development Intern
      </p>
     </div>
    </div>
   </div>
  </motion.section>
 );
}
