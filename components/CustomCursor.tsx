"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Direct DOM write — zero React overhead, zero animation delay
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Ring — size/color transition via CSS, position via direct DOM */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border"
        style={{
          width: isHovering ? 40 : 32,
          height: isHovering ? 40 : 32,
          marginLeft: isHovering ? -4 : 0,
          marginTop: isHovering ? -4 : 0,
          borderColor: isHovering
            ? "rgba(52, 211, 153, 0.7)"
            : "rgba(56, 189, 248, 0.5)",
          opacity: isVisible ? 1 : 0,
          transition: "width 0.15s, height 0.15s, border-color 0.15s, margin 0.15s",
          willChange: "transform",
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          width: 6,
          height: 6,
          backgroundColor: isHovering ? "var(--accent3)" : "var(--accent)",
          opacity: isVisible ? 1 : 0,
          transition: "background-color 0.15s",
          willChange: "transform",
        }}
      />
    </>
  );
}
