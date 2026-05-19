import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlaceholderImageProps {
  label?: string;
  className?: string;
}

export function PlaceholderImage({ label = "Image Placeholder", className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden items-center justify-center rounded-3xl border border-dashed border-border bg-gradient-to-br from-accent/40 via-card to-muted/50 p-6 text-center",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div className="space-y-2 text-muted-foreground">
        <ImageIcon className="mx-auto h-8 w-8" aria-hidden />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
