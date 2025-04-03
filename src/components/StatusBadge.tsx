
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: number | 'blocked' | 'allowed' | 'limited' | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "success"
    | null
    | undefined = "default";
  
  let label = status.toString();

  if (typeof status === 'number') {
    if (status >= 200 && status < 300) {
      variant = "success";
    } else if (status >= 400 && status < 500) {
      variant = "destructive";
    } else if (status >= 500) {
      variant = "destructive";
    }
  } else {
    switch (status) {
      case 'blocked':
        variant = "destructive";
        label = "Blocked";
        break;
      case 'allowed':
        variant = "success";
        label = "Allowed";
        break;
      case 'limited':
        variant = "secondary";
        label = "Rate Limited";
        break;
    }
  }

  return (
    <Badge variant={variant} className={cn("font-medium", className)}>
      {label}
    </Badge>
  );
}
