"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
   className="h-5 w-5"
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
   className="h-5 w-5"
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
   <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
    {title}
   </h3>
   <nav className="space-y-3" aria-label={`${title} footer links`}>
    {links.map((link) => (
     <Link
      key={link.href}
      href={link.href}
      className="block text-sm text-white/65 transition duration-300 hover:text-white"
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
 const year = new Date().getFullYear();

 if (pathname?.includes("/admin")) {
  return null;
 }

 return (
  <footer className="relative z-40 border-t border-white/10 bg-[#050505] text-white">
   <div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-8 lg:px-10">
    <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr]">
     <div className="max-w-xl">
      <Link
       href="/"
       className="text-2xl font-black uppercase tracking-[0.18em] text-white"
      >
       Ashish Biswas
      </Link>
      <p className="mt-5 text-base leading-7 text-white/58">
       Full-stack developer focused on clean interfaces, reliable systems, and
       thoughtful web experiences across the MERN stack and Next.js.
      </p>
      <div className="mt-8 flex items-center gap-3">
       <button
        type="button"
        aria-label="GitHub profile link coming soon"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition duration-300 hover:border-white/35 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
       >
        <GitHubIcon />
       </button>
       <button
        type="button"
        aria-label="LinkedIn profile link coming soon"
        className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition duration-300 hover:border-white/35 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
       >
        <LinkedInIcon />
       </button>
      </div>
     </div>

     <FooterColumn title="Explore" links={exploreLinks} />
     <FooterColumn title="Profile" links={profileLinks} />

     <div>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
       Focus
      </h3>
      <div className="space-y-3 text-sm text-white/65">
       <p>Next.js interfaces</p>
       <p>MERN applications</p>
       <p>Animated portfolio systems</p>
       <p>API-backed project showcases</p>
      </div>
     </div>
    </div>

    <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
     <p>&copy; {year} Ashish Biswas. All rights reserved.</p>
     <p>Built with Next.js, React, Tailwind CSS, and a little motion.</p>
    </div>
   </div>
  </footer>
 );
}
