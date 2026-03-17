import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// The unlock date: March 24, 2026, midnight IST
const UNLOCK_DATE = new Date('2026-03-24T00:00:00+05:30').getTime();

export default function LockScreen() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = Date.now();
    const diff = UNLOCK_DATE - now;
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const left = getTimeLeft();
      if (!left) {
        clearInterval(timer);
        navigate('/unlock');
      } else {
        setTimeLeft(left);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Already unlocked
  if (!timeLeft) {
    navigate('/unlock');
    return null;
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative" style={{ zIndex: 2 }}>
      {/* Soft glowing orb in background */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(123,158,255,0.4), transparent)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Main content */}
      <motion.div
        className="text-center max-w-md relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Lock icon */}
        <motion.div
          className="text-5xl mb-8"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🔒
        </motion.div>

        {/* Message */}
        <h1
          className="text-2xl md:text-3xl mb-4 leading-relaxed"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Hey Tanu 💙
        </h1>

        <p className="text-base md:text-lg opacity-80 leading-relaxed mb-2">
          Something is waiting for you…
        </p>
        <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6">
          but you'll have to be a little patient this time :)
        </p>
        <p className="text-sm opacity-50 italic mb-10">
          (I know you hate waiting 😌)
        </p>

        {/* Countdown timer */}
        <div className="flex gap-3 justify-center mb-8">
          {timeUnits.map((unit, i) => (
            <motion.div
              key={unit.label}
              className="glass-card px-4 py-3 min-w-[70px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <motion.div
                key={unit.value}
                className="text-2xl md:text-3xl font-semibold"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-accent)',
                }}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
              <div className="text-xs opacity-50 mt-1 uppercase tracking-wider">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle hint */}
        <motion.p
          className="text-xs opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
        >
          ✨ something special is being prepared ✨
        </motion.p>
      </motion.div>
    </div>
  );
}
