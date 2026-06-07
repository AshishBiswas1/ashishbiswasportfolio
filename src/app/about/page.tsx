const highlights = [
 "MERN stack development",
 "Next.js interfaces",
 "AI-aware product thinking",
 "Clean API integration",
];

export default function AboutPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       About
      </p>
      <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
       Building thoughtful digital systems.
      </h1>
     </div>
     <p className="text-lg leading-8 text-white/62">
      I am Ashish Biswas, a full-stack developer focused on creating polished
      web experiences with strong engineering foundations. My work sits between
      clean frontend interaction, reliable backend APIs, and product ideas that
      feel useful in the real world.
     </p>
    </div>

    <div className="mt-14 grid gap-5 md:grid-cols-4">
     {highlights.map((item) => (
      <div
       key={item}
       className="border border-white/10 bg-white/[0.04] p-5 backdrop-blur"
      >
       <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/75">
        {item}
       </p>
      </div>
     ))}
    </div>

    <div className="mt-16 grid gap-8 lg:grid-cols-3">
     <article className="border border-white/10 bg-white/[0.04] p-8 lg:col-span-2">
      <h2 className="text-2xl font-bold uppercase tracking-tight">
       Engineering Direction
      </h2>
      <p className="mt-5 leading-7 text-white/60">
       I like building applications that are clear to use, structured in code,
       and flexible enough to grow. My current focus is on the MERN stack,
       Next.js, TypeScript, API-driven dashboards, and interfaces that use
       animation with purpose rather than noise.
      </p>
     </article>

     <aside className="border border-white/10 bg-white/[0.04] p-8">
      <h2 className="text-2xl font-bold uppercase tracking-tight">Now</h2>
      <p className="mt-5 leading-7 text-white/60">
       Studying Computer Science & Engineering at COER University while
       developing portfolio, CMS, and research-oriented web projects.
      </p>
     </aside>
    </div>
   </section>
  </main>
 );
}
