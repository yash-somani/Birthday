import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/ui/BackButton';

const letterLines = [
  "Hey Tanu 💙",
  "",
  "I was thinking… what should I even write here…",
  "because you're not just one thing.",
  "",
  "You're caring…",
  "the way you check if I've eaten…",
  "it means more than you think.",
  "",
  "You're emotional…",
  "and yeah, sometimes things affect you deeply…",
  "but that just means you're real.",
  "",
  "And your anger 😤",
  "you get annoyed over small things…",
  "but it's honestly cute.",
  "",
  "You're protective…",
  "and you care in a way not many people do.",
  "",
  "I know you go through things you don't always say…",
  "and still you show up for others.",
  "",
  "That's something I really admire.",
  "",
  "You don't always have to be strong.",
  "",
  "And… you matter. A lot.",
  "",
  "I'm really glad I have you in my life.",
  "",
  "Happy 18th, Tanu 💙",
];

const lineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.12,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

export default function Letter() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 relative" style={{ zIndex: 2 }}>
      {/* Back button */}
      <BackButton />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(123,158,255,0.6), transparent)',
            left: `${15 + Math.random() * 70}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Letter card */}
      <motion.div
        className="glass-card p-8 md:p-12 max-w-lg w-full mt-8"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 30px rgba(123,158,255,0.08)',
        }}
      >
        {/* Decorative top */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <span className="text-3xl">💌</span>
        </motion.div>

        {/* Letter content */}
        <div className="space-y-1">
          {letterLines.map((line, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              className={`leading-relaxed ${line === '' ? 'h-4' : ''
                } ${i === 0 || i === letterLines.length - 1
                  ? 'text-lg md:text-xl'
                  : 'text-sm md:text-base opacity-85'
                }`}
              style={{
                fontFamily: i === 0 || i === letterLines.length - 1
                  ? 'var(--font-script)'
                  : 'var(--font-body)',
                fontSize: i === 0 || i === letterLines.length - 1 ? '1.4rem' : undefined,
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signature decoration */}
        <motion.div
          className="text-center mt-8 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: letterLines.length * 0.12 + 1 }}
        >
          ✦ ✦ ✦
        </motion.div>
      </motion.div>

      {/* Back to home after reading */}
      <motion.button
        onClick={() => navigate('/home')}
        className="mt-8 text-xs opacity-30 hover:opacity-60 transition-opacity cursor-pointer"
        style={{ background: 'none', border: 'none', color: 'var(--color-off-white)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: letterLines.length * 0.12 + 2 }}
      >
        ← back to home
      </motion.button>
    </div>
  );
}
