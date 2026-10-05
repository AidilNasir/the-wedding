import React, { useState, useEffect } from 'react';
import { Send, Heart, ChevronLeft, ChevronRight, MessageSquareQuote, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WishItem } from '../types/wedding';
import { WEDDING_DATA } from '../data/weddingData';

export const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem('aidil_talitha_wishes');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return WEDDING_DATA.initialWishes;
  });

  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [attendanceTag, setAttendanceTag] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [currentPage, setCurrentPage] = useState(1);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  const wishesPerPage = 3;

  useEffect(() => {
    try {
      localStorage.setItem('aidil_talitha_wishes', JSON.stringify(wishes));
    } catch {
      // Ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#d4af37', '#f3e5ab', '#ff6b81'],
      });
    } catch {
      // Ignore
    }

    const newWish: WishItem = {
      id: 'w-' + Date.now(),
      name: name.trim(),
      msg: msg.trim(),
      time: 'Baru saja',
      likes: 1,
      attended: attendanceTag,
    };

    setWishes([newWish, ...wishes]);
    setName('');
    setMsg('');
    setCurrentPage(1);
  };

  const toggleLike = (id: string) => {
    const isAlreadyLiked = likedIds[id];
    setLikedIds((prev) => ({ ...prev, [id]: !isAlreadyLiked }));

    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            likes: isAlreadyLiked ? Math.max(0, w.likes - 1) : w.likes + 1,
          };
        }
        return w;
      })
    );
  };

  const totalPages = Math.ceil(wishes.length / wishesPerPage) || 1;
  const startIndex = (currentPage - 1) * wishesPerPage;
  const currentWishes = wishes.slice(startIndex, startIndex + wishesPerPage);

  return (
    <section id="wishesSection" className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium">
          Untaian Doa &amp; Restu
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          Wedding Wish &amp; Prayer
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4"></div>
      </div>

      {/* Wish Form */}
      <div className="glass-card rounded-3xl p-8 border border-[#252530] mb-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="wishName" className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-2">
              Nama Anda
            </label>
            <input
              type="text"
              id="wishName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tuliskan nama Anda..."
              className="w-full px-4 py-3 rounded-xl bg-[#121216]/90 border border-[#252530] text-[#f9f8f5] text-sm focus:outline-none focus:border-[#e6ca65] placeholder:text-[#d5d3ce]/30"
            />
          </div>

          <div>
            <label htmlFor="wishMessage" className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-2">
              Ucapan &amp; Doa Restu
            </label>
            <textarea
              id="wishMessage"
              rows={3}
              required
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa terbaik untuk kedua mempelai..."
              className="w-full px-4 py-3 rounded-xl bg-[#121216]/90 border border-[#252530] text-[#f9f8f5] text-sm focus:outline-none focus:border-[#e6ca65] placeholder:text-[#d5d3ce]/30 resize-none"
            ></textarea>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#d5d3ce]/60 text-[11px] uppercase tracking-wider">Status:</span>
              <button
                type="button"
                onClick={() => setAttendanceTag('hadir')}
                className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                  attendanceTag === 'hadir'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50'
                    : 'bg-[#121216] text-[#d5d3ce]/50 border border-[#252530]'
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendanceTag('tidak')}
                className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                  attendanceTag === 'tidak'
                    ? 'bg-rose-900/60 text-rose-300 border border-rose-500/50'
                    : 'bg-[#121216] text-[#d5d3ce]/50 border border-[#252530]'
                }`}
              >
                Berhalangan
              </button>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] font-semibold text-xs tracking-widest uppercase hover:brightness-110 shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Ucapan</span>
            </button>
          </div>
        </form>
      </div>

      {/* List of Wishes */}
      <div className="glass-card-subtle rounded-3xl p-6 md:p-8 border border-[#252530]/60 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#252530]">
          <span className="text-xs uppercase tracking-widest text-[#f3e5ab] font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>{wishes.length} Ucapan Doa Masuk</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full border border-[#252530] text-[#d5d3ce] flex items-center justify-center hover:border-[#e6ca65] hover:text-[#f3e5ab] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs text-[#d5d3ce]/80 px-2 font-mono">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full border border-[#252530] text-[#d5d3ce] flex items-center justify-center hover:border-[#e6ca65] hover:text-[#f3e5ab] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Wishes Container */}
        <div className="space-y-4">
          {currentWishes.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#121216]/80 border border-[#252530]/60 hover:border-[#d4af37]/25 transition-all shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-serif-luxury text-sm font-medium text-[#f3e5ab]">
                      {item.name}
                    </h5>
                    {item.attended === 'hadir' && (
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                        Hadir
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#d5d3ce]/40 block mt-0.5">{item.time}</span>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all ${
                    likedIds[item.id]
                      ? 'bg-rose-950/60 text-rose-300 border border-rose-500/40'
                      : 'bg-[#18181f] text-[#d5d3ce]/60 hover:text-white border border-[#252530]'
                  }`}
                  title="Sukai Ucapan"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedIds[item.id] ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span className="font-mono text-[11px]">{item.likes}</span>
                </button>
              </div>

              <p className="text-xs text-[#f9f8f5]/90 font-light leading-relaxed">
                {item.msg}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
