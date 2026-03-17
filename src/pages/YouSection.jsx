import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../components/ui/BackButton';

const messages = [
  // Cards 1-6 (Understanding Her)
  "You're the kind of person...\nwho checks on others...\neven when you're not okay yourself.",
  "You don't just listen...\nyou actually care...\nand that's rare.",
  "You feel things deeply...\neven the smallest things matter to you.",
  "You act strong most of the time...\nbut I know there's a soft side you don't show easily.",
  "You notice things about people...\nthat they don't even notice about themselves.",
  "You don't say it directly...\nbut the way you care... shows everything.",

  // Cards 7-12 (Her Personality)
  "You get angry...\nover the smallest things 😤\nand somehow... it's cute.",
  "Your mood swings are honestly...\nunpredictable 😄\nbut that's what makes you fun.",
  "You act savage...\nbut you're actually very soft.",
  "You pretend you don't care sometimes...\nbut I know you do.",
  "You can go from 'I'm fine'\nto 'I'm annoyed'\nin like... 2 seconds 😄",
  "And still...\nI wouldn't change that about you.",

  // Cards 13-16 (Her Life + Struggles)
  "You go through things...\nthat you don't always talk about...",
  "And still...\nyou show up for others.",
  "You handle more than people realize...\nand you do it quietly.",
  "That strength...\neven if you don't see it...\nis real.",

  // Cards 17-18 (Closing)
  "You make conversations feel lighter...\nand days feel a little better.",
  "And honestly...\nI'm really glad I got to know you 💙",
];

export default function YouSection() {
  const navigate = useNavigate();
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;
    if (nextPage >= 0 && nextPage < messages.length) {
      setPage([nextPage, newDirection]);
    }
  };

  const lines = messages[page].split('\n');
  const isLastCard = page === messages.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden" style={{ zIndex: 2 }}>
      {/* Back button */}
      <BackButton className="z-10" />

      {/* Background Photo */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/tanu-bg.jpg)`,
            opacity: 0.25,
            filter: 'blur(3px)',
          }}
        />
        {/* Dark overlay to keep text readable */}
        <div
          className="absolute inset-0 bg-black/70"
        />
      </div>

      {/* Card area */}
      <div className="w-full max-w-md min-h-[300px] relative flex flex-col items-center justify-center mt-8" style={{ zIndex: 2 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="w-full text-center px-6"
          >
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 1.2, duration: 1 }}
                className="text-lg md:text-xl leading-relaxed mb-4 text-white/90"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="mt-12 text-center z-10">
        <p className="text-white/40 text-sm tracking-widest font-mono mb-6">
          {page + 1} / {messages.length}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-center items-center h-16">
          <button
            onClick={() => paginate(-1)}
            className={`px-6 py-2 rounded-full border border-white/20 text-white/70 hover:bg-white/10 transition-all font-mono text-sm ${page === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            PREV
          </button>

          <button
            onClick={() => paginate(1)}
            className={`px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all font-mono text-sm ${page === messages.length - 1 ? 'opacity-0 pointer-events-none absolute' : 'opacity-100'}`}
          >
            NEXT →
          </button>

          {isLastCard && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="text-white/50 text-sm"
            >
              End 💙
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
