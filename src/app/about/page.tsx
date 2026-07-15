"use client";

import { useMemo } from "react";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function AboutPage() {
 usePortfolioData();
 const { user, objective, skills, qualifications } = useScrollState();

 const highlights = useMemo(() => {
  const fromSkills = (skills ?? [])
   .slice(0, 4)
   .map((s) => s.category || s.name);

  if (fromSkills.length >= 2) return fromSkills;

  return [
   objective?.headline?.split(" ").slice(0, 3).join(" ") ?? "Full-stack",
   user?.designation?.[0] ?? "MERN",
   qualifications?.[0]?.degree ?? "Computer Science",
   "API integration",
  ];
 }, [skills, objective, user, qualifications]);

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-6xl text-left">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
     <div>
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
       About
      </p>
      <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
       {user?.name
        ? `${user.name.split(" ")[0]}’s Engineering`
        : "Building thoughtful digital systems."}
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
      {objective?.description ??
       "I’m a full-stack developer focused on creating polished web experiences with strong engineering foundations—clean frontend interaction, reliable backend APIs, and product ideas that feel useful in the real world."}
     </p>
    </div>

    {/* Highlights Grid */}
    <div className="mt-10 md:mt-14 grid gap-4 grid-cols-2 md:grid-cols-4">
     {highlights.map((item) => (
      <div
       key={item}
       className="bg-surface-card border border-border-subtle hover:border-gold-dim transition-all duration-300 p-5 rounded-[4px] shadow-lg flex flex-col justify-center"
      >
       <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">
        {item}
       </p>
      </div>
     ))}
    </div>

    {/* Engineering details */}
    <div className="mt-10 md:mt-16 grid gap-6 md:gap-8 lg:grid-cols-3">
     <article className="bg-surface-card border border-border-subtle hover:border-gold-dim transition-all duration-300 p-8 lg:col-span-2 rounded-[4px] shadow-lg">
      <h2 className="font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-text-primary">
       Engineering Direction
      </h2>
      <p className="mt-4 leading-relaxed text-sm md:text-base text-text-secondary font-light">
       {(objective?.description ?? "").slice(0, 240) ||
        "I like building applications that are clear to use, structured in code, and flexible enough to grow. My current focus is on modern full-stack engineering with clean APIs and thoughtful interfaces."}
      </p>
     </article>

     <aside className="bg-surface-card border border-border-subtle hover:border-gold-dim transition-all duration-300 p-8 rounded-[4px] shadow-lg">
      <h2 className="font-display text-[22px] md:text-[26px] font-semibold tracking-tight text-text-primary">
       Now
      </h2>
      <p className="mt-4 leading-relaxed text-sm md:text-base text-text-secondary font-light">
       {qualifications?.[0]
        ? `${qualifications[0].educationLevel} • ${qualifications[0].institution}`
        : "Building portfolio, CMS, and research-oriented web projects."}
      </p>
     </aside>
    </div>
   </section>
  </main>
 );
}
