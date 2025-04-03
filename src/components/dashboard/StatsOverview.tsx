
import { Grid2X2, ShieldAlert, Zap, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { OverviewStats } from "@/types";

interface StatsOverviewProps {
  stats: OverviewStats | null;
  loading?: boolean;
}

export function StatsOverview({ stats, loading = false }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Requests"
        value={stats?.totalRequests.toLocaleString() || "-"}
        description="Total API requests in the last 24 hours"
        icon={<Zap />}
        loading={loading}
      />
      <StatCard
        title="Blocked Requests"
        value={stats?.blockedRequests.toLocaleString() || "-"}
        description="Blocked requests in the last 24 hours"
        icon={<ShieldAlert />}
        loading={loading}
      />
      <StatCard
        title="Active Threats"
        value={stats?.activeThreats.toString() || "-"}
        description="Current active security threats"
        icon={<ShieldAlert />}
        trend={20}
        loading={loading}
      />
      <StatCard
        title="Unique IPs"
        value={stats?.uniqueIPs.toLocaleString() || "-"}
        description="Unique IP addresses in the last 24 hours"
        icon={<Grid2X2 />}
        loading={loading}
      />
    </div>
  );
}
