"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function AcademicsSection({ style }: { style: SectionStyle }) {
 const { qualifications } = useScrollState();
 const primary = qualifications[0];
 const hasQualifications = qualifications.length > 0;

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ EDUCATION ]
    </div>

    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8">
     Academia
    </h2>

    <div className="border-l-2 border-white/20 pl-4 sm:pl-6 py-2">
     {hasQualifications ? (
      <div className="space-y-5">
       <div className="space-y-2">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight">
         {primary.institution}
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-white/70 font-light">
         {primary.educationLevel}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/50 font-mono tracking-wide">
         {[primary.degree, primary.fieldOfStudy, primary.score]
          .filter(Boolean)
          .join(" - ")}
        </p>

        {primary.duration?.startYear || primary.duration?.endYear ? (
         <div className="mt-4 inline-block px-3 sm:px-4 py-1 sm:py-1.5 border border-white/20 rounded-full text-xs sm:text-sm tracking-wider uppercase bg-white/5">
          {primary.duration?.startYear ?? ""}
          {primary.duration?.endYear ? ` - ${primary.duration.endYear}` : ""}
         </div>
        ) : null}
       </div>

       {qualifications.length > 1 ? (
        <div className="grid gap-2 pt-1">
         {qualifications.slice(1, 3).map((qualification) => (
          <div
           key={qualification._id}
           className="border-t border-white/10 pt-3 text-sm text-white/55"
          >
           <span className="font-semibold text-white/75">
            {qualification.degree}
           </span>
           <span> - {qualification.institution}</span>
          </div>
         ))}
        </div>
       ) : null}
      </div>
     ) : (
      <div className="space-y-3">
       <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white/60">
        Loading academic records
       </h3>
       <p className="text-sm text-white/40">
        Fetching qualifications from /api/v1/qualification/
       </p>
      </div>
     )}
    </div>
   </div>
  </motion.section>
 );
}
