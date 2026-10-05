import React, { useState } from 'react';
import { CalendarPlus, Calendar, MapPin, Map, CircleDot, Wine, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const CountdownEventSection: React.FC = () => {
  // Waktu/detik ditampilkan rapi dalam mode standby/sampel (tidak dijalankan/berdetak dulu)
  const [timeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const akadEvent = WEDDING_DATA.events.find((e) => e.id === 'akad') || WEDDING_DATA.events[0];
  const resepsiEvent = WEDDING_DATA.events.find((e) => e.id === 'resepsi') || WEDDING_DATA.events[1];

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Wedding Invitation Demo//ID',
      'BEGIN:VEVENT',
      `SUMMARY:The Wedding of ${WEDDING_DATA.couple.groom.nickname} & ${WEDDING_DATA.couple.bride.nickname}`,
      `DESCRIPTION:Pernikahan ${WEDDING_DATA.couple.groom.nickname} & ${WEDDING_DATA.couple.bride.nickname}`,
      'LOCATION:Nama Gedung / Ballroom Resepsi',
      'DTSTART:20261231T010000Z',
      'DTEND:20261231T140000Z',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-invitation-demo.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="eventSection" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
      {/* Countdown Header & Timer */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium">
          Menghitung Hari Bahagia
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          Wedding Countdown
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4 mb-8"></div>

        {/* Timer Box Components - Ditampilkan Standby / Sampel Portofolio */}
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
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+${encodeURIComponent(WEDDING_DATA.couple.groom.nickname)}+%26+${encodeURIComponent(WEDDING_DATA.couple.bride.nickname)}&details=The+Wedding+Celebration&location=Grand+Ballroom`}
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

      {/* EVENT SCHEDULE CARDS - Menggunakan Data Template Sampel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
        {/* CARD 1: AKAD NIKAH */}
        {akadEvent && (
          <div className="glass-card rounded-3xl p-8 lg:p-10 border border-[#252530]/80 relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-300 shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
                  <CircleDot className="w-6 h-6 text-[#e6ca65]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20 font-medium">
                  {akadEvent.badge}
                </span>
              </div>

              <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-medium mb-3">
                {akadEvent.title}
              </h3>

              <div className="space-y-4 my-6 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f9f8f5]">{akadEvent.date}</p>
                    <p className="text-xs text-[#d5d3ce]/70">Waktu: {akadEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f9f8f5]">{akadEvent.venue}</p>
                    <p className="text-xs text-[#d5d3ce]/70 leading-relaxed">
                      {akadEvent.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-[#e6ca65]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dress Code: {akadEvent.dressCode}</span>
                </div>
              </div>
            </div>

            <a
              href={akadEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121216] border border-[#d4af37]/30 text-[#f3e5ab] text-xs tracking-wider uppercase font-medium hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all shadow-md"
            >
              <Map className="w-4 h-4" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        )}

        {/* CARD 2: RESEPSI PERNIKAHAN */}
        {resepsiEvent && (
          <div className="glass-card rounded-3xl p-8 lg:p-10 border border-[#252530]/80 relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-all duration-300 shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
                  <Wine className="w-6 h-6 text-[#e6ca65]" />
                </div>
                <span className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#f3e5ab] border border-[#d4af37]/20 font-medium">
                  {resepsiEvent.badge}
                </span>
              </div>

              <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-medium mb-3">
                {resepsiEvent.title}
              </h3>

              <div className="space-y-4 my-6 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f9f8f5]">{resepsiEvent.date}</p>
                    <p className="text-xs text-[#d5d3ce]/70">Waktu: {resepsiEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#e6ca65] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#f9f8f5]">{resepsiEvent.venue}</p>
                    <p className="text-xs text-[#d5d3ce]/70 leading-relaxed">
                      {resepsiEvent.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 text-xs text-[#e6ca65]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dress Code: {resepsiEvent.dressCode}</span>
                </div>
              </div>
            </div>

            <a
              href={resepsiEvent.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#121216] border border-[#d4af37]/30 text-[#f3e5ab] text-xs tracking-wider uppercase font-medium hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all shadow-md"
            >
              <Map className="w-4 h-4" />
              <span>Buka Google Maps</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
