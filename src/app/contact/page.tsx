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
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] text-left">
    <div>
     <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
      Contact
     </p>
     <h1 className="mt-3 md:mt-5 font-display text-[42px] sm:text-[54px] md:text-[66px] font-light leading-tight tracking-[-0.025em] text-text-primary">
      Let&apos;s build something useful.
     </h1>
     <p className="mt-4 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-text-secondary font-light">
      Share the role, collaboration idea, or project context. I am available for internships and full-stack software development projects.
     </p>

     <div className="mt-8 md:mt-10 grid gap-4">
      {contactCards.map((card) => (
       <div 
        key={card.label} 
        className="bg-surface-card border border-border-subtle hover:border-gold-dim transition-all duration-300 p-5 rounded-[4px]"
       >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-1">
         {card.label}
        </p>
        <p className="text-[13px] text-text-secondary leading-relaxed font-light">
         {card.value}
        </p>
       </div>
      ))}
     </div>
    </div>

    <form
     onSubmit={handleSubmit}
     className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-[4px] shadow-2xl flex flex-col gap-5"
    >
     <div className="grid gap-5 sm:grid-cols-2">
      <label className="block">
       <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
        Name
       </span>
       <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="mt-2.5 w-full border border-border-mid bg-void px-4 py-3 text-xs md:text-sm text-text-primary outline-none transition focus:border-gold focus:ring-1 focus:ring-gold rounded-[2px] font-mono"
        placeholder="Your name"
       />
      </label>
      
      <label className="block">
       <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
        Email
       </span>
       <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-2.5 w-full border border-border-mid bg-void px-4 py-3 text-xs md:text-sm text-text-primary outline-none transition focus:border-gold focus:ring-1 focus:ring-gold rounded-[2px] font-mono"
        placeholder="you@example.com"
       />
      </label>
     </div>

     <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
       Subject
      </span>
      <input
       type="text"
       name="subject"
       value={formData.subject}
       onChange={handleChange}
       required
       className="mt-2.5 w-full border border-border-mid bg-void px-4 py-3 text-xs md:text-sm text-text-primary outline-none transition focus:border-gold focus:ring-1 focus:ring-gold rounded-[2px] font-mono"
       placeholder="Internship, project, collaboration"
      />
     </label>

     <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">
       Message
      </span>
      <textarea
       rows={5}
       name="message"
       value={formData.message}
       onChange={handleChange}
       required
       className="mt-2.5 w-full resize-none border border-border-mid bg-void px-4 py-3 text-xs md:text-sm text-text-primary outline-none transition focus:border-gold focus:ring-1 focus:ring-gold rounded-[2px] font-mono"
       placeholder="Tell me what you are building or hiring for."
      />
     </label>

     <button
      type="submit"
      disabled={isSubmitting}
      className="mt-2 w-full border border-gold bg-gold px-5 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.18em] text-void transition hover:bg-transparent hover:text-gold disabled:opacity-50 disabled:cursor-not-allowed font-mono rounded-[2px] cursor-pointer"
     >
      {isSubmitting ? "Sending..." : "Send Message"}
     </button>

     {submitStatus === "success" && (
      <p className="text-sm text-green-400 text-center font-mono mt-2">
       ✓ Message sent successfully! I&apos;ll get back to you soon.
      </p>
     )}
     {submitStatus === "error" && (
      <p className="text-sm text-red-400 text-center font-mono mt-2">
       ✗ Failed to send message. Please try again.
      </p>
     )}
    </form>
   </section>
  </main>
 );
}
