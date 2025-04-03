
import { useState, useEffect } from 'react';

interface TimeAgoProps {
  timestamp: string;
  className?: string;
}

export function TimeAgo({ timestamp, className }: TimeAgoProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    function getTimeAgo() {
      const now = new Date();
      const past = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
    }

    setTimeAgo(getTimeAgo());
    
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span className={className}>{timeAgo}</span>;
}
