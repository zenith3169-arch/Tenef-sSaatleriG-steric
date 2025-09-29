import { motion } from 'framer-motion';

export const LiquidBackground = () => {
  return (
    <div className="liquid-bg">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10 right-0 bottom-0"
        style={{
          background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-5 left-1/2 top-1/2"
        style={{
          background: 'radial-gradient(circle, currentColor 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};