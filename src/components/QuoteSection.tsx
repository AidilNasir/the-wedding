import React from 'react';
import { Quote } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const QuoteSection: React.FC = () => {
  return (
    <section id="quoteSection" className="relative py-28 px-6 overflow-hidden">
      {/* Muted Dark Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEDDING_DATA.images.quoteBg}
          alt="Background Quote"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/90 to-[#0a0a0c]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Floating Floral / Laurel Icon */}
        <div className="w-12 h-12 mx-auto mb-6 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] bg-[#121216]/80 shadow-lg">
          <Quote className="w-5 h-5 text-[#e6ca65]" />
        </div>

        <p className="font-cursive text-[#e6ca65] text-3xl md:text-5xl mb-4">
          Bismillahirrahmannirrahiim
        </p>

        <p className="font-cormorant text-xl md:text-2xl text-[#f9f8f5]/90 font-light leading-relaxed mb-6 italic">
          &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
        </p>

        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#d4af37]/40"></span>
          <span className="text-xs tracking-[0.25em] uppercase text-[#e6ca65] font-semibold">
            Q.S. Ar-Rum : 21
          </span>
          <span className="h-px w-10 bg-[#d4af37]/40"></span>
        </div>
      </div>
    </section>
  );
};
