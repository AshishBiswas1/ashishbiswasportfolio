"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

function AcademicCardSkeleton() {
 return (
  <div className="bg-void p-8 flex flex-col justify-between min-h-[240px] animate-pulse border border-border-subtle rounded-[4px]">
   <div className="space-y-3">
    <div className="h-3 w-16 bg-white/10 rounded" />
    <div className="h-6 w-3/4 bg-white/10 rounded" />
    <div className="h-4 w-1/2 bg-white/10 rounded" />
   </div>
   <div className="h-5 w-20 bg-white/10 rounded mt-6" />
  </div>
 );
}

export default function AcademicsSection({ style }: { style: SectionStyle }) {
 const { qualifications, isLoadingQualifications } = useScrollState();

 return (
  <motion.section
   style={style}
   className="lg:absolute lg:inset-0 lg:h-full relative min-h-screen py-20 lg:py-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full z-20 transform-3d"
  >
   {/* Section Header */}
   <div className="flex items-baseline justify-between mb-8 sm:mb-12 text-left">
    <div>
     <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold mb-3">
      <span className="w-5 h-px bg-gold inline-block" />
      Education
     </div>
     <h2 className="font-display text-[38px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none tracking-[-0.025em] text-text-primary">
      <strong>Academia</strong>
     </h2>
    </div>
   </div>

   {/* Grid Layout with Hairline Borders */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border-subtle border border-border-subtle rounded-[4px] overflow-hidden text-left shadow-2xl">
    {isLoadingQualifications ? (
     <>
      <AcademicCardSkeleton />
      <AcademicCardSkeleton />
      <AcademicCardSkeleton />
     </>
    ) : qualifications.length > 0 ? (
     qualifications.slice(0, 3).map((q) => (
      <div
       key={q._id}
       className="bg-void p-8 flex flex-col justify-between min-h-[250px] relative group transition-colors duration-300 hover:bg-surface-card"
      >
       <div className="flex flex-col gap-4">
        {/* Level */}
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
         {q.educationLevel}
        </span>
        
        {/* Institution */}
        <h3 className="font-display text-[22px] font-semibold leading-[1.2] text-text-primary">
         {q.institution}
        </h3>
        
        {/* Degree & Field */}
        <p className="text-[13px] text-text-secondary font-light">
         {q.degree} {q.fieldOfStudy ? `• ${q.fieldOfStudy}` : ""}
        </p>
       </div>

       <div className="flex flex-col gap-3 mt-6">
        {/* Score */}
        {q.score ? (
         <span className="font-mono text-[11px] tracking-[0.08em] text-gold border border-gold-dim px-2.5 py-1 rounded-[2px] w-fit">
          Score: {q.score}
         </span>
        ) : null}
        
        {/* Period */}
        {q.duration?.startYear || q.duration?.endYear ? (
         <span className="font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase">
          {q.duration.startYear} — {q.duration.endYear || "Present"}
         </span>
        ) : null}
       </div>

       {/* Sweep gold border transition */}
       <div className="absolute bottom-0 left-0 h-[2px] bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
      </div>
     ))
    ) : (
     <div className="col-span-3 py-16 text-center bg-void">
      <span className="text-text-muted font-mono text-xs uppercase tracking-widest">
       No academic records found
      </span>
     </div>
    )}
   </div>
  </motion.section>
 );
}
