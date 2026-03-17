import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function BackButton({
  to = '/home',
  label = 'Back',
  variant = 'default',
  className = '',
  children = '←',
  ...props
}) {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(to)}
      className={`back-btn back-btn--${variant} ${className}`}
      whileHover={{ y: -1, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      aria-label={label}
      {...props}
    >
      {children}
    </motion.button>
  );
}
