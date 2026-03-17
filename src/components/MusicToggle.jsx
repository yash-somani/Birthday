import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/music/subhanallah.mp3');
    audio.loop = false;
    audio.volume = 0.15;
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (!hasInteracted) setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, hasInteracted]);

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ui-btn ui-btn--ghost"
      style={{ padding: 0 }}
      whileHover={{
        scale: 1.08,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      title={isPlaying ? 'Pause Subhanallah' : 'Play Subhanallah'}
    >
      {isPlaying ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
          {/* Animated sound waves */}
          <motion.line
            x1="22" y1="4" x2="22" y2="20"
            stroke="rgba(255, 105, 180, 0.6)"
            strokeWidth="1.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255, 105, 180, 0.2)" />
        </svg>
      )}

      {/* Pulse ring when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(255, 105, 180, 0.4)' }}
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
    </motion.button>
  );
}
