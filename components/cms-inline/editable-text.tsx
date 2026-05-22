"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useCmsInlineOptional } from "@/components/cms-inline/provider-client";

export function EditableText({
  path,
  className,
  as = "span",
  fallback = "",
}: {
  path: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  fallback?: string;
}) {
  const cms = useCmsInlineOptional();
  const raw = cms?.getField(path);
  const value = typeof raw === "string" ? raw : fallback;
  const textRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Component = as as "span";

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    if (document.activeElement === element) return;

    if ((element.textContent ?? "") !== value) {
      element.textContent = value;
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const flushChange = (nextValue: string) => {
    cms?.setField({ op: "set", path, value: nextValue, type: "text" });
  };

  const queueChange = (nextValue: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => flushChange(nextValue), 220);
  };

  if (!cms?.isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <Component
      ref={textRef}
      className={cn(
        "rounded-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-cyan-500/40",
        "data-[editing=true]:ring-1 data-[editing=true]:ring-cyan-500/40 data-[editing=true]:bg-cyan-50/30",
        className,
      )}
      contentEditable
      suppressContentEditableWarning
      data-editing="true"
      role="textbox"
      aria-label={`Edit ${path}`}
      onInput={(event) => {
        const next = event.currentTarget.textContent ?? "";
        queueChange(next);
      }}
      onBlur={(event) => {
        const next = event.currentTarget.textContent ?? "";
        flushChange(next);
      }}
    >
      {value}
    </Component>
  );
}
