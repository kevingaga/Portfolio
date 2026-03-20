"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [ringX, ringY, dotX, dotY, isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          marginLeft: isHovering ? -4 : 0,
          marginTop: isHovering ? -4 : 0,
          borderColor: isHovering
            ? "rgba(52, 211, 153, 0.7)"
            : "rgba(56, 189, 248, 0.5)",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 6,
          height: 6,
          backgroundColor: isHovering ? "var(--accent3)" : "var(--accent)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
