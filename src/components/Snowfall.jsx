import { useMemo } from 'react';

export default function Snowfall() {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 12 + 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${Math.random() * 8 + 4}px`,
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
