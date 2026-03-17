import { useState, useEffect } from 'react';

export default function TypeWriter({ text, speed = 40, delay = 0, onComplete, className = '' }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && started && <span className="typewriter-cursor" />}
    </span>
  );
}
