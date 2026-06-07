const groups = [
 {
  title: "Frontend",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
 },
 {
  title: "Backend",
  skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs"],
 },
 {
  title: "Applied AI",
  skills: ["Python", "Machine Learning", "Research Workflows", "Data Handling"],
 },
 {
  title: "Tools",
  skills: ["Git", "GitHub", "Deployment", "API Testing", "Debugging"],
 },
];

export default function SkillsPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Technical Skills
      </p>
      <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
       A practical full-stack toolkit.
      </h1>
     </div>
     <p className="text-lg leading-8 text-white/62">
      Skills are organized around building usable products: polished interfaces,
      stable APIs, database-backed workflows, and enough AI literacy to explore
      intelligent features responsibly.
     </p>
    </div>

    <div className="mt-14 grid gap-6 md:grid-cols-2">
     {groups.map((group) => (
      <article key={group.title} className="border border-white/10 bg-white/[0.04] p-7">
       <h2 className="text-2xl font-black uppercase tracking-tight">
        {group.title}
       </h2>
       <div className="mt-6 flex flex-wrap gap-3">
        {group.skills.map((skill) => (
         <span
          key={skill}
          className="border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/68"
         >
          {skill}
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
