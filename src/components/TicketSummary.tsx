import { useState } from 'react';
import { Ticket, Heart, Share2, Copy, Check, Calendar, Film, Coffee, Sparkles, Download } from 'lucide-react';

interface TicketSummaryProps {
  selectedDate: Date;
  onScrollToTop?: () => void;
}

const MOVIE_CHOICES = [
  '🎬 Романтическая комедия',
  '🍿 Захватывающий триллер/боевик',
  '🧙‍♂️ Киномарафон (Гарри Поттер / Властелин Колец)',
  '👻 Ужастик (чтобы крепче прижиматься)',
  '🎮 Поиграем в PS5 / приставку',
];

const SNACK_CHOICES = [
  '🍿 Свежий тёплый попкорн (карамель / сыр)',
  '🍕 Горячая пицца',
  '🍣 Любимые роллы / суши',
  '🍓 Клубника в шоколаде / десерты',
  '🥤 Любимые лимонады и кофе',
];

export function TicketSummary({ selectedDate }: TicketSummaryProps) {
  const [selectedMovie, setSelectedMovie] = useState<string>(MOVIE_CHOICES[0]);
  const [selectedSnacks, setSelectedSnacks] = useState<string[]>([SNACK_CHOICES[0], SNACK_CHOICES[3]]);
  const [copied, setCopied] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(selectedDate);

  const toggleSnack = (snack: string) => {
    setSelectedSnacks((prev) =>
      prev.includes(snack) ? prev.filter((s) => s !== snack) : [...prev, snack]
    );
  };

  const getConfirmationMessage = () => {
    return (
      `Любимая, с праздником! ❤️\n` +
      `Я согласен на наше свидание в Black Rooms (пр-кт Николая Корыткова, 28б)!\n\n` +
      `📅 Дата: ${formattedDate}\n` +
      `🎬 Программа: ${selectedMovie}\n` +
      `🍿 Вкусняшки: ${selectedSnacks.join(', ') || 'всё самое вкусное'}\n\n` +
      `Уже пошёл наш 3-й год общения, и я безумно счастлив с тобой. Жду этот день с нетерпением! ✨`
    );
  };

  const copyConfirmation = async () => {
    try {
      await navigator.clipboard.writeText(getConfirmationMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Generate .ics calendar file for instant import
  const downloadCalendarEvent = () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    const dtStart = `${year}${month}${day}T190000`;
    const dtEnd = `${year}${month}${day}T220000`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BlackRoomsDateInvitation//RU',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'SUMMARY:Романтическое свидание в Black Rooms ❤️',
      'DESCRIPTION:Свидание с любимой в честь годовщины нашего общения! Адрес: пр-кт Николая Корыткова, 28б',
      'LOCATION:пр-кт Николая Корыткова, 28б, Black Rooms, Тверь',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `date-blackrooms-${year}-${month}-${day}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareTelegram = () => {
    const text = encodeURIComponent(getConfirmationMessage());
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${text}`, '_blank');
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(getConfirmationMessage());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Ticket Container */}
      <div className="relative bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-3xl border-2 border-rose-300/80 p-6 sm:p-8 shadow-2xl shadow-rose-200/50 overflow-hidden">
        {/* Ticket notch left & right */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#FFF9F9] border-r-2 border-rose-300" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#FFF9F9] border-l-2 border-rose-300" />

        {/* Top header */}
        <div className="flex items-center justify-between pb-5 border-b border-dashed border-rose-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-300">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest block">
                VIP Приглашение
              </span>
              <h4 className="text-lg sm:text-xl font-serif-romantic font-bold text-stone-800">
                Билет на наше свидание
              </h4>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Подтверждено
            </span>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="py-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/80 p-3.5 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mb-1">
                <Calendar className="w-4 h-4" />
                <span>Дата свидания</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-stone-800 capitalize">
                {formattedDate}
              </div>
            </div>

            <div className="bg-white/80 p-3.5 rounded-2xl border border-rose-100">
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Место свидания</span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-stone-800">
                Black Rooms
              </div>
              <div className="text-xs text-stone-500">пр-кт Николая Корыткова, 28б</div>
            </div>
          </div>

          {/* Interactive Wishlist */}
          <div className="pt-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-2">
              <Film className="w-4 h-4 text-rose-500" />
              <span>Что включим на экране?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {MOVIE_CHOICES.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setSelectedMovie(choice)}
                  className={`text-left text-xs p-2.5 rounded-xl border transition-all ${
                    selectedMovie === choice
                      ? 'bg-rose-500 text-white font-medium border-rose-600 shadow-sm'
                      : 'bg-white/70 text-stone-700 border-rose-100 hover:border-rose-200'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-2">
              <Coffee className="w-4 h-4 text-rose-500" />
              <span>Любимые угощения (можно выбрать несколько):</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SNACK_CHOICES.map((snack) => {
                const isChecked = selectedSnacks.includes(snack);
                return (
                  <button
                    key={snack}
                    type="button"
                    onClick={() => toggleSnack(snack)}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      isChecked
                        ? 'bg-rose-100 text-rose-800 border-rose-300 font-medium'
                        : 'bg-white/70 text-stone-600 border-stone-200 hover:border-rose-200'
                    }`}
                  >
                    {isChecked ? '✓ ' : '+ '}
                    {snack}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-dashed border-rose-200 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={copyConfirmation}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-300/50 hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>Ответ скопирован в буфер! ❤️</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5 text-white" />
                <span>Скопировать готовый ответ для неё 💌</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={shareTelegram}
              className="py-2.5 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-600" />
              <span>В Telegram</span>
            </button>

            <button
              type="button"
              onClick={shareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>В WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={downloadCalendarEvent}
              className="py-2.5 px-3 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>В календарь (.ics)</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-stone-500 mt-1 flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>Сохранено для нас двоих · Black Rooms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
