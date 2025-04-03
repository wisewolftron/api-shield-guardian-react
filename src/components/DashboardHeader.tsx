
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  const { refreshData } = useData();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <Button variant="outline" size="sm" onClick={refreshData}>
        <RefreshCcw className="mr-2 h-4 w-4" />
        Refresh Data
      </Button>
    </div>
  );
}
