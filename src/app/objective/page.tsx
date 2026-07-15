"use client";

import { motion } from "framer-motion";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function ObjectivePage() {
 usePortfolioData();
 const { objective, isLoadingObjective } = useScrollState();

 const headline =
  objective?.headline ??
  "Driving digital innovation through scalable architecture.";
 const description =
  objective?.description ??
  "As a passionate Full-Stack Developer specializing in the MERN stack and Next.js, my objective is to architect and deploy highly optimized, user-centric web applications.";

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-6xl text-left">
    {/* Subtitle */}
    <motion.p 
     initial={{ opacity: 0, y: 10 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold"
    >
     Career Objective
    </motion.p>
    
    {/* Animated Headline */}
    <motion.h1 
     initial={{ opacity: 0, y: 15 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.6, delay: 0.1 }}
     className="mt-3 md:mt-5 max-w-5xl font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary"
    >
     {isLoadingObjective ? (
      <span className="text-white/10 animate-pulse">Loading core statement...</span>
     ) : (
      headline
     )}
    </motion.h1>

    {isLoadingObjective ? (
     <div className="mt-8 md:mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] animate-pulse">
      <article className="border border-border-subtle bg-surface-card p-8 space-y-4 rounded-sm">
       <div className="h-6 w-1/4 bg-white/10 rounded" />
       <div className="h-4 w-full bg-white/5 rounded" />
       <div className="h-4 w-5/6 bg-white/5 rounded" />
      </article>
      <aside className="border border-border-subtle bg-surface-card p-8 space-y-4 rounded-sm">
       <div className="h-6 w-1/3 bg-white/10 rounded" />
       <div className="h-4 w-full bg-white/5 rounded" />
      </aside>
     </div>
    ) : (
     <div className="mt-8 md:mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Description Article */}
      <motion.article 
       initial={{ opacity: 0, y: 25 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.7, delay: 0.2 }}
       className="border border-border-subtle bg-surface-card p-8 rounded-sm shadow-lg hover:border-gold hover:shadow-gold/[0.02] transition-all duration-500 relative overflow-hidden group"
      >
       {/* Visual glow element */}
       <div className="absolute top-0 left-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
       
       <h2 className="font-display text-[22px] font-semibold tracking-tight text-text-primary mb-5 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        Direction
       </h2>
       <p className="text-sm md:text-base lg:text-lg leading-relaxed text-text-secondary font-light whitespace-pre-line">
        {description}
       </p>
      </motion.article>

      {/* Focus Areas Aside */}
      <motion.aside 
       initial={{ opacity: 0, y: 25 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.7, delay: 0.3 }}
       className="border border-border-subtle bg-surface-card p-8 rounded-sm shadow-lg hover:border-gold hover:shadow-gold/[0.02] transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
      >
       {/* Visual glow element */}
       <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

       <div>
        <h2 className="font-display text-[22px] font-semibold tracking-tight text-text-primary mb-5 flex items-center gap-2">
         <span className="w-1.5 h-1.5 rounded-full bg-gold" />
         What I Value
        </h2>
        
        <div className="space-y-4">
         {objective?.focusAreas && objective.focusAreas.length > 0 ? (
          objective.focusAreas.map((area) => (
           <div 
            key={area.title} 
            className="flex items-center justify-between border-l-2 border-l-gold pl-4 py-1.5 hover:bg-gold-faint/10 transition-colors duration-300 rounded-r-xs group/item"
           >
            <span className="text-xs md:text-sm text-text-secondary font-mono uppercase tracking-widest group-hover/item:text-text-primary transition-colors duration-300">
             {area.title}
            </span>
            <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-xs select-none transition-all duration-300 ${
             area.proficiency === "Expert" 
              ? "bg-gold-faint text-gold border-gold/20 group-hover/item:border-gold/40" 
              : area.proficiency === "Proficient"
              ? "bg-white/5 text-text-primary border-white/10 group-hover/item:border-white/20"
              : "bg-white/5 text-text-secondary border-white/5 group-hover/item:border-white/10"
            }`}>
             {area.proficiency}
            </span>
           </div>
          ))
         ) : (
          <div className="flex items-center justify-between border-l-2 border-l-gold pl-4 py-1.5 hover:bg-gold-faint/10 transition-colors duration-300 rounded-r-xs">
           <span className="text-xs md:text-sm text-text-secondary font-mono uppercase tracking-widest">
            Intelligent Web Development
           </span>
           <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 border rounded-xs bg-gold-faint text-gold border-gold/20">
            Expert
           </span>
          </div>
         )}
        </div>
       </div>

       {/* Subtext info */}
       <div className="mt-8 pt-4 border-t border-border-subtle/50 text-[10px] font-mono text-text-muted uppercase tracking-wider">
        Structured to deliver high-quality outcomes.
       </div>
      </motion.aside>
     </div>
    )}
   </section>
  </main>
 );
}
