"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import type { MotionValue } from "framer-motion";
import AcademicsSection from "@/components/AcademicsSection";
import HeroSection from "@/components/HeroSection";
import InternshipsSection from "@/components/InternshipsSection";
import ObjectiveSection from "@/components/ObjectiveSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import ScrollVideoBackground from "@/components/ScrollVideoBackground";
import PremiumLoader from "@/components/PremiumLoader";

function useSectionMotion(
 progress: MotionValue<number>,
 input: number[],
 output: number[],
) {
 const opacity = useTransform(progress, input, output);
 const scale = useTransform(opacity, [0, 1], [0.88, 1]);
 const z = useTransform(opacity, [0, 1], [-180, 0]);
 const filter = useTransform(opacity, (value) => {
  const blur = Math.min(10, Math.max(0, (1 - value) * 10));
  return `blur(${blur}px)`;
 });
 const visibility = useTransform(opacity, (value) =>
  value <= 0.01 ? "hidden" : "visible",
 );
 const pointerEvents = useTransform(opacity, (value) =>
  value > 0.45 ? "auto" : "none",
 );

 return { opacity, scale, z, filter, visibility, pointerEvents };
}

export default function HomePage() {
 const containerRef = useRef(null);
 const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
 });

 // Use context to get state and data
 const { setActiveSection, projects } = useScrollState();

 // Load data from backend on mount
 usePortfolioData();

 // Loading State linked to background images preloading
 const [loadProgress, setLoadProgress] = useState(0);
 const [isPageLoading, setIsPageLoading] = useState(true);

 useEffect(() => {
  if (loadProgress >= 100) {
   const timer = setTimeout(() => {
    setIsPageLoading(false);
   }, 300); // Gentle offset to see progress hit 100% before transition
   return () => clearTimeout(timer);
  }
 }, [loadProgress]);

 const heroMotion = useSectionMotion(
  scrollYProgress,
  [0, 0.08, 0.14],
  [1, 1, 0],
 );
 const objectiveMotion = useSectionMotion(
  scrollYProgress,
  [0.15, 0.21, 0.28, 0.34],
  [0, 1, 1, 0],
 );
 const academicsMotion = useSectionMotion(
  scrollYProgress,
  [0.35, 0.41, 0.45, 0.51],
  [0, 1, 1, 0],
 );
 const internshipsMotion = useSectionMotion(
  scrollYProgress,
  [0.52, 0.58, 0.62, 0.68],
  [0, 1, 1, 0],
 );
 const projectsMotion = useSectionMotion(
  scrollYProgress,
  [0.69, 0.75, 0.79, 0.85],
  [0, 1, 1, 0],
 );
 const skillsMotion = useSectionMotion(
  scrollYProgress,
  [0.86, 0.92, 1],
  [0, 1, 1],
 );

 useEffect(() => {
  return scrollYProgress.on("change", (latest) => {
   if (latest < 0.16) setActiveSection("hero");
   else if (latest < 0.33) setActiveSection("objective");
   else if (latest < 0.5) setActiveSection("academics");
   else if (latest < 0.66) setActiveSection("internships");
   else if (latest < 0.83) setActiveSection("projects");
   else setActiveSection("skills");
  });
 }, [scrollYProgress, setActiveSection]);

 return (
  <>
   <AnimatePresence>
    {isPageLoading && (
     <PremiumLoader progress={loadProgress} />
    )}
   </AnimatePresence>

   <div
    ref={containerRef}
    className="relative h-[600vh] bg-transparent text-white font-sans"
   >
    <ScrollVideoBackground 
     scrollYProgress={scrollYProgress} 
     onProgress={setLoadProgress} 
    />
    
    <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px]">
     <div className="absolute bottom-8 w-full overflow-hidden whitespace-nowrap z-50 border-y border-white/10 py-3 mix-blend-difference">
      <motion.div
       className="inline-block text-sm tracking-[0.2em] uppercase font-bold text-white/50"
       animate={{ x: [0, -1000] }}
       transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
       MERN STACK - NEXT.JS - MONGODB - EXPRESS - REACT - NODE.JS - FULL-STACK
       DEVELOPER - COER UNIVERSITY - DIGITAL EXPERIENCES - ARTIFICIAL
       INTELLIGENCE - MERN STACK - NEXT.JS -
      </motion.div>
     </div>

     <HeroSection style={heroMotion} />
     <ObjectiveSection style={objectiveMotion} />
     <AcademicsSection style={academicsMotion} />
     <InternshipsSection style={internshipsMotion} />
     <ProjectsSection style={projectsMotion} projects={projects} />
     <SkillsSection style={skillsMotion} />
    </div>
   </div>
  </>
 );
}
