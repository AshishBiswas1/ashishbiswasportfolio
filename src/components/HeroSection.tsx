"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import Image from "next/image";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function HeroSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full h-full z-10 transform-3d"
  >
   <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
    <div className="flex-1 space-y-4 bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
     <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none">
      Ashish <br /> Biswas
     </h1>
     <div className="w-24 h-1 bg-white mb-8" />
     <h2 className="text-2xl md:text-3xl text-white/70 font-light tracking-widest uppercase">
      Full-Stack Developer
     </h2>
    </div>

    <div className="flex-1 flex justify-center items-center">
     <div className="relative w-64 h-64 md:w-96 md:h-96">
      <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-700">
       <Image
        src="/default-project.jpg"
        alt="Ashish Biswas"
        fill
        className="object-cover"
       />
      </div>
     </div>
    </div>
   </div>
  </motion.section>
 );
}
