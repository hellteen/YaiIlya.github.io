import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface DateProposalProps {
  isAccepted: boolean;
  onAccept: () => void;
}

const DODGE_TEXTS = [
  'Нет 🙈',
  'Ой, мимо! 😜',
  'Кнопка сломалась 🥺',
  'Так нечестно! 💕',
  'Куда нажимаешь? 💖',
  'Без вариантов, милый! 🥰',
  'Только «ДА»! ✨',
  'Хи-хи, не получится! 😂',
  'Судьба за «ДА»! ❤️',
  'Я тебя не отпущу! 💍',
];

export function DateProposal({ isAccepted, onAccept }: DateProposalProps) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerLoveConfetti = () => {
    // Burst 1: Center pastel burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F472B6', '#FB7185', '#FDA4AF', '#FBCFE8', '#FED7AA', '#E9D5FF'],
    });

    // Burst 2: Left burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#F43F5E', '#FB7185', '#F472B6', '#FFF1F2'],
      });
    }, 200);

    // Burst 3: Right burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#F43F5E', '#FB7185', '#F472B6', '#FFF1F2'],
      });
    }, 400);
  };

  const handleAccept = () => {
    triggerLoveConfetti();
    onAccept();
  };

  const dodgeNoButton = () => {
    setDodgeCount((prev) => prev + 1);

    // Calculate a dynamic evasive jump that stays visible but dodges the cursor/finger
    const boundsX = 140;
    const boundsY = 90;

    // Generate random coordinate not close to 0
    let randX = (Math.random() * 2 - 1) * boundsX;
    let randY = (Math.random() * 2 - 1) * boundsY;

    // Ensure it noticeably moves away
    if (Math.abs(randX) < 40) randX = randX >= 0 ? 70 : -70;
    if (Math.abs(randY) < 30) randY = randY >= 0 ? 55 : -55;

    setNoPosition({ x: randX, y: randY });
  };

  const currentNoText = DODGE_TEXTS[dodgeCount % DODGE_TEXTS.length];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto px-4 relative overflow-hidden"
    >
      <div className="relative bg-gradient-to-b from-white/95 to-rose-50/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-rose-200/80 shadow-xl shadow-rose-200/40 text-center">
        {/* Decorative corner glows */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200/40 rounded-full blur-2xl pointer-events-none" />

        {/* Small icon badge */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-400 to-pink-300 text-white shadow-lg shadow-rose-300/50 mb-4 animate-pulse-subtle">
          <Heart className="w-7 h-7 fill-white" />
        </div>

        {/* The Question */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif-romantic font-bold text-stone-800 mb-3 tracking-tight">
          Пойдёшь со мной на свидание?
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          Я уже всё придумала: уютный приватный кинозал{' '}
          <strong className="text-rose-600 font-semibold">Black Rooms</strong>{' '}
          только для нас двоих, кино, вкусняшки и полное уединение... Ты со мной?
        </p>

        {/* Interactive proposal state */}
        <AnimatePresence mode="wait">
          {!isAccepted ? (
            <motion.div
              key="decision-buttons"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative min-h-[140px] flex flex-col items-center justify-center"
            >
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 w-full">
                {/* YES Button */}
                <button
                  type="button"
                  onClick={handleAccept}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-base sm:text-lg shadow-lg shadow-rose-300/60 hover:shadow-xl hover:shadow-rose-400/60 active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer group"
                >
                  <Sparkles className="w-5 h-5 text-rose-200 group-hover:rotate-12 transition-transform" />
                  <span>Да, конечно! ❤️</span>
                </button>

                {/* NO Button (Dodging runaway button) */}
                <motion.button
                  type="button"
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                    rotate: dodgeCount > 0 ? (dodgeCount % 2 === 0 ? 5 : -5) : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  onMouseEnter={dodgeNoButton}
                  onFocus={dodgeNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    dodgeNoButton();
                  }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    dodgeNoButton();
                  }}
                  onClick={(e) => {
                    // Fail-safe: if touch bypasses or keyboard hits enter, celebrate anyway!
                    e.preventDefault();
                    dodgeNoButton();
                    if (dodgeCount >= 3) {
                      handleAccept();
                    }
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-stone-100/90 hover:bg-stone-200/90 text-stone-600 hover:text-stone-800 text-sm sm:text-base font-medium border border-stone-200 shadow-sm transition-colors cursor-pointer select-none"
                  style={{
                    willChange: 'transform',
                    touchAction: 'none',
                  }}
                >
                  {currentNoText}
                </motion.button>
              </div>

              {dodgeCount > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-rose-500 font-medium mt-4 select-none"
                >
                  {dodgeCount < 3
                    ? 'Подсказка: кнопка «Нет» не работает по техническим (и романтическим) причинам 😉'
                    : `Попыток нажать «Нет»: ${dodgeCount}. Смирись, выбора нет! 💕`}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="accepted-banner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 text-emerald-800 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2 font-serif-romantic text-xl font-bold text-emerald-700">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <span>Ура! Твой ответ: ДА! 🎉</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-700/90 max-w-md">
                Я знала, что ты согласишься! Теперь давай выберем день в календаре ниже 👇
              </p>
              <button
                type="button"
                onClick={triggerLoveConfetti}
                className="mt-2 text-xs font-semibold text-rose-600 hover:text-rose-700 underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ещё конфетти!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
