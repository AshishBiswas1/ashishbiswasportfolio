"use client";

import { useScrollState } from "@/context/ScrollContext";

export default function ObjectivePage() {
 const { objective } = useScrollState();

 const headline =
  objective?.headline ??
  "Create scalable digital products with clarity and intent.";
 const description =
  objective?.description ??
  "My goal is to grow as a full-stack developer who can design, build, and deploy reliable web applications.";

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
     Career Objective
    </p>
    <h1 className="mt-3 md:mt-5 max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
     {headline}
    </h1>

    <div className="mt-8 md:mt-14 grid gap-5 md:gap-8 lg:grid-cols-[1fr_0.8fr]">
     <article className="border border-white/10 bg-white/4 p-4 md:p-8">
      <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">
       Direction
      </h2>
      <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-6 md:leading-8 text-white/62">
       {description}
      </p>
     </article>

     <aside className="border border-white/10 p-4 md:p-8">
      <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">
       What I value
      </h2>
      <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
       {(objective?.focusAreas ?? []).map((area) => (
        <p
         key={area.title}
         className="border-l border-white/20 pl-3 md:pl-4 text-xs md:text-sm text-white/60"
        >
         {area.title}
        </p>
       ))}
       {(!objective?.focusAreas || objective.focusAreas.length === 0) && (
        <p className="border-l border-white/20 pl-3 md:pl-4 text-xs md:text-sm text-white/60">
         {description}
        </p>
       )}
      </div>
     </aside>
    </div>
   </section>
  </main>
 );
}
