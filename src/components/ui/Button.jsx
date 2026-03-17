import { motion } from 'framer-motion';

export default function Button({
  asChild = false,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const Comp = asChild ? motion.span : motion.button;
  const buttonProps = asChild ? props : { type: 'button', ...props };

  const base = 'ui-btn';
  const v = variant ? `ui-btn--${variant}` : '';
  const s = size ? `ui-btn--${size}` : '';

  return (
    <Comp
      className={`${base} ${v} ${s} ${className}`}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      {...buttonProps}
    >
      {children}
    </Comp>
  );
}
