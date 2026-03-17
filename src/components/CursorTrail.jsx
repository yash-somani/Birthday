import { useEffect, useState, useCallback } from 'react';

export default function CursorTrail() {
  const [dots, setDots] = useState([]);

  const handleMouseMove = useCallback((e) => {
    const newDot = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };

    setDots(prev => [...prev.slice(-12), newDot]);
  }, []);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (dots.length === 0) return;
    const timeout = setTimeout(() => {
      setDots(prev => prev.slice(1));
    }, 150);
    return () => clearTimeout(timeout);
  }, [dots]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {dots.map((dot, i) => (
        <div
          key={dot.id}
          className="cursor-dot"
          style={{
            left: dot.x - 3,
            top: dot.y - 3,
            opacity: (i + 1) / dots.length * 0.6,
            transform: `scale(${(i + 1) / dots.length})`,
          }}
        />
      ))}
    </div>
  );
}
