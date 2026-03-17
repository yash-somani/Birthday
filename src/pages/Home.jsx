import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const cards = [
  { emoji: '💌', label: 'You', path: '/you', color: 'rgba(196, 181, 253, 0.12)', desc: 'words I mean', accent: '#C4B5FD' },
  { emoji: '✨', label: 'Little Things', path: '/little-things', color: 'rgba(147, 197, 253, 0.12)', desc: 'things I notice', accent: '#93C5FD' },
  { emoji: '🎮', label: 'Fun Zone', path: '/fun-zone', color: 'rgba(110, 231, 183, 0.10)', desc: 'let\'s play', accent: '#6EE7B7' },
  { emoji: '📸', label: 'Moments', path: '/moments', color: 'rgba(255, 209, 102, 0.10)', desc: 'us, captured', accent: '#FFD166' },
  { emoji: '🎁', label: 'Surprise', path: '/surprise', color: 'rgba(253, 130, 150, 0.12)', desc: 'open me', accent: '#FD8296' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative" style={{ zIndex: 2 }}>
      {/* Decorative background glow */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,158,255,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Header with improved typography hierarchy */}
      <motion.div
        className="text-center mb-6 md:mb-10 relative"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-sm md:text-base opacity-40 tracking-[0.3em] uppercase">A birthday surprise</span>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
          animate={{
            textShadow: [
              '0 0 30px rgba(123,158,255,0.15)',
              '0 0 50px rgba(123,158,255,0.25)',
              '0 0 30px rgba(123,158,255,0.15)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          For You, Tanu ✨
        </motion.h1>
        <motion.p
          className="text-sm md:text-base opacity-60 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Five little worlds I made for you. Take your time exploring each one 💙
        </motion.p>
      </motion.div>

      {/* Card Grid — premium layout with consistent hover behavior */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl px-2"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.path}
            variants={cardVariants}
            className={index === 0 ? 'md:col-span-2' : ''}
          >
            <Link to={card.path} className="block no-underline">
              <GlassCard
                className={`p-6 md:p-7 text-center relative overflow-hidden flex flex-col items-center justify-center transition-all duration-300 ${
                  index === 0 ? 'min-h-[120px] md:min-h-[140px]' : 'min-h-[120px] md:min-h-[130px]'
                }`}
                hover={true}
                delay={0}
              >
                {/* Soft gradient overlay */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${card.color} 0%, transparent 60%)`,
                  }}
                />

                {/* Subtle border glow on hover target */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 30px ${card.accent}20`,
                  }}
                />

                <div className="relative flex flex-col items-center z-10">
                  <motion.div
                    className="text-3xl md:text-4xl mb-2"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 2.5 + index * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {card.emoji}
                  </motion.div>
                  <p
                    className="text-sm font-medium opacity-90 mb-0.5"
                    style={{ color: 'var(--color-off-white)' }}
                  >
                    {card.label}
                  </p>
                  <p className="text-xs opacity-40">{card.desc}</p>
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom hint with animation */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-xs opacity-30 tracking-wider">
          ✦ tap any card to begin ✦
        </p>
      </motion.div>
    </div>
  );
}
