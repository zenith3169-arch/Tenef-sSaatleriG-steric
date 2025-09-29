import { useState, useEffect } from 'react';
import { breakTimes } from '../data/breakTimes';
import { calculateTimeUntilBreak, getTimeUntilSecondBreak } from '../utils/timeCalculations';
import { BreakTimesList } from '../components/BreakTimesList';
import { CountdownTimer } from '../components/CountdownTimer';
import { SchoolLogo } from '../components/SchoolLogo';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';
import { NotificationManager } from '../components/NotificationManager';
import { LiquidBackground } from '../components/LiquidBackground';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [timeData, setTimeData] = useState(() => calculateTimeUntilBreak(breakTimes));
  const [secondBreakTime, setSecondBreakTime] = useState(() => 
    getTimeUntilSecondBreak(breakTimes, timeData.secondNextBreak)
  );

  // Toggle theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const newTimeData = calculateTimeUntilBreak(breakTimes);
      setTimeData(newTimeData);
      setSecondBreakTime(getTimeUntilSecondBreak(breakTimes, newTimeData.secondNextBreak));
    };

    const interval = setInterval(updateTime, 60000); // Update every minute
    
    // Also update when seconds change to 0 for more precise updates
    const secondsToNextMinute = 60 - new Date().getSeconds();
    const timeout = setTimeout(() => {
      updateTime();
      const newInterval = setInterval(updateTime, 60000);
      clearInterval(interval);
      return () => clearInterval(newInterval);
    }, secondsToNextMinute * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Request notification permission
  useEffect(() => {
    if (notificationsEnabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <LiquidBackground />
      
      <BreakTimesList 
        breaks={breakTimes} 
        currentBreakId={timeData.currentBreak?.id}
      />
      
      <ThemeToggle 
        isDark={isDark} 
        toggleTheme={() => setIsDark(!isDark)} 
      />
      
      <CountdownTimer 
        timeData={timeData}
        secondBreakTime={secondBreakTime}
      />
      
      <SchoolLogo />
      
      <NotificationManager
        minutes={timeData.minutes}
        enabled={notificationsEnabled}
        onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
