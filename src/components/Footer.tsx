"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollState } from "@/context/ScrollContext";

const exploreLinks = [
 { href: "/", label: "Home" },
 { href: "/objective", label: "Objective" },
 { href: "/education", label: "Education" },
 { href: "/projects", label: "Projects" },
];

const profileLinks = [
 { href: "/internships", label: "Internship" },
 { href: "/skills", label: "Skills" },
 { href: "/resume", label: "Resume" },
 { href: "/contact", label: "Contact" },
];

function GitHubIcon() {
 return (
  <svg
   viewBox="0 0 24 24"
   aria-hidden="true"
   className="h-3.5 w-3.5"
   fill="currentColor"
  >
   <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.92c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.2 10.2 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
  </svg>
 );
}

function LinkedInIcon() {
 return (
  <svg
   viewBox="0 0 24 24"
   aria-hidden="true"
   className="h-3.5 w-3.5"
   fill="currentColor"
  >
   <path d="M5.37 3.5a2.37 2.37 0 1 1 0 4.74 2.37 2.37 0 0 1 0-4.74ZM3.3 9.74h4.14V20.5H3.3V9.74Zm6.24 0h3.96v1.47h.06c.55-1.04 1.89-1.7 3.89-1.7 4.16 0 4.93 2.74 4.93 6.3v4.69h-4.13v-4.16c0-1 .02-2.27-1.38-2.27-1.38 0-1.6 1.08-1.6 2.19v4.24h-4.13V9.74Z" />
  </svg>
 );
}

function FooterColumn({
 title,
 links,
}: {
 title: string;
 links: { href: string; label: string }[];
}) {
 return (
  <div>
   <h3 className="mb-5 font-mono text-[10px] tracking-[0.18em] uppercase text-gold">
    {title}
   </h3>
   <nav className="flex flex-col gap-2.5" aria-label={`${title} footer links`}>
    {links.map((link) => (
     <Link
      key={link.href}
      href={link.href}
      className="text-[13px] text-text-secondary hover:text-text-primary font-light transition-colors duration-200"
     >
      {link.label}
     </Link>
    ))}
   </nav>
  </div>
 );
}

export default function Footer() {
 const pathname = usePathname();
 const { user } = useScrollState();
 const year = new Date().getFullYear();

 const githubUrl = user?.githubLink || "#";
 const linkedinUrl = user?.linkedinLink || "#";

 if (pathname?.includes("/admin")) {
  return null;
 }

 return (
  <footer className="relative z-40 border-t border-border-subtle bg-void text-text-primary">
   <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:px-8">
    <div className="grid gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr]">
     {/* Brand info */}
     <div className="flex flex-col gap-4">
      <Link
       href="/"
       className="font-display text-[28px] font-semibold tracking-[-0.01em] text-text-primary"
      >
       Ashish Biswas
      </Link>
      <p className="text-[13px] text-text-muted leading-relaxed font-light max-w-[220px]">
       Full-stack developer focused on clean interfaces, reliable systems, and
       thoughtful web experiences.
      </p>
      
      {/* Social Links */}
      <div className="mt-4 flex items-center gap-2.5">
       <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
        className="w-[34px] h-[34px] border border-border-mid rounded-full flex items-center justify-center text-text-secondary hover:border-gold-dim hover:bg-gold-faint hover:text-gold transition duration-200"
       >
        <GitHubIcon />
       </a>
       <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
        className="w-[34px] h-[34px] border border-border-mid rounded-full flex items-center justify-center text-text-secondary hover:border-gold-dim hover:bg-gold-faint hover:text-gold transition duration-200"
       >
        <LinkedInIcon />
       </a>
      </div>
     </div>

     {/* Explore Links */}
     <FooterColumn title="Explore" links={exploreLinks} />
     
     {/* Profile Links */}
     <FooterColumn title="Profile" links={profileLinks} />

     {/* Focus Column */}
     <div>
      <h3 className="mb-5 font-mono text-[10px] tracking-[0.18em] uppercase text-gold">
       Focus
      </h3>
      <nav className="flex flex-col gap-2.5" aria-label="Focus details">
       <span className="text-[13px] text-text-secondary font-light">Next.js interfaces</span>
       <span className="text-[13px] text-text-secondary font-light">MERN applications</span>
       <span className="text-[13px] text-text-secondary font-light">Animated portfolios</span>
       <span className="text-[13px] text-text-secondary font-light">API-backed showcases</span>
      </nav>
     </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-14 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
     <span className="font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase">
      © {year} Ashish Biswas. All rights reserved.
     </span>
     <span className="font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase">
      Built with Next.js, React, Tailwind CSS
     </span>
    </div>
   </div>
  </footer>
 );
}
