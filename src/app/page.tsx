"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollState } from "@/context/ScrollContext"; // Adjust path as needed

export default function HomePage() {
 const containerRef = useRef(null);
 const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"],
 });

 // 3D Transform Logic for Section 1 (Hero)
 const heroScale = useTransform(scrollYProgress, [0, 0.33], [1, 0.8]);
 const heroOpacity = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
 const heroZ = useTransform(scrollYProgress, [0, 0.33], [0, -200]);

 // 3D Transform Logic for Section 2 (Skills/About)
 const skillsScale = useTransform(scrollYProgress, [0.33, 0.66], [0.8, 1]);
 const skillsOpacity = useTransform(scrollYProgress, [0.33, 0.66], [0, 1]);
 const skillsY = useTransform(scrollYProgress, [0.33, 0.66], [200, 0]);

 // 3D Transform Logic for Section 3 (Projects)
 const projectsScale = useTransform(scrollYProgress, [0.66, 1], [0.8, 1]);
 const projectsOpacity = useTransform(scrollYProgress, [0.66, 1], [0, 1]);
 const projectsY = useTransform(scrollYProgress, [0.66, 1], [200, 0]);

 const { setActiveSection } = useScrollState();

 // Update context based on scroll position
 useEffect(() => {
  return scrollYProgress.on("change", (latest) => {
   if (latest < 0.33) setActiveSection("hero");
   else if (latest < 0.66) setActiveSection("skills");
   else setActiveSection("projects");
  });
 }, [scrollYProgress, setActiveSection]);

 return (
  // The container is super tall to allow for scrolling, and uses CSS perspective for 3D
  <div
   ref={containerRef}
   className="relative h-[300vh] bg-gray-50 perspective-[1000px]"
  >
   {/* --- SECTION 1: HERO --- */}
   <motion.section
    className="sticky top-0 h-screen flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 max-w-7xl mx-auto overflow-hidden origin-top"
    style={{ scale: heroScale, opacity: heroOpacity, z: heroZ }}
   >
    <div className="flex-1 space-y-6">
     <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
      Ashish Biswas
     </h1>
     <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold">
      Full-Stack Developer
     </h2>
     <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
      I am a web developer specializing in the MERN stack, currently pursuing my
      studies at COER University. I build clean, scalable, and modern digital
      experiences.
     </p>
     <div className="pt-4">
      <a
       href="/projects"
       className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
      >
       View Projects
      </a>
     </div>
    </div>
    <div className="flex-1 w-full max-w-md perspective-[1000px]">
     <div className="aspect-4/5 bg-gray-200 rounded-2xl shadow-2xl border border-gray-100 flex items-center justify-center overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-y-0 hover:rotate-x-0 duration-700">
      <span className="text-gray-400 font-medium">[ Portrait Image ]</span>
     </div>
    </div>
   </motion.section>

   {/* --- SECTION 2: SKILLS --- */}
   <motion.section
    className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 max-w-7xl mx-auto"
    style={{ scale: skillsScale, opacity: skillsOpacity, y: skillsY }}
   >
    <div className="w-full rounded-3xl shadow-xl border border-gray-100 p-12 backdrop-blur-sm bg-white/90">
     <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
      Technical Arsenal
     </h2>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {[
       "MongoDB",
       "Express.js",
       "React",
       "Node.js",
       "Next.js",
       "Tailwind CSS",
       "Artificial Intelligence",
       "Machine Learning",
      ].map((skill) => (
       <div
        key={skill}
        className="py-4 bg-gray-50 rounded-xl font-medium text-gray-700 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
       >
        {skill}
       </div>
      ))}
     </div>
    </div>
   </motion.section>

   {/* --- SECTION 3: PROJECTS --- */}
   <motion.section
    className="sticky top-0 h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto"
    style={{ scale: projectsScale, opacity: projectsOpacity, y: projectsY }}
   >
    <div className="mb-12 text-center md:text-left">
     <h2 className="text-4xl font-bold text-gray-900">Featured Work</h2>
     <p className="text-gray-600 mt-2">
      Recent robust web applications I`&apos;`ve engineered.
     </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
     {/* Project 1 */}
     <div className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
      <div className="h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
       {/* Project Image Placeholder */}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">ClarityPI</h3>
      <p className="text-gray-600 mb-4">
       A robust API testing tool designed to streamline endpoint validation and
       backend request architecture.
      </p>
      <div className="flex gap-2">
       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        Node.js
       </span>
       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        Express
       </span>
      </div>
     </div>

     {/* Project 2 */}
     <div className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
      <div className="h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
       {/* Project Image Placeholder */}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Mentor Bridge</h3>
      <p className="text-gray-600 mb-4">
       A dedicated platform connecting students with academic mentors, featuring
       secure authentication and scheduling.
      </p>
      <div className="flex gap-2">
       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        Next.js
       </span>
       <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
        MongoDB
       </span>
      </div>
     </div>
    </div>
   </motion.section>
  </div>
 );
}
