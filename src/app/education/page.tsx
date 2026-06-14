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
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-6xl">
    <div className="grid gap-6 md:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
     <div>
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
       Academic Qualification
      </p>
      <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
       Computer science foundation.
      </h1>
     </div>
     <p className="text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      Academic work gives structure to my practical development interests,
      especially around algorithms, database thinking, software design, and
      applied AI.
     </p>
    </div>

    <div className="mt-8 md:mt-14 grid gap-5 md:gap-6 lg:grid-cols-[0.9fr_1.1fr]">
     <article className="border border-white/10 bg-white/4 p-5 md:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-white/35">
       University
      </p>
      <h2 className="mt-3 md:mt-4 text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight">
       COER University
      </h2>
      <p className="mt-3 md:mt-5 text-base md:text-lg lg:text-xl text-white/65">
       Bachelor of Technology
      </p>
      <p className="mt-1 md:mt-2 text-sm text-white/45">
       Computer Science & Engineering
      </p>
      <div className="mt-4 md:mt-8 inline-block border border-white/15 px-3 md:px-4 py-1 md:py-2 text-xs uppercase tracking-[0.18em] text-white/55">
       Currently in 6th Semester
      </div>
     </article>

     <article className="border border-white/10 p-5 md:p-8">
      <h2 className="text-lg md:text-2xl font-black uppercase tracking-tight">
       Relevant Areas
      </h2>
      <div className="mt-4 md:mt-6 grid gap-2 md:gap-3 sm:grid-cols-2">
       {coursework.map((item) => (
        <div
         key={item}
         className="border border-white/10 bg-white/3 p-3 md:p-4"
        >
         <p className="text-xs md:text-sm text-white/65">{item}</p>
        </div>
       ))}
      </div>
     </article>
    </div>
   </section>
  </main>
 );
}
