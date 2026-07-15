"use client";

import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageCardSkeleton() {
 return (
  <article className="bg-void p-6 flex flex-col justify-between min-h-[240px] animate-pulse border border-border-subtle rounded-[4px]">
   <div className="space-y-3">
    <div className="h-3 w-16 bg-white/10 rounded" />
    <div className="h-6 w-3/4 bg-white/10 rounded" />
    <div className="h-4 w-1/2 bg-white/10 rounded" />
   </div>
   <div className="h-5 w-20 bg-white/10 rounded mt-6" />
  </article>
 );
}

export default function EducationPage() {
 usePortfolioData();
 const { qualifications, isLoadingQualifications } = useScrollState();
 const primary = qualifications?.[0];

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-6xl text-left">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
     <div>
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
       Academic Qualification
      </p>
      <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
       {isLoadingQualifications 
        ? "Loading..." 
        : primary?.degree 
         ? `${primary.degree} Foundation.` 
         : "Academic Foundation."}
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
      {primary?.description ??
       "Academic work gives structure to my practical development interests, especially around software design and applied learning."}
     </p>
    </div>

    {/* Academia Grid */}
    <div className="mt-10 md:mt-14 grid gap-px bg-border-subtle border border-border-subtle rounded-[4px] overflow-hidden shadow-2xl">
     {isLoadingQualifications ? (
      <>
       <SubpageCardSkeleton />
       <SubpageCardSkeleton />
       <SubpageCardSkeleton />
      </>
     ) : qualifications && qualifications.length > 0 ? (
      qualifications.map((q) => (
       <article
        key={q._id}
        className="bg-void p-8 flex flex-col justify-between min-h-[250px] relative group transition-colors duration-300 hover:bg-surface-card"
       >
        <div className="flex flex-col gap-4">
         <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          {q.educationLevel}
         </p>
         <h2 className="font-display text-[22px] font-semibold leading-[1.2] text-text-primary">
          {q.institution}
         </h2>
         <p className="text-[13px] text-text-secondary font-light">
          {q.degree} {q.fieldOfStudy ? `• ${q.fieldOfStudy}` : ""}
         </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
         {q.score ? (
          <span className="font-mono text-[11px] tracking-[0.08em] text-gold border border-gold-dim px-2.5 py-1 rounded-[2px] w-fit">
           Score: {q.score}
          </span>
         ) : null}
         
         {q.duration?.startYear || q.duration?.endYear ? (
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase">
           {q.duration.startYear} — {q.duration.endYear || "Present"}
          </span>
         ) : null}
        </div>

        {/* Sweep gold border transition */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
       </article>
      ))
     ) : (
      <div className="col-span-full text-center text-text-muted py-16 bg-void">
       No qualifications found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
