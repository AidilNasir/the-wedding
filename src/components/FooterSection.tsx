import React from 'react';
import { ArrowUp } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-28 px-6 text-center border-t border-[#252530]/40 bg-[#121216] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_DATA.images.heroCover}
          alt="Footer Background"
          className="w-full h-full object-cover opacity-15 filter blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <span className="font-cursive text-[#e6ca65] text-6xl md:text-7xl mb-4">
          Terima Kasih
        </span>

        <p className="text-xs md:text-sm text-[#d5d3ce]/80 leading-relaxed font-light mb-8 max-w-lg">
          Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi lembaran baru kehidupan kami.
        </p>

        <div className="w-12 h-px bg-[#d4af37]/40 mb-6"></div>

        <p className="text-[11px] uppercase tracking-[0.3em] text-[#d5d3ce]/60 mb-2">
          Kami yang berbahagia,
        </p>
        <h3 className="font-cormorant text-3xl md:text-4xl text-[#f9f8f5] font-light tracking-wide">
          Aidil <span className="font-cursive text-[#e6ca65] text-3xl">&amp;</span> Talitha
        </h3>
        <p className="text-xs text-[#d5d3ce]/50 mt-1">Beserta Seluruh Keluarga Besar</p>

        <button
          onClick={scrollToTop}
          className="mt-10 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#252530] text-[11px] tracking-widest uppercase text-[#d5d3ce]/70 hover:text-[#f3e5ab] hover:border-[#d4af37]/40 transition-all cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Kembali ke Atas</span>
        </button>

        <p className="text-[10px] tracking-widest text-[#d5d3ce]/40 uppercase mt-12">
          © 2026 The Wedding of Aidil &amp; Talitha • Designed with Elegance
        </p>
      </div>
    </footer>
  );
};
