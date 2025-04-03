
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { BlockedIPs } from "@/components/dashboard/BlockedIPs";
import { RateLimitRules } from "@/components/dashboard/RateLimitRules";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function IPsPage() {
  const { loading, blockedIPs, rateLimitRules, blockIP } = useData();
  const [ipAddress, setIpAddress] = useState("");
  const [blockReason, setBlockReason] = useState("Suspicious activity");
  const [blockType, setBlockType] = useState("temporary");

  const handleBlockIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (ipAddress.trim()) {
      blockIP(ipAddress.trim(), blockReason, blockType === "permanent");
      setIpAddress("");
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="IP Management" 
        description="Block and manage IP addresses"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Block New IP</CardTitle>
                <CardDescription>
                  Manually block an IP address
                </CardDescription>
              </div>
              <Shield className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBlockIP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ip-address">IP Address</Label>
                <Input
                  id="ip-address"
                  placeholder="Enter IP address to block"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="block-reason">Reason</Label>
                <Input
                  id="block-reason"
                  placeholder="Reason for blocking"
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Block Type</Label>
                <RadioGroup
                  value={blockType}
                  onValueChange={setBlockType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">Temporary (24 hours)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="permanent" id="permanent" />
                    <Label htmlFor="permanent">Permanent</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full">
                Block IP
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <BlockedIPs blockedIPs={blockedIPs.slice(0, 8)} loading={loading} limit={8} />
      </div>
      
      <RateLimitRules rules={rateLimitRules} loading={loading} />
    </div>
  );
}
