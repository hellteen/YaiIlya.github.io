import { useState } from 'react';
import { Heart, Sparkles, MessageCircleHeart, Flame, Gift, Star } from 'lucide-react';

interface LoveNote {
  id: number;
  icon: typeof Heart;
  tag: string;
  title: string;
  preview: string;
  fullText: string;
}

const NOTES: LoveNote[] = [
  {
    id: 1,
    icon: MessageCircleHeart,
    tag: 'Сентябрь 2024',
    title: 'Тот самый первый день',
    preview: '28 сентября 2024 в 19:51 начался наш диалог...',
    fullText:
      'Кто бы мог подумать, что простое сообщение в субботний осенний вечер 28 сентября в 19:51 положит начало чему-то настолько родному, искреннему и тёплому. С того момента мир стал ярче.',
  },
  {
    id: 2,
    icon: Flame,
    tag: '2 года вместе',
    title: 'Ровно 2 года и пошёл 3-й год',
    preview: 'Мы прошли через сотни разговоров и улыбок...',
    fullText:
      'Уже целых 2 года мы делимся мыслями, поддерживаем друг друга, шутим и заботимся. И вот мы встречаем наш третий год общения — сильнее и ближе, чем когда-либо.',
  },
  {
    id: 3,
    icon: Gift,
    tag: 'Свидание в Black Rooms',
    title: 'Только ты и я',
    preview: 'На пр-кт Николая Корыткова, 28б...',
    fullText:
      'Я выбрала Black Rooms, потому что это место, где можно укрыться от всего мира: закрыть дверь, выключить лишний шум, завернуться в плед на огромном диване и наслаждаться каждым мгновением вдвоём.',
  },
  {
    id: 4,
    icon: Star,
    tag: 'Для тебя',
    title: 'С праздником, мой любимый',
    preview: 'Спасибо за то, какой ты есть...',
    fullText:
      'Ты — моё спокойствие, моё вдохновение и самая надёжная опора. С праздником, родной! Пусть этот новый год нашего общения принесёт нам ещё больше счастливых воспоминаний.',
  },
];

export function LoveNotes() {
  const [openedNoteId, setOpenedNoteId] = useState<number | null>(null);

  const toggleNote = (id: number) => {
    setOpenedNoteId((curr) => (curr === id ? null : id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Наши воспоминания</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif-romantic font-semibold text-stone-800">
          Маленькие признания для тебя
        </h3>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">
          Нажми на карточку, чтобы прочитать тёплое послание ✨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {NOTES.map((note) => {
          const isOpened = openedNoteId === note.id;
          const Icon = note.icon;

          return (
            <button
              key={note.id}
              type="button"
              onClick={() => toggleNote(note.id)}
              className={`text-left p-5 rounded-2xl border transition-all duration-300 relative cursor-pointer ${
                isOpened
                  ? 'bg-white border-rose-300 shadow-md shadow-rose-100 scale-[1.01]'
                  : 'bg-white/70 hover:bg-white/95 border-rose-100/80 hover:border-rose-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-medium text-rose-500/80 tracking-wide uppercase">
                    {note.tag}
                  </span>
                </div>
                <span className="text-xs text-rose-400 font-medium">
                  {isOpened ? 'Свернуть' : 'Открыть 💌'}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-serif-romantic font-semibold text-stone-800 mb-1">
                {note.title}
              </h4>

              <p className="text-xs text-stone-600 leading-relaxed">
                {isOpened ? note.fullText : note.preview}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
