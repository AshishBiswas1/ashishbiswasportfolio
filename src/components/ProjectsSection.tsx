"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import Link from "next/link";
import { useScrollState } from "@/context/ScrollContext";

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

function ProjectCardSkeleton() {
 return (
  <div className="bg-surface-card p-6 rounded-[4px] border border-border-subtle animate-pulse min-h-[350px] flex flex-col justify-between">
   <div>
    <div className="h-40 bg-white/5 rounded-[4px] mb-6" />
    <div className="h-5 bg-white/10 rounded w-2/3 mb-3" />
    <div className="h-3 bg-white/5 rounded w-full mb-1" />
    <div className="h-3 bg-white/5 rounded w-5/6 mb-4" />
   </div>
   <div className="flex gap-2">
    <div className="h-4 w-12 bg-white/10 rounded-[2px]" />
    <div className="h-4 w-14 bg-white/10 rounded-[2px]" />
   </div>
  </div>
 );
}

function ProjectSvgFallback({ index, label }: { index: number; label: string }) {
 const shapes = [
  // telecom model (mesh of intersecting lines)
  <svg key="0" className="absolute inset-0 opacity-[0.08] w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
   <line x1="0" y1="100" x2="400" y2="80" stroke="#C8A96E" strokeWidth="0.5"/>
   <line x1="0" y1="120" x2="400" y2="60" stroke="#C8A96E" strokeWidth="0.5"/>
   <line x1="50" y1="0" x2="50" y2="200" stroke="#C8A96E" strokeWidth="0.5"/>
   <line x1="150" y1="0" x2="150" y2="200" stroke="#C8A96E" strokeWidth="0.5"/>
   <line x1="250" y1="0" x2="250" y2="200" stroke="#C8A96E" strokeWidth="0.5"/>
   <line x1="350" y1="0" x2="350" y2="200" stroke="#C8A96E" strokeWidth="0.5"/>
  </svg>,
  // bridge portal (concentric circles)
  <svg key="1" className="absolute inset-0 opacity-[0.08] w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
   <circle cx="200" cy="100" r="60" stroke="#C8A96E" strokeWidth="0.5" fill="none"/>
   <circle cx="200" cy="100" r="90" stroke="#C8A96E" strokeWidth="0.5" fill="none"/>
   <circle cx="200" cy="100" r="120" stroke="#C8A96E" strokeWidth="0.5" fill="none"/>
  </svg>,
  // trip network (scattered nodes & path lines)
  <svg key="2" className="absolute inset-0 opacity-[0.08] w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
   <path d="M 40 160 L 80 120 L 120 140 L 180 80 L 240 100 L 300 60 L 360 40" stroke="#C8A96E" strokeWidth="0.5" fill="none"/>
   <path d="M 40 180 L 80 150 L 120 160 L 180 120 L 240 130 L 300 100 L 360 80" stroke="#C8A96E" strokeWidth="0.5" fill="none"/>
  </svg>
 ];

 return (
  <div className="absolute inset-0 flex items-center justify-center bg-surface-raised relative overflow-hidden">
   {shapes[index % 3]}
   <span className="font-display text-[13px] italic text-gold tracking-[0.05em] relative z-10">
    {label}
   </span>
  </div>
 );
}

export default function ProjectsSection({
 style,
 projects,
}: {
 style: SectionStyle;
 projects: Project[];
}) {
 const { isLoadingProjects } = useScrollState();

 const topThree = projects?.slice(0, 3) ?? [];

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full h-full z-30 transform-3d"
  >
   {/* Section Header */}
   <div className="flex items-baseline justify-between mb-6 sm:mb-10 text-left">
    <div>
     <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold mb-3">
      <span className="w-5 h-px bg-gold inline-block" />
      Portfolio
     </div>
     <h2 className="font-display text-[38px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none tracking-[-0.025em] text-text-primary">
      <strong>Top Work</strong>
     </h2>
    </div>
   </div>

   {/* 3-Column Projects Grid */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
    {isLoadingProjects ? (
     <>
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
     </>
    ) : topThree.length > 0 ? (
     topThree.map((project, idx) => {
      const displayScore = project.mlScore ?? (92.5 - idx * 4.5);
      const formattedNum = `0${idx + 1} / 03`;
      const fallbackLabel = 
       idx === 0 ? "ML Dashboard" : idx === 1 ? "Learning Platform" : "Travel Ecosystem";

      return (
       <Link
        key={project._id}
        href={`/projects/${project._id}`}
        className="group bg-surface-card border border-border-subtle rounded-[4px] overflow-hidden hover:border-gold-dim hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[350px] shadow-2xl cursor-pointer"
       >
        <div>
         {/* Image Header with Grayscale filter */}
         <div className="h-[180px] w-full overflow-hidden relative bg-surface-raised border-b border-border-subtle shrink-0">
          {project.image?.[0] && project.image?.[0] !== "default-project.jpg" ? (
           // eslint-disable-next-line @next/next/no-img-element
           <img
            src={project.image[0]}
            alt={project.title}
            className="h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all duration-700"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={(e) => {
             e.currentTarget.style.display = "none";
             const fallback = e.currentTarget.parentElement?.querySelector(".project-svg-fallback");
             if (fallback) fallback.classList.remove("hidden");
            }}
           />
          ) : null}
          <div className={`project-svg-fallback absolute inset-0 ${project.image?.[0] && project.image?.[0] !== "default-project.jpg" ? "hidden" : ""}`}>
           <ProjectSvgFallback index={idx} label={fallbackLabel} />
          </div>
         </div>

         {/* Body Content */}
         <div className="p-7 pb-4">
          <div className="font-mono text-[10px] text-gold tracking-[0.15em] mb-2.5">
           {formattedNum}
          </div>
          
          <h3 className="font-display text-[20px] font-semibold leading-[1.25] mb-2 text-text-primary">
           {project.title}
          </h3>
          
          <p className="text-[13px] text-text-secondary leading-relaxed font-light line-clamp-3">
           {project.shortdescription ?? project.description}
          </p>
         </div>
        </div>

        {/* Footer info & tags */}
        <div className="p-7 pt-0 flex flex-col gap-4">
         <div className="flex flex-wrap gap-1.5">
          {(project.technologies ?? []).slice(0, 3).map((tech) => (
           <span
            key={tech}
            className="font-mono text-[10px] uppercase tracking-wider text-text-muted border border-border-subtle px-2 py-0.5 rounded-[2px]"
           >
            {tech}
           </span>
          ))}
         </div>

         {/* Glowing Score Bar */}
         <div className="flex items-center gap-3">
          <div className="flex-1 h-[2px] bg-border-subtle rounded-full overflow-hidden">
           <div 
            className="h-full bg-gradient-to-r from-gold to-gold/50 rounded-full"
            style={{ width: `${displayScore}%` }}
           />
          </div>
          <span className="font-mono text-[10px] text-gold tracking-[0.05em] shrink-0">
           {displayScore.toFixed(1)} / 100
          </span>
         </div>
        </div>
        </Link>
      );
     })
    ) : (
     <div className="col-span-3 py-16 text-center bg-surface-card border border-border-subtle rounded-[4px]">
      <span className="text-text-muted font-mono text-xs uppercase tracking-widest">
       No projects found
      </span>
     </div>
    )}
   </div>
  </motion.section>
 );
}
