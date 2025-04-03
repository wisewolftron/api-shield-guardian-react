
export interface RequestLog {
  id: string;
  ip: string;
  endpoint: string;
  method: string;
  statusCode: number;
  timestamp: string;
  responseTime: number;
  userAgent?: string;
  country?: string;
  blocked?: boolean;
  rateLimit?: number;
  authenticated?: boolean;
  userId?: string;
}

export interface BlockedIP {
  id: string;
  ip: string;
  reason: string;
  timestamp: string;
  expiresAt?: string;
  attempts: number;
  permanent: boolean;
}

export interface RateLimitRule {
  id: string;
  endpoint: string;
  limit: number;
  windowInSeconds: number;
  authenticated: boolean;
  enabled: boolean;
}

export interface User {
  id: string;
  username: string;
  role: string;
  lastActive: string;
  avatar?: string;
}

export interface ThreatLog {
  id: string;
  ip: string;
  type: 'brute_force' | 'ddos' | 'suspicious_pattern' | 'bot_detected';
  description: string;
  timestamp: string;
  mitigationTaken: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface UsageMetrics {
  timestamp: string;
  requestCount: number;
  averageResponseTime: number;
  blockedRequests: number;
  uniqueIPs: number;
}

export interface OverviewStats {
  totalRequests: number;
  blockedRequests: number;
  activeThreats: number;
  averageResponseTime: number;
  uniqueIPs: number;
  totalUsers: number;
}
