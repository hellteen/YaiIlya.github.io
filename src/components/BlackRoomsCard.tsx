import { useState } from 'react';
import { MapPin, Film, Popcorn, Tv, Music, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';

const ADDRESS = 'пр-кт Николая Корыткова, 28б';
const YANDEX_MAPS_URL = 'https://yandex.ru/maps/?text=' + encodeURIComponent('Тверь проспект Николая Корыткова 28б');
const TWOGIS_URL = 'https://2gis.ru/tver/search/' + encodeURIComponent('Тверь проспект Николая Корыткова 28б');

export function BlackRoomsCard() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const perks = [
    {
      icon: Film,
      title: 'Только мы вдвоём',
      desc: 'Приватный зал без посторонних взглядов — наше личное уютное пространство.',
    },
    {
      icon: Tv,
      title: 'Большой экран и звук',
      desc: 'Любимый фильм, сериал или даже совместная игра на огромном полотне.',
    },
    {
      icon: Popcorn,
      title: 'Любимые вкусняшки',
      desc: 'Попкорн, сладости, пицца или напитки — устроим настоящий гастрономический праздник.',
    },
    {
      icon: Music,
      title: 'Романтический вайб',
      desc: 'Мягкий диван, тёплый плед, приглушённый свет и ощущение полного уюта.',
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-200/70 shadow-xl shadow-rose-100/50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Место встречи</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-stone-800">
              Black Rooms Lounge & Cinema
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Антикинотеатр и приватные залы для самых тёплых свиданий
            </p>
          </div>

          {/* Address badge & copy */}
          <div className="flex flex-col sm:items-end gap-1.5">
            <div className="flex items-center gap-2 text-stone-700 font-medium text-xs sm:text-sm bg-rose-50/80 border border-rose-200/80 px-3 py-2 rounded-xl">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{ADDRESS}</span>
              <button
                type="button"
                onClick={copyAddress}
                aria-label="Скопировать адрес"
                className="p-1 hover:bg-rose-100 rounded text-rose-600 transition-colors ml-1"
                title="Скопировать адрес"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-600 font-medium animate-fadeIn">
                Адрес скопирован в буфер!
              </span>
            )}
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-br from-rose-50/40 to-pink-50/30 border border-rose-100/80 hover:border-rose-200 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-800 mb-0.5">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Links */}
        <div className="pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="text-stone-500 font-medium">
            Маршрут до локации:
          </span>
          <div className="flex items-center gap-2">
            <a
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 text-amber-800 hover:bg-amber-500/20 font-medium transition-colors"
            >
              <span>Яндекс Карты</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={TWOGIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-800 hover:bg-emerald-500/20 font-medium transition-colors"
            >
              <span>2ГИС</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
