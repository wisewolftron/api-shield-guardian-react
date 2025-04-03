
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlockedIP, OverviewStats, RateLimitRule, RequestLog, ThreatLog, UsageMetrics, User } from '@/types';
import { 
  fetchWithDelay, 
  generateBlockedIPs, 
  generateOverviewStats, 
  generateRateLimitRules, 
  generateRequestLogs, 
  generateThreatLogs, 
  generateUsageMetrics, 
  generateUsers 
} from '@/services/mockData';
import { toast } from '@/components/ui/use-toast';

interface DataContextType {
  loading: boolean;
  requestLogs: RequestLog[];
  blockedIPs: BlockedIP[];
  rateLimitRules: RateLimitRule[];
  users: User[];
  threatLogs: ThreatLog[];
  usageMetrics: UsageMetrics[];
  overviewStats: OverviewStats | null;
  addRequestLog: (log: RequestLog) => void;
  blockIP: (ip: string, reason: string, permanent: boolean) => void;
  unblockIP: (id: string) => void;
  updateRateLimitRule: (rule: RateLimitRule) => void;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [requestLogs, setRequestLogs] = useState<RequestLog[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [rateLimitRules, setRateLimitRules] = useState<RateLimitRule[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>([]);
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics[]>([]);
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);

  // Function to load initial data
  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Simulate fetching data with a slight delay for each
      const logs = await fetchWithDelay(generateRequestLogs(50), 300);
      const ips = await fetchWithDelay(generateBlockedIPs(15), 400);
      const rules = await fetchWithDelay(generateRateLimitRules(), 200);
      const usersList = await fetchWithDelay(generateUsers(10), 300);
      const threats = await fetchWithDelay(generateThreatLogs(20), 350);
      const metrics = await fetchWithDelay(generateUsageMetrics(30), 450);
      const stats = await fetchWithDelay(generateOverviewStats(), 250);

      setRequestLogs(logs);
      setBlockedIPs(ips);
      setRateLimitRules(rules);
      setUsers(usersList);
      setThreatLogs(threats);
      setUsageMetrics(metrics);
      setOverviewStats(stats);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
    
    // Setup interval to add random request logs every few seconds
    const intervalId = setInterval(() => {
      const newLog = generateRequestLogs(1)[0];
      addRequestLog(newLog);
      
      // Randomly add threat logs (less frequently)
      if (Math.random() < 0.2) {  // 20% chance each interval
        const newThreat = generateThreatLogs(1)[0];
        setThreatLogs(prev => [newThreat, ...prev.slice(0, 49)]);
        
        // Show a toast notification for critical threats
        if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
          toast({
            title: `${newThreat.severity === 'critical' ? 'Critical' : 'High'} Threat Detected`,
            description: `${newThreat.description} from IP ${newThreat.ip}`,
            variant: 'destructive',
          });
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Add a new request log
  const addRequestLog = (log: RequestLog) => {
    setRequestLogs(prev => [log, ...prev.slice(0, 99)]);
    
    // Update overview stats when adding a new log
    setOverviewStats(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        totalRequests: prev.totalRequests + 1,
        blockedRequests: prev.blockedRequests + (log.blocked ? 1 : 0),
      };
    });
  };

  // Block an IP address
  const blockIP = (ip: string, reason: string, permanent: boolean) => {
    const newBlockedIP: BlockedIP = {
      id: `block-${Date.now()}`,
      ip,
      reason,
      timestamp: new Date().toISOString(),
      expiresAt: permanent ? undefined : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      attempts: 1,
      permanent,
    };
    
    setBlockedIPs(prev => [newBlockedIP, ...prev]);
    
    toast({
      title: 'IP Blocked',
      description: `IP ${ip} has been ${permanent ? 'permanently' : 'temporarily'} blocked.`,
      variant: 'default',
    });
  };

  // Unblock an IP address
  const unblockIP = (id: string) => {
    const ipToUnblock = blockedIPs.find(ip => ip.id === id);
    if (ipToUnblock) {
      setBlockedIPs(prev => prev.filter(ip => ip.id !== id));
      
      toast({
        title: 'IP Unblocked',
        description: `IP ${ipToUnblock.ip} has been unblocked.`,
        variant: 'default',
      });
    }
  };

  // Update a rate limit rule
  const updateRateLimitRule = (rule: RateLimitRule) => {
    setRateLimitRules(prev => 
      prev.map(r => r.id === rule.id ? rule : r)
    );
    
    toast({
      title: 'Rate Limit Rule Updated',
      description: `Rule for ${rule.endpoint} has been updated.`,
      variant: 'default',
    });
  };

  // Refresh all data
  const refreshData = async () => {
    await loadInitialData();
    toast({
      title: 'Data Refreshed',
      description: 'All dashboard data has been refreshed.',
      variant: 'default',
    });
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        requestLogs,
        blockedIPs,
        rateLimitRules,
        users,
        threatLogs,
        usageMetrics,
        overviewStats,
        addRequestLog,
        blockIP,
        unblockIP,
        updateRateLimitRule,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
