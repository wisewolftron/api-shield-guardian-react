
import { useData } from "@/context/DataContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { RequestsOverTime } from "@/components/dashboard/RequestsOverTime";
import { RequestLogs } from "@/components/dashboard/RequestLogs";
import { BlockedIPs } from "@/components/dashboard/BlockedIPs";
import { ThreatLogs } from "@/components/dashboard/ThreatLogs";

export default function DashboardPage() {
  const { 
    loading, 
    requestLogs, 
    blockedIPs, 
    threatLogs, 
    usageMetrics, 
    overviewStats 
  } = useData();

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard" 
        description="Overview of your API security status"
      />
      
      <StatsOverview stats={overviewStats} loading={loading} />
      
      <RequestsOverTime data={usageMetrics} loading={loading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RequestLogs logs={requestLogs.slice(0, 6)} loading={loading} />
        
        <div className="space-y-6">
          <BlockedIPs blockedIPs={blockedIPs.slice(0, 5)} loading={loading} limit={5} />
          <ThreatLogs logs={threatLogs.slice(0, 5)} loading={loading} limit={5} />
        </div>
      </div>
    </div>
  );
}
