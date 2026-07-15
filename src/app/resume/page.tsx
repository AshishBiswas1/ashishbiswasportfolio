"use client";

import Link from "next/link";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function ResumePage() {
 usePortfolioData();
 const { user, resume, qualifications, internships, objective, skills } =
  useScrollState();

 const name = user?.name ?? resume?.name ?? "—";
 const designation = user?.designation?.[0] ?? resume?.designation?.[0] ?? "—";
 const github = user?.githubLink;

 const coreItems = [
  objective?.headline ?? "Full-stack developer",
  objective?.description ??
   "Interested in AI-enabled workflows and clean APIs.",
  ...(skills ?? []).slice(0, 2).map((s) => s.category || s.name),
 ];

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-4xl text-left">
    <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
     Resume
    </p>
    <div className="mt-3 md:mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
     <h1 className="font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
      Profile snapshot.
     </h1>
     <Link
      href="/contact"
      className="inline-flex border border-gold bg-gold px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-void transition hover:bg-transparent hover:text-gold rounded-[2px] font-mono cursor-pointer"
     >
      Contact Me
     </Link>
    </div>

    {/* Snapshot Paper Container */}
    <div className="mt-8 md:mt-12 border border-border-subtle bg-surface-card p-6 md:p-8 rounded-[4px] shadow-2xl">
     {/* Header info */}
     <div className="flex flex-col gap-3 border-b border-border-subtle pb-6 md:pb-8 md:flex-row md:items-center md:justify-between">
      <div>
       <h2 className="font-display text-[26px] md:text-[32px] font-semibold text-text-primary tracking-[-0.01em]">
        {name}
       </h2>
       <p className="mt-1 font-mono text-[11px] tracking-widest uppercase text-gold">
        {designation}
       </p>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
       {user?.designation?.slice(0, 2).join(" • ") || "MERN - Next.js - AI"}
      </p>
     </div>

     {/* Grid areas */}
     <div className="grid gap-6 md:gap-8 pt-6 md:pt-8">
      {/* Profile summary */}
      <article>
       <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-2.5">
        Core Profile
       </h3>
       <ul className="mt-4 space-y-3 text-xs md:text-sm text-text-secondary leading-relaxed font-light list-disc pl-4">
        {coreItems.filter(Boolean).map((item, idx) => (
         <li key={`${idx}-${item}`}>
          {item}
         </li>
        ))}
        {github ? (
         <li>
          GitHub:{" "}
          <a
           className="text-gold underline hover:text-text-primary transition"
           href={github}
           target="_blank"
           rel="noreferrer"
          >
           {github}
          </a>
         </li>
        ) : null}
       </ul>
      </article>

      {/* Education list */}
      <article>
       <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-2.5">
        Education
       </h3>
       <ul className="mt-4 space-y-3 text-xs md:text-sm text-text-secondary leading-relaxed font-light list-disc pl-4">
        {(qualifications ?? []).slice(0, 2).map((q) => (
         <li key={q._id}>
          <span className="font-semibold text-text-primary">{q.educationLevel}</span>: {q.degree} {q.fieldOfStudy ? `• ${q.fieldOfStudy}` : ""} — {q.institution}
          {q.duration?.startYear || q.duration?.endYear
           ? ` (${q.duration.startYear ?? ""}${
              q.duration.endYear ? ` - ${q.duration.endYear}` : ""
             })`
           : ""}
         </li>
        ))}
       </ul>
      </article>

      {/* Experience list */}
      <article>
       <h3 className="font-display text-[18px] md:text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-2.5">
        Experience
       </h3>
       <ul className="mt-4 space-y-3 text-xs md:text-sm text-text-secondary leading-relaxed font-light list-disc pl-4">
        {(internships ?? []).slice(0, 3).map((i) => (
         <li key={i._id}>
          <span className="font-semibold text-text-primary">{i.role}</span> at {i.company}
          {i.duration?.startDate
           ? ` (${i.duration.startDate}${
              i.duration.endDate ? ` - ${i.duration.endDate}` : ""
             })`
           : ""}
         </li>
        ))}
       </ul>
      </article>
     </div>
    </div>
   </section>
  </main>
 );
}
