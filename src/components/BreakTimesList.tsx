import { motion } from 'framer-motion';
import { BreakTime } from '../data/breakTimes';
import { Clock } from 'lucide-react';

interface BreakTimesListProps {
  breaks: BreakTime[];
  currentBreakId?: number;
}

export const BreakTimesList = ({ breaks, currentBreakId }: BreakTimesListProps) => {
  return (
    <motion.div 
      className="fixed top-8 left-8 z-10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass dark:glass-dark rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Teneffüs Saatleri
        </h2>
        <ul className="space-y-3">
          {breaks.map((breakTime, index) => (
            <motion.li
              key={breakTime.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${currentBreakId === breakTime.id ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  currentBreakId === breakTime.id 
                    ? 'bg-primary animate-pulse-soft' 
                    : 'bg-muted'
                }`} />
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${
                    currentBreakId === breakTime.id ? 'animate-orbit' : ''
                  }`}>
                    {breakTime.name}
                  </span>
                  <span className="text-xs opacity-70">
                    {breakTime.start} - {breakTime.end}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};