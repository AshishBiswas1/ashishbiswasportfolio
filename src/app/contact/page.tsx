"use client";

import { useState } from "react";
import { submitContact } from "@/services/api";

const contactCards = [
 { label: "Opportunities", value: "Open to internships and project work" },
 { label: "Response", value: "Best for concise project or role details" },
 { label: "Location", value: "India, available for remote collaboration" },
];

export default function ContactPage() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
  "idle",
 );

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
 ) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
   await submitContact(formData);
   setSubmitStatus("success");
   setFormData({ name: "", email: "", subject: "", message: "" });
   setTimeout(() => setSubmitStatus("idle"), 5000);
  } catch (error) {
   console.error("Failed to submit contact form:", error);
   setSubmitStatus("error");
   setTimeout(() => setSubmitStatus("idle"), 5000);
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <main className="min-h-screen bg-[#050505] px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-white lg:px-10">
   <section className="mx-auto grid max-w-6xl gap-6 md:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
    <div>
     <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
      Contact
     </p>
     <h1 className="mt-3 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight">
      Let&apos;s build something useful.
     </h1>
     <p className="mt-4 md:mt-7 text-sm sm:text-base md:text-lg leading-6 md:leading-8 text-white/62">
      Share the role, collaboration idea, or project context. The form is ready
      for frontend capture and can be wired to an API or email service when the
      backend contact flow is added.
     </p>

     <div className="mt-6 md:mt-10 grid gap-3 md:gap-4">
      {contactCards.map((card) => (
       <div key={card.label} className="border border-white/10 p-3 md:p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-white/35">
         {card.label}
        </p>
        <p className="mt-1 md:mt-2 text-xs md:text-sm text-white/70">
         {card.value}
        </p>
       </div>
      ))}
     </div>
    </div>

    <form
     onSubmit={handleSubmit}
      className="border border-white/10 bg-white/[0.04] p-4 md:p-6 lg:p-8 shadow-2xl shadow-black/30"
    >
     <div className="grid gap-3 md:gap-5 sm:grid-cols-2">
      <label className="block">
       <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        Name
       </span>
       <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mt-2 md:mt-3 w-full border border-white/10 bg-black/40 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none transition focus:border-white/40"
        placeholder="Your name"
       />
      </label>
      <label className="block">
       <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
        Email
       </span>
       <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-2 md:mt-3 w-full border border-white/10 bg-black/40 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none transition focus:border-white/40"
        placeholder="you@example.com"
       />
      </label>
     </div>

     <label className="mt-3 md:mt-5 block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
       Subject
      </span>
      <input
       type="text"
       name="subject"
       value={formData.subject}
       onChange={handleChange}
       required
       className="mt-2 md:mt-3 w-full border border-white/10 bg-black/40 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none transition focus:border-white/40"
       placeholder="Internship, project, collaboration"
      />
     </label>

     <label className="mt-3 md:mt-5 block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
       Message
      </span>
      <textarea
       rows={5}
       name="message"
       value={formData.message}
       onChange={handleChange}
       required
       className="mt-2 md:mt-3 w-full resize-none border border-white/10 bg-black/40 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm text-white outline-none transition focus:border-white/40"
       placeholder="Tell me what you are building or hiring for."
      />
     </label>

     <button
      type="submit"
      disabled={isSubmitting}
      className="mt-4 md:mt-6 w-full border border-white bg-white px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:bg-transparent hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
     >
      {isSubmitting ? "Sending..." : "Send Message"}
     </button>

     {submitStatus === "success" && (
      <p className="mt-4 text-sm text-green-400 text-center">
       ✓ Message sent successfully! I&apos;ll get back to you soon.
      </p>
     )}
     {submitStatus === "error" && (
      <p className="mt-4 text-sm text-red-400 text-center">
       ✗ Failed to send message. Please try again.
      </p>
     )}
    </form>
   </section>
  </main>
 );
}
