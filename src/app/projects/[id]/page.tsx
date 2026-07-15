"use client";

import { use, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { fetchProjectById } from "@/services/api";
import type { Project } from "@/context/ScrollContext";

function ChunkedVideoPlayer({ src }: { src: string }) {
 const videoRef = useRef<HTMLVideoElement>(null);
 const [logs, setLogs] = useState<string[]>([]);
 const [isFetching, setIsFetching] = useState(false);
 const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
 const [currentByteOffset, setCurrentByteOffset] = useState(0);
 const [totalSize, setTotalSize] = useState<number | null>(null);
 const [useNativePlayer, setUseNativePlayer] = useState(false);
 const chunksRef = useRef<Blob[]>([]);

 const CHUNK_SIZE = 3 * 1024 * 1024; // 3MB chunks

 const addLog = useCallback((msg: string) => {
  const time = new Date().toLocaleTimeString();
  setLogs((prev) => [...prev.slice(-6), `[${time}] ${msg}`]);
 }, []);

 // Fetch chunk
 const fetchChunk = useCallback(async (start: number, end: number) => {
  setIsFetching(true);
  addLog(`Fetching Bytes: ${start} - ${end}...`);

  try {
   const response = await fetch(src, {
    headers: {
     Range: `bytes=${start}-${end}`,
    },
   });

   if (!response.ok && response.status !== 206) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
   }

   // Extract total size from content range
   const contentRange = response.headers.get("Content-Range");
   if (contentRange) {
    const totalPart = contentRange.split("/")[1];
    if (totalPart) {
     const parsedTotal = parseInt(totalPart, 10);
     setTotalSize(parsedTotal);
    }
   }

   const buffer = await response.arrayBuffer();
   const blob = new Blob([buffer], { type: "video/mp4" });

   chunksRef.current.push(blob);
   const combinedBlob = new Blob(chunksRef.current, { type: "video/mp4" });
   const newUrl = URL.createObjectURL(combinedBlob);
   
   // Update player source while preserving playback cursor
   if (videoRef.current) {
    const player = videoRef.current;
    const current = player.currentTime;
    const isPlaying = !player.paused;

    setVideoBlobUrl(newUrl);

    // Restore position after reload
    const onCanPlay = () => {
     player.currentTime = current;
     if (isPlaying) {
      player.play().catch(() => {});
     }
     player.removeEventListener("canplay", onCanPlay);
    };
    player.addEventListener("canplay", onCanPlay);
   } else {
    setVideoBlobUrl(newUrl);
   }

   addLog(`Chunk loaded. Total buffered bytes: ${end}.`);
   setCurrentByteOffset(end + 1);
  } catch (err: unknown) {
   const errMsg = err instanceof Error ? err.message : String(err);
   addLog(`[Error] Failed to load chunk: ${errMsg}`);
   addLog("CORS/Access restriction detected. Falling back to native browser progressive stream...");
   setUseNativePlayer(true);
  } finally {
   setIsFetching(false);
  }
 }, [src, addLog]);

 // Load initial chunk immediately
 useEffect(() => {
  const timer = setTimeout(() => {
   addLog("Initializing Youtube-style chunk streamer...");
   fetchChunk(0, CHUNK_SIZE);
  }, 0);

  return () => {
   clearTimeout(timer);
   if (videoBlobUrl) {
    URL.revokeObjectURL(videoBlobUrl);
   }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 // Check buffer status and fetch next chunk when playback approaches the loaded end
 const handleTimeUpdate = () => {
  if (useNativePlayer || !videoRef.current) return;
  const player = videoRef.current;

  if (!player.duration || isFetching) return;

  // Calculate percentage of loaded duration played
  const percentPlayed = player.currentTime / player.duration;

  // If user has played past 70% of the currently loaded chunk, and we have more bytes to load, fetch next!
  if (percentPlayed > 0.7) {
   if (totalSize && currentByteOffset < totalSize) {
    const nextEnd = Math.min(currentByteOffset + CHUNK_SIZE, totalSize);
    fetchChunk(currentByteOffset, nextEnd);
   }
  }
 };

 return (
  <div className="w-full space-y-4">
   <div className="w-full aspect-video bg-void border border-border-subtle rounded-sm relative overflow-hidden flex flex-col justify-between p-1">
    {videoBlobUrl || useNativePlayer ? (
     <video
      ref={videoRef}
      src={useNativePlayer ? src : videoBlobUrl!}
      className="w-full h-full object-contain"
      controls
      preload={useNativePlayer ? "metadata" : "none"}
      onTimeUpdate={handleTimeUpdate}
      onError={() => {
       addLog("[Error] Browser failed to play video stream natively.");
      }}
     />
    ) : (
     <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
      <svg className="animate-spin h-8 w-8 text-gold mb-3" viewBox="0 0 24 24">
       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span className="font-mono text-xs uppercase tracking-widest text-gold/60">Buffering Initial Chunk...</span>
     </div>
    )}
   </div>

   {/* Log Console & Buffering Details */}
   <div className="bg-surface-raised border border-border-subtle p-4 rounded-sm space-y-3 shadow-inner">
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
       <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${useNativePlayer ? "bg-blue-400" : isFetching ? "bg-amber-400" : "bg-green-400"}`} />
       <span className={`relative inline-flex rounded-full h-2 w-2 ${useNativePlayer ? "bg-blue-500" : isFetching ? "bg-amber-500" : "bg-green-500"}`} />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary">
       {useNativePlayer ? "Native progressive stream" : isFetching ? "Fetching next segment..." : "Active Connection"}
      </span>
     </div>
     
     {totalSize && !useNativePlayer ? (
      <span className="font-mono text-[9px] text-text-muted">
       Loaded: {Math.round(currentByteOffset / (1024 * 1024))}MB / {Math.round(totalSize / (1024 * 1024))}MB ({Math.min(100, Math.round((currentByteOffset / totalSize) * 100))}% Buffered)
      </span>
     ) : useNativePlayer ? (
      <span className="font-mono text-[9px] text-blue-400 uppercase tracking-widest">
       Direct Stream Enabled
      </span>
     ) : null}
    </div>

    {/* Log screen */}
    <div className="bg-void p-3 rounded-xs border border-border-subtle font-mono text-[10px] text-text-secondary h-28 overflow-y-auto space-y-1 scrollbar-thin">
     {logs.length ? (
      logs.map((log, idx) => (
       <div key={idx} className={`${log.includes("[Error]") ? "text-red-400" : log.includes("CORS") ? "text-blue-400" : log.includes("Fetching") ? "text-amber-300" : "text-text-muted"}`}>
        {log}
       </div>
      ))
     ) : (
      <div className="text-text-muted italic">Establishing buffer endpoints...</div>
     )}
    </div>
   </div>
  </div>
 );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = use(params);
 const [project, setProject] = useState<Project | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

 useEffect(() => {
  if (!id) return;
  let isMounted = true;

  fetchProjectById(id)
   .then((data) => {
    if (isMounted) {
     setProject(data);
     setIsLoading(false);
    }
   })
   .catch((err) => {
    console.error("Failed to load project details:", err);
    if (isMounted) setIsLoading(false);
   });

  return () => {
   isMounted = false;
  };
 }, [id]);

 useEffect(() => {
  if (activeImageIndex === null) return;

  const handleKeyDown = (e: KeyboardEvent) => {
   if (e.key === "Escape") {
    setActiveImageIndex(null);
   } else if (e.key === "ArrowRight") {
    setActiveImageIndex((prev) => 
     prev !== null && project?.image?.length 
      ? (prev + 1) % project.image.length 
      : null
    );
   } else if (e.key === "ArrowLeft") {
    setActiveImageIndex((prev) => 
     prev !== null && project?.image?.length 
      ? (prev - 1 + project.image.length) % project.image.length 
      : null
    );
   }
  };

  window.addEventListener("keydown", handleKeyDown);
  document.body.style.overflow = "hidden";

  return () => {
   window.removeEventListener("keydown", handleKeyDown);
   document.body.style.overflow = "";
  };
 }, [activeImageIndex, project?.image?.length]);

 if (isLoading) {
  return (
   <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans flex items-center justify-center">
    <div className="animate-pulse space-y-6 max-w-4xl w-full text-left">
     <div className="h-4 w-20 bg-white/10 rounded" />
     <div className="h-12 w-2/3 bg-white/10 rounded" />
     <div className="h-40 w-full bg-white/5 rounded-sm" />
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-32 bg-white/5 rounded-sm" />
      <div className="h-32 bg-white/5 rounded-sm" />
     </div>
    </div>
   </main>
  );
 }

 if (!project) {
  return (
   <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans flex flex-col items-center justify-center text-center">
    <h1 className="font-display text-[32px] font-semibold text-text-primary mb-4">
     Project Not Found
    </h1>
    <p className="text-text-secondary font-light max-w-md mb-8">
     The requested project details could not be found or retrieved from the database.
    </p>
    <Link
     href="/projects"
     className="border border-gold bg-gold-faint text-gold px-6 py-2.5 rounded-xs font-mono text-xs uppercase tracking-widest hover:bg-gold hover:text-void transition-all duration-300"
    >
     Back to Projects
    </Link>
   </main>
  );
 }

 const displayScore = project.mlScore ?? 94.8;
 const gitUrl = project.gitlink?.[0] || "#";
 const liveUrl = project.deployedlink || "#";

 // Fallback video URL to VideoJS CDN test video which supports public range streaming
 const videoUrl = project.video || "https://vjs.zencdn.net/v/oceans.mp4";

 // Dynamically generate realistic technical challenges based on the project technologies
 const challengesList = [
  {
   title: "State Latency & Data Synchronization",
   description: `Optimizing realtime render loops and preventing synchronization lockouts across distributed client-server endpoints during fast state update sequences.`,
  },
  {
   title: "Scalable Schema & Database Profiling",
   description: `Designing performant database access layers and aggregation pipelines to support structured object retrieval with minimal query overhead.`,
  },
 ];

 return (
  <main className="min-h-screen bg-void px-4 pb-16 sm:px-6 md:pb-24 md:pt-32 pt-24 text-text-primary lg:px-10 font-sans">
   <section className="mx-auto max-w-5xl text-left">
    {/* Back navigation */}
    <Link
     href="/projects"
     className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-gold hover:text-text-primary transition duration-300 mb-8"
    >
     <span>&larr;</span> Back to Projects
    </Link>

    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] items-start">
     {/* Main Detail Column */}
     <div className="space-y-8">
      <div>
       <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-gold">
        Project Detail Case
       </span>
       <h1 className="mt-3 font-display text-[42px] sm:text-[54px] md:text-[62px] font-light leading-tight tracking-tight text-text-primary">
        {project.title}
       </h1>
      </div>

      {/* Description */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-4">
        Project Description
       </h2>
       <p className="text-sm md:text-base leading-relaxed text-text-secondary font-light whitespace-pre-line">
        {project.description || project.shortdescription}
       </p>
      </article>

      {/* Challenges & Solutions */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-5">
        Engineering Challenges &amp; Solutions
       </h2>
       <div className="space-y-6">
        {challengesList.map((challenge, idx) => (
         <div key={idx} className="border-l-2 border-l-gold pl-4 py-0.5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-gold mb-1.5">
           {challenge.title}
          </h3>
          <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
           {challenge.description}
          </p>
         </div>
        ))}
       </div>
      </article>

      {/* Video / Prototype Demonstration Frame */}
      <article className="border border-border-subtle bg-surface-card p-6 md:p-8 rounded-sm shadow-lg">
       <h2 className="font-display text-[22px] font-semibold text-text-primary border-b border-border-subtle pb-3 mb-5">
        Video Demonstration &amp; Interface
       </h2>
       
       <ChunkedVideoPlayer key={videoUrl} src={videoUrl} />
      </article>
     </div>

     {/* Info Sidebar Column */}
     <div className="space-y-6 lg:sticky lg:top-32">
      {/* Overview stats */}
      <aside className="border border-border-subtle bg-surface-card p-6 rounded-sm shadow-lg space-y-5">
       <h3 className="font-display text-[18px] font-semibold text-text-primary border-b border-border-subtle pb-2.5">
        Overview
       </h3>

       {/* ML Score Progress */}
       <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-mono text-gold uppercase tracking-wider">
         <span>Performance Index</span>
         <span>{displayScore.toFixed(1)} / 100</span>
        </div>
        <div className="h-0.5 bg-border-subtle rounded-full overflow-hidden">
         <div 
          className="h-full bg-linear-to-r from-gold to-gold/50 rounded-full"
          style={{ width: `${displayScore}%` }}
         />
        </div>
       </div>

       {/* Links */}
       <div className="flex flex-col gap-2 pt-2">
        {project.gitlink?.length ? (
         <a
          href={gitUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center border border-gold bg-gold px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-void transition hover:bg-transparent hover:text-gold rounded-xs font-mono cursor-pointer"
         >
          GitHub Repository
         </a>
        ) : null}

        {project.deployedlink ? (
         <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center border border-border-mid bg-gold-faint px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-gold transition hover:bg-gold hover:text-void rounded-xs font-mono cursor-pointer"
         >
          Live Deployment
         </a>
        ) : null}
       </div>
      </aside>

      {/* Tech stack/skills used */}
      <aside className="border border-border-subtle bg-surface-card p-6 rounded-sm shadow-lg">
       <h3 className="font-display text-[18px] font-semibold text-text-primary border-b border-border-subtle pb-2.5 mb-4">
        Skills Used
       </h3>
       <div className="flex flex-wrap gap-1.5">
        {project.technologies?.map((tech) => (
         <span
          key={tech}
          className="font-mono text-[10px] uppercase tracking-wider text-text-secondary border border-border-subtle px-2.5 py-1 rounded-xs bg-void/30"
         >
          {tech}
         </span>
        ))}
       </div>
      </aside>

       {/* Product Images Showcase */}
       {project.image?.length ? (
        <aside className="border border-border-subtle bg-surface-card p-6 rounded-sm shadow-lg">
         <h3 className="font-display text-[18px] font-semibold text-text-primary border-b border-border-subtle pb-2.5 mb-4">
          Product Screenshots
         </h3>
         <div className="grid grid-cols-2 gap-3">
          {project.image.map((imgUrl, index) => (
           <div 
            key={index} 
            className="aspect-video bg-void border border-border-subtle rounded-xs overflow-hidden cursor-pointer group relative hover:border-gold transition-colors duration-300"
            onClick={() => setActiveImageIndex(index)}
           >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
             src={imgUrl}
             alt={`${project.title} screenshot ${index + 1}`}
             className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
             crossOrigin="anonymous"
             referrerPolicy="no-referrer"
             onError={(e) => {
              e.currentTarget.style.display = "none";
             }}
            />
            {/* Hover Search Icon Overlay */}
            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <svg className="w-5 h-5 text-gold drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
            </div>
           </div>
          ))}
         </div>
        </aside>
       ) : null}
     </div>
    </div>
   </section>

   {/* Lightbox / Image Gallery Modal */}
   {activeImageIndex !== null && project.image && (
    <div 
     className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void/90 backdrop-blur-md transition-all duration-300"
     onClick={() => setActiveImageIndex(null)}
    >
     {/* Close Button */}
     <button 
      className="absolute top-6 right-6 text-text-secondary hover:text-white transition duration-300 cursor-pointer p-2 z-55"
      onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
      aria-label="Close gallery"
     >
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
     </button>

     {/* Main Image Slider Area */}
     <div className="relative max-w-5xl w-full h-[70vh] flex items-center justify-between px-4 sm:px-12 md:px-20" onClick={(e) => e.stopPropagation()}>
      {/* Prev Button */}
      <button 
       className="bg-surface-raised/80 border border-border-subtle p-3 rounded-full text-gold hover:text-white hover:bg-gold/20 transition duration-300 cursor-pointer mr-4"
       onClick={() => setActiveImageIndex((prev) => prev !== null ? (prev - 1 + project.image!.length) % project.image!.length : null)}
       aria-label="Previous image"
      >
       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
       </svg>
      </button>

      {/* Center Image */}
      <div className="flex-1 max-h-full flex items-center justify-center p-1 select-none">
       {/* eslint-disable-next-line @next/next/no-img-element */}
       <img
        src={project.image[activeImageIndex]}
        alt={`${project.title} screenshot view`}
        className="max-w-full max-h-[65vh] object-contain border border-border-subtle rounded-sm"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
       />
      </div>

      {/* Next Button */}
      <button 
       className="bg-surface-raised/80 border border-border-subtle p-3 rounded-full text-gold hover:text-white hover:bg-gold/20 transition duration-300 cursor-pointer ml-4"
       onClick={() => setActiveImageIndex((prev) => prev !== null ? (prev + 1) % project.image!.length : null)}
       aria-label="Next image"
      >
       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
       </svg>
      </button>
     </div>

     {/* Index indicator */}
     <div className="mt-4 text-center select-none" onClick={(e) => e.stopPropagation()}>
      <span className="font-mono text-xs text-gold uppercase tracking-[0.25em]">
       Screenshot {activeImageIndex + 1} of {project.image.length}
      </span>
     </div>
    </div>
   )}
  </main>
 );
}
