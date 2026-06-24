"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useRef, useState, useEffect } from "react";
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
  <div className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[300px] animate-pulse snap-center shrink-0 w-[85vw] sm:w-[45vw] md:w-[30%] md:max-w-[380px] md:snap-start">
   <div>
    <div className="h-32 sm:h-36 md:h-40 bg-white/5 rounded-lg mb-4 shrink-0" />
    <div className="h-5 bg-white/10 rounded w-2/3 mb-3" />
    <div className="h-3 bg-white/5 rounded w-full mb-1" />
    <div className="h-3 bg-white/5 rounded w-5/6 mb-4" />
   </div>
   <div className="flex gap-2 mt-auto">
    <div className="h-4 w-12 bg-white/10 rounded-full" />
    <div className="h-4 w-14 bg-white/10 rounded-full" />
    <div className="h-4 w-10 bg-white/10 rounded-full" />
   </div>
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
 const scrollRef = useRef<HTMLDivElement>(null);
 const [showLeftArrow, setShowLeftArrow] = useState(false);
 const [showRightArrow, setShowRightArrow] = useState(false);

 const checkScroll = () => {
  if (!scrollRef.current) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  setShowLeftArrow(scrollLeft > 10);
  setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 10);
 };

 const handleScroll = () => {
  checkScroll();
 };

 const scrollLeft = () => {
  if (scrollRef.current) {
   const { clientWidth } = scrollRef.current;
   scrollRef.current.scrollBy({ left: -clientWidth * 0.8, behavior: "smooth" });
  }
 };

 const scrollRight = () => {
  if (scrollRef.current) {
   const { clientWidth } = scrollRef.current;
   scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
  }
 };

 useEffect(() => {
  const timer = setTimeout(checkScroll, 100);
  window.addEventListener("resize", checkScroll);
  return () => {
   clearTimeout(timer);
   window.removeEventListener("resize", checkScroll);
  };
 }, [projects, isLoadingProjects]);

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

   <div className="relative w-full px-2 sm:px-4">
    <div
     ref={scrollRef}
     onScroll={handleScroll}
     className="flex flex-row overflow-x-auto gap-4 sm:gap-5 md:gap-6 w-full max-h-[60vh] overflow-y-hidden pr-2 md:pr-4 custom-scrollbar no-scrollbar scroll-smooth snap-x snap-mandatory"
    >
     {isLoadingProjects ? (
      <>
       <ProjectCardSkeleton />
       <ProjectCardSkeleton />
       <ProjectCardSkeleton />
      </>
     ) : projects.length > 0 ? (
      projects.map((project) => (
       <div
        key={project._id}
        className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-4 sm:p-5 md:p-6 overflow-hidden hover:border-white/40 transition-colors duration-500 rounded-2xl shadow-2xl flex flex-col min-h-[300px] snap-center shrink-0 w-[85vw] sm:w-[45vw] md:w-[30%] md:max-w-[380px] md:snap-start"
       >
        <div className="h-32 sm:h-36 md:h-40 mb-4 sm:mb-5 md:mb-6 overflow-hidden relative bg-black rounded-lg sm:rounded-xl shrink-0">
         {project.image?.[0] && project.image?.[0] !== "default-project.jpg" ? (
          // Avoid next/image remote-host restrictions; backend CMS images can be any host.
          // eslint-disable-next-line @next/next/no-img-element
          <img
           src={project.image[0]}
           alt={project.title}
           className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 filter grayscale group-hover:grayscale-0"
           crossOrigin="anonymous"
           referrerPolicy="no-referrer"
          />
         ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
           NO ASSET
          </div>
         )}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 text-white">
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
      <div className="flex items-center justify-center h-48 border border-white/10 bg-[#0a0a0a] rounded-2xl w-full">
       <span className="text-white/40 font-mono uppercase tracking-widest text-xs sm:text-sm">
        No projects found
       </span>
      </div>
     )}
    </div>

    {/* Scroll Left Button */}
    {showLeftArrow && (
     <button
      onClick={scrollLeft}
      className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/70 hover:bg-white hover:text-black border border-white/20 text-white rounded-full p-2.5 shadow-2xl transition-all duration-300 cursor-pointer z-50 hover:scale-110 active:scale-95"
      aria-label="Scroll left"
     >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
     </button>
    )}

    {/* Scroll Right Button */}
    {showRightArrow && (
     <button
      onClick={scrollRight}
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/70 hover:bg-white hover:text-black border border-white/20 text-white rounded-full p-2.5 shadow-2xl transition-all duration-300 animate-bounce cursor-pointer z-50 hover:scale-110 active:scale-95"
      aria-label="Scroll right"
     >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
     </button>
    )}
   </div>
  </motion.section>
 );
}
