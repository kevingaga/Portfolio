"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const dotSpring = { damping: 50, stiffness: 500, mass: 0.2 };
  const dotSpringX = useSpring(dotX, dotSpring);
  const dotSpringY = useSpring(dotY, dotSpring);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.tagName === "A" ||
        target.tagName === "BUTTON"
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border"
        style={{
          x: springX,
          y: springY,
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          borderColor: isHovering
            ? "rgba(52, 211, 153, 0.7)"
            : "rgba(56, 189, 248, 0.5)",
          opacity: isVisible ? 1 : 0,
          marginLeft: isHovering ? -4 : 0,
          marginTop: isHovering ? -4 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          width: isHovering ? 6 : 6,
          height: isHovering ? 6 : 6,
          backgroundColor: isHovering ? "var(--accent3)" : "var(--accent)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
