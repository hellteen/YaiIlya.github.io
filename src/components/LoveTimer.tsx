import { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, CalendarHeart } from 'lucide-react';

// Start date: 28 сентября 2024 года, 19:51
const START_DATE = new Date(2024, 8, 28, 19, 51, 0);

function getRussianPlural(number: number, one: string, two: string, five: string): string {
  const abs = Math.abs(number) % 100;
  const lastDigit = abs % 10;
  if (abs > 10 && abs < 20) return five;
  if (lastDigit > 1 && lastDigit < 5) return two;
  if (lastDigit === 1) return one;
  return five;
}

export function LoveTimer() {
  const [timePassed, setTimePassed] = useState({
    totalDays: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - START_DATE.getTime());

      const totalSeconds = Math.floor(diffMs / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimePassed({
        totalDays,
        hours,
        minutes,
        seconds,
        totalHours,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const daysLabel = getRussianPlural(timePassed.totalDays, 'день', 'дня', 'дней');
  const hoursLabel = getRussianPlural(timePassed.hours, 'час', 'часа', 'часов');
  const minutesLabel = getRussianPlural(timePassed.minutes, 'минута', 'минуты', 'минут');
  const secondsLabel = getRussianPlural(timePassed.seconds, 'секунда', 'секунды', 'секунд');

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Decorative tag */}
      <div className="flex items-center justify-center gap-2 mb-3 text-rose-500/80 text-xs sm:text-sm font-medium tracking-wide uppercase">
        <Sparkles className="w-4 h-4 text-rose-400" />
        <span>28 сентября 2024 · 19:51</span>
        <span aria-hidden="true">·</span>
        <span>Ровно 2 года и пошёл 3-й год</span>
        <Sparkles className="w-4 h-4 text-rose-400" />
      </div>

      {/* Main heading */}
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-serif-romantic font-semibold text-stone-800 mb-2">
        Сколько длится наше общение
      </h2>
      <p className="text-center text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-6">
        Каждая секунда рядом с тобой — драгоценна. Вот сколько времени мы уже пишем нашу историю:
      </p>

      {/* Counter Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Days */}
        <div className="bg-white/80 backdrop-blur-md border border-rose-100/80 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 group">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-serif-romantic font-bold text-rose-600 mb-1 tracking-tight">
            {timePassed.totalDays}
          </div>
          <div className="text-xs sm:text-sm font-medium text-stone-600 group-hover:text-rose-600 transition-colors">
            {daysLabel}
          </div>
        </div>

        {/* Hours */}
        <div className="bg-white/80 backdrop-blur-md border border-rose-100/80 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 group">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-serif-romantic font-bold text-rose-500 mb-1 tracking-tight tabular-nums">
            {String(timePassed.hours).padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm font-medium text-stone-600 group-hover:text-rose-600 transition-colors">
            {hoursLabel}
          </div>
        </div>

        {/* Minutes */}
        <div className="bg-white/80 backdrop-blur-md border border-rose-100/80 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 group">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-serif-romantic font-bold text-rose-500 mb-1 tracking-tight tabular-nums">
            {String(timePassed.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm font-medium text-stone-600 group-hover:text-rose-600 transition-colors">
            {minutesLabel}
          </div>
        </div>

        {/* Seconds */}
        <div className="bg-white/80 backdrop-blur-md border border-rose-100/80 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 group">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-serif-romantic font-bold text-rose-400 mb-1 tracking-tight tabular-nums animate-pulse">
            {String(timePassed.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs sm:text-sm font-medium text-stone-600 group-hover:text-rose-600 transition-colors">
            {secondsLabel}
          </div>
        </div>
      </div>

      {/* Secondary heartfelt highlights */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-stone-600 bg-rose-50/60 border border-rose-100/60 rounded-xl py-3 px-4 text-center">
        <div className="flex items-center gap-1.5">
          <CalendarHeart className="w-4 h-4 text-rose-500" />
          <span>Уже <strong>3-й год</strong> вместе</span>
        </div>
        <span className="hidden sm:inline text-rose-300" aria-hidden="true">•</span>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-rose-500" />
          <span>Более <strong>{timePassed.totalHours.toLocaleString('ru-RU')}</strong> часов тепла</span>
        </div>
        <span className="hidden sm:inline text-rose-300" aria-hidden="true">•</span>
        <div className="flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-400" />
          <span>Бесконечность впереди ✨</span>
        </div>
      </div>
    </div>
  );
}
