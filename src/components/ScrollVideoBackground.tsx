"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, type MotionValue } from "framer-motion";

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
 const paddedIndex = String(index + 1).padStart(3, "0");
 return `/framer-motion/frame_${paddedIndex}.jpg`;
};

export default function ScrollVideoBackground({
 scrollYProgress,
 onProgress,
}: {
 scrollYProgress: MotionValue<number>;
 onProgress?: (progress: number) => void;
}) {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [isLoading, setIsLoading] = useState(true);
 const framesRef = useRef<HTMLImageElement[]>([]);
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

  // Clear with background color
  context.fillStyle = "#050505";
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
  let isMounted = true;
  let loadedCount = 0;
  const frames: HTMLImageElement[] = [];

  const handleFrameLoad = () => {
   if (!isMounted) return;
   loadedCount++;
   const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
   if (onProgress) onProgress(percent);

   if (loadedCount === TOTAL_FRAMES) {
    framesRef.current = frames;
    setIsLoading(false);
    // Draw initial frame
    requestAnimationFrame(() => {
     if (framesRef.current[0]) drawFrame(framesRef.current[0]);
    });
   }
  };

  for (let i = 0; i < TOTAL_FRAMES; i++) {
   const img = new Image();
   img.onload = handleFrameLoad;
   img.onerror = handleFrameLoad; // Prevent lock-up on load failures
   img.src = getFramePath(i);
   frames.push(img);
  }

  return () => {
   isMounted = false;
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
  if (isLoading || framesRef.current.length === 0) return;

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
 }, [smoothScrollProgress, isLoading]);

 return (
  <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-black">
   {/* Hardware accelerated canvas */}
   <canvas
    ref={canvasRef}
    className="w-full h-full object-cover opacity-35"
   />
   {/* Dark overlay to optimize contrast and readability for text and images */}
   <div className="absolute inset-0 bg-black/40 pointer-events-none" />
  </div>
 );
}
