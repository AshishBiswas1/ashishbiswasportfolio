const contactCards = [
 { label: "Opportunities", value: "Open to internships and project work" },
 { label: "Response", value: "Best for concise project or role details" },
 { label: "Location", value: "India, available for remote collaboration" },
];

export default function ContactPage() {
 return (
  <main className="min-h-screen bg-[#050505] px-6 pb-24 pt-32 text-white sm:px-8 lg:px-10">
   <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
      Contact
     </p>
     <h1 className="mt-5 text-5xl font-black uppercase tracking-tight md:text-7xl">
      Let&apos;s build something useful.
     </h1>
     <p className="mt-7 text-lg leading-8 text-white/62">
      Share the role, collaboration idea, or project context. The form is ready
      for frontend capture and can be wired to an API or email service when the
      backend contact flow is added.
     </p>

     <div className="mt-10 grid gap-4">
      {contactCards.map((card) => (
       <div key={card.label} className="border border-white/10 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
         {card.label}
        </p>
        <p className="mt-2 text-sm text-white/70">{card.value}</p>
       </div>
      ))}
     </div>
    </div>

    <form className="border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 md:p-8">
     <div className="grid gap-5 sm:grid-cols-2">
      <label className="block">
       <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        Name
       </span>
       <input
        type="text"
        className="mt-3 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/40"
        placeholder="Your name"
       />
      </label>
      <label className="block">
       <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        Email
       </span>
       <input
        type="email"
        className="mt-3 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/40"
        placeholder="you@example.com"
       />
      </label>
     </div>

     <label className="mt-5 block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
       Subject
      </span>
      <input
       type="text"
       className="mt-3 w-full border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/40"
       placeholder="Internship, project, collaboration"
      />
     </label>

     <label className="mt-5 block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
       Message
      </span>
      <textarea
       rows={7}
       className="mt-3 w-full resize-none border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-white/40"
       placeholder="Tell me what you are building or hiring for."
      />
     </label>

     <button
      type="button"
      className="mt-6 w-full border border-white bg-white px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white"
     >
      Send Message
     </button>
    </form>
   </section>
  </main>
 );
}
