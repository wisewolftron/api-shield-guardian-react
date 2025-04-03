
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: number | 'blocked' | 'allowed' | 'limited' | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // Modify the variant types to match what's available in the Badge component
  let variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary" = "default";
  
  let label = status.toString();

  if (typeof status === 'number') {
    if (status >= 200 && status < 300) {
      // Change from "success" to "secondary" for successful status codes
      variant = "secondary";
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
        // Change from "success" to "secondary" for allowed status
        variant = "secondary";
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
