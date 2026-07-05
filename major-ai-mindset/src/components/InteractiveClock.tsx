import { useState, useEffect } from 'react';
import { Clock, Radio } from 'lucide-react';

export default function InteractiveClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate countdown to next Knowledge Session (Every Wednesday at 7 PM EST / 11 PM UTC)
    const updateCountdown = () => {
      const now = new Date();
      const nextSession = new Date();
      
      // Calculate next Wednesday (day 3)
      const currentDay = now.getDay();
      let daysToAdd = (3 - currentDay + 7) % 7;
      
      // If it is Wednesday, check if 7 PM EST (23:00 UTC) has passed
      if (daysToAdd === 0 && now.getUTCHours() >= 23) {
        daysToAdd = 7;
      }
      
      nextSession.setUTCDate(now.getUTCDate() + daysToAdd);
      nextSession.setUTCHours(23, 0, 0, 0); // 7 PM EST is 11 PM UTC or 23:00 UTC

      const diff = nextSession.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format local current time elegant
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div id="interactive-clock-container" className="flex flex-col md:flex-row items-center gap-3 md:gap-6 px-4 py-2 bg-brand-black-light border border-[#1f1f26] rounded-lg shadow-2xl backdrop-blur-md">
      {/* Local Time Monitor */}
      <div className="flex items-center gap-2 text-brand-muted text-xs font-mono">
        <Clock className="w-3.5 h-3.5 text-brand-gold" />
        <span>SYSTEM TIME:</span>
        <span className="text-brand-white font-medium">{formatTime(time)}</span>
      </div>

      {/* Vertical line indicator */}
      <div className="hidden md:block w-px h-4 bg-[#1f1f26]" />

      {/* Next Session Countdown */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
        </span>
        <span className="text-brand-muted">NEXT SESSION:</span>
        <span className="text-brand-gold font-bold">
          {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </span>
      </div>
    </div>
  );
}
