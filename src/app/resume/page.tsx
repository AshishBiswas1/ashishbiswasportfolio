"use client";

import Link from "next/link";
import { useScrollState } from "@/context/ScrollContext";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function ResumePage() {
 usePortfolioData();
 const { user, resume, qualifications, internships, objective, skills } =
  useScrollState();

 const name = user?.name ?? resume?.name ?? "—";
 const designation = user?.designation?.[0] ?? resume?.designation?.[0] ?? "—";
 const github = user?.githubLink;

 const coreItems = [
  objective?.headline ?? "Full-stack developer",
  objective?.description ??
   "Interested in AI-enabled workflows and clean APIs.",
  ...(skills ?? []).slice(0, 1).map((s) => s.category || s.name),
 ];

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
        {name}
       </h2>
       <p className="mt-1 md:mt-2 text-xs md:text-sm text-white/55">
        {designation}
       </p>
      </div>

      <p className="text-xs uppercase tracking-[0.18em] text-white/40">
       {user?.designation?.slice(0, 2).join(" • ") || "MERN - Next.js - AI"}
      </p>
     </div>

     <div className="grid gap-6 md:gap-8 pt-6 md:pt-8">
      <article>
       <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tight">
        Core Profile
       </h3>
       <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-xs md:text-sm text-white/62">
        {coreItems.filter(Boolean).map((item, idx) => (
         <li key={`${idx}-${item}`} className="leading-6 md:leading-7">
          {item}
         </li>
        ))}
        {github ? (
         <li className="leading-6 md:leading-7">
          GitHub:{" "}
          <a
           className="underline"
           href={github}
           target="_blank"
           rel="noreferrer"
          >
           {github}
          </a>
         </li>
        ) : null}
       </ul>
      </article>

      <article>
       <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tight">
        Education
       </h3>
       <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-xs md:text-sm text-white/62">
        {(qualifications ?? []).slice(0, 2).map((q) => (
         <li key={q._id} className="leading-6 md:leading-7">
          {q.educationLevel ? `${q.educationLevel}, ` : ""}
          {q.degree}
          {q.fieldOfStudy ? ` • ${q.fieldOfStudy}` : ""} — {q.institution}
          {q.duration?.startYear || q.duration?.endYear
           ? ` (${q.duration.startYear ?? ""}${
              q.duration.endYear ? ` - ${q.duration.endYear}` : ""
             })`
           : ""}
         </li>
        ))}
       </ul>
      </article>

      <article>
       <h3 className="text-base md:text-lg lg:text-xl font-black uppercase tracking-tight">
        Experience
       </h3>
       <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3 text-xs md:text-sm text-white/62">
        {(internships ?? []).slice(0, 3).map((i) => (
         <li key={i._id} className="leading-6 md:leading-7">
          {i.company} — {i.role}
          {i.duration?.startDate
           ? ` (${i.duration.startDate}${
              i.duration.endDate ? ` - ${i.duration.endDate}` : ""
             })`
           : ""}
         </li>
        ))}
       </ul>
      </article>
     </div>
    </div>
   </section>
  </main>
 );
}
