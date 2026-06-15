"use client";

import { useMemo } from "react";
import { useScrollState } from "@/context/ScrollContext";

export default function AboutPage() {
 const { user, objective, skills, qualifications } = useScrollState();

 const highlights = useMemo(() => {
  const fromSkills = (skills ?? [])
   .slice(0, 4)
   .map((s) => s.category || s.name);

  // Fallback to objective-derived highlights if skills not loaded
  if (fromSkills.length >= 2) return fromSkills;

  return [
   objective?.headline?.split(" ").slice(0, 3).join(" ") ?? "Full-stack",
   user?.designation?.[0] ?? "MERN",
   qualifications?.[0]?.degree ?? "Computer Science",
   "API integration",
  ];
 }, [skills, objective, user, qualifications]);

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       About
      </p>
      <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
       {user?.name
        ? `${user.name.split(" ")[0]}’s Engineering`
        : "Building thoughtful digital systems."}
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      {objective?.description ??
       "I’m a full-stack developer focused on creating polished web experiences with strong engineering foundations—clean frontend interaction, reliable backend APIs, and product ideas that feel useful in the real world."}
     </p>
    </div>

    <div className="mt-8 md:mt-14 grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-4">
     {highlights.map((item) => (
      <div
       key={item}
       className="border border-white/10 bg-white/4 p-3 md:p-5 backdrop-blur"
      >
       <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
        {item}
       </p>
      </div>
     ))}
    </div>

    <div className="mt-10 md:mt-16 grid gap-5 md:gap-8 lg:grid-cols-3">
     <article className="border border-white/10 bg-white/4 p-5 md:p-8 lg:col-span-2">
      <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight">
       Engineering Direction
      </h2>
      <p className="mt-3 md:mt-5 leading-6 md:leading-7 text-xs md:text-base text-white/60">
       {(objective?.description ?? "").slice(0, 240) ||
        "I like building applications that are clear to use, structured in code, and flexible enough to grow. My current focus is on modern full-stack engineering with clean APIs and thoughtful interfaces."}
      </p>
     </article>

     <aside className="border border-white/10 bg-white/4 p-5 md:p-8">
      <h2 className="text-lg md:text-2xl font-bold uppercase tracking-tight">
       Now
      </h2>
      <p className="mt-3 md:mt-5 leading-6 md:leading-7 text-xs md:text-base text-white/60">
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
