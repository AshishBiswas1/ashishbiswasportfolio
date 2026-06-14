"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function SkillsSection({ style }: { style: SectionStyle }) {
 const { skills } = useScrollState();

 // Display skills if available, otherwise show placeholder
 const displaySkills = skills && skills.length > 0 ? skills : [];

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-30 transform-3d"
  >
   <div className="w-full text-center bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ CAPABILITIES ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 sm:mb-8 md:mb-12">
     Technical Arsenal
    </h2>
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
     {displaySkills.length > 0 ? (
      displaySkills.map((skill) => (
       <div
        key={skill._id}
        className="px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-4 border border-white/20 rounded-full text-xs sm:text-sm md:text-base tracking-wider uppercase backdrop-blur-sm bg-black/40 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 cursor-default shadow-lg"
       >
        {skill.name}
       </div>
      ))
     ) : (
      <div className="text-white/50 text-sm">Loading skills...</div>
     )}
    </div>
   </div>
  </motion.section>
 );
}
