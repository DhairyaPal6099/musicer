import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type GenreBadgeProps = {
  label: string;
  onRemove: () => void;
};

export function GenreBadge({ label, onRemove }: GenreBadgeProps) {
  return (
    <Badge className="flex items-center gap-1 px-2 py-1 mt-2 bg-secondary text-theme transition-colors duration-300">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 text-theme hover:text-primary transition-colors duration-200"
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}