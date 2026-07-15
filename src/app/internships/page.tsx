"use client";

import Link from "next/link";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageInternshipCardSkeleton() {
 return (
  <article className="relative pb-8 md:pb-12 pl-6 md:pl-8 last:pb-0 animate-pulse text-left">
   <div className="absolute -left-1.25 md:-left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
   <div className="border border-border-subtle bg-surface-card p-8 rounded-[4px] space-y-4">
    <div className="h-6 w-1/3 bg-white/10 rounded" />
    <div className="h-4 w-2/3 bg-white/5 rounded" />
   </div>
  </article>
 );
}

export default function InternshipsPage() {
 usePortfolioData();
 const { internships, isLoadingInternships } = useScrollState();

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-5xl text-left">
    <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
     Internship
    </p>
    <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
     Experience shaped by practice.
    </h1>
    <p className="mt-4 md:mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
     {isLoadingInternships ? "Loading..." : internships?.[0]?.description?.[0] ??
      "A record of internship and research exposure that supports my direction as a full-stack developer."}
    </p>

    {/* Timeline container */}
    <div className="mt-10 md:mt-14 border-l border-border-subtle">
     {isLoadingInternships ? (
      <>
       <SubpageInternshipCardSkeleton />
       <SubpageInternshipCardSkeleton />
      </>
     ) : internships && internships.length > 0 ? (
      internships.map((internship, idx) => {
       const dateLabel = internship.duration?.startDate
        ? `${internship.duration.startDate} — ${internship.duration.endDate || "Present"}`
        : (internship.workType ?? "");

       const notes = internship.description ?? [];

        return (
         <article
          key={internship._id ?? `${internship.company}-${idx}`}
          className="relative pb-8 md:pb-12 pl-6 md:pl-8 last:pb-0"
         >
          {/* Gold dot on timeline */}
          <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_8px_rgba(200,169,110,0.8)]" />
          
          {/* Experience Card */}
          <Link
           href={`/internships/${internship._id}`}
           className="block border border-border-subtle bg-surface-card border-l-[3px] border-l-gold p-8 rounded-[4px] shadow-lg hover:border-gold-dim transition-all duration-300 cursor-pointer"
          >
           <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:items-start md:justify-between">
            <div>
             <h2 className="font-display text-[24px] md:text-[28px] font-semibold tracking-[-0.01em] text-text-primary">
              {internship.company ?? "—"}
             </h2>
             <p className="mt-1 text-sm text-text-secondary font-light">
              {internship.role ?? ""}
             </p>
            </div>
            
            {dateLabel ? (
             <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] text-gold whitespace-nowrap">
              {dateLabel}
             </span>
            ) : null}
           </div>

           {notes.length ? (
            <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-xs md:text-sm text-text-secondary list-disc pl-4 font-light">
             {notes.map((note, noteIdx) => (
              <li
               key={`${internship._id}-${noteIdx}`}
               className="leading-relaxed"
              >
               {note}
              </li>
             ))}
            </ul>
           ) : null}

           {/* View Certificate option */}
           {internship.certificate ? (
            <div className="mt-6">
             <span
              onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               window.open(internship.certificate, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-2 bg-gold-faint border border-gold-dim rounded-[3px] px-4 py-2 hover:bg-gold-dim/20 transition-all duration-300 group cursor-pointer"
             >
              <svg
               viewBox="0 0 24 24"
               strokeWidth="1.5"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="w-3 h-3 stroke-gold fill-none group-hover:scale-110 transition-transform duration-300"
              >
               <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-gold">
               View Certificate
              </span>
             </span>
            </div>
           ) : null}
          </Link>
         </article>
        );
      })
     ) : (
      <div className="col-span-full text-center text-text-muted py-12 bg-void">
       No internships found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
