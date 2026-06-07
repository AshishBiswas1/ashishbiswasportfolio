"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

const skills = [
 "MongoDB",
 "Express.js",
 "React",
 "Node.js",
 "Next.js",
 "TypeScript",
 "Tailwind CSS",
 "Python",
 "Artificial Intelligence",
 "Machine Learning",
 "Git / GitHub",
 "REST APIs",
];

export default function SkillsSection({ style }: { style: SectionStyle }) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-center justify-center px-8 max-w-7xl mx-auto w-full h-full z-30 transform-3d"
  >
   <div className="w-full text-center bg-black/40 backdrop-blur-md p-12 rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-6">
     [ CAPABILITIES ]
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
     Technical Arsenal
    </h2>
    <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
     {skills.map((skill) => (
      <div
       key={skill}
       className="px-6 py-4 border border-white/20 rounded-full text-sm md:text-base tracking-wider uppercase backdrop-blur-sm bg-black/40 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 cursor-default shadow-lg"
      >
       {skill}
      </div>
     ))}
    </div>
   </div>
  </motion.section>
 );
}
