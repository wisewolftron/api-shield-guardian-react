
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TimeAgo } from "@/components/TimeAgo";
import { BlockedIP } from "@/types";
import { useData } from "@/context/DataContext";
import { Shield, ShieldOff } from "lucide-react";

interface BlockedIPsProps {
  blockedIPs: BlockedIP[];
  loading?: boolean;
  limit?: number;
}

export function BlockedIPs({ blockedIPs, loading = false, limit }: BlockedIPsProps) {
  const { unblockIP } = useData();
  
  const displayedIPs = limit ? blockedIPs.slice(0, limit) : blockedIPs;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Blocked IPs</CardTitle>
            <CardDescription>
              IPs that are currently blocked
            </CardDescription>
          </div>
          <Shield className="h-5 w-5 text-destructive" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={limit ? "" : "rounded-md border h-[400px] overflow-auto"}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Blocked At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="h-8 w-20 bg-muted rounded animate-pulse ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : displayedIPs.length > 0 ? (
                displayedIPs.map((ip) => (
                  <TableRow key={ip.id}>
                    <TableCell className="font-medium">{ip.ip}</TableCell>
                    <TableCell>{ip.reason}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          ip.permanent
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ip.permanent ? "Permanent" : "Temporary"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <TimeAgo timestamp={ip.timestamp} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => unblockIP(ip.id)}
                      >
                        <ShieldOff className="h-4 w-4 mr-2" />
                        Unblock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No blocked IPs found.
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
