import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer 
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <p className="text-xs italic text-muted-foreground whitespace-nowrap">
        Muhammed Emin Demirtaş 
      </p>
    </motion.footer>
  );
};