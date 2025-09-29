import { BreakTime } from '../data/breakTimes';

export interface TimeUntilBreak {
  hours: number;
  minutes: number;
  isBreakTime: boolean;
  currentBreak?: BreakTime;
  nextBreak?: BreakTime;
  secondNextBreak?: BreakTime;
}

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const calculateTimeUntilBreak = (breaks: BreakTime[]): TimeUntilBreak => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  // Sort breaks by start time
  const sortedBreaks = [...breaks].sort((a, b) => 
    timeToMinutes(a.start) - timeToMinutes(b.start)
  );

  // Check if currently in a break
  for (const breakTime of sortedBreaks) {
    const startMinutes = timeToMinutes(breakTime.start);
    const endMinutes = timeToMinutes(breakTime.end);
    
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      const minutesLeft = endMinutes - currentMinutes;
      return {
        hours: Math.floor(minutesLeft / 60),
        minutes: minutesLeft % 60,
        isBreakTime: true,
        currentBreak: breakTime,
        nextBreak: sortedBreaks[sortedBreaks.indexOf(breakTime) + 1] || sortedBreaks[0]
      };
    }
  }

  // Find next break
  for (let i = 0; i < sortedBreaks.length; i++) {
    const breakTime = sortedBreaks[i];
    const startMinutes = timeToMinutes(breakTime.start);
    
    if (currentMinutes < startMinutes) {
      const minutesUntil = startMinutes - currentMinutes;
      return {
        hours: Math.floor(minutesUntil / 60),
        minutes: minutesUntil % 60,
        isBreakTime: false,
        nextBreak: breakTime,
        secondNextBreak: sortedBreaks[i + 1] || sortedBreaks[0]
      };
    }
  }

  // If all breaks have passed, calculate time until tomorrow's first break
  const firstBreak = sortedBreaks[0];
  const firstBreakMinutes = timeToMinutes(firstBreak.start);
  const minutesUntilTomorrow = (24 * 60 - currentMinutes) + firstBreakMinutes;
  
  return {
    hours: Math.floor(minutesUntilTomorrow / 60),
    minutes: minutesUntilTomorrow % 60,
    isBreakTime: false,
    nextBreak: firstBreak,
    secondNextBreak: sortedBreaks[1]
  };
};

export const getTimeUntilSecondBreak = (breaks: BreakTime[], secondBreak?: BreakTime): { hours: number; minutes: number } | null => {
  if (!secondBreak) return null;
  
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const secondBreakMinutes = timeToMinutes(secondBreak.start);
  
  let minutesUntil: number;
  if (secondBreakMinutes > currentMinutes) {
    minutesUntil = secondBreakMinutes - currentMinutes;
  } else {
    // Next day
    minutesUntil = (24 * 60 - currentMinutes) + secondBreakMinutes;
  }
  
  return {
    hours: Math.floor(minutesUntil / 60),
    minutes: minutesUntil % 60
  };
};