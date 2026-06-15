"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

function isPdfCertificate(certificate?: string | null) {
 return Boolean(certificate?.toLowerCase().split("?")[0].endsWith(".pdf"));
}

export default function InternshipsSection({ style }: { style: SectionStyle }) {
 const { internships } = useScrollState();
 const firstTwo = internships?.slice(0, 2) ?? [];

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col items-end justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl text-right">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-4 sm:mb-6">
     [ EXPERIENCE ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8">
     Internships
    </h2>

    <div className="space-y-4 sm:space-y-5">
     {firstTwo.map((internship, idx) => {
      const durationLabel = internship.duration?.startDate
       ? `${internship.duration.startDate}${
          internship.duration.endDate ? ` - ${internship.duration.endDate}` : ""
         }`
       : "";

      return (
       <div
        key={internship._id}
        className={[
         "group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/60",
         "transition-all duration-500",
         "hover:shadow-2xl hover:border-white/25 hover:-translate-y-1",
         idx === 0 ? "" : "",
        ].join(" ")}
       >
        <div
         className={[
          "relative w-full overflow-hidden",
          "h-24 sm:h-28 md:h-32",
          "group-hover:h-56 sm:group-hover:h-60 md:group-hover:h-64",
          "transition-[height] duration-500 ease-in-out",
         ].join(" ")}
        >
         {internship.certificate && isPdfCertificate(internship.certificate) ? (
          <iframe
           src={`${internship.certificate}#toolbar=0&navpanes=0&scrollbar=0`}
           title={`${internship.company ?? "Internship"} certificate`}
           className="absolute inset-0 h-full w-full border-0 bg-white opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
         ) : internship.certificate ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
           src={internship.certificate}
           alt={`${internship.company ?? "Internship"} certificate`}
           className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-opacity duration-500"
           onError={(e) => {
            // fallback if certificate URL isn't an image
            (e.currentTarget as HTMLImageElement).style.display = "none";
           }}
          />
         ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-mono">
           NO CERTIFICATE
          </div>
         )}

         {/* subtle overlay */}
         <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-10 transition-opacity duration-500" />
        </div>

        <div className="p-4 sm:p-5 md:p-6">
         <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start justify-between gap-3">
           <div className="min-w-0 text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight">
             {internship.company ?? "—"}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-white/70 font-light mt-1">
             {internship.role ?? ""}
            </p>
           </div>

           <div className="text-right">
            {durationLabel ? (
             <p className="text-xs sm:text-sm text-white/50 font-mono tracking-wide">
              {durationLabel}
             </p>
            ) : null}

            {internship.workType ? (
             <p className="text-xs sm:text-sm text-white/40 font-mono tracking-wide mt-2">
              {internship.workType}
             </p>
            ) : null}
           </div>
          </div>

          {internship.certificate ? (
           <div className="mt-5 flex justify-start">
            <a
             href={internship.certificate}
             target="_blank"
             rel="noreferrer"
             className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 transition duration-300 hover:border-white/40 hover:bg-white hover:text-black"
            >
             View Certificate
            </a>
           </div>
          ) : null}
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </motion.section>
 );
}
