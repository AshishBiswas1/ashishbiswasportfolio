"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export interface Project {
 _id: string;
 title: string;
 shortdescription: string;
 description: string;
 technologies: string[];
 gitlink?: string[];
 deployedlink?: string;
 image?: string[];
 mlScore?: number;
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
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-30 transform-3d"
  >
   <div className="mb-6 md:mb-8 bg-black/40 inline-block p-4 sm:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/10">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-2">
     [ PORTFOLIO ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
     Top Work
    </h2>
   </div>

   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-h-[60vh] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
    {projects.length > 0 ? (
     projects.map((project) => (
      <div
       key={project._id}
       className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 md:p-6 overflow-hidden hover:border-white/40 transition-colors duration-500 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col"
      >
       <div className="h-32 sm:h-36 md:h-40 mb-4 sm:mb-5 md:mb-6 overflow-hidden relative bg-black rounded-lg sm:rounded-xl shrink-0">
       {project.image?.[0] && project.image?.[0] !== "default-project.jpg" ? (
         // Avoid next/image remote-host restrictions; backend CMS images can be any host.
         // eslint-disable-next-line @next/next/no-img-element
         <img
          src={project.image[0]}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0"
         />
        ) : (
         <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
          NO ASSET
         </div>
        )}
       </div>
       <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight mb-2">
        {project.title}
       </h3>
       <p className="text-white/60 text-xs sm:text-sm font-light mb-4 sm:mb-5 md:mb-6 line-clamp-3 grow">
        {project.shortdescription ?? project.description}
       </p>
       {typeof project.mlScore === "number" ? (
        <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-white/35">
         ML Score {project.mlScore}
        </p>
       ) : null}
       <div className="flex flex-wrap gap-2 mt-auto">
        {(project.technologies ?? []).slice(0, 3).map((tech) => (
         <span
          key={tech}
          className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-full bg-black/30"
         >
          {tech}
         </span>
        ))}
       </div>
      </div>
     ))
    ) : (
     <div className="col-span-1 sm:col-span-2 md:col-span-3 flex items-center justify-center h-48 border border-white/10 bg-[#0a0a0a] rounded-xl sm:rounded-2xl md:rounded-3xl">
      <span className="text-white/40 font-mono uppercase tracking-widest text-xs sm:text-sm animate-pulse">
       Loading top projects from /api/v1/projects/?sort=-mlScore&limit=3
      </span>
     </div>
    )}
   </div>
  </motion.section>
 );
}
