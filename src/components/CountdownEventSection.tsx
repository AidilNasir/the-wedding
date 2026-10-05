import React, { useState, useEffect } from 'react';
import { CalendarPlus, Calendar, MapPin, Map, CircleDot, Wine, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const CountdownEventSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const target = new Date('2026-10-10T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, '0'),
          hours: String(h).padStart(2, '0'),
          minutes: String(m).padStart(2, '0'),
          seconds: String(s).padStart(2, '0'),
        });
      } else {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Wedding of Aidil and Talitha//ID',
      'BEGIN:VEVENT',
      'SUMMARY:The Wedding of Aidil & Talitha',
      'DESCRIPTION:Pernikahan Aidil & Talitha di Masjid Agung Al-Kautsar & Grand Ballroom',
      'LOCATION:Grand Ballroom Gedung Serbaguna, Senayan, Jakarta',
      'DTSTART:20261010T010000Z',
      'DTEND:20261010T140000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-aidil-talitha.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="eventSection" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Countdown Header & Timer */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium">
          Menghitung Hari Bahagia
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          Wedding Countdown
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4 mb-8"></div>

        {/* Timer Box Components */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto mb-8">
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-[#d4af37]/25 text-center shadow-lg">
            <span className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#f3e5ab] block">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d5d3ce]/70 mt-1 block">
              Hari
            </span>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-[#d4af37]/25 text-center shadow-lg">
            <span className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#f3e5ab] block">
              {timeLeft.hours}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d5d3ce]/70 mt-1 block">
              Jam
            </span>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-[#d4af37]/25 text-center shadow-lg">
            <span className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#f3e5ab] block">
              {timeLeft.minutes}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d5d3ce]/70 mt-1 block">
              Menit
            </span>
          </div>
          <div className="glass-card p-4 sm:p-6 rounded-2xl border border-[#d4af37]/25 text-center shadow-lg">
            <span className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#f3e5ab] block">
              {timeLeft.seconds}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#d5d3ce]/70 mt-1 block">
              Detik
            </span>
          </div>
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Aidil+%26+Talitha&dates=20261010T010000Z/20261010T140000Z&details=Pernikahan+Aidil+%26+Talitha&location=Grand+Ballroom+Senayan+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#d4af37]/40 text-xs tracking-widest uppercase text-[#f3e5ab] hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all shadow-lg"
          >
            <CalendarPlus className="w-4 h-4 text-[#e6ca65]" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#252530] text-xs tracking-widest uppercase text-[#d5d3ce] hover:text-[#f3e5ab] hover:border-[#d4af37]/40 hover:bg-[#121216] transition-all cursor-pointer shadow-lg"
          >
            <Calendar className="w-4 h-4 text-[#e6ca65]" />
            <span>Unduh iCal (.ics)</span>
          </button>
        </div>
      </div>

      {/* EVENT SCHEDULE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
        {/* CARD 1: AKAD NIKAH */}
        <div className="glass-card rounded-3xl p-8 lg:p-10 border border-[#252530]/80 relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-300 shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
                <CircleDot className="w-6 h-6 text-[#e6ca65]" />
              </div>
              <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20 font-medium">
                Sacred Vows
              </span>
            </div>

            <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-medium mb-3">
              Akad Nikah
            </h3>

            <div className="space-y-4 my-6 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#f9f8f5]">Jum'at, 24 November 2025</p>
                  <p className="text-xs text-[#d5d3ce]/70">Waktu: 08.00 - 09.00 WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#f9f8f5]">Masjid Agung Al-Kautsar</p>
                  <p className="text-xs text-[#d5d3ce]/70 leading-relaxed">
                    Jl. Protokol Utama No. 88, Menteng, Jakarta Pusat, DKI Jakarta
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-[#e6ca65]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dress Code: Busana Muslim Formal / Putih &amp; Emas</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Masjid+Agung+Menteng+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121216] border border-[#d4af37]/30 text-[#f3e5ab] text-xs tracking-wider uppercase font-medium hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all shadow-md"
          >
            <Map className="w-4 h-4" />
            <span>Buka Google Maps</span>
          </a>
        </div>

        {/* CARD 2: RESEPSI PERNIKAHAN */}
        <div className="glass-card rounded-3xl p-8 lg:p-10 border border-[#252530]/80 relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-300 shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
                <Wine className="w-6 h-6 text-[#e6ca65]" />
              </div>
              <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20 font-medium">
                Celebration
              </span>
            </div>

            <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-medium mb-3">
              Resepsi Pernikahan
            </h3>

            <div className="space-y-4 my-6 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#f9f8f5]">Sabtu, 25 November 2025</p>
                  <p className="text-xs text-[#d5d3ce]/70">Waktu: 18.00 - 21.00 WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#f9f8f5]">Grand Ballroom Gedung Serbaguna</p>
                  <p className="text-xs text-[#d5d3ce]/70 leading-relaxed">
                    Jl. Jenderal Sudirman Kav. 12, Senayan, Jakarta Selatan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-[#e6ca65]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dress Code: Formal Evening / Black Tie &amp; Emerald Earth Tone</span>
              </div>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Gedung+Serbaguna+Senayan+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121216] border border-[#d4af37]/30 text-[#f3e5ab] text-xs tracking-wider uppercase font-medium hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all shadow-md"
          >
            <Map className="w-4 h-4" />
            <span>Buka Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
};
