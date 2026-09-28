import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

const SYMBOLS = ['💖', '💕', '✨', '🤍', '🌸', '💫'];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate gentle floating hearts
    const initialHearts: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.floor(Math.random() * 14) + 14, // 14px to 28px
      duration: Math.random() * 12 + 14, // 14s to 26s slow float
      delay: Math.random() * 14,
      opacity: Math.random() * 0.4 + 0.25,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    }));

    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart select-none"
          style={{
            left: `${heart.left}%`,
            bottom: '-40px',
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            filter: 'drop-shadow(0 2px 8px rgba(244, 114, 182, 0.25))',
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
}
