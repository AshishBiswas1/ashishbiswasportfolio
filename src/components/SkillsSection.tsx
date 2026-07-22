"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import React from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

function getSkillClass(name: string, proficiency?: number): string {
 const n = name.toLowerCase();
 
 if (proficiency) {
  if (proficiency >= 90 || proficiency >= 9) return "text-[30px] sm:text-[36px] font-semibold text-text-primary";
  if (proficiency >= 80 || proficiency >= 8) return "text-[22px] sm:text-[26px] font-semibold text-text-primary/70";
  if (proficiency >= 60 || proficiency >= 6) return "text-[16px] sm:text-[18px] font-semibold text-text-primary/45";
  return "text-[12px] sm:text-[14px] font-mono tracking-wider text-text-primary/30";
 }

 // Fallback map matching the template
 if (n === "react" || n === "next.js" || n === "mongodb" || n === "nextjs") {
  return "text-[30px] sm:text-[36px] font-semibold text-text-primary";
 }
 if (n === "node.js" || n === "nodejs" || n === "express.js" || n === "express" || n === "typescript") {
  return "text-[22px] sm:text-[26px] font-semibold text-text-primary/70";
 }
 if (n === "supabase" || n === "tailwind css" || n === "tailwindcss") {
  return "text-[16px] sm:text-[18px] font-semibold text-text-primary/45";
 }
 return "text-[12px] sm:text-[14px] font-mono tracking-wider text-text-primary/30";
}

export default function SkillsSection({ style }: { style: SectionStyle }) {
 const { skills, isLoadingSkills } = useScrollState();

 const displaySkills = skills && skills.length > 0 ? skills : [];

 return (
  <motion.section
   style={style}
   className="lg:absolute lg:inset-0 lg:h-full relative min-h-screen py-20 lg:py-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full z-30 transform-3d text-center"
  >
   {/* Eyebrow Label */}
   <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold justify-center mb-4">
    <span className="w-5 h-px bg-gold inline-block" />
    Capabilities
   </div>

   {/* Header */}
   <h2 className="font-display text-[38px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-light leading-none tracking-[-0.025em] text-text-primary">
    <strong>Technical</strong> <em className="font-display italic text-gold font-normal not-italic">Arsenal</em>
   </h2>

   {/* Word Cloud */}
   <div className="flex flex-wrap justify-center items-center gap-y-4 max-w-[820px] mx-auto mt-12 sm:mt-16 px-4">
    {isLoadingSkills ? (
     <div className="animate-pulse flex flex-wrap justify-center gap-6 w-full">
      <div className="h-8 w-24 bg-white/10 rounded-[2px]" />
      <div className="h-6 w-20 bg-white/10 rounded-[2px]" />
      <div className="h-10 w-28 bg-white/10 rounded-[2px]" />
      <div className="h-5 w-16 bg-white/10 rounded-[2px]" />
     </div>
    ) : displaySkills.length > 0 ? (
     displaySkills.map((skill, idx) => (
      <React.Fragment key={skill._id}>
       <span
        className={`font-display transition-colors duration-300 hover:text-gold cursor-default ${getSkillClass(
         skill.name,
         skill.proficiency
        )}`}
       >
        {skill.name}
       </span>
       {idx < displaySkills.length - 1 && (
        <span className="font-mono text-xs text-gold-dim select-none mx-3 sm:mx-4">
         ·
        </span>
       )}
      </React.Fragment>
     ))
    ) : (
     <span className="text-text-muted font-mono text-xs uppercase tracking-widest">
      No capabilities registered
     </span>
    )}
   </div>
  </motion.section>
 );
}
