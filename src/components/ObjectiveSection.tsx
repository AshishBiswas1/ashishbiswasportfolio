"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function ObjectiveSection({ style }: { style: SectionStyle }) {
 const { objective, isLoadingObjective } = useScrollState();

 const headline =
  objective?.headline ??
  "Driving digital innovation through scalable architecture.";
 const description =
  objective?.description ??
  "As a passionate Full-Stack Developer specializing in the MERN stack and Next.js, my objective is to architect and deploy highly optimized, user-centric web applications.";

 // Split the headline to italicize the last part if it contains multiple words
 const words = headline.split(" ");
 const italicCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)));
 const normalText = words.slice(0, words.length - italicCount).join(" ");
 const italicText = words.slice(words.length - italicCount).join(" ");

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-20 items-start w-full text-left">
    {/* Left Column: Eyebrow & Meta */}
    <div className="flex flex-col gap-6">
     <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold">
      <span className="w-5 h-px bg-gold inline-block" />
      Objective
     </div>
     <div className="font-mono text-[12px] text-text-muted leading-loose font-light">
      Full-Stack Developer
      <br />
      MERN &amp; Next.js
      <br />
      Based in India
     </div>
    </div>

    {/* Right Column: Display Headline & Body */}
    <div className="flex flex-col gap-6 md:gap-8">
     {isLoadingObjective ? (
      <div className="animate-pulse space-y-4 w-full">
       <div className="h-10 bg-white/10 rounded w-full" />
       <div className="h-10 bg-white/10 rounded w-2/3" />
       <div className="h-4 bg-white/5 rounded w-full pt-4" />
       <div className="h-4 bg-white/5 rounded w-5/6" />
      </div>
     ) : (
      <>
       <h2 className="font-display text-[32px] sm:text-[40px] md:text-[50px] lg:text-[58px] font-semibold leading-[1.1] tracking-[-0.02em] text-text-primary">
        {normalText}{" "}
        <em className="text-gold italic font-normal not-italic font-display">
         {italicText}.
        </em>
       </h2>
       
       <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary max-w-[620px] font-light">
        {description}
       </p>

       {objective?.focusAreas?.length ? (
        <div className="mt-4">
         <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-gold mb-3">
          Focus Areas
         </div>
         <div className="flex flex-wrap gap-2">
          {objective.focusAreas.map((area) => (
           <span
            key={area.title}
            className="font-mono text-[10px] uppercase tracking-wider text-text-secondary border border-white/6 px-3 py-1 rounded-[2px] bg-white/5"
           >
            {area.title}
           </span>
          ))}
         </div>
        </div>
       ) : null}
      </>
     )}
    </div>
   </div>
  </motion.section>
 );
}
