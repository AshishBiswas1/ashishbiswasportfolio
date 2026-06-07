const projects = [
 {
  title: "Portfolio CMS",
  type: "Full-stack",
  description:
   "A project management backend paired with a highly animated portfolio interface.",
  stack: ["Next.js", "Express", "MongoDB"],
 },
 {
  title: "AI Research Interface",
  type: "Prototype",
  description:
   "A structured UI concept for exploring machine learning workflows and results.",
  stack: ["React", "Python", "ML"],
 },
 {
  title: "Developer Dashboard",
  type: "Product UI",
  description:
   "A dashboard-style experience for scanning projects, status, and technical notes.",
  stack: ["TypeScript", "REST APIs", "Tailwind"],
 },
];

export default function ProjectsPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Technical Projects
      </p>
      <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
       Work built with systems in mind.
      </h1>
     </div>
     <p className="max-w-xl text-lg leading-8 text-white/62">
      A focused selection of application ideas and technical directions across
      frontend interaction, backend APIs, AI workflows, and portfolio systems.
     </p>
    </div>

    <div className="mt-14 grid gap-6 lg:grid-cols-3">
     {projects.map((project, index) => (
      <article
       key={project.title}
       className="group flex min-h-[420px] flex-col justify-between border border-white/10 bg-white/[0.04] p-7 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.07]"
      >
       <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
         <span className="font-mono text-sm text-white/40">
          0{index + 1}
         </span>
         <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
          {project.type}
         </span>
        </div>
        <h2 className="mt-8 text-3xl font-black uppercase tracking-tight">
         {project.title}
        </h2>
        <p className="mt-5 leading-7 text-white/58">{project.description}</p>
       </div>

       <div className="mt-10 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
         <span
          key={tech}
          className="border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.14em] text-white/55"
         >
          {tech}
         </span>
        ))}
       </div>
      </article>
     ))}
    </div>
   </section>
  </main>
 );
}
