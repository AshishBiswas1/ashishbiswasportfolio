"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, type MotionValue } from "framer-motion";
import { fetchFrames } from "@/services/api";

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
 const paddedIndex = String(index + 1).padStart(3, "0");
 return `/framer-motion/frame_${paddedIndex}.jpg`;
};

let globalCachedFrames: HTMLImageElement[] = [];
let globalPreloadProgress = 0;
let globalIsPreloaded = false;
let globalIsPreloading = false;
const globalListeners = new Set<(percent: number) => void>();

const startGlobalPreload = async () => {
 if (globalIsPreloading || globalIsPreloaded) return;

 globalIsPreloading = true;

 let loadedCount = 0;
 const frames: HTMLImageElement[] = [];

 // Attempt to fetch custom File Garden URLs from backend API
 let customUrls: string[] = [];
 try {
  customUrls = await fetchFrames();
 } catch {
  customUrls = [];
 }

 const targetTotal = customUrls.length > 0 ? customUrls.length : TOTAL_FRAMES;

 const handleFrameLoad = () => {
  loadedCount++;

  // Set globals first when done so listeners receiving 100% have access to the cached frames
  if (loadedCount === targetTotal) {
   globalCachedFrames = frames;
   globalIsPreloaded = true;
   globalIsPreloading = false;
  }
  
  globalPreloadProgress = Math.round((loadedCount / targetTotal) * 100);
  globalListeners.forEach((listener) => listener(globalPreloadProgress));
 };

 const loadFrames = () => {
  for (let i = 0; i < targetTotal; i++) {
   const img = new Image();
   img.onload = handleFrameLoad;
   img.onerror = handleFrameLoad;
   img.src = customUrls[i] || getFramePath(i);
   frames.push(img);
  }
 };

 loadFrames();
};

export default function ScrollVideoBackground({
 scrollYProgress,
 onProgress,
 }: {
 scrollYProgress: MotionValue<number>;
 onProgress?: (progress: number) => void;
 }) {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [isLoading, setIsLoading] = useState(!globalIsPreloaded);
 const [hasFrames, setHasFrames] = useState(globalCachedFrames.length > 0);
 const framesRef = useRef<HTMLImageElement[]>(globalCachedFrames);
 const progressRef = useRef({ frame: 0 });

 // Smooth the scroll progress using a physics spring
 const smoothScrollProgress = useSpring(scrollYProgress, {
  stiffness: 100, // How tightly the spring follows the target
  damping: 30,    // Friction to stop oscillation
  restDelta: 0.001 // Precision before the spring stops calculating
 });

 // Aspect ratio cover drawing logic
 const drawFrame = (img: HTMLImageElement) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const dpr = window.devicePixelRatio || 1;
  const canvasW = canvas.width / dpr;
  const canvasH = canvas.height / dpr;

  // Clear with background color (#08080D / void)
  context.fillStyle = "#08080D";
  context.fillRect(0, 0, canvasW, canvasH);

  // Aspect-ratio cover calculations
  const scale = Math.max(canvasW / img.width, canvasH / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  const x = (canvasW - w) / 2;
  const y = (canvasH - h) / 2;

  context.drawImage(img, x, y, w, h);
 };

 // Preload static images from public folder
 useEffect(() => {
  if (globalIsPreloaded) {
   framesRef.current = globalCachedFrames;
   setIsLoading(false);
   if (onProgress) onProgress(100);
   requestAnimationFrame(() => {
    if (framesRef.current[0]) drawFrame(framesRef.current[0]);
   });
   return;
  }

  const handleProgressUpdate = (percent: number) => {
   if (onProgress) onProgress(percent);
   if (percent === 100) {
    framesRef.current = globalCachedFrames;
    if (globalCachedFrames.length > 0) {
     setHasFrames(true);
    }
    setIsLoading(false);
    requestAnimationFrame(() => {
     const canvas = canvasRef.current;
     if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
       const dpr = window.devicePixelRatio || 1;
       canvas.width = window.innerWidth * dpr;
       canvas.height = window.innerHeight * dpr;
       canvas.style.width = `${window.innerWidth}px`;
       canvas.style.height = `${window.innerHeight}px`;
       context.setTransform(dpr, 0, 0, dpr, 0, 0);
       if (framesRef.current[0]) drawFrame(framesRef.current[0]);
      }
     }
    });
   }
  };

  globalListeners.add(handleProgressUpdate);
  startGlobalPreload();

  if (globalPreloadProgress > 0 && onProgress) {
   onProgress(globalPreloadProgress);
  }

  return () => {
   globalListeners.delete(handleProgressUpdate);
  };
 }, [onProgress]);

 // Handle Canvas Resizing
 useEffect(() => {
  const handleResize = () => {
   const canvas = canvasRef.current;
   if (!canvas) return;
   const context = canvas.getContext("2d");
   if (!context) return;

   const dpr = window.devicePixelRatio || 1;
   canvas.width = window.innerWidth * dpr;
   canvas.height = window.innerHeight * dpr;
   canvas.style.width = `${window.innerWidth}px`;
   canvas.style.height = `${window.innerHeight}px`;
   context.setTransform(dpr, 0, 0, dpr, 0, 0);

   const currentFrameIndex = Math.round(progressRef.current.frame);
   const currentImg = framesRef.current[currentFrameIndex];
   if (currentImg) drawFrame(currentImg);
  };

  window.addEventListener("resize", handleResize);
  // Run once initially when preloading completes
  if (!isLoading) handleResize();

  return () => window.removeEventListener("resize", handleResize);
 }, [isLoading]);

 // Sync smoothProgress to canvas drawing
 useEffect(() => {
  if (!hasFrames || framesRef.current.length === 0) return;

  const unsubscribe = smoothScrollProgress.on("change", (value) => {
   const totalFrames = framesRef.current.length;
   const targetFrame = value * (totalFrames - 1);
   progressRef.current.frame = targetFrame;

   const frameIndex = Math.round(targetFrame);
   const img = framesRef.current[frameIndex];
   if (img) {
    drawFrame(img);
   }
  });

  return () => unsubscribe();
 }, [smoothScrollProgress, hasFrames]);

 return (
  <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-void">
   {/* Hardware accelerated canvas */}
   <canvas
    ref={canvasRef}
    className="w-full h-full object-cover opacity-45"
   />
   {/* Dark overlay with vertical gradient to optimize contrast at top/bottom sections and maintain readability */}
   <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/40 to-void/85 pointer-events-none" />
  </div>
 );
}
