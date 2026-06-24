"use client";

import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageInternshipCardSkeleton() {
 return (
  <article className="relative pb-8 md:pb-12 pl-6 md:pl-8 last:pb-0 animate-pulse">
   <div className="absolute -left-1.25 md:-left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
   <div className="border border-white/5 bg-white/4 p-4 md:p-7">
    <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:items-start md:justify-between">
     <div className="space-y-2 w-1/2">
      <div className="h-6 w-3/4 bg-white/10 rounded" />
      <div className="h-4 w-1/2 bg-white/5 rounded" />
     </div>
     <div className="h-4 w-24 bg-white/10 rounded" />
    </div>
    <div className="mt-4 space-y-2 pt-2">
     <div className="h-3 w-full bg-white/5 rounded" />
     <div className="h-3 w-5/6 bg-white/5 rounded" />
    </div>
   </div>
  </article>
 );
}

export default function InternshipsPage() {
 usePortfolioData();
 const { internships, isLoadingInternships } = useScrollState();

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-5xl">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
     Internship
    </p>
    <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
     Experience shaped by practice.
    </h1>
    <p className="mt-4 md:mt-7 max-w-3xl text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
     {isLoadingInternships ? "Loading..." : internships?.[0]?.description?.[0] ??
      "A record of internship and research exposure that supports my direction as a full-stack developer."}
    </p>

    <div className="mt-8 md:mt-14 border-l border-white/15">
     {isLoadingInternships ? (
      <>
       <SubpageInternshipCardSkeleton />
       <SubpageInternshipCardSkeleton />
      </>
     ) : internships && internships.length > 0 ? (
      internships.map((internship, idx) => {
       const dateLabel = internship.duration?.startDate
        ? `${internship.duration.startDate}${internship.duration.endDate ? ` - ${internship.duration.endDate}` : ""}`
        : (internship.workType ?? "");

       const notes = internship.description ?? [];

       return (
        <article
         key={internship._id ?? `${internship.company}-${idx}`}
         className="relative pb-8 md:pb-12 pl-6 md:pl-8 last:pb-0"
        >
         <div className="absolute -left-1.25 md:-left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-white" />
         <div className="border border-white/10 bg-white/4 p-4 md:p-7">
          <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:items-start md:justify-between">
           <div>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
             {internship.company ?? "—"}
            </h2>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-white/60">
             {internship.role ?? ""}
            </p>
           </div>
           {dateLabel ? (
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 whitespace-nowrap">
             {dateLabel}
            </span>
           ) : null}
          </div>

          {notes.length ? (
           <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-xs md:text-sm text-white/60">
            {notes.map((note, noteIdx) => (
             <li
              key={`${internship._id}-${noteIdx}`}
              className="leading-6 md:leading-7"
             >
              {note}
             </li>
            ))}
           </ul>
          ) : null}
         </div>
        </article>
       );
      })
     ) : (
      <div className="col-span-full text-center text-white/50 py-12">
       No internships found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
