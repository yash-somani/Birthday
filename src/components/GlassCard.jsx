import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, onClick, delay = 0, ...props }) {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? {
        y: -4,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
