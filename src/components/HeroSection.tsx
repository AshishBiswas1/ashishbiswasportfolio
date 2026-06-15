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

 const [designationIndex, setDesignationIndex] = useState(0);

 useEffect(() => {
  if (designations.length <= 1) return;

  const id = window.setInterval(() => {
   setDesignationIndex((prev) => (prev + 1) % designations.length);
  }, 2000);

  return () => window.clearInterval(id);
 }, [designations.length]);

 const currentDesignation = designations[designationIndex];

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
     <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white/70 font-light tracking-widest uppercase">
      {currentDesignation}
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
        onError={(e) => {
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
