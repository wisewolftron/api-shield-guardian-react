import { BlockedIP, OverviewStats, RateLimitRule, RequestLog, ThreatLog, UsageMetrics, User } from '@/types';

// Function to generate a random IP address
const generateRandomIP = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
};

// Function to generate a random date within the last day
const generateRandomDate = (daysBack = 1) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.random() * daysBack);
  return date.toISOString();
};

// Random selection from an array
const randomFrom = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Generate random status code
const generateStatusCode = (blocked = false) => {
  if (blocked) {
    return randomFrom([403, 429]);
  }
  return randomFrom([200, 201, 204, 400, 401, 404, 500]);
};

// Generate request logs
export const generateRequestLogs = (count: number): RequestLog[] => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const endpoints = ['/api/users', '/api/products', '/api/orders', '/api/auth/login', '/api/auth/register', '/api/payment'];
  const countries = ['US', 'GB', 'CA', 'DE', 'FR', 'JP', 'BR', 'IN', 'AU', 'RU'];
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 11; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
  ];

  return Array.from({ length: count }, (_, i) => {
    const blocked = Math.random() < 0.1; // 10% chance of being blocked
    const authenticated = Math.random() < 0.6; // 60% chance of being authenticated
    
    return {
      id: `req-${Date.now()}-${i}`,
      ip: generateRandomIP(),
      endpoint: randomFrom(endpoints),
      method: randomFrom(methods),
      statusCode: generateStatusCode(blocked),
      timestamp: generateRandomDate(0.5),
      responseTime: Math.floor(Math.random() * 500),
      userAgent: randomFrom(userAgents),
      country: randomFrom(countries),
      blocked,
      rateLimit: Math.floor(Math.random() * 100),
      authenticated,
      userId: authenticated ? `user-${Math.floor(Math.random() * 1000)}` : undefined,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate blocked IPs
export const generateBlockedIPs = (count: number): BlockedIP[] => {
  const reasons = [
    'Rate limit exceeded',
    'Brute force attack',
    'Suspicious activity',
    'Manual block',
    'Bot detection',
  ];

  return Array.from({ length: count }, (_, i) => {
    const permanent = Math.random() < 0.3; // 30% chance of being permanent
    const timestamp = generateRandomDate(5);
    
    return {
      id: `block-${Date.now()}-${i}`,
      ip: generateRandomIP(),
      reason: randomFrom(reasons),
      timestamp,
      expiresAt: permanent ? undefined : new Date(new Date(timestamp).getTime() + (Math.random() * 24 * 60 * 60 * 1000)).toISOString(),
      attempts: Math.floor(Math.random() * 10) + 1,
      permanent,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate rate limit rules
export const generateRateLimitRules = (): RateLimitRule[] => {
  return [
    {
      id: 'rule-1',
      endpoint: '/api/auth/login',
      limit: 5,
      windowInSeconds: 60,
      authenticated: false,
      enabled: true,
    },
    {
      id: 'rule-2',
      endpoint: '/api/*',
      limit: 30,
      windowInSeconds: 60,
      authenticated: false,
      enabled: true,
    },
    {
      id: 'rule-3',
      endpoint: '/api/*',
      limit: 100,
      windowInSeconds: 60,
      authenticated: true,
      enabled: true,
    },
    {
      id: 'rule-4',
      endpoint: '/api/products',
      limit: 50,
      windowInSeconds: 60,
      authenticated: false,
      enabled: true,
    },
    {
      id: 'rule-5',
      endpoint: '/api/payment',
      limit: 10,
      windowInSeconds: 60,
      authenticated: true,
      enabled: true,
    },
  ];
};

// Generate users
export const generateUsers = (count: number): User[] => {
  const roles = ['admin', 'user', 'guest'];
  const usernames = [
    'john_doe', 'jane_smith', 'admin_user', 'test_user', 'guest_user',
    'alice_cooper', 'bob_dylan', 'charlie_brown', 'david_bowie', 'emma_watson',
  ];

  return Array.from({ length: count }, (_, i) => {
    return {
      id: `user-${i + 1}`,
      username: i < usernames.length ? usernames[i] : `user_${i + 1}`,
      role: randomFrom(roles),
      lastActive: generateRandomDate(5),
    };
  });
};

// Generate threat logs
export const generateThreatLogs = (count: number): ThreatLog[] => {
  const threatTypes = ['brute_force', 'ddos', 'suspicious_pattern', 'bot_detected'] as const;
  type ThreatType = typeof threatTypes[number];
  
  const severities = ['low', 'medium', 'high', 'critical'] as const;
  type SeverityType = typeof severities[number];
  
  const mitigationActions = [
    'IP temporarily blocked',
    'Request rate limited',
    'CAPTCHA challenge issued',
    'Account locked',
    'Traffic rerouted',
  ];

  const descriptions: Record<ThreatType, string[]> = {
    brute_force: [
      'Multiple failed login attempts',
      'Password reset attempts exceeded',
      'Credential stuffing detected',
    ],
    ddos: [
      'Abnormal traffic spike detected',
      'High volume of requests from single IP',
      'Distributed request pattern detected',
    ],
    suspicious_pattern: [
      'Unusual request sequence',
      'Abnormal data access pattern',
      'Potential data scraping activity',
    ],
    bot_detected: [
      'Bot fingerprint identified',
      'Automated script behavior',
      'Headless browser detected',
    ],
  };

  return Array.from({ length: count }, (_, i) => {
    const type = randomFrom(threatTypes as unknown as ThreatType[]) as ThreatType;

    return {
      id: `threat-${Date.now()}-${i}`,
      ip: generateRandomIP(),
      type, 
      description: randomFrom(descriptions[type]),
      timestamp: generateRandomDate(3),
      mitigationTaken: randomFrom(mitigationActions),
      severity: randomFrom(severities as unknown as SeverityType[]) as SeverityType, 
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Generate usage metrics
export const generateUsageMetrics = (days: number): UsageMetrics[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    return {
      timestamp: date.toISOString(),
      requestCount: 5000 + Math.floor(Math.random() * 5000) - (i * 100),
      averageResponseTime: 50 + Math.floor(Math.random() * 100),
      blockedRequests: 100 + Math.floor(Math.random() * 200) - (i * 5),
      uniqueIPs: 500 + Math.floor(Math.random() * 300) - (i * 10),
    };
  }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Generate overview statistics
export const generateOverviewStats = (): OverviewStats => {
  return {
    totalRequests: 15000 + Math.floor(Math.random() * 5000),
    blockedRequests: 500 + Math.floor(Math.random() * 300),
    activeThreats: Math.floor(Math.random() * 5),
    averageResponseTime: 50 + Math.floor(Math.random() * 100),
    uniqueIPs: 1000 + Math.floor(Math.random() * 500),
    totalUsers: 500 + Math.floor(Math.random() * 200),
  };
};

// Function to simulate fetching data with a delay
export const fetchWithDelay = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
};
