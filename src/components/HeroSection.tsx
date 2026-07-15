"use client";

import { useEffect, useState, useMemo } from "react";
import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function HeroSection({ style }: { style: SectionStyle }) {
 const { user } = useScrollState();

 const name = user?.name ?? "Ashish Biswas";
 const photo = user?.photo ?? "/file.svg";
 const aboutText = "Architecting scalable web applications with the MERN stack and Next.js. Focused on interfaces that are fast, honest, and built to last.";

 const firstName = name.split(" ")[0] ?? "Ashish";
 const lastName = name.split(" ").slice(1).join(" ") ?? "Biswas";

 // Stable designations list from backend or default values
 const designations = useMemo(() => {
  return user?.designation && user.designation.length > 0
   ? user.designation
   : ["Full Stack Web Developer", "MERN Stack Specialist", "Next.js Architect"];
 }, [user]);

 const [currentIdx, setCurrentIdx] = useState(0);
 const [displayText, setDisplayText] = useState("");
 const [isDeleting, setIsDeleting] = useState(false);

 useEffect(() => {
  let timer: NodeJS.Timeout;
  const currentFullText = designations[currentIdx] || "";

  if (isDeleting) {
   timer = setTimeout(() => {
    setDisplayText((prev) => prev.slice(0, prev.length - 1));
   }, 30); // delete speed
  } else {
   timer = setTimeout(() => {
    setDisplayText(currentFullText.slice(0, displayText.length + 1));
   }, 60); // type speed
  }

  // Pause at complete string
  if (!isDeleting && displayText === currentFullText) {
   timer = setTimeout(() => {
    setIsDeleting(true);
   }, 2500);
  }

  // Move to next string after delete completes
  if (isDeleting && displayText === "") {
   setIsDeleting(false);
   setCurrentIdx((prev) => (prev + 1) % designations.length);
  }

  return () => clearTimeout(timer);
 }, [displayText, isDeleting, currentIdx, designations]);

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full h-full z-10 transform-3d"
  >
   <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between w-full gap-10 md:gap-16">
    {/* Left Editorial Info */}
    <div className="flex flex-col gap-6 md:gap-8 text-left">
     {/* Role Eyebrow with Typewriter & Blinking Cursor */}
     <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-gold min-h-[16px]">
      <span className="w-5 h-px bg-gold inline-block" />
      <span>{displayText}</span>
      <span className="w-[3px] h-[10px] bg-gold animate-pulse -ml-1 inline-block shrink-0" />
     </div>
     
     {/* Typography Name Header */}
     <h1 className="font-display text-[56px] sm:text-[72px] md:text-[85px] lg:text-[105px] xl:text-[115px] font-light leading-[0.9] tracking-[-0.02em] text-text-primary">
      {firstName}
      <br />
      <em className="text-gold italic font-normal not-italic font-display">{lastName}</em>
     </h1>
     
     {/* Description */}
     <p className="text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary max-w-[420px] font-light">
      {aboutText}
     </p>
    </div>

    {/* Right Photo Frame */}
    <div className="flex justify-center md:justify-end items-center mt-6 md:mt-0">
     <div className="relative w-[260px] h-[320px] sm:w-[310px] sm:h-[380px] lg:w-[340px] lg:h-[420px]">
      {/* Offset gold shadow frame */}
      <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border border-gold-dim rounded-[4px] z-0 pointer-events-none" />
      
      {/* Photo inner container */}
      <div className="w-full h-full bg-surface-card rounded-[4px] overflow-hidden border border-border-mid relative z-10 flex items-center justify-center">
       {photo && photo !== "/file.svg" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
         src={photo}
         alt={`${name} profile`}
         className="h-full w-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
         crossOrigin="anonymous"
         referrerPolicy="no-referrer"
         onError={(e) => {
          e.currentTarget.style.display = "none";
          const fallback = e.currentTarget.parentElement?.querySelector(".photo-placeholder");
          if (fallback) fallback.classList.remove("hidden");
         }}
        />
       ) : null}
       <div className={`photo-placeholder font-display text-7xl sm:text-8xl font-light text-gold/30 tracking-[-0.04em] ${photo && photo !== "/file.svg" ? "hidden" : ""}`}>
        AB
       </div>
      </div>

      {/* Gold corner accent */}
      <div className="absolute bottom-[-1px] left-[-1px] width-[40px] height-[40px] w-10 h-10 border-b-2 border-l-2 border-gold z-20 pointer-events-none" />
     </div>
    </div>
   </div>
  </motion.section>
 );
}
