"use client";

import { useMemo } from "react";
import { useScrollState } from "@/context/ScrollContext";
import type { Skill } from "@/context/ScrollContext";

export default function SkillsPage() {
 const { skills } = useScrollState();

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

  // Convert to array format and sort categories
  return Object.entries(groups).map(([title, skillList]) => ({
   title,
   skills: skillList.map((s) => s.name),
  }));
 }, [skills]);

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Technical Skills
      </p>
      <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
       A practical full-stack toolkit.
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      Skills are organized around building usable products: polished interfaces,
      stable APIs, database-backed workflows, and enough AI literacy to explore
      intelligent features responsibly.
     </p>
    </div>

    <div className="mt-8 md:mt-14 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
     {groupedSkills.length > 0 ? (
      groupedSkills.map((group) => (
       <article
        key={group.title}
        className="border border-white/10 bg-white/4 p-4 md:p-7"
       >
        <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">
         {group.title}
        </h2>
        <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
         {group.skills.map((skill) => (
          <span
           key={skill}
           className="border border-white/10 bg-black/30 px-2 md:px-4 py-1.5 md:py-3 text-xs md:text-sm text-white/68 hover:text-white transition"
          >
           {skill}
          </span>
         ))}
        </div>
       </article>
      ))
     ) : (
      <div className="col-span-full text-center text-white/50">
       Loading skills...
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
