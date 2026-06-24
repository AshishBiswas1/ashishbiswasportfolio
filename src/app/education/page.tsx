"use client";

import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageCardSkeleton() {
 return (
  <article className="border border-white/5 bg-white/4 p-6 flex flex-col justify-between min-h-[220px] animate-pulse">
   <div>
    <div className="h-3 w-16 bg-white/10 rounded mb-3" />
    <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
    <div className="h-4 w-1/2 bg-white/10 rounded mb-4" />
    <div className="h-3 w-full bg-white/5 rounded mb-2" />
    <div className="h-3 w-5/6 bg-white/5 rounded mb-2" />
   </div>
   <div className="h-6 w-24 bg-white/10 rounded-full mt-6" />
  </article>
 );
}

export default function EducationPage() {
 usePortfolioData();
 const { qualifications, isLoadingQualifications } = useScrollState();
 const primary = qualifications?.[0];

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Academic Qualification
      </p>
      <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
       {isLoadingQualifications ? "Loading..." : primary?.degree ? `${primary.degree} Foundation.` : "Academic Foundation."}
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      {primary?.description ??
       "Academic work gives structure to my practical development interests, especially around software design and applied learning."}
     </p>
    </div>

    <div className="mt-8 md:mt-14 grid gap-6 md:grid-cols-3">
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
        className="border border-white/10 bg-white/4 p-6 flex flex-col justify-between min-h-[220px]"
       >
        <div>
         <p className="text-xs uppercase tracking-[0.2em] text-white/35 mb-2">
          {q.educationLevel}
         </p>
         <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">
          {q.institution}
         </h2>
         <p className="mt-2 text-sm text-white/65">
          {q.degree} {q.fieldOfStudy ? `• ${q.fieldOfStudy}` : ""}
         </p>
         {q.score ? (
          <p className="mt-2 text-xs font-mono text-white/50 bg-white/5 inline-block px-2 py-0.5 rounded border border-white/5">
           Score: {q.score}
          </p>
         ) : null}
         {q.description ? (
          <p className="mt-3 text-xs text-white/50 leading-relaxed font-light">
           {q.description}
          </p>
         ) : null}
        </div>
        {q.duration?.startYear || q.duration?.endYear ? (
         <div className="mt-6 inline-block self-start border border-white/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55 bg-white/5 rounded-full">
          {q.duration.startYear} - {q.duration.endYear || "Present"}
         </div>
        ) : null}
       </article>
      ))
     ) : (
      <div className="col-span-full text-center text-white/50 py-12">
       No qualifications found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
