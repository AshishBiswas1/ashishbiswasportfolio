import Link from "next/link";

const resumeSections = [
 {
  title: "Core Profile",
  items: [
   "Full-stack developer focused on MERN and Next.js applications.",
   "Interested in AI-enabled workflows, portfolio systems, and clean APIs.",
  ],
 },
 {
  title: "Education",
  items: [
   "B.Tech, Computer Science & Engineering, COER University.",
   "Currently in 6th Semester.",
  ],
 },
 {
  title: "Experience",
  items: [
   "KPMG Greece - Summer Internship Program.",
   "South Asian University - Research & Development Intern.",
  ],
 },
];

export default function ResumePage() {
 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto max-w-5xl">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
     Resume
    </p>
    <div className="mt-3 md:mt-5 flex flex-col gap-4 md:gap-6 md:flex-row md:items-end md:justify-between">
     <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
      Profile snapshot.
     </h1>
     <Link
      href="/contact"
      className="inline-flex border border-white bg-white px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:bg-transparent hover:text-white"
     >
      Contact Me
     </Link>
    </div>

    <div className="mt-8 md:mt-12 border border-white/10 bg-white/4 p-4 md:p-6 lg:p-8">
     <div className="flex flex-col gap-3 border-b border-white/10 pb-6 md:pb-8 md:flex-row md:items-center md:justify-between">
      <div>
       <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
        Ashish Biswas
       </h2>
       <p className="mt-1 md:mt-2 text-xs md:text-sm text-white/55">
        Full-Stack Developer
       </p>
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
       MERN - Next.js - AI
      </p>
     </div>

     <div className="grid gap-6 md:gap-8 pt-6 md:pt-8">
      {resumeSections.map((section) => (
       <article key={section.title}>
        <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tight">
         {section.title}
        </h3>
        <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-xs md:text-sm text-white/62">
         {section.items.map((item) => (
          <li key={item} className="leading-6 md:leading-7">
           {item}
          </li>
         ))}
        </ul>
       </article>
      ))}
     </div>
    </div>
   </section>
  </main>
 );
}
