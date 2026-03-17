import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BackButton from '../components/ui/BackButton';

function BirthdayBackground() {
  const items = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      type: ['💖', '🎉', '🕯️', '🎈', '✨'][Math.random() > 0.6 ? 2 : Math.floor(Math.random() * 5)]
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {items.map(item => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: item.left,
            bottom: '-40px',
            fontSize: `${item.size}px`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            rotate: [0, Math.random() > 0.5 ? 90 : -90],
            x: [0, (Math.random() - 0.5) * 100]
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.type}
        </motion.div>
      ))}
    </div>
  );
}

export default function Surprise() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('button'); // 'button' | 'opening'

  const handleOpen = () => {
    setStage('opening');

    const colors = ['#FF6B8A', '#FFD166', '#06D6A0', '#118AB2', '#EF476F'];
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors });
    setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors }), 400);
    setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors }), 400);

    setTimeout(() => {
      navigate('/letter');
    }, 2800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative bg-[#FFF4F6] overflow-hidden" style={{ zIndex: 2 }}>
      <BirthdayBackground />

      {/* Warm gradient radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,200,210,0.5) 0%, rgba(255,244,246,0) 70%)',
          zIndex: 0
        }}
      />

      <button onClick={() => navigate('/home')} className="back-btn back-btn--pink">←</button>

      <AnimatePresence mode="wait">
        {stage === 'button' && (
          <motion.div
            key="button"
            className="text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              className="text-9xl mb-10 drop-shadow-xl"
              animate={{ y: [0, -15, 0], rotate: [0, -3, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎁
            </motion.div>

            <motion.button
              onClick={handleOpen}
              className="text-lg px-8 py-4 rounded-full font-bold text-white shadow-xl isolate"
              style={{
                background: 'linear-gradient(135deg, #FF6B8A 0%, #FF8FA3 100%)',
                fontFamily: 'var(--font-body)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(255,107,138,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Open only if you're smiling 😤
            </motion.button>
          </motion.div>
        )}

        {stage === 'opening' && (
          <motion.div
            key="opening"
            className="text-center relative z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="text-9xl"
              animate={{ scale: [1, 1.4, 0], rotate: [0, 15, -15, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              🎁
            </motion.div>

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <div className="text-8xl mb-4">💖</div>
              <h1 className="text-3xl text-[#FF6B8A] font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                Happy Birthday!
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
