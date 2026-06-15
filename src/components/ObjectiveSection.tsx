"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function ObjectiveSection({ style }: { style: SectionStyle }) {
 const { objective } = useScrollState();

 const headline =
  objective?.headline ??
  "Driving digital innovation through scalable architecture.";
 const description =
  objective?.description ??
  "As a passionate Full-Stack Developer specializing in the MERN stack and Next.js, my objective is to architect and deploy highly optimized, user-centric web applications.";

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
     {headline}
    </h2>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
     {description}
    </p>

    {objective?.focusAreas?.length ? (
     <div className="mt-6 sm:mt-8">
      <div className="text-xs font-mono tracking-widest text-white/40 mb-3">
       FOCUS AREAS
      </div>
      <div className="flex flex-wrap gap-2">
       {objective.focusAreas.map((area) => (
        <span
         key={area.title}
         className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs sm:text-sm"
        >
         {area.title}
        </span>
       ))}
      </div>
     </div>
    ) : null}
   </div>
  </motion.section>
 );
}
