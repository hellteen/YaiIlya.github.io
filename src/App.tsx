import { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { LoveTimer } from './components/LoveTimer';
import { DateProposal } from './components/DateProposal';
import { DateCalendarPicker } from './components/DateCalendarPicker';
import { BlackRoomsCard } from './components/BlackRoomsCard';
import { TicketSummary } from './components/TicketSummary';
import { LoveNotes } from './components/LoveNotes';
import { Heart, Sparkles, MapPin, Calendar, Film, ArrowDown } from 'lucide-react';

export default function App() {
  const [isAccepted, setIsAccepted] = useState(false);
  // Default to October 7th, 2026 (first allowed date) or null until chosen
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 9, 7));

  const proposalRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleProposalAccept = () => {
    setIsAccepted(true);
    // Smoothly scroll to calendar picker after a short delightful moment
    setTimeout(() => {
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 600);
  };

  const scrollToProposal = () => {
    proposalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F5] via-[#FFF9F9] to-[#FFF0F3] text-stone-800 relative selection:bg-rose-200 selection:text-rose-900 pb-16">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Ambient pastel glow orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[28rem] h-[28rem] bg-pink-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-10 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FFF5F5]/85 backdrop-blur-md border-b border-rose-100/80">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <span className="font-serif-romantic font-bold text-stone-800 text-sm sm:text-base">
              Наше свидание
            </span>
            <span className="text-[11px] text-rose-400 font-medium hidden sm:inline">
              · 2 года вместе
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-3 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={scrollToProposal}
              className="px-3 py-1.5 rounded-full hover:bg-rose-100/70 text-rose-700 transition-colors"
            >
              Приглашение 💌
            </button>
            <a
              href="#blackrooms"
              className="px-3 py-1.5 rounded-full hover:bg-rose-100/70 text-stone-700 transition-colors hidden sm:inline-block"
            >
              Black Rooms
            </a>
            <a
              href="#calendar"
              className="px-3 py-1.5 rounded-full hover:bg-rose-100/70 text-stone-700 transition-colors"
            >
              Выбор даты
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 space-y-16 sm:space-y-24 pt-8 sm:pt-14">
        {/* HERO SECTION */}
        <section className="text-center px-4 max-w-3xl mx-auto">
          {/* Subtle anniversary badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-200/80 px-4 py-1.5 rounded-full text-xs font-semibold text-rose-600 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>28.09.2024 — Сегодня</span>
            <span aria-hidden="true">·</span>
            <span>Пошёл 3-й год!</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-romantic font-bold text-stone-900 tracking-tight leading-[1.15] mb-4">
            С праздником, <br />
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent italic font-serif">
              мой любимый!
            </span>
          </h1>

          {/* Subtitle / Tender text */}
          <p className="text-stone-600 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed mb-6 font-normal">
            Уже пошёл <strong className="font-semibold text-rose-600">3-й год</strong>, как мы с тобой общаемся. 
            Ровно <strong className="font-semibold text-rose-600">2 года</strong> с того самого момента, как наши миры соприкоснулись. 
            И в честь этого я приготовила для тебя кое-что особенное.
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={scrollToProposal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 font-medium text-xs sm:text-sm border border-rose-200 transition-all cursor-pointer group"
            >
              <span>Открыть приглашение</span>
              <ArrowDown className="w-4 h-4 text-rose-500 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </section>

        {/* TIMER SECTION */}
        <section id="timer" className="scroll-mt-20">
          <LoveTimer />
        </section>

        {/* PROPOSAL CARD SECTION (with evasive No button) */}
        <section ref={proposalRef} id="proposal" className="scroll-mt-24">
          <DateProposal
            isAccepted={isAccepted}
            onAccept={handleProposalAccept}
          />
        </section>

        {/* VENUE SECTION: Black Rooms on пр-кт Николая Корыткова, 28б */}
        <section id="blackrooms" className="scroll-mt-20">
          <BlackRoomsCard />
        </section>

        {/* DATE CALENDAR PICKER SECTION */}
        <section ref={calendarRef} id="calendar" className="scroll-mt-20 px-4">
          <DateCalendarPicker
            selectedDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
          />
        </section>

        {/* TICKET / CONFIRMATION SECTION */}
        {selectedDate && (
          <section id="ticket" className="scroll-mt-20">
            <TicketSummary selectedDate={selectedDate} />
          </section>
        )}

        {/* ROMANTIC MEMORIES & NOTES */}
        <section id="notes" className="scroll-mt-20">
          <LoveNotes />
        </section>

        {/* FINAL ROMANTIC ACCENT */}
        <section className="text-center px-4 max-w-xl mx-auto pt-6">
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-rose-100">
            <Heart className="w-8 h-8 text-rose-400 fill-rose-300 mx-auto mb-3 animate-pulse" />
            <h4 className="text-lg font-serif-romantic font-semibold text-stone-800 mb-1">
              Ты — лучшее, что случилось со мной
            </h4>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Очень жду наше свидание в Black Rooms. Спасибо за каждую секунду нашего общения, за тепло и улыбки. 
              Люблю тебя! ❤️
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-rose-100/80 pt-8 pb-10 text-center text-xs text-stone-400 px-4">
        <p className="flex items-center justify-center gap-1 mb-1">
          <span>Сделано с любовью для любимого</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>
        <p className="text-stone-400/80 text-[11px]">
          28 сентября 2024 → 2026+ · Black Rooms, пр-кт Николая Корыткова, 28б
        </p>
      </footer>
    </div>
  );
}
