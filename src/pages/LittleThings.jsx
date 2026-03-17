import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../components/ui/BackButton';

const items = [
  {
    emoji: '☕', label: 'Coffee', message: "I'm convinced coffee is your personality trait 😌",
    color: '#FFF1F3'
  },
  {
    emoji: '🗣️', label: 'Gossip', message: "Admit it, gossiping is your favorite hobby... and I love hearing it all 🤭",
    color: '#F0FDF4'
  },
  {
    emoji: '🎧', label: 'Music', message: "Music really is your escape, isn't it? 🎵",
    color: '#EFF6FF'
  },
  {
    emoji: '😤', label: 'Anger', message: "Your angry face is lowkey the cutest thing ever 😤💙",
    color: '#FEF2F2'
  },
  {
    emoji: '💙', label: 'Dark Blue', message: "Dark blue... just like the sky we started under 🌌",
    color: '#F5F3FF'
  },
  {
    emoji: '🍬', label: 'Sugar', message: "Even if you have sugar, you are the sweetest person I have ever met 💙",
    color: '#FDF4FF'
  },
];

// Cute floating clouds background
function CuteSky() {
  const elements = useMemo(() => {
    // Generate clouds
    const clouds = Array.from({ length: 8 }, (_, i) => ({
      id: `cloud-${i}`,
      type: 'cloud',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));

    // Generate sparkles
    const sparkles = Array.from({ length: 20 }, (_, i) => ({
      id: `sparkle-${i}`,
      type: 'sparkle',
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 2 + 2,
    }));

    return [...clouds, ...sparkles];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {elements.map((el) => {
        if (el.type === 'cloud') {
          return (
            <motion.div
              key={el.id}
              className="absolute text-6xl opacity-40 drop-shadow-sm"
              style={{ left: el.left, top: el.top }}
              animate={{
                x: [0, 50, -50, 0],
                y: [0, -20, 20, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: el.delay,
              }}
            >
              ☁️
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={el.id}
              className="absolute text-xl opacity-60"
              style={{ left: el.left, top: el.top, color: '#fcd34d' }}
              animate={{
                scale: [0, el.scale, 0],
                rotate: [0, 90, 180],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: el.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: el.delay,
              }}
            >
              ✨
            </motion.div>
          );
        }
      })}
    </div>
  );
}

export default function LittleThings() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 50%, #FDF5E6 100%)', zIndex: 2 }}>
      {/* Soft pastel dreamy background with clouds and sparkles */}
      <CuteSky />

      {/* Back button */}
      <BackButton variant="pink" />

      {/* Title */}
      <motion.div
        className="text-center mt-6 mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-3 font-extrabold tracking-tight"
          style={{
            color: '#FF69B4',
            fontFamily: "'Comic Sans MS', 'Varela Round', cursive, sans-serif",
            textShadow: '2px 2px 0px #FFF, 4px 4px 0px #FFC0CB'
          }}
        >
          Little Things About You 🎀
        </h2>
        <motion.p
          className="text-md text-[#FF82AB] font-bold bg-white/60 inline-block px-4 py-1 rounded-full shadow-sm"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          tap on the bubbles! 🫧
        </motion.p>
      </motion.div>

      {/* Floating cute bubbles */}
      <div className="flex flex-wrap justify-center gap-6 max-w-lg mt-4 relative z-10">
        {items.map((item, i) => (
          <motion.button
            key={item.label}
            onClick={() => setSelected(item)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { delay: 0.2 + i * 0.1, duration: 0.4 },
              scale: { delay: 0.2 + i * 0.1, duration: 0.4 },
              y: {
                delay: 0.5 + i * 0.2,
                duration: 2 + Math.random() * 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              },
            }}
            whileHover={{ scale: 1.15, rotate: [-2, 2, -2] }}
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none' }}
          >
            <div
              className="w-24 h-24 rounded-[30px] flex items-center justify-center text-4xl shadow-[0_10px_20px_rgba(255,182,193,0.4)] transition-all duration-300 relative border-4 border-white"
              style={{ backgroundColor: item.color }}
            >
              {/* Cute corner highlight for bubble effect */}
              <div className="absolute top-2 right-3 w-4 h-4 bg-white/70 rounded-full blur-[1px]" />
              <div className="absolute top-4 right-2 w-2 h-2 bg-white/60 rounded-full blur-[1px]" />

              <span className="relative z-10 drop-shadow-md pb-1 group-hover:scale-125 transition-transform duration-300">
                {item.emoji}
              </span>
            </div>

            <span className="text-sm font-bold text-[#FF69B4] bg-white/90 px-4 py-1.5 rounded-full shadow-sm">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Popup modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal backdrop */}
            <div
              className="absolute inset-0 bg-white/40 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="bg-white rounded-[3rem] p-8 mt-16 max-w-sm w-full text-center shadow-[0_20px_50px_rgba(255,105,180,0.3)] border-[6px] border-[#FFE4E1] relative z-10 flex flex-col items-center"
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', bounce: 0.6, duration: 0.6 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Bouncing emoji perfectly sized and positioned */}
              <div className="w-32 h-32 -mt-20 mb-6 flex items-center justify-center text-8xl drop-shadow-2xl animate-bounce">
                {selected.emoji}
              </div>

              <div className="w-full my-12 py-6 flex-1 flex flex-col justify-center">
                <p className="text-xl md:text-2xl leading-loose font-bold text-[#FF69B4]" style={{ fontFamily: "'Comic Sans MS', 'Varela Round', cursive, sans-serif", padding: "1rem 0" }}>
                  {selected.message}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="px-10 py-3.5 bg-[#FF69B4] text-white rounded-full text-lg font-bold tracking-wide hover:bg-[#FF1493] hover:scale-105 active:scale-95 transition-all shadow-[0_8px_15px_rgba(255,105,180,0.4)] flex-shrink-0"
              >
                Okay! 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
