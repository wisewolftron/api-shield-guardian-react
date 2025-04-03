
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SeverityBadge } from "@/components/SeverityBadge";
import { TimeAgo } from "@/components/TimeAgo";
import { ThreatLog } from "@/types";
import { AlertTriangle } from "lucide-react";

interface ThreatLogsProps {
  logs: ThreatLog[];
  loading?: boolean;
  limit?: number;
}

export function ThreatLogs({ logs, loading = false, limit }: ThreatLogsProps) {
  const displayedLogs = limit ? logs.slice(0, limit) : logs;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Threat Logs</CardTitle>
            <CardDescription>
              Recent security threats detected
            </CardDescription>
          </div>
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={limit ? "" : "rounded-md border h-[400px] overflow-auto"}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Threat Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(limit || 5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : displayedLogs.length > 0 ? (
                displayedLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.ip}</TableCell>
                    <TableCell>
                      {log.type.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </TableCell>
                    <TableCell>{log.description}</TableCell>
                    <TableCell>
                      <SeverityBadge severity={log.severity} />
                    </TableCell>
                    <TableCell>
                      <TimeAgo timestamp={log.timestamp} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No threat logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
