"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useState } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

function isPdfCertificate(certificate?: string | null) {
 return Boolean(certificate?.toLowerCase().split("?")[0].endsWith(".pdf"));
}

function InternshipCardSkeleton() {
 return (
  <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a]/60 animate-pulse text-left">
   <div className="relative w-full overflow-hidden h-24 sm:h-28 md:h-32 bg-white/5" />
   <div className="p-4 sm:p-5 md:p-6">
    <div className="flex justify-between items-start">
     <div className="space-y-2 w-1/2">
      <div className="h-5 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/5 rounded w-1/2" />
     </div>
     <div className="h-4 bg-white/10 rounded w-1/4" />
    </div>
   </div>
  </div>
 );
}

export default function InternshipsSection({ style }: { style: SectionStyle }) {
 const { internships, isLoadingInternships } = useScrollState();
 const firstTwo = internships?.slice(0, 2) ?? [];
 const [imageError, setImageError] = useState<Record<string, boolean>>({});

 const getCertificatePreview = (url: string) => {
  if (!url) return "";
  if (url.toLowerCase().split("?")[0].endsWith(".pdf")) {
   const baseUrl = url.split("?")[0];
   const queryParams = url.split("?")[1] ? `?${url.split("?")[1]}` : "";
   return baseUrl.slice(0, -4) + ".jpg" + queryParams;
  }
  return url;
 };

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
     {isLoadingInternships ? (
      <>
       <InternshipCardSkeleton />
       <InternshipCardSkeleton />
      </>
     ) : firstTwo.length > 0 ? (
      firstTwo.map((internship, idx) => {
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
          {internship.certificate && !imageError[internship._id] ? (
           // eslint-disable-next-line @next/next/no-img-element
           <img
            src={getCertificatePreview(internship.certificate)}
            alt={`${internship.company ?? "Internship"} certificate`}
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => {
             setImageError((prev) => ({ ...prev, [internship._id]: true }));
            }}
           />
          ) : internship.certificate ? (
           /* Fallback custom document card if image conversion fails */
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-br from-neutral-900 to-black p-4 text-center">
            <div className="relative group-hover:scale-110 transition-transform duration-500 flex flex-col items-center">
             <div className="p-3 bg-white/5 rounded-2xl border border-white/10 mb-2 relative overflow-hidden group-hover:border-red-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors duration-500">
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
             </div>
             <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-500">
              PDF Certificate
             </span>
             <span className="text-[8px] font-mono text-white/30 uppercase mt-0.5">
              Click view below to open
             </span>
            </div>
            <div className="absolute -inset-10 bg-radial from-red-500/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
           </div>
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
      })
     ) : (
      <div className="border border-white/10 bg-black/20 rounded-xl p-8 text-center text-white/40 font-mono text-sm">
       No internships found
      </div>
     )}
    </div>
   </div>
  </motion.section>
 );
}
