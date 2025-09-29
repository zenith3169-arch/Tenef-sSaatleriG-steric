import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle = ({ isDark, toggleTheme }: ThemeToggleProps) => {
  return (
    <motion.div 
      className="fixed top-8 right-8 z-10"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="glass dark:glass-dark rounded-full w-12 h-12 backdrop-blur-md hover:scale-110 transition-transform"
        aria-label="Toggle theme"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};