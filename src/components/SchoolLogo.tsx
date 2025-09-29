import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export const SchoolLogo = () => {
  return (
    <motion.div 
      className="fixed bottom-8 left-8 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0, y: 0 }} // görünmez
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ opacity: 0 }} // hover’da bile görünmez kalır
    > 
      <a 
        href="#" 
        className="block p-4 glass dark:glass-dark rounded-2xl backdrop-blur-md transition-all"
        aria-label="School Logo"
      >
        <GraduationCap className="w-16 h-16" />
      </a>
    </motion.div>
  );
};
