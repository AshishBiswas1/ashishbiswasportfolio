"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function ObjectiveSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ OBJECTIVE ]
    </div>
    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight">
     Driving digital innovation through scalable architecture.
    </h2>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
     As a passionate Full-Stack Developer specializing in the MERN stack and
     Next.js, my objective is to architect and deploy highly optimized,
     user-centric web applications. I strive to leverage artificial intelligence
     and modern engineering principles to solve complex problems and deliver
     best-in-class digital experiences.
    </p>
   </div>
  </motion.section>
 );
}
