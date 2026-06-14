const experiences = [
 {
  role: "Summer Internship Program",
  company: "KPMG Greece",
  date: "April 2026",
  notes: [
   "Exposure to consulting workflows, business analysis, and digital transformation practices.",
   "Built a stronger understanding of professional delivery, documentation, and client-facing thinking.",
  ],
 },
 {
  role: "Research & Development Intern",
  company: "South Asian University (SAU)",
  date: "Research Internship",
  notes: [
   "Worked around research-oriented problem solving and structured technical exploration.",
   "Strengthened interest in artificial intelligence, data workflows, and applied development.",
  ],
 },
];

export default function InternshipsPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-5xl">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
     Internship
    </p>
    <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
     Experience shaped by practice.
    </h1>
    <p className="mt-4 md:mt-7 max-w-3xl text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
     A record of internship and research exposure that supports my direction as
     a full-stack developer interested in reliable products and applied AI.
    </p>

    <div className="mt-8 md:mt-14 border-l border-white/15">
     {experiences.map((experience) => (
      <article
       key={experience.company}
       className="relative pb-8 md:pb-12 pl-6 md:pl-8 last:pb-0"
      >
       <div className="absolute -left-1.25 md:-left-1.5 top-2 h-2.5 w-2.5 rounded-full bg-white" />
       <div className="border border-white/10 bg-white/4 p-4 md:p-7">
        <div className="flex flex-col gap-2 md:gap-3 md:flex-row md:items-start md:justify-between">
         <div>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight">
           {experience.company}
          </h2>
          <p className="mt-1 md:mt-2 text-sm md:text-base text-white/60">
           {experience.role}
          </p>
         </div>
         <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 whitespace-nowrap">
          {experience.date}
         </span>
        </div>

        <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-xs md:text-sm text-white/60">
         {experience.notes.map((note) => (
          <li key={note} className="leading-6 md:leading-7">
           {note}
          </li>
         ))}
        </ul>
       </div>
      </article>
     ))}
    </div>
   </section>
  </main>
 );
}
