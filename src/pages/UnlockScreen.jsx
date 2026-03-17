import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import TypeWriter from '../components/TypeWriter';
import Button from '../components/ui/Button';

export default function UnlockScreen() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleTypewriterComplete = useCallback(() => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#7B9EFF', '#C4B5FD', '#93C5FD', '#E8ECF4', '#818CF8'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Show button after confetti starts
    setTimeout(() => setShowButton(true), 800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ zIndex: 2 }}>
      {/* Glowing orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(123,158,255,0.15), transparent)',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(196,181,253,0.1), transparent)',
          bottom: '20%',
          right: '20%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Main content */}
      <div className="text-center max-w-lg relative">
        {/* Cake emoji */}
        <motion.div
          className="text-6xl mb-8"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 12,
            delay: 0.3,
          }}
        >
          🎂
        </motion.div>

        {/* Typewriter message */}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl leading-snug"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <TypeWriter
            text="Happy 18th Birthday, Tanu 💙"
            speed={60}
            delay={800}
            onComplete={handleTypewriterComplete}
          />
        </h1>

        {/* Enter button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Button
              onClick={() => navigate('/home')}
              variant="primary"
              size="lg"
              className="text-lg px-10 py-4"
            >
              Enter ✨
            </Button>
          </motion.div>
        )}

        {/* Floating stars */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sm pointer-events-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    </div>
  );
}
