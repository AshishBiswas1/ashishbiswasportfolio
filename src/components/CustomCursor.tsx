"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    const activeDot = dot;
    const activeRing = ring;

    // Current real mouse position
    let mouseX = 0, mouseY = 0;
    // Ring's smoothed position (starts off-screen)
    let ringX = -100, ringY = -100;

    // Controls how quickly the ring catches up to the dot.
    const LERP_SPEED = 0.12;

    // ── Position the dot instantly on every mouse move ──
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move the dot immediately — it should always be exact
      activeDot.style.left = mouseX + "px";
      activeDot.style.top = mouseY + "px";
    };

    // ── Smooth ring animation loop using linear interpolation ──
    let animationFrameId: number;
    function animateRing() {
      ringX += (mouseX - ringX) * LERP_SPEED;
      ringY += (mouseY - ringY) * LERP_SPEED;

      activeRing.style.left = ringX + "px";
      activeRing.style.top = ringY + "px";

      animationFrameId = requestAnimationFrame(animateRing);
    }
    animationFrameId = requestAnimationFrame(animateRing);

    // ── Show cursor when mouse enters the window ──
    const handleMouseEnter = () => {
      activeDot.style.opacity = "1";
      activeRing.style.opacity = "1";
    };

    // ── Hide cursor when mouse leaves the window ──
    const handleMouseLeave = () => {
      activeDot.style.opacity = "0";
      activeRing.style.opacity = "0";
    };

    // ── Fullscreen Top Layer reparenting ──
    const handleFullscreenChange = () => {
      const fsElem = document.fullscreenElement || (document as any).webkitFullscreenElement;
      if (fsElem) {
        fsElem.appendChild(activeDot);
        fsElem.appendChild(activeRing);
      } else {
        document.body.appendChild(activeDot);
        document.body.appendChild(activeRing);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    // ── Hover detection on all interactive elements ──
    const interactiveSelectors = [
      'a', 'button', 'input', 'textarea', 'select',
      'label', '[role="button"]', '.project-card',
      '.edu-card', '.cert-badge', '.social-btn',
      '.viewer-btn', '.contact-btn', '.skill-word',
      '.download-btn', '.skill-chip'
    ].join(', ');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(interactiveSelectors)) {
        document.body.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(interactiveSelectors)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    // ── Click feedback ──
    const handleMouseDown = () => {
      document.body.classList.add("cursor-clicking");
    };

    const handleMouseUp = () => {
      document.body.classList.remove("cursor-clicking");
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      
      // Clean up body classes
      document.body.classList.remove("cursor-hover");
      document.body.classList.remove("cursor-clicking");
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>
    </>
  );
}
