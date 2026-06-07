"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { useEffect } from "react";

const navItems = [
 { href: "/", label: "Home", target: "home" },
 { href: "/objective", label: "Objective" },
 { href: "/education", label: "Education" },
 { href: "/projects", label: "Projects" },
 { href: "/internships", label: "Internship" },
 { href: "/skills", label: "Skills" },
 { href: "/resume", label: "Resume" },
];

const scrollStops: Record<string, number> = {
 home: 0,
 "career-objective": 0.17,
 "academic-qualification": 0.34,
 internship: 0.51,
 "technical-projects": 0.68,
 "technical-skills": 0.85,
};

function scrollToStop(target?: string) {
 if (!target) return;

 const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
 const scrollTop = Math.max(0, maxScroll * scrollStops[target]);

 window.scrollTo({ top: scrollTop, behavior: "smooth" });
}

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

export default function Navbar() {
 const pathname = usePathname();

 useEffect(() => {
  if (pathname !== "/") return;

  const target = window.location.hash.replace("#", "") || "home";
  window.setTimeout(() => scrollToStop(target), 60);
 }, [pathname]);

 if (pathname?.includes("/admin")) {
  return null;
 }

 const handleSectionClick = (
  event: MouseEvent<HTMLAnchorElement>,
  target?: string,
 ) => {
  if (pathname !== "/" || !target) return;

  event.preventDefault();
  window.history.replaceState(
   null,
   "",
   target === "home" ? "/" : `/#${target}`,
  );
  scrollToStop(target);
 };

 return (
  <header className="fixed left-0 right-0 top-0 z-[100] px-3 pt-3 sm:px-5">
   <nav
    aria-label="Primary navigation"
    className="relative mx-auto grid min-h-16 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto_minmax(88px,1fr)] items-center gap-3 rounded-full border border-white/15 bg-black/50 px-4 py-3 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:border-white/30 hover:bg-black/65 sm:px-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(120px,1fr)]"
   >
    <div className="flex min-w-0 max-w-[calc(50vw-132px)] items-center justify-start gap-0.5 overflow-x-auto pr-5 no-scrollbar lg:gap-1 xl:max-w-[calc(50vw-150px)] xl:pr-7">
     {navItems.map((item) => (
      <Link
       key={item.href}
       href={item.href}
       onClick={(event) => handleSectionClick(event, item.target)}
       className="group relative shrink-0 rounded-full px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/68 transition duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 xl:px-2.5 xl:text-[11px]"
      >
       <span className="relative z-10">{item.label}</span>
       <span className="absolute inset-0 scale-90 rounded-full bg-white/0 opacity-0 transition duration-300 group-hover:scale-100 group-hover:bg-white/12 group-hover:opacity-100" />
       <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-white/70 transition-all duration-300 group-hover:w-8" />
      </Link>
     ))}
    </div>

    <Link
     href="/"
     className="hidden justify-self-center rounded-full border border-white/10 bg-white/10 px-5 py-2 text-center text-sm font-black uppercase tracking-[0.18em] text-white shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur-xl transition duration-300 hover:border-white/30 hover:bg-white/15 lg:block"
    >
     Ashish Biswas
    </Link>

    <Link
     href="/"
     className="shrink-0 text-sm font-black uppercase tracking-[0.18em] text-white lg:hidden"
    >
     Ashish
    </Link>

    <div className="flex shrink-0 items-center justify-end gap-2">
     <button
      type="button"
      aria-label="GitHub profile link coming soon"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
     >
      <GitHubIcon />
     </button>
     <button
      type="button"
      aria-label="LinkedIn profile link coming soon"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white/75 transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
     >
      <LinkedInIcon />
     </button>
    </div>
   </nav>
  </header>
 );
}
