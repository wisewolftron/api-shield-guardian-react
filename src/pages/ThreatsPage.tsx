
import { useData } from "@/context/DataContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ThreatLogs } from "@/components/dashboard/ThreatLogs";

export default function ThreatsPage() {
  const { loading, threatLogs } = useData();

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Threat Detection" 
        description="Security threats detected by the system"
      />
      
      <ThreatLogs logs={threatLogs} loading={loading} />
    </div>
  );
}
