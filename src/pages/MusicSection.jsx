import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/ui/BackButton';

export default function MusicSection() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ title: 'Subhanallah', artist: 'Pritam' });
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/music/subhanallah.mp3');
    audio.loop = false;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('music-section-ended'));
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Notify global music to pause
      window.dispatchEvent(new CustomEvent('music-section-playing'));
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
      if (!showNote) {
        setTimeout(() => setShowNote(true), 1500);
      }
    }
  }, [isPlaying, showNote]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative" style={{ zIndex: 2 }}>
      {/* Back button */}
      <BackButton />

      <motion.h2
        className="text-2xl md:text-3xl mb-1 text-center"
        style={{ fontFamily: 'var(--font-heading)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Music 🎧
      </motion.h2>
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg font-medium text-white/80" style={{ fontFamily: 'var(--font-heading)' }}>
          {trackInfo.title}
        </p>
        <p className="text-sm text-white/50">
          by {trackInfo.artist}
        </p>
      </motion.div>
      <motion.p
        className="text-xs opacity-40 mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.3 }}
      >
        tap the vinyl to play 💙
      </motion.p>

      {/* Vinyl / Music player */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        {/* Glowing orb behind */}
        <div
          className="absolute inset-0 w-48 h-48 rounded-full blur-3xl -m-12"
          style={{
            background: isPlaying
              ? 'radial-gradient(circle, rgba(123,158,255,0.3), transparent)'
              : 'radial-gradient(circle, rgba(123,158,255,0.1), transparent)',
            transition: 'all 1s ease',
          }}
        />

        {/* Vinyl disc */}
        <motion.div
          className="w-48 h-48 rounded-full relative cursor-pointer"
          style={{
            background: 'conic-gradient(from 0deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)',
            border: '2px solid rgba(255,255,255,0.08)',
            boxShadow: '0 0 40px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.3)',
          }}
          onClick={togglePlay}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={isPlaying ? {
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
          } : {}}
        >
          {/* Center hole */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #0B1E3F, #060f20)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <motion.span
              className="text-xl"
              animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {isPlaying ? '⏸' : '▶'}
            </motion.span>
          </div>

          {/* Vinyl grooves */}
          {[30, 45, 60, 75].map((size, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: `${size}%`,
                height: `${size}%`,
                border: '1px solid rgba(255,255,255,0.03)',
              }}
            />
          ))}
        </motion.div>

        {/* Sound waves when playing */}
        {isPlaying && (
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ background: 'rgba(123,158,255,0.4)' }}
                animate={{
                  height: [8, 20, 8],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Play/Pause label with track info */}
      <motion.div
        className="mt-8 text-center"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <p className="text-sm opacity-60">
          {isPlaying ? `♪ playing: ${trackInfo.title} ♪` : 'tap the vinyl to play'}
        </p>
        {isPlaying && (
          <motion.div
            className="mt-3 flex items-center justify-center gap-1.5"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-xs text-white/40">ambient music paused</span>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden note after playing */}
      {showNote && (
        <motion.div
          className="glass-card p-6 mt-8 max-w-sm text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm opacity-80 leading-relaxed">
            "I picked this because it reminds me of the calm you bring…
            even when everything else is chaos 💙"
          </p>
        </motion.div>
      )}
    </div>
  );
}
