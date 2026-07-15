"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import Link from "next/link";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function InternshipsSection({ style }: { style: SectionStyle }) {
 const { internships, isLoadingInternships } = useScrollState();

 const internship = internships?.[0];

 const company = internship?.company ?? "Labmentix";
 const role = internship?.role ?? "Full Stack Web Developer Intern";
 const workType = internship?.workType ?? "Remote";
 const certificate = internship?.certificate ?? "";
 
 const durationLabel = internship?.duration?.startDate
  ? `${internship.duration.startDate} — ${internship.duration.endDate || "Present"}`
  : "June 2025 — January 2026";

 const description = 
  internship?.description?.[0] ?? 
  "A fully remote internship building full-stack products in a professional team environment, delivering production-quality code across multiple projects under tight iterations.";

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center w-full text-left">
    {/* Left Column: Eyebrow, Title, Description */}
    <div className="flex flex-col gap-6">
     <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold">
      <span className="w-5 h-px bg-gold inline-block" />
      Experience
     </div>
     
     <h2 className="font-display text-[32px] sm:text-[40px] md:text-[50px] lg:text-[56px] font-light leading-[1.1] tracking-[-0.02em] text-text-primary">
      Six months of
      <br />
      <em className="text-gold italic font-normal not-italic font-display">real-world</em>
      <br />
      craft.
     </h2>

     <p className="text-sm sm:text-base leading-relaxed text-text-secondary max-w-[440px] font-light">
      {description}
     </p>
    </div>

    {/* Right Column: Card & Certificate Badge */}
    <div className="flex flex-col gap-6 items-start">
     {isLoadingInternships ? (
      <div className="animate-pulse space-y-4 w-full">
       <div className="border border-white/5 bg-surface-card p-8 rounded-[4px] space-y-4 w-full">
        <div className="h-6 bg-white/10 rounded w-1/3" />
        <div className="h-4 bg-white/10 rounded w-2/3" />
        <div className="h-4 bg-white/5 rounded w-1/4 pt-4" />
       </div>
      </div>
     ) : (
      <>
       {/* Internship Card */}
       <Link
        href={`/internships/${internship?._id || ""}`}
        className="w-full bg-surface-card border border-border-subtle border-l-[3px] border-l-gold rounded-[4px] p-8 relative flex flex-col gap-4 shadow-2xl hover:border-gold-dim transition-all duration-300 cursor-pointer"
       >
        <h3 className="font-display text-[28px] font-semibold tracking-[-0.01em] text-text-primary">
         {company}
        </h3>
        
        <p className="text-[13px] text-text-secondary font-light">
         {role}
        </p>
        
        <div className="flex flex-wrap items-center gap-3 mt-4">
         <span className="font-mono text-[10px] tracking-[0.12em] uppercase border border-gold-dim px-3 py-1 rounded-[20px] text-gold">
          {durationLabel}
         </span>
         <span className="font-mono text-[10px] tracking-[0.12em] uppercase border border-border-mid px-3 py-1 rounded-[20px] text-text-secondary">
          {workType}
         </span>
        </div>
       </Link>

       {/* Certificate Badge */}
       {certificate ? (
        <a
         href={certificate}
         target="_blank"
         rel="noreferrer"
         className="inline-flex items-center gap-2.5 bg-gold-faint border border-gold-dim rounded-[3px] px-[18px] py-2.5 cursor-pointer hover:bg-gold-dim/20 transition-all duration-300 group"
        >
         <svg
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 stroke-gold fill-none group-hover:scale-110 transition-transform duration-300"
         >
          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
         </svg>
         <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-gold">
          View Certificate
         </span>
        </a>
       ) : null}
      </>
     )}
    </div>
   </div>
  </motion.section>
 );
}
