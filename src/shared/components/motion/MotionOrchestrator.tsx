"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export function MotionOrchestrator() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: gsap.Context | undefined;
    const frame = requestAnimationFrame(() => {
      context = gsap.context(() => {
        const pageSections = document.querySelectorAll("main > *:not([data-no-page-motion])");
        if (pageSections.length) {
          gsap.fromTo(
            pageSections,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.34, stagger: 0.035, ease: "power2.out", clearProps: "all" },
          );
        }

        const titles = document.querySelectorAll("main h1:not([data-word-title])");
        if (titles.length) {
          gsap.fromTo(
            titles,
            { opacity: 0, filter: "blur(8px)", y: 6 },
            { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.48, ease: "power3.out", clearProps: "all" },
          );
        }
      });

    });

    return () => {
      cancelAnimationFrame(frame);
      context?.revert();
    };
  }, [pathname]);

  return null;
}
