"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

type ScrollAnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

export function ScrollAnimation({
  children,
  className,
  delay = 0,
  direction = "up",
  style,
  ...props
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(
    typeof window !== "undefined" && !("IntersectionObserver" in window)
  );
  const offset = offsets[direction];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -80px 0px",
        threshold: 0.12,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const computedStyle = useMemo<CSSProperties>(
    () => ({
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translate3d(0,0,0)" : `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      filter: revealed ? "blur(0px)" : "blur(6px)",
      transitionProperty: "opacity, transform, filter",
      transitionDuration: "650ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: `${delay}s`,
      willChange: "opacity, transform, filter",
      ...style,
    }),
    [delay, offset.x, offset.y, revealed, style]
  );

  return (
    <div ref={ref} className={cn(className)} style={computedStyle} {...props}>
      {children}
    </div>
  );
}
