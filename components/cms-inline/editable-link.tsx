"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCmsInline } from "@/components/cms-inline/provider-client";

type LinkValue = {
  label: string;
  href: string;
  newTab?: boolean;
};

export function EditableLink({ path, className, children }: { path: string; className?: string; children?: React.ReactNode }) {
  const { isEditMode, isLinkEditMode, getField, setField } = useCmsInline();
  const raw = getField(path);
  const value: LinkValue =
    raw && typeof raw === "object"
      ? ({ label: "Link", href: "#", ...(raw as Record<string, unknown>) } as LinkValue)
      : { label: "Link", href: "#" };

  const target = value.newTab ? "_blank" : undefined;
  const rel = value.newTab ? "noopener noreferrer" : undefined;

  if (!isEditMode || !isLinkEditMode) {
    return (
      <Link
        href={value.href}
        target={target}
        rel={rel}
        className={className}
        onClick={(event) => {
          if (isEditMode) event.preventDefault();
        }}
      >
        {children ?? value.label}
      </Link>
    );
  }

  return (
    <div className="space-y-2 rounded-xl border border-cyan-500/40 bg-cyan-50/40 p-3">
      <div className="grid gap-1">
        <Label className="text-xs">Label</Label>
        <Input
          value={value.label}
          onChange={(event) => setField({ op: "set", path, type: "link", value: { ...value, label: event.target.value } })}
        />
      </div>
      <div className="grid gap-1">
        <Label className="text-xs">Tujuan Link</Label>
        <Input
          value={value.href}
          onChange={(event) => setField({ op: "set", path, type: "link", value: { ...value, href: event.target.value } })}
          placeholder="/about atau https://..."
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={Boolean(value.newTab)}
          onCheckedChange={(checked) => setField({ op: "set", path, type: "link", value: { ...value, newTab: checked } })}
        />
        <span className="text-xs">Buka tab baru</span>
      </div>
    </div>
  );
}
