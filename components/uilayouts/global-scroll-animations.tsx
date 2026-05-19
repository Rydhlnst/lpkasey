"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const ANIMATION_SELECTOR =
  "main :where(section, article, aside, div, ul, ol, li, form, figure, blockquote, h1, h2, h3, h4, p)";

function shouldAnimateElement(element: Element) {
  if (!(element instanceof HTMLElement)) return false;
  if (element.dataset.scrollReveal === "ignore") return false;
  if (element.closest("[data-scroll-reveal='ignore']")) return false;
  if (element.closest("header, footer")) return false;

  const { width, height } = element.getBoundingClientRect();
  if (width < 24 || height < 24) return false;

  const style = window.getComputedStyle(element);
  if (style.display === "inline" || style.visibility === "hidden") return false;
  if (style.position === "fixed" || style.position === "sticky") return false;

  return true;
}

function markPending(element: HTMLElement) {
  element.dataset.scrollReveal = "pending";
}

function markRevealed(element: HTMLElement) {
  element.dataset.scrollReveal = "revealed";
}

export function GlobalScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const candidates = Array.from(document.querySelectorAll(ANIMATION_SELECTOR)).filter(shouldAnimateElement) as HTMLElement[];

    if (!candidates.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      candidates.forEach(markRevealed);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!(entry.target instanceof HTMLElement)) continue;
          if (entry.isIntersecting) {
            markRevealed(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.12,
      }
    );

    for (const element of candidates) {
      if (element.dataset.scrollReveal === "revealed") continue;
      markPending(element);
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

