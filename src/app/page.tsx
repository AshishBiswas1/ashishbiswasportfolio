"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

 // Loading State linked to background images preloading AND API data loading
 const [loadProgress, setLoadProgress] = useState(0);
 const [apiDataLoaded, setApiDataLoaded] = useState(false);
 const [isPageLoading, setIsPageLoading] = useState(true);
 const [isLargeScreen, setIsLargeScreen] = useState(false);

 const handleApiDataLoaded = useCallback(() => {
  setApiDataLoaded(true);
 }, []);

 // Load data from backend on mount and notify when all sections finish fetching
 usePortfolioData(handleApiDataLoaded);

 useEffect(() => {
  const checkScreen = () => {
   setIsLargeScreen(window.innerWidth >= 1024);
  };
  checkScreen();
  window.addEventListener("resize", checkScreen);
  return () => window.removeEventListener("resize", checkScreen);
 }, []);

 useEffect(() => {
  if (loadProgress >= 100 && apiDataLoaded) {
   const timer = setTimeout(() => {
    setIsPageLoading(false);
   }, 300); // Gentle offset to see progress hit 100% before transition
   return () => clearTimeout(timer);
  }
 }, [loadProgress, apiDataLoaded]);

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

 const heroStyle = isLargeScreen ? heroMotion : {};
 const objectiveStyle = isLargeScreen ? objectiveMotion : {};
 const academicsStyle = isLargeScreen ? academicsMotion : {};
 const internshipsStyle = isLargeScreen ? internshipsMotion : {};
 const projectsStyle = isLargeScreen ? projectsMotion : {};
 const skillsStyle = isLargeScreen ? skillsMotion : {};

 useEffect(() => {
  if (!isLargeScreen) return;
  return scrollYProgress.on("change", (latest) => {
   if (latest < 0.16) setActiveSection("hero");
   else if (latest < 0.33) setActiveSection("objective");
   else if (latest < 0.5) setActiveSection("academics");
   else if (latest < 0.66) setActiveSection("internships");
   else if (latest < 0.83) setActiveSection("projects");
   else setActiveSection("skills");
  });
 }, [scrollYProgress, setActiveSection, isLargeScreen]);

 return (
  <>
   <AnimatePresence>
    {isPageLoading && (
     <PremiumLoader progress={loadProgress} />
    )}
   </AnimatePresence>

   <div
    ref={containerRef}
    className={`relative lg:h-[600vh] h-auto bg-transparent text-white font-sans transition-opacity duration-500 ${
     isPageLoading ? "opacity-0 pointer-events-none h-screen overflow-hidden" : "opacity-100"
    }`}
   >
     <ScrollVideoBackground 
      scrollYProgress={scrollYProgress} 
      onProgress={setLoadProgress} 
     />
     
     <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden relative h-auto overflow-visible perspective-[1000px] z-10">
      <HeroSection style={heroStyle} />

       <div className="lg:absolute lg:bottom-8 relative w-full overflow-hidden border-y border-border-subtle py-3 bg-gold-faint/50 z-50 select-none mt-8 lg:mt-0">
        <motion.div
         className="inline-flex gap-0 whitespace-nowrap"
         animate={{ x: [0, -1000] }}
         transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        >
         {Array(2).fill([
          "MERN Stack", "Next.js", "Full Stack Developer", "COER University", 
          "Artificial Intelligence", "Node.js", "React", "MongoDB", "Express", "Digital Experiences"
         ]).flat().map((item, idx) => (
          <span key={idx} className="inline-flex items-center">
           <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted px-7">
            {item}
           </span>
           <span className="text-gold opacity-50 font-mono text-[10px] select-none">·</span>
          </span>
         ))}
        </motion.div>
       </div>

      <ObjectiveSection style={objectiveStyle} />
      <AcademicsSection style={academicsStyle} />
      <InternshipsSection style={internshipsStyle} />
      <ProjectsSection style={projectsStyle} projects={projects} />
      <SkillsSection style={skillsStyle} />
     </div>
    </div>
   </>
  );
}
