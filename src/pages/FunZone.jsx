import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BackButton from '../components/ui/BackButton';

const questions = [
  {
    question: "What improves Tanu's mood instantly? 🤔",
    options: ['Pizza 🍕', 'Coffee ☕', 'Music 🎧', 'Sleep 😴'],
    correct: 1,
    response: "Obviously coffee! ☕ it's basically your lifeline at this point 😌",
  },
  {
    question: "Tanu's secret superpower is… 🦸‍♀️",
    options: ['Mind reading', 'Making people smile', 'Getting angry cutely', 'All of the above'],
    correct: 3,
    response: "Trick question — it's ALL of them! 💙✨",
  },
  {
    question: "What color does Tanu love the most? 💙",
    options: ['Red ❤️', 'Pink 🩷', 'Dark Blue 💙', 'Black 🖤'],
    correct: 2,
    response: "Dark blue… just like our sky 🌌💙",
  },
  {
    question: "When Tanu is angry, what happens? 😤",
    options: ['She yells 🗣️', 'Silent treatment 🤐', 'She looks cute 🥺', 'The world trembles 🌋'],
    correct: 2,
    response: "The correct answer is ALWAYS that it's cute 😤💙",
  },
  {
    question: "What does Tanu care about most?",
    options: ['Looking cool 😎', 'People she loves 💙', 'Social media 📱', 'Winning arguments 🏆'],
    correct: 1,
    response: "You care about your people more than anything 💙 that's what makes you, you.",
  },
];

function GameBackground() {
  const controllers = ['👾', '�', '🕹️', '⚡', '�', '�'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            color: 'white',
            opacity: 0.1,
            textShadow: '0 0 10px rgba(0,255,0,0.5)'
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          {controllers[Math.floor(Math.random() * controllers.length)]}
        </motion.div>
      ))}
    </div>
  );
}

export default function FunZone() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);

    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00FF00', '#FF00FF', '#00FFFF', '#FFFF00'],
      });
    }

    setTimeout(() => setShowResponse(true), 500);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowResponse(false);
    } else {
      setFinished(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#00FF00', '#FF00FF', '#00FFFF', '#FFFF00'],
      });
    }
  };

  const q = questions[currentQ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative bg-[#0f1115] text-white" style={{ zIndex: 2 }}>
      <GameBackground />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(30,255,100,0.05) 0%, transparent 60%)', zIndex: 0 }} />

      <BackButton variant="dark" />

      <motion.h2
        className="text-3xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 uppercase"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Fun Zone
      </motion.h2>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={currentQ}
            className="p-6 md:p-8 max-w-md w-full relative bg-[#1c1f26] rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center text-xs font-mono text-emerald-400 mb-4 tracking-widest uppercase">
              <span>Lvl {currentQ + 1}</span>
              <span>Score: {score}</span>
            </div>

            <motion.h3
              className="text-lg md:text-xl mb-6 font-medium text-white/90"
              animate={{ color: ['#fff', '#a7f3d0', '#fff'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {q.question}
            </motion.h3>

            <div className="space-y-3">
              {q.options.map((option, i) => {
                const isCorrect = i === q.correct;
                const isSelected = i === selected;

                let bgStyle = 'rgba(255,255,255,0.03)';
                let borderStyle = 'rgba(255,255,255,0.05)';
                let textColor = 'rgba(255,255,255,0.7)';

                if (selected !== null) {
                  if (isCorrect) {
                    bgStyle = 'rgba(16, 185, 129, 0.2)';
                    borderStyle = '#10b981';
                    textColor = '#34d399';
                  } else if (isSelected && !isCorrect) {
                    bgStyle = 'rgba(239, 68, 68, 0.2)';
                    borderStyle = '#ef4444';
                    textColor = '#f87171';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    className="w-full text-left p-4 rounded-xl transition-all duration-300 transform active:scale-95 flex justify-between items-center"
                    style={{ background: bgStyle, border: `1px solid ${borderStyle}`, color: textColor }}
                    disabled={selected !== null}
                  >
                    <span>{option}</span>
                    {selected !== null && isCorrect && <span>✅</span>}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {showResponse && (
                <motion.div
                  className="mt-6 p-4 rounded-xl text-center text-sm bg-[#10b981]/10 text-emerald-300 border border-emerald-500/20"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0 }}
                >
                  {q.response}
                </motion.div>
              )}
            </AnimatePresence>

            {showResponse && (
              <motion.button
                onClick={handleNext}
                className="w-full mt-6 py-4 rounded-xl font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-gray-900 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {currentQ < questions.length - 1 ? 'Next Level ➡' : 'Finish 🏁'}
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            className="p-8 max-w-md w-full text-center relative bg-[#1c1f26] rounded-2xl border border-white/10 shadow-2xl z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-widest">
              Game Over
            </h3>
            <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
              {score} / {questions.length}
            </p>
            <p className="text-white/50 mb-8 font-mono text-sm">
              {score === questions.length ? "HIGH SCORE: PERFECT ❤️" : "NICE TRY, PLAYER ONE 🎮"}
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-mono text-sm uppercase tracking-widest transition-colors w-full text-white"
            >
              Return to Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
