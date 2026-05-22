"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCmsInlineOptional } from "@/components/cms-inline/provider-client";

type LinkValue = {
  label: string;
  href: string;
  newTab?: boolean;
};

export function EditableLink({
  path,
  className,
  children,
  fallback,
  showLabelWhenChildren = false,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  "aria-label": ariaLabel,
}: {
  path: string;
  className?: string;
  children?: React.ReactNode;
  fallback?: LinkValue;
  showLabelWhenChildren?: boolean;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
}) {
  const cms = useCmsInlineOptional();
  const raw = cms?.getField(path);
  const baseValue: LinkValue = fallback ?? { label: "Link", href: "#" };
  const value: LinkValue =
    raw && typeof raw === "object"
      ? ({ ...baseValue, ...(raw as Record<string, unknown>) } as LinkValue)
      : typeof raw === "string"
        ? { ...baseValue, label: raw }
        : baseValue;

  const target = value.newTab ? "_blank" : undefined;
  const rel = value.newTab ? "noopener noreferrer" : undefined;
  const isEditMode = Boolean(cms?.isEditMode);
  const isLinkEditMode = Boolean(cms?.isLinkEditMode);

  if (!isEditMode || !isLinkEditMode) {
    const content = children
      ? showLabelWhenChildren
        ? (
          <>
            {value.label}
            {children}
          </>
        )
        : children
      : value.label;

    return (
      <Link
        href={value.href}
        target={target}
        rel={rel}
        className={className}
        onFocus={onFocus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={ariaLabel}
        onClick={(event) => {
          if (isEditMode) event.preventDefault();
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-cyan-500/40 bg-cyan-50/40 p-3">
      <div className="grid gap-1">
        <Label className="text-xs">Label</Label>
        <Input
          value={value.label}
          onChange={(event) => cms?.setField({ op: "set", path, type: "link", value: { ...value, label: event.target.value } })}
        />
      </div>
      <div className="grid gap-1">
        <Label className="text-xs">Link URL</Label>
        <Input
          value={value.href}
          onChange={(event) => cms?.setField({ op: "set", path, type: "link", value: { ...value, href: event.target.value } })}
          placeholder="/about or https://..."
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={Boolean(value.newTab)}
          onCheckedChange={(checked) => cms?.setField({ op: "set", path, type: "link", value: { ...value, newTab: checked } })}
        />
        <span className="text-xs">Open in new tab</span>
      </div>
    </div>
  );
}
