
import { useData } from "@/context/DataContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { RequestLogs } from "@/components/dashboard/RequestLogs";

export default function LogsPage() {
  const { loading, requestLogs } = useData();

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Request Logs" 
        description="Detailed history of API requests"
      />
      
      <RequestLogs logs={requestLogs} loading={loading} />
    </div>
  );
}
