
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: 'low' | 'medium' | 'high' | 'critical' | string;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  let variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "success"
    | null
    | undefined = "default";
  
  switch (severity) {
    case 'low':
      variant = "secondary";
      break;
    case 'medium':
      variant = "default";
      break;
    case 'high':
      variant = "destructive";
      break;
    case 'critical':
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} className={cn("font-medium", className)}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
}
