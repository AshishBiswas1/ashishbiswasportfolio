const principles = [
 "Build interfaces that make complex ideas easier to use.",
 "Connect frontend polish with dependable backend architecture.",
 "Keep learning across AI, systems, and product engineering.",
];

export default function ObjectivePage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto max-w-6xl">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
     Career Objective
    </p>
    <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase tracking-tight md:text-7xl">
     Create scalable digital products with clarity and intent.
    </h1>

    <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
     <article className="border border-white/10 bg-white/[0.04] p-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">
       Direction
      </h2>
      <p className="mt-6 text-lg leading-8 text-white/62">
       My goal is to grow as a full-stack developer who can design, build, and
       deploy reliable web applications. I want to work on products where
       frontend experience, API design, database structure, and intelligent
       features all support a clear user outcome.
      </p>
     </article>

     <aside className="border border-white/10 p-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">
       What I value
      </h2>
      <div className="mt-6 space-y-4">
       {principles.map((principle) => (
        <p key={principle} className="border-l border-white/20 pl-4 text-white/60">
         {principle}
        </p>
       ))}
      </div>
     </aside>
    </div>
   </section>
  </main>
 );
}
