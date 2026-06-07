"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import Image from "next/image";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export interface Project {
 _id: string;
 title: string;
 description: string;
 technologies: string[];
 image: string;
}

export default function ProjectsSection({
 style,
 projects,
}: {
 style: SectionStyle;
 projects: Project[];
}) {
 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-8 max-w-7xl mx-auto w-full h-full z-30 transform-3d"
  >
   <div className="mb-8 bg-black/40 inline-block p-6 rounded-3xl backdrop-blur-md border border-white/10">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-2">
     [ PORTFOLIO ]
    </div>
    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
     Top Work
    </h2>
   </div>

   <div className="grid md:grid-cols-3 gap-6 w-full max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
    {projects.length > 0 ? (
     projects.map((project) => (
      <div
       key={project._id}
       className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 overflow-hidden hover:border-white/40 transition-colors duration-500 rounded-3xl shadow-2xl flex flex-col"
      >
       <div className="h-40 mb-6 overflow-hidden relative bg-black rounded-xl shrink-0">
        {project.image && project.image !== "default-project.jpg" ? (
         <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0"
         />
        ) : (
         <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
          NO ASSET
         </div>
        )}
       </div>
       <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">
        {project.title}
       </h3>
       <p className="text-white/60 text-sm font-light mb-6 line-clamp-3 grow">
        {project.description}
       </p>
       <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.slice(0, 3).map((tech) => (
         <span
          key={tech}
          className="text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full bg-black/30"
         >
          {tech}
         </span>
        ))}
       </div>
      </div>
     ))
    ) : (
     <div className="col-span-3 flex items-center justify-center h-48 border border-white/10 bg-[#0a0a0a] rounded-3xl">
      <span className="text-white/40 font-mono uppercase tracking-widest text-sm animate-pulse">
       Awaiting Top 3 Projects from CMS...
      </span>
     </div>
    )}
   </div>
  </motion.section>
 );
}
