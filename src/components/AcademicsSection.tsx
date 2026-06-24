"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useRef, useState, useEffect } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

function AcademicCardSkeleton() {
 return (
  <div className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-6 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[220px] animate-pulse snap-center shrink-0 w-[85vw] sm:w-[45vw] md:w-[30%] md:max-w-[380px] md:snap-start">
   <div>
    <div className="h-3 w-20 bg-white/10 rounded mb-3" />
    <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
    <div className="h-4 w-1/2 bg-white/10 rounded mb-4" />
    <div className="h-3 w-full bg-white/5 rounded mb-2" />
    <div className="h-3 w-5/6 bg-white/5 rounded mb-2" />
   </div>
   <div className="h-6 w-24 bg-white/10 rounded-full mt-6" />
  </div>
 );
}

export default function AcademicsSection({ style }: { style: SectionStyle }) {
 const { qualifications, isLoadingQualifications } = useScrollState();
 const scrollRef = useRef<HTMLDivElement>(null);
 const [showLeftArrow, setShowLeftArrow] = useState(false);
 const [showRightArrow, setShowRightArrow] = useState(false);

 const checkScroll = () => {
  if (!scrollRef.current) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  setShowLeftArrow(scrollLeft > 10);
  setShowRightArrow(scrollWidth > clientWidth && scrollLeft < scrollWidth - clientWidth - 10);
 };

 const handleScroll = () => {
  checkScroll();
 };

 const scrollLeft = () => {
  if (scrollRef.current) {
   const { clientWidth } = scrollRef.current;
   scrollRef.current.scrollBy({ left: -clientWidth * 0.8, behavior: "smooth" });
  }
 };

 const scrollRight = () => {
  if (scrollRef.current) {
   const { clientWidth } = scrollRef.current;
   scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: "smooth" });
  }
 };

 useEffect(() => {
  const timer = setTimeout(checkScroll, 100);
  window.addEventListener("resize", checkScroll);
  return () => {
   clearTimeout(timer);
   window.removeEventListener("resize", checkScroll);
  };
 }, [qualifications, isLoadingQualifications]);

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-20 transform-3d"
  >
   <div className="mb-6 md:mb-8 bg-black/40 inline-block p-4 sm:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/10">
    <div className="text-xs font-mono tracking-widest text-white/40 mb-2">
     [ EDUCATION ]
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
     Academia
    </h2>
   </div>

   <div className="relative w-full px-2 sm:px-4">
    <div
     ref={scrollRef}
     onScroll={handleScroll}
     className="flex flex-row overflow-x-auto gap-5 md:gap-6 w-full max-h-[60vh] overflow-y-hidden pr-2 md:pr-4 custom-scrollbar no-scrollbar scroll-smooth snap-x snap-mandatory"
    >
     {isLoadingQualifications ? (
      <>
       <AcademicCardSkeleton />
       <AcademicCardSkeleton />
       <AcademicCardSkeleton />
      </>
     ) : qualifications.length > 0 ? (
      qualifications.map((q) => (
       <div
        key={q._id}
        className="group relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 hover:border-white/40 transition-colors duration-500 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[220px] snap-center shrink-0 w-[85vw] sm:w-[45vw] md:w-[30%] md:max-w-[380px] md:snap-start"
       >
        <div>
         <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/45 mb-3">
          {q.educationLevel}
         </div>
         <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-2">
          {q.institution}
         </h3>
         <p className="text-sm font-medium text-white/75 mb-2">
          {q.degree} {q.fieldOfStudy ? `• ${q.fieldOfStudy}` : ""}
         </p>
         {q.score ? (
          <p className="text-xs font-mono text-white/50 mb-3 bg-white/5 inline-block px-2 py-0.5 rounded border border-white/5">
           Score: {q.score}
          </p>
         ) : null}
         {q.description ? (
          <p className="text-xs text-white/60 leading-relaxed font-light mt-2 line-clamp-4">
           {q.description}
          </p>
         ) : null}
        </div>
        {q.duration?.startYear || q.duration?.endYear ? (
         <div className="mt-6 text-[10px] font-mono tracking-wider uppercase text-white/45 bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
          {q.duration.startYear} - {q.duration.endYear || "Present"}
         </div>
        ) : null}
       </div>
      ))
     ) : (
      <div className="flex items-center justify-center h-48 border border-white/10 bg-[#0a0a0a] rounded-2xl w-full">
       <span className="text-white/40 font-mono uppercase tracking-widest text-xs sm:text-sm">
        No academic records found
       </span>
      </div>
     )}
    </div>

    {/* Scroll Left Button */}
    {showLeftArrow && (
     <button
      onClick={scrollLeft}
      className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/70 hover:bg-white hover:text-black border border-white/20 text-white rounded-full p-2.5 shadow-2xl transition-all duration-300 cursor-pointer z-50 hover:scale-110 active:scale-95"
      aria-label="Scroll left"
     >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
     </button>
    )}

    {/* Scroll Right Button */}
    {showRightArrow && (
     <button
      onClick={scrollRight}
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center bg-black/70 hover:bg-white hover:text-black border border-white/20 text-white rounded-full p-2.5 shadow-2xl transition-all duration-300 animate-bounce cursor-pointer z-50 hover:scale-110 active:scale-95"
      aria-label="Scroll right"
     >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
       <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
     </button>
    )}
   </div>
  </motion.section>
 );
}
