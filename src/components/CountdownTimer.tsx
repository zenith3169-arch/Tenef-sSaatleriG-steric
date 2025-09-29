import { motion } from 'framer-motion';
import { TimeUntilBreak } from '../utils/timeCalculations';
import { Timer, Coffee } from 'lucide-react';

interface CountdownTimerProps {
  timeData: TimeUntilBreak;
  secondBreakTime: { hours: number; minutes: number } | null;
}

export const CountdownTimer = ({ timeData, secondBreakTime }: CountdownTimerProps) => {
  const formatTime = (hours: number, minutes: number) => {
    if (hours > 0) {
      return `${hours}s ${minutes}d`;
    }
    return `${minutes} dakika`;
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[50vh]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {timeData.isBreakTime ? (
        <motion.div 
          className="text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Coffee className="w-20 h-20 mx-auto mb-4 animate-float" />
          <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-shimmer">
            Şimdi Teneffüs!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {timeData.currentBreak?.name} - {timeData.minutes} dakika kaldı
          </p>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-8">
            <Timer className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse-soft" />
            <motion.h1 
              className="text-7xl md:text-9xl font-bold animate-shimmer tracking-tight"
              key={`${timeData.hours}-${timeData.minutes}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {formatTime(timeData.hours, timeData.minutes)}
            </motion.h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-4">
              {timeData.nextBreak?.name} için
            </p>
          </div>

          {secondBreakTime && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm md:text-base text-muted-foreground opacity-60">
                Bir sonraki: {formatTime(secondBreakTime.hours, secondBreakTime.minutes)}
              </p>
              <p className="text-xs text-muted-foreground opacity-40 mt-1">
                {timeData.secondNextBreak?.name}
              </p>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};