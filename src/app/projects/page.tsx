"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageProjectCardSkeleton() {
 return (
  <article className="bg-surface-card border border-border-subtle p-6 rounded-[4px] min-h-[250px] animate-pulse flex flex-col justify-between w-full">
   <div className="space-y-3">
    <div className="h-4 w-12 bg-white/10 rounded" />
    <div className="h-6 w-3/4 bg-white/10 rounded" />
    <div className="h-4 w-full bg-white/5 rounded" />
   </div>
   <div className="h-5 w-20 bg-white/10 rounded mt-6" />
  </article>
 );
}

export default function ProjectsPage() {
 usePortfolioData();
 const { projects, isLoadingProjects } = useScrollState();
 const containerRef = useRef<HTMLDivElement>(null);

 // Track scroll progress of the timeline container
 const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start center", "end center"],
 });

 // Smooth the scroll-activated timeline growth line
 const scaleY = useSpring(scrollYProgress, {
  stiffness: 90,
  damping: 25,
  restDelta: 0.001
 });

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-6xl text-left">
    {/* Page Header */}
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between mb-16 md:mb-24">
     <div>
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
       Technical Projects
      </p>
      <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
       Work built with systems in mind.
      </h1>
     </div>
     <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
      A focused selection of application ideas and technical directions across
      frontend interaction, backend APIs, AI workflows, and portfolio systems.
     </p>
    </div>

    {/* Interactive Timeline Container */}
    <div ref={containerRef} className="relative w-full overflow-hidden py-10">
     {/* Central Timeline line - Hidden on mobile, centered on desktop */}
     <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border-subtle/30 transform -translate-x-1/2 z-0 hidden md:block">
      <motion.div
       className="absolute top-0 bottom-0 left-0 w-full bg-linear-to-b from-gold via-gold-dim to-transparent origin-top"
       style={{ scaleY }}
      />
     </div>

     {/* Mobile Timeline line - Left aligned, height linked to scroll */}
     <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border-subtle/30 z-0 block md:hidden">
      <motion.div
       className="absolute top-0 bottom-0 left-0 w-full bg-linear-to-b from-gold via-gold-dim to-transparent origin-top"
       style={{ scaleY }}
      />
     </div>

     <div className="space-y-12 md:space-y-20 relative z-10">
      {isLoadingProjects ? (
       // Timeline Skeleton Loader
       [0, 1, 2].map((val) => (
        <div key={val} className="grid grid-cols-[30px_1fr] md:grid-cols-[1fr_40px_1fr] items-center gap-x-4 md:gap-x-8 w-full">
         {/* Left Side (Even items on desktop) */}
         <div className={val % 2 === 0 ? "hidden md:block w-full" : "hidden md:block w-full opacity-0"} >
          <SubpageProjectCardSkeleton />
         </div>
         {/* Node */}
         <div className="flex justify-center items-center">
          <div className="w-3 h-3 rounded-full bg-border-subtle animate-ping" />
         </div>
         {/* Right Side (Odd items on desktop, all items on mobile) */}
         <div className={val % 2 !== 0 ? "w-full" : "w-full md:opacity-0 md:pointer-events-none"}>
          <SubpageProjectCardSkeleton />
         </div>
        </div>
       ))
      ) : projects && projects.length > 0 ? (
       projects.map((project, index) => {
        const isEven = index % 2 === 0;

        // Custom Card Markup
        const cardMarkup = (
         <Link
          href={`/projects/${project._id}`}
          className="group block bg-surface-card border border-border-subtle p-6 rounded-[4px] hover:border-gold hover:-translate-y-1 transition duration-300 shadow-lg flex flex-col justify-between min-h-[250px] cursor-pointer"
         >
          <div>
           {/* Card Top */}
           <div className="flex items-center justify-between border-b border-border-subtle pb-4">
            <span className="font-mono text-[10px] tracking-[0.15em] text-gold">
             0{index + 1}
            </span>
            {project.deployedlink ? (
             <span
              onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               window.open(project.deployedlink, "_blank", "noopener,noreferrer");
              }}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary hover:text-gold transition cursor-pointer"
             >
              Live
             </span>
            ) : null}
           </div>
           
           {/* Title & Desc */}
           <h2 className="mt-5 font-display text-[20px] font-semibold leading-[1.25] text-text-primary mb-2">
            {project.title}
           </h2>
           <p className="text-[13px] text-text-secondary leading-relaxed font-light line-clamp-4">
            {project.shortdescription ?? project.description}
           </p>
          </div>

          {/* Technologies / Tags */}
          <div className="mt-6 flex flex-wrap gap-1.5">
           {project.technologies &&
            project.technologies.map((tech) => (
             <span
              key={tech}
              className="font-mono text-[10px] uppercase tracking-wider text-text-muted border border-border-subtle px-2 py-0.5 rounded-[2px]"
             >
              {tech}
             </span>
            ))}
          </div>
         </Link>
        );

         // Construct Date String
         let dateStr = "June 2026";
         if (project.duration && project.duration.length > 0) {
          const start = project.duration[0];
          const end = project.duration[project.duration.length - 1];
          if (start.month && start.year) {
           if (start.month === end.month && start.year === end.year) {
            dateStr = `${start.month} ${start.year}`;
           } else {
            dateStr = `${start.month} ${start.year} — ${end.month} ${end.year}`;
           }
          }
         }

         return (
          <div key={project._id} className="w-full">
           {/* DESKTOP ALTERNATING TIMELINE ROW */}
           <div className="hidden md:grid grid-cols-[1fr_40px_1fr] items-center gap-x-8 w-full">
            {/* Left Column (Even: Card, Odd: Date) */}
            <div className="w-full">
             {isEven ? (
              <motion.div
               initial={{ opacity: 0, x: -60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-120px" }}
               transition={{ duration: 0.6, ease: "easeOut" }}
              >
               {cardMarkup}
              </motion.div>
             ) : (
              <div className="flex justify-end items-center h-full pr-8">
               <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80"
               >
                {dateStr}
               </motion.div>
              </div>
             )}
            </div>

            {/* Central Node Indicator */}
            <div className="flex justify-center items-center">
             <motion.div 
              className="w-4 h-4 rounded-full border border-border-subtle bg-void flex items-center justify-center relative z-10"
              whileInView={{ scale: [1, 1.25, 1], borderColor: "var(--color-gold)", backgroundColor: "var(--color-void)" }}
              viewport={{ once: false, margin: "-120px" }}
              transition={{ duration: 0.5 }}
             >
              <motion.div 
               className="w-2 h-2 rounded-full bg-border-mid"
               whileInView={{ backgroundColor: "var(--color-gold)", boxShadow: "0 0 10px var(--color-gold)" }}
               viewport={{ once: false, margin: "-120px" }}
               transition={{ duration: 0.5 }}
              />
             </motion.div>
            </div>

            {/* Right Column (Odd: Card, Even: Date) */}
            <div className="w-full">
             {!isEven ? (
              <motion.div
               initial={{ opacity: 0, x: 60 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-120px" }}
               transition={{ duration: 0.6, ease: "easeOut" }}
              >
               {cardMarkup}
              </motion.div>
             ) : (
              <div className="flex justify-start items-center h-full pl-8">
               <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold/80"
               >
                {dateStr}
               </motion.div>
              </div>
             )}
            </div>
           </div>

           {/* MOBILE LEFT-ALIGNED TIMELINE ROW */}
           <div className="grid md:hidden grid-cols-[30px_1fr] items-center gap-x-4 w-full">
            {/* Left Node */}
            <div className="flex justify-center items-center">
             <motion.div 
              className="w-3.5 h-3.5 rounded-full border border-border-subtle bg-void flex items-center justify-center relative z-10"
              whileInView={{ scale: [1, 1.2, 1], borderColor: "var(--color-gold)", backgroundColor: "var(--color-void)" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.5 }}
             >
              <motion.div 
               className="w-1.5 h-1.5 rounded-full bg-border-mid"
               whileInView={{ backgroundColor: "var(--color-gold)", boxShadow: "0 0 8px var(--color-gold)" }}
               viewport={{ once: false, margin: "-100px" }}
               transition={{ duration: 0.5 }}
              />
             </motion.div>
            </div>

            {/* Right Card (All on mobile) */}
            <div className="w-full">
             <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
             >
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-gold/80 mb-2 pl-1">
               {dateStr}
              </div>
              {cardMarkup}
             </motion.div>
            </div>
           </div>
          </div>
         );
        })
      ) : (
       <div className="w-full text-center text-text-muted py-16 bg-surface-card border border-border-subtle rounded-[4px] relative z-10">
        No projects found.
       </div>
      )}
     </div>
    </div>
   </section>
  </main>
 );
}
