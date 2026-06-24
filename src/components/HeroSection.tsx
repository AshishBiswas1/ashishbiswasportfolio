"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { useEffect, useMemo, useState } from "react";
import { useScrollState } from "@/context/ScrollContext";

type SectionStyle = ComponentProps<typeof motion.section>["style"];

export default function HeroSection({ style }: { style: SectionStyle }) {
 const { user } = useScrollState();

 const name = user?.name ?? "Ashish Biswas";
 const photo = user?.photo ?? "/file.svg";

 const designations = useMemo(() => {
  const list = user?.designation ?? [];
  return list.length > 0 ? list : ["Full-Stack Developer"];
 }, [user?.designation]);

 const [displayedText, setDisplayedText] = useState("");
 const [isDeleting, setIsDeleting] = useState(false);
 const [designationIndex, setDesignationIndex] = useState(0);
 const [typingSpeed, setTypingSpeed] = useState(100);

 useEffect(() => {
  if (designations.length === 0) return;

  const currentFullText = designations[designationIndex];

  const handleType = () => {
   if (!isDeleting) {
    // Typing forward
    const nextText = currentFullText.slice(0, displayedText.length + 1);
    setDisplayedText(nextText);
    setTypingSpeed(80); // typing speed

    if (nextText === currentFullText) {
     // Pause at full text
     setTypingSpeed(1800);
     setIsDeleting(true);
    }
   } else {
    // Erasing backward
    if (displayedText.length === 0) {
     // Move to next designation
     setIsDeleting(false);
     setDesignationIndex((prev) => (prev + 1) % designations.length);
     setTypingSpeed(400); // pause before next word
     return;
    }

    const nextText = currentFullText.slice(0, displayedText.length - 1);
    setDisplayedText(nextText);
    setTypingSpeed(45); // erasing speed
   }
  };

  const timer = setTimeout(handleType, typingSpeed);
  return () => clearTimeout(timer);
 }, [displayedText, isDeleting, designationIndex, designations, typingSpeed]);

 const firstName = name.split(" ")[0] ?? name;
 const lastName = name.split(" ").slice(1).join(" ") ?? user?.name ?? "Biswas";

 return (
  <motion.section
   style={style}
   className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full h-full z-10 transform-3d"
  >
   <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-12">
    <div className="flex-1 space-y-3 sm:space-y-4 bg-black/40 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl">
     <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-tight">
      {firstName} <br />
      {lastName}
     </h1>
     <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-white mb-4 sm:mb-6 md:mb-8" />
     <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/70 font-light tracking-widest uppercase flex items-center min-h-[1.5em]">
      <span>{displayedText}</span>
      <span className="inline-block w-0.5 h-5 md:h-7 bg-white/70 ml-1.5 animate-pulse shrink-0" />
     </h2>
    </div>

    <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
     <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
      <div className="absolute inset-0 rounded-full overflow-hidden border border-white/20 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm shadow-2xl flex items-center justify-center">
       {/* Use backend photo if available */}
       {/* eslint-disable-next-line @next/next/no-img-element */}
       <img
        src={photo}
        alt={`${name} profile`}
        className="h-full w-full object-cover"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onError={(e) => {
         // fallback if error loading photo
         (e.currentTarget as HTMLImageElement).src = "/file.svg";
        }}
       />
      </div>
     </div>
    </div>
   </div>
  </motion.section>
 );
}
