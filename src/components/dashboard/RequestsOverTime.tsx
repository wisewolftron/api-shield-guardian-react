
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UsageMetrics } from "@/types";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface RequestsOverTimeProps {
  data: UsageMetrics[];
  loading?: boolean;
}

export function RequestsOverTime({ data, loading = false }: RequestsOverTimeProps) {
  // Format data for the chart
  const chartData = data.map((item) => {
    const date = new Date(item.timestamp);
    return {
      name: `${date.getMonth() + 1}/${date.getDate()}`,
      requests: item.requestCount,
      blocked: item.blockedRequests,
    };
  });

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Requests Over Time</CardTitle>
            <CardDescription>
              Total and blocked requests by day
            </CardDescription>
          </div>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="w-full h-full bg-muted rounded animate-pulse" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5252" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF5252" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--border))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  color: "hsl(var(--card-foreground))"
                }} 
              />
              <Area
                type="monotone"
                dataKey="requests"
                stroke="#1E88E5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRequests)"
                name="Total Requests"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stroke="#FF5252"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBlocked)"
                name="Blocked Requests"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
