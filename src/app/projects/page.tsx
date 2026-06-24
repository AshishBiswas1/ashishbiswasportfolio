"use client";

import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

function SubpageProjectCardSkeleton() {
 return (
  <article className="group flex min-h-95 sm:min-h-105 flex-col justify-between border border-white/5 bg-white/4 p-4 md:p-7 animate-pulse">
   <div>
    <div className="flex items-center justify-between border-b border-white/10 pb-3 md:pb-5">
     <div className="h-4 w-6 bg-white/10 rounded" />
     <div className="h-4 w-10 bg-white/10 rounded" />
    </div>
    <div className="mt-4 md:mt-8 h-8 w-2/3 bg-white/10 rounded mb-3" />
    <div className="h-4 w-full bg-white/5 rounded mb-2" />
    <div className="h-4 w-5/6 bg-white/5 rounded" />
   </div>
   <div className="mt-6 md:mt-10 flex flex-wrap gap-2">
    <div className="h-6 w-12 bg-white/10 rounded" />
    <div className="h-6 w-16 bg-white/10 rounded" />
    <div className="h-6 w-14 bg-white/10 rounded" />
   </div>
  </article>
 );
}

export default function ProjectsPage() {
 usePortfolioData();
 const { projects, isLoadingProjects } = useScrollState();

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Technical Projects
      </p>
      <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
       Work built with systems in mind.
      </h1>
     </div>
     <p className="max-w-xl text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      A focused selection of application ideas and technical directions across
      frontend interaction, backend APIs, AI workflows, and portfolio systems.
     </p>
    </div>

    <div className="mt-8 md:mt-14 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
     {isLoadingProjects ? (
      <>
       <SubpageProjectCardSkeleton />
       <SubpageProjectCardSkeleton />
       <SubpageProjectCardSkeleton />
      </>
     ) : projects && projects.length > 0 ? (
      projects.map((project, index) => (
       <article
        key={project._id}
        className="group flex min-h-95 sm:min-h-105 flex-col justify-between border border-white/10 bg-white/4 p-4 md:p-7 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/7"
       >
        <div>
         <div className="flex items-center justify-between border-b border-white/10 pb-3 md:pb-5">
          <span className="font-mono text-xs md:text-sm text-white/40">
           0{index + 1}
          </span>
          <a
           href={project.deployedlink}
           target="_blank"
           rel="noopener noreferrer"
           className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-white transition"
          >
           Live
          </a>
         </div>
         <h2 className="mt-4 md:mt-8 text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
          {project.title}
         </h2>
         <p className="mt-3 md:mt-5 leading-6 md:leading-7 text-xs md:text-sm text-white/58">
          {project.shortdescription ?? project.description}
         </p>
        </div>

        <div className="mt-6 md:mt-10 flex flex-wrap gap-2">
         {project.technologies &&
          project.technologies.map((tech) => (
           <span
            key={tech}
            className="border border-white/10 px-2 md:px-3 py-1 md:py-2 text-xs uppercase tracking-[0.14em] text-white/55"
           >
            {tech}
           </span>
          ))}
        </div>
       </article>
      ))
     ) : (
      <div className="col-span-full text-center text-white/50">
       No projects found.
      </div>
     )}
    </div>
   </section>
  </main>
 );
}
