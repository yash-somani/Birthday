import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../components/ui/BackButton';

const photos = [
  { id: 1, src: '/images/moments/moment-01.jpg', label: 'Moment 1' },
  { id: 2, src: '/images/moments/moment-02.jpg', label: 'Moment 2' },
  { id: 3, src: '/images/moments/moment-03.jpg', label: 'Moment 3' },
  { id: 4, src: '/images/moments/moment-04.jpg', label: 'Moment 4' },
  { id: 5, src: '/images/moments/moment-05.jpg', label: 'Moment 5' },
  { id: 6, src: '/images/moments/moment-06.jpeg', label: 'Moment 6' },
  { id: 7, src: '/images/moments/moment-07.jpeg', label: 'Moment 7' },
  { id: 8, src: '/images/moments/moment-08.jpeg', label: 'Moment 8' },
  { id: 9, src: '/images/moments/moment-09.jpeg', label: 'Moment 9' },
  { id: 10, src: '/images/moments/moment-10.jpeg', label: 'Moment 10' },
  { id: 11, src: '/images/moments/moment-11.jpeg', label: 'Moment 11' },
];

function AmbientWarmth() {
  const embers = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.2,
      drift: (Math.random() - 0.5) * 50,
      glow: Math.random() * 15 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {embers.map(e => (
        <motion.div
          key={e.id}
          className="absolute rounded-full bg-[#FFD166]"
          style={{
            left: e.left,
            bottom: '-20px',
            width: `${e.size}px`,
            height: `${e.size}px`,
            opacity: e.opacity,
            boxShadow: `0 0 ${e.glow}px rgba(255, 209, 102, 0.8)`,
          }}
          animate={{
            y: [0, -(window.innerHeight + 40)],
            x: [0, e.drift],
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: e.duration,
            delay: e.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Moments() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const placeholderGradients = [
    'linear-gradient(135deg, #FFB5A7, #FEC89A)',
    'linear-gradient(135deg, #FEC89A, #F8EDEB)',
    'linear-gradient(135deg, #F8EDEB, #FCD5CE)',
    'linear-gradient(135deg, #FCD5CE, #FFB5A7)',
    'linear-gradient(135deg, #FFB5A7, #F8EDEB)',
    'linear-gradient(135deg, #FEC89A, #FCD5CE)',
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative bg-[#3C2A21]" style={{ zIndex: 2 }}>
      <AmbientWarmth />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(206,121,107,0.15) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      <BackButton />

      <motion.h2
        className="text-3xl md:text-4xl mb-2 text-center relative text-[#FFD166] font-serif tracking-wide"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
     Moments ✨
      </motion.h2>
      <motion.p
        className="text-sm mb-10 text-center relative text-[#FFD166]/60 font-serif italic"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        cozy little pieces of you
      </motion.p>

      <div className="w-full max-w-sm aspect-[4/5] relative overflow-hidden rounded-[2rem] shadow-[0_20px_50px_rgba(30,20,15,0.8)] border-[6px] border-[#ecd5c5]/10" style={{ zIndex: 2 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#2d1e18]"
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <img
              src={photos[currentIndex].src}
              alt={photos[currentIndex].label}
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              decoding="async"
            />

            {/* Film grain / cozy noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3" style={{ zIndex: 3 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                background: i === currentIndex ? '#FFF' : 'rgba(255,255,255,0.3)',
                transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
                border: 'none',
              }}
            />
          ))}
        </div>
      </div>

      <motion.p
        className="mt-8 text-xs text-center relative text-[#FFD166]/40 uppercase tracking-[0.2em]"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        to be continued
      </motion.p>
    </div>
  );
}
