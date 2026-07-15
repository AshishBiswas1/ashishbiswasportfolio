"use client";

import { useMemo } from "react";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import type { Skill } from "@/context/ScrollContext";

export default function SkillsPage() {
 usePortfolioData();
 const { skills, isLoadingSkills } = useScrollState();

 // Group skills by category
 const groupedSkills = useMemo(() => {
  if (!skills || skills.length === 0) return [];

  const groups: Record<string, Skill[]> = {};

  skills.forEach((skill) => {
   const category = skill.category || "Other";
   if (!groups[category]) {
    groups[category] = [];
   }
   groups[category].push(skill);
  });

  return Object.entries(groups).map(([title, skillList]) => ({
   title,
   skills: skillList.map((s) => s.name),
  }));
 }, [skills]);

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-6xl text-left">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
       Technical Skills
      </p>
      <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
       A practical full-stack toolkit.
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
      Skills are organized around building usable products: polished interfaces,
      stable APIs, database-backed workflows, and enough AI literacy to explore
      intelligent features responsibly.
     </p>
    </div>

    {/* Skills Category Grid */}
    <div className="mt-10 md:mt-14 grid gap-6 grid-cols-1 md:grid-cols-2">
     {isLoadingSkills ? (
      <>
       <article className="border border-border-subtle bg-surface-card p-8 rounded-[4px] animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-white/10 rounded" />
        <div className="flex flex-wrap gap-2 pt-2">
         <div className="h-8 w-20 bg-white/5 rounded" />
         <div className="h-8 w-24 bg-white/5 rounded" />
        </div>
       </article>
       <article className="border border-border-subtle bg-surface-card p-8 rounded-[4px] animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-white/10 rounded" />
        <div className="flex flex-wrap gap-2 pt-2">
         <div className="h-8 w-24 bg-white/5 rounded" />
         <div className="h-8 w-18 bg-white/5 rounded" />
        </div>
       </article>
      </>
     ) : groupedSkills.length > 0 ? (
      groupedSkills.map((group) => (
       <article
        key={group.title}
        className="border border-border-subtle bg-surface-card p-8 rounded-[4px] shadow-lg hover:border-gold-dim transition-all duration-300"
       >
        <h2 className="font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-text-primary mb-5">
         {group.title}
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
         {group.skills.map((skill) => (
          <span
           key={skill}
           className="border border-border-subtle bg-void px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-gold hover:border-gold-dim transition rounded-[2px] cursor-default"
          >
           {skill}
          </span>
         ))}
        </div>
       </article>
      ))
     ) : (
      <div className="col-span-full text-center text-text-muted py-16 bg-surface-card border border-border-subtle rounded-[4px]">
       No skills found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
