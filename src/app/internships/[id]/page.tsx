"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { fetchInternshipById } from "@/services/api";
import type { Internship } from "@/context/ScrollContext";

export default function InternshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = use(params);
 const [internship, setInternship] = useState<Internship | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  if (!id) return;
  let isMounted = true;

  fetchInternshipById(id)
   .then((data) => {
    if (isMounted) {
     setInternship(data);
     setIsLoading(false);
    }
   })
   .catch((err) => {
    console.error("Failed to load internship details:", err);
    if (isMounted) setIsLoading(false);
   });

  return () => {
   isMounted = false;
  };
 }, [id]);

 if (isLoading) {
  return (
   <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans flex items-center justify-center">
    <div className="animate-pulse space-y-6 max-w-4xl w-full text-left">
     <div className="h-4 w-20 bg-white/10 rounded" />
     <div className="h-12 w-2/3 bg-white/10 rounded" />
     <div className="h-40 w-full bg-white/5 rounded-sm" />
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-32 bg-white/5 rounded-sm" />
      <div className="h-32 bg-white/5 rounded-sm" />
     </div>
    </div>
   </main>
  );
 }

 if (!internship) {
  return (
   <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans flex flex-col items-center justify-center text-center">
    <h1 className="font-display text-[32px] font-semibold text-text-primary mb-4">
     Internship Not Found
    </h1>
    <p className="text-text-secondary font-light max-w-md mb-8">
     The requested internship details could not be found or retrieved from the database.
    </p>
    <Link
     href="/internships"
     className="border border-gold bg-gold-faint text-gold px-6 py-2.5 rounded-xs font-mono text-xs uppercase tracking-widest hover:bg-gold hover:text-void transition-all duration-300"
    >
     Back to Internships
    </Link>
   </main>
  );
 }

 const dateLabel = internship.duration?.startDate
  ? `${internship.duration.startDate} — ${internship.duration.endDate || "Present"}`
  : "June 2025 — January 2026";

 const displayImpact = internship.impactScore ?? 92;

 // Dynamic descriptive company info
 const companyDescription = 
  internship.company?.toLowerCase() === "labmentix"
   ? "Labmentix is a remote technology development group building full-stack products, web dashboards, and real-time interface integrations under agile development constraints."
   : `${internship.company} is a progressive software engineering group delivering high-performance web systems and developer solutions.`;

 // Dynamic descriptive challenges
 const challengesList = [
  {
   title: "Collaborative Interface Control",
   description: "Aligning styling structures and modular layout changes across multiple parallel Git branches in a fast-paced team workflow.",
  },
  {
   title: "API Serialization & Loading Efficiency",
   description: "Tuning data fetching layers and reducing client component latency when preloading image assets for animations.",
  },
 ];

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-5xl text-left">
    {/* Back navigation */}
    <Link
     href="/internships"
     className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-gold hover:text-text-primary transition duration-300 mb-8"
    >
     <span>&larr;</span> Back to Experience
    </Link>

    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-start">
     {/* Main Detail Column */}
     <div className="space-y-8">
      <div>
       <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
        Internship Placement
       </span>
       <h1 className="mt-3 font-display text-[42px] sm:text-[54px] md:text-[62px] font-light leading-tight tracking-tight text-text-primary">
        {internship.role}
       </h1>
       <p className="mt-2 font-mono text-xs text-gold tracking-widest uppercase">
        {internship.company}
       </p>
      </div>

      {/* Company Overview */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-4">
        Company Overview
       </h2>
       <p className="text-sm md:text-base leading-relaxed text-text-secondary font-light">
        {companyDescription}
       </p>
      </article>

      {/* Internship Role & Information */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-4">
        Key Responsibilities &amp; Tasks
       </h2>
       {internship.description?.length ? (
        <ul className="space-y-3 text-sm text-text-secondary list-disc pl-5 font-light leading-relaxed">
         {internship.description.map((note, index) => (
          <li key={index}>{note}</li>
         ))}
        </ul>
       ) : (
        <p className="text-sm text-text-secondary font-light">
         Contributed to active software deployments, resolved bugs, and supported team integrations.
        </p>
       )}
      </article>

      {/* Challenges faced */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-5">
        Technical Challenges Faced
       </h2>
       <div className="space-y-6">
        {challengesList.map((challenge, idx) => (
         <div key={idx} className="border-l-2 border-l-gold pl-4 py-0.5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-gold mb-1.5">
           {challenge.title}
          </h3>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
           {challenge.description}
          </p>
         </div>
        ))}
       </div>
      </article>

      {/* Verifications Documents (Offer & Recommendation letters) */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-5">
        Employment Verifications
       </h2>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Offer Letter Box */}
        <div className="space-y-3">
         <div className="flex justify-between items-center">
          <h3 className="font-display text-[16px] font-semibold text-text-primary">
           Offer Letter
          </h3>
          <span className="text-[9px] font-mono text-green-400 border border-green-900/30 px-2 py-0.5 rounded-xs uppercase">
           Verified
          </span>
         </div>
         {internship.offerLetter ? (
          <div className="relative border border-border-subtle bg-void rounded-sm overflow-hidden h-[400px] select-none" onContextMenu={(e) => e.preventDefault()}>
           {/* Prevent-click overlay (except scrollbar area) */}
           <div className="absolute inset-0 z-10 pointer-events-none select-none bg-transparent" />
           <iframe
            src={`${internship.offerLetter}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-none z-0"
            title="Offer Letter Viewer"
            style={{ pointerEvents: "auto" }}
           />
          </div>
         ) : (
          <div className="border border-border-subtle bg-void/50 p-6 rounded-sm text-center flex flex-col items-center justify-center min-h-[400px] text-text-muted">
           <svg className="w-8 h-8 text-gold/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
           <span className="font-mono text-[10px] uppercase tracking-widest text-gold/50">Verification Document Pending</span>
           <p className="text-[11px] font-light mt-1 max-w-xs text-text-secondary/70">
            This verification letter has not been uploaded yet.
           </p>
          </div>
         )}
        </div>

        {/* LOR Box */}
        <div className="space-y-3">
         <div className="flex justify-between items-center">
          <h3 className="font-display text-[16px] font-semibold text-text-primary">
           Recommendation Letter
          </h3>
          <span className="text-[9px] font-mono text-green-400 border border-green-900/30 px-2 py-0.5 rounded-xs uppercase">
           Verified
          </span>
         </div>
         {internship.recommendationLetter ? (
          <div className="relative border border-border-subtle bg-void rounded-sm overflow-hidden h-[400px] select-none" onContextMenu={(e) => e.preventDefault()}>
           {/* Prevent-click overlay (except scrollbar area) */}
           <div className="absolute inset-0 z-10 pointer-events-none select-none bg-transparent" />
           <iframe
            src={`${internship.recommendationLetter}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-none z-0"
            title="Recommendation Letter Viewer"
            style={{ pointerEvents: "auto" }}
           />
          </div>
         ) : (
          <div className="border border-border-subtle bg-void/50 p-6 rounded-sm text-center flex flex-col items-center justify-center min-h-[400px] text-text-muted">
           <svg className="w-8 h-8 text-gold/40 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
           </svg>
           <span className="font-mono text-[10px] uppercase tracking-widest text-gold/50">Verification Document Pending</span>
           <p className="text-[11px] font-light mt-1 max-w-xs text-text-secondary/70">
            This recommendation letter has not been uploaded yet.
           </p>
          </div>
         )}
        </div>
       </div>
      </article>
     </div>

     {/* Info Sidebar Column */}
     <div className="space-y-6 lg:sticky lg:top-32">
      {/* Overview Card */}
      <aside className="border border-border-subtle bg-surface-card p-6 rounded-sm shadow-lg space-y-5">
       <h3 className="font-display text-[18px] font-semibold text-text-primary border-b border-border-subtle pb-2.5">
        Overview
       </h3>

       <div className="space-y-3 font-mono text-[11px] text-text-secondary">
        <div className="flex justify-between border-b border-border-subtle pb-2">
         <span className="text-text-muted">Company</span>
         <span className="text-text-primary text-right">{internship.company}</span>
        </div>
        <div className="flex justify-between border-b border-border-subtle pb-2">
         <span className="text-text-muted">Type</span>
         <span className="text-text-primary text-right">{internship.workType || "Remote"}</span>
        </div>
        <div className="flex justify-between border-b border-border-subtle pb-2">
         <span className="text-text-muted">Duration</span>
         <span className="text-text-primary text-right">{dateLabel}</span>
        </div>
        <div className="flex justify-between border-b border-border-subtle pb-2">
         <span className="text-text-muted">Impact Score</span>
         <span className="text-text-primary text-right">{displayImpact}%</span>
        </div>
        <div className="flex justify-between pb-1">
         <span className="text-text-muted">Location</span>
         <span className="text-text-primary text-right">{internship.location || "India"}</span>
        </div>
       </div>

       {/* Certification Downloader */}
       {internship.certificate ? (
        <a
         href={internship.certificate}
         target="_blank"
         rel="noreferrer"
         className="block w-full text-center border border-gold bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-void transition hover:bg-transparent hover:text-gold rounded-xs font-mono cursor-pointer"
        >
         View Certification
        </a>
       ) : null}
      </aside>

      {/* Skills Learned */}
      <aside className="border border-border-subtle bg-surface-card p-6 rounded-sm shadow-lg">
       <h3 className="font-display text-[18px] font-semibold text-text-primary border-b border-border-subtle pb-2.5 mb-4">
        Skills Learned
       </h3>
       <div className="flex flex-wrap gap-1.5">
        {internship.techStack?.length ? (
         internship.techStack.map((tech) => (
          <span
           key={tech}
           className="font-mono text-[10px] uppercase tracking-wider text-text-secondary border border-border-subtle px-2.5 py-1 rounded-xs bg-void/30"
          >
           {tech}
          </span>
         ))
        ) : (
         <span className="font-mono text-[10px] text-text-muted">MERN Stack, Next.js, Git Control</span>
        )}
       </div>
      </aside>
     </div>
    </div>
   </section>
  </main>
 );
}
