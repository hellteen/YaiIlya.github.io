import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarCheck2, Sparkles, AlertCircle } from 'lucide-react';

interface DateCalendarPickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const MONTH_NAMES_RU = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const WEEK_DAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Earliest allowed date: October 7th, 2026
// (User specified: not including remaining days of September and October up to the 6th)
const EARLIEST_ALLOWED_DATE = new Date(2026, 9, 7); // Month 9 is October in 0-indexed JS

export function DateCalendarPicker({ selectedDate, onSelectDate }: DateCalendarPickerProps) {
  // Calendar view month & year (starts in October 2026)
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [currentMonth, setCurrentMonth] = useState<number>(9); // October

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const prevMonth = () => {
    // Don't go before October 2026
    if (currentYear === 2026 && currentMonth <= 9) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const isPrevDisabled = currentYear === 2026 && currentMonth <= 9;

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    // In JS getDay(): 0 is Sunday, 1 is Monday...
    // We want Monday as 0, Sunday as 6
    let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startingDayOfWeek === -1) startingDayOfWeek = 6;

    const days: Array<{
      dayNumber: number | null;
      date: Date | null;
      isDisabled: boolean;
      disableReason?: string;
    }> = [];

    // Empty slots before the 1st
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ dayNumber: null, date: null, isDisabled: true });
    }

    // Days of current month
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      
      // Rule: Exclude all September days and October days up to 6th.
      // Earliest allowed date is Oct 7, 2026.
      let isDisabled = false;
      let disableReason: string | undefined = undefined;

      if (currentYear < 2026 || (currentYear === 2026 && currentMonth < 9)) {
        isDisabled = true;
        disableReason = 'Сентябрь недоступен';
      } else if (currentYear === 2026 && currentMonth === 9 && day < 7) {
        isDisabled = true;
        disableReason = 'До 6 октября дни недоступны';
      }

      days.push({
        dayNumber: day,
        date,
        isDisabled,
        disableReason,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  const formatSelectedDateFull = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Quick preset shortcuts
  const selectPreset = (targetDate: Date) => {
    setCurrentYear(targetDate.getFullYear());
    setCurrentMonth(targetDate.getMonth());
    onSelectDate(targetDate);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-rose-200/70 shadow-xl shadow-rose-100/50">
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full mb-2">
          <CalendarCheck2 className="w-3.5 h-3.5" />
          <span>Только выбор дня</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif-romantic font-semibold text-stone-800">
          Выбери идеальный день для нас
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-md mx-auto">
          Дни до 6 октября заняты подготовкой и сюрпризами. Доступны любые даты начиная с <strong>7 октября</strong>!
        </p>
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        <button
          type="button"
          onClick={() => selectPreset(new Date(2026, 9, 7))}
          className="text-xs px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-rose-100 transition-colors"
        >
          ✨ Среда, 7 октября (первый день)
        </button>
        <button
          type="button"
          onClick={() => selectPreset(new Date(2026, 9, 10))}
          className="text-xs px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-rose-100 transition-colors"
        >
          🍿 Суббота, 10 октября (выходной)
        </button>
        <button
          type="button"
          onClick={() => selectPreset(new Date(2026, 9, 11))}
          className="text-xs px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50/70 text-rose-700 hover:bg-rose-100 transition-colors"
        >
          🌙 Воскресенье, 11 октября
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between px-2 mb-4">
        <h4 className="text-base sm:text-lg font-semibold text-stone-800">
          {MONTH_NAMES_RU[currentMonth]} {currentYear}
        </h4>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            disabled={isPrevDisabled}
            aria-label="Предыдущий месяц"
            className="p-2 rounded-xl text-stone-600 hover:bg-rose-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="Следующий месяц"
            className="p-2 rounded-xl text-stone-600 hover:bg-rose-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {WEEK_DAYS_RU.map((day, idx) => (
          <div
            key={day}
            className={`text-xs font-semibold py-1.5 ${
              idx >= 5 ? 'text-rose-500' : 'text-stone-400'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {calendarDays.map((item, index) => {
          if (!item.dayNumber || !item.date) {
            return <div key={`empty-${index}`} className="h-10 sm:h-11" />;
          }

          const selected = isDateSelected(item.date);
          const isWeekend = item.date.getDay() === 0 || item.date.getDay() === 6;

          return (
            <button
              key={`day-${item.dayNumber}`}
              type="button"
              disabled={item.isDisabled}
              onClick={() => item.date && onSelectDate(item.date)}
              title={item.disableReason || undefined}
              className={`h-10 sm:h-11 rounded-xl text-xs sm:text-sm font-medium transition-all relative flex flex-col items-center justify-center ${
                selected
                  ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-300 scale-105 z-10'
                  : item.isDisabled
                  ? 'text-stone-300 bg-stone-50/50 cursor-not-allowed line-through'
                  : 'text-stone-700 hover:bg-rose-100/70 hover:text-rose-700 bg-white/70'
              } ${isWeekend && !item.isDisabled && !selected ? 'text-rose-600 font-semibold' : ''}`}
            >
              <span>{item.dayNumber}</span>
              {selected && (
                <span className="w-1.5 h-1.5 bg-white rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Notice about blocked dates */}
      <div className="mt-4 pt-3 border-t border-rose-100 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded bg-stone-200 line-through" />
          <span>1-6 окт: недоступно</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded bg-rose-500" />
          <span className="text-rose-700 font-medium">С 7 октября: свободно ✨</span>
        </div>
      </div>

      {/* Selected Date Callout */}
      {selectedDate ? (
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-rose-500 font-semibold">
              Выбранный день:
            </div>
            <div className="text-sm sm:text-base font-semibold text-stone-800 capitalize">
              {formatSelectedDateFull(selectedDate)}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-center text-xs text-stone-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-stone-400" />
          <span>Нажми на любой день календаря начиная с 7 октября</span>
        </div>
      )}
    </div>
  );
}
