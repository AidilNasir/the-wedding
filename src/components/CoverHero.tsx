import React from 'react';
import { MailOpen, ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface CoverHeroProps {
  isOpen: boolean;
  onOpen: () => void;
  guestName: string;
}

export const CoverHero: React.FC<CoverHeroProps> = ({ isOpen, onOpen, guestName }) => {
  return (
    <header
      id="coverHero"
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out bg-[#0a0a0c] ${
        isOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Background Image with Ambient Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_DATA.images.heroCover}
          alt="Wedding Couple"
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] scale-105 transition-transform duration-[10000ms] hover:scale-110"
        />
        <div className="absolute inset-0 vignette-overlay opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/85 via-transparent to-[#0a0a0c]/45"></div>
      </div>

      {/* Content Center */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
        {/* Decorative Top Ornament */}
        <div className="flex items-center gap-3 text-[#e6ca65]/80 mb-3 tracking-[0.25em] text-xs uppercase font-medium">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#e6ca65]/60"></span>
          <span className="font-cormorant tracking-[0.3em] text-sm">The Wedding of</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#e6ca65]/60"></span>
        </div>

        {/* Main Couple Name */}
        <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-[#f9f8f5] mb-4 drop-shadow-2xl">
          {WEDDING_DATA.couple.groom.nickname}{' '}
          <span className="font-cursive text-[#e6ca65] text-5xl md:text-7xl mx-1">&amp;</span>{' '}
          {WEDDING_DATA.couple.bride.nickname}
        </h1>

        {/* Date */}
        <p className="font-sans text-xs md:text-sm tracking-[0.35em] text-[#d5d3ce]/90 uppercase mb-8">
          {WEDDING_DATA.dates.heroDisplay}
        </p>

        {/* Guest Salutation */}
        <div className="mb-10 px-6 py-4 rounded-xl glass-card-subtle border border-white/10 text-center max-w-sm w-full shadow-2xl">
          <p className="text-[11px] tracking-widest text-[#d5d3ce]/70 uppercase mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>
          <p className="text-base md:text-lg font-serif-luxury text-[#f3e5ab] font-medium tracking-wide">
            {guestName || 'Nama Tamu Undangan'}
          </p>
          <p className="text-[10px] text-[#d5d3ce]/50 mt-1 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Invitation CTA Button */}
        <button
          onClick={onOpen}
          className="btn-pulse group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:brightness-110 active:scale-95 shadow-xl cursor-pointer"
        >
          <MailOpen className="w-5 h-5 text-[#0a0a0c] transition-transform group-hover:-translate-y-0.5" />
          <span>Buka Undangan</span>
        </button>

        {/* Scroll Indicator Hint */}
        <div className="mt-8 text-[#d5d3ce]/40 text-[11px] tracking-widest flex flex-col items-center gap-2">
          <span>KLIK UNTUK MEMBUKA</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#e6ca65]/60" />
        </div>
      </div>
    </header>
  );
};
