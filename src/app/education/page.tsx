const coursework = [
 "Data Structures",
 "Database Systems",
 "Web Engineering",
 "Operating Systems",
 "Artificial Intelligence",
 "Software Engineering",
];

export default function EducationPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Academic Qualification
      </p>
      <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
       Computer science foundation.
      </h1>
     </div>
     <p className="text-lg leading-8 text-white/62">
      Academic work gives structure to my practical development interests,
      especially around algorithms, database thinking, software design, and
      applied AI.
     </p>
    </div>

    <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
     <article className="border border-white/10 bg-white/[0.04] p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
       University
      </p>
      <h2 className="mt-4 text-4xl font-black uppercase tracking-tight">
       COER University
      </h2>
      <p className="mt-5 text-xl text-white/65">
       Bachelor of Technology
      </p>
      <p className="mt-2 text-white/45">Computer Science & Engineering</p>
      <div className="mt-8 inline-block border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white/55">
       Currently in 6th Semester
      </div>
     </article>

     <article className="border border-white/10 p-8">
      <h2 className="text-2xl font-black uppercase tracking-tight">
       Relevant Areas
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
       {coursework.map((item) => (
        <div key={item} className="border border-white/10 bg-white/[0.03] p-4">
         <p className="text-sm text-white/65">{item}</p>
        </div>
       ))}
      </div>
     </article>
    </div>
   </section>
  </main>
 );
}
