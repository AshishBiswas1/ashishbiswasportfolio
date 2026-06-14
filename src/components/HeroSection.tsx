"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function HeroSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-10 transform-3d"
  >
   <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-12">
    <div className="flex-1 space-y-3 sm:space-y-4 bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
     <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-tight">
      Ashish <br /> Biswas
     </h1>
     <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-white mb-4 sm:mb-6 md:mb-8" />
     <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/70 font-light tracking-widest uppercase">
      Full-Stack Developer
     </h2>
    </div>

    <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
     <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-2xl flex items-center justify-center">
       <div className="text-white/30 text-center">
        <div className="text-4xl md:text-5xl lg:text-6xl mb-2">👨‍💻</div>
        <p className="text-xs md:text-sm">Developer</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </motion.section>
 );
}
