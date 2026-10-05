import React from 'react';
import { Instagram } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  const { bride, groom } = WEDDING_DATA.couple;

  return (
    <section id="profileSection" className="py-24 px-6 max-w-6xl mx-auto relative">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium">
          Pasangan Pengantin
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          The Bride &amp; The Groom
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4"></div>
        <p className="text-sm text-[#d5d3ce]/70 max-w-lg mx-auto mt-3">
          Dengan penuh rasa syukur ke hadirat Allah SWT, kami mengundang Anda untuk merayakan ikatan suci kami:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* THE BRIDE */}
        <article className="glass-card rounded-3xl p-8 lg:p-10 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#d4af37]/50 transition-all duration-500 shadow-2xl">
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Portrait Frame */}
          <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/30 mb-8 p-1.5 bg-[#121216]">
            <img
              src={bride.image}
              alt={bride.fullName}
              className="w-full h-full object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          <span className="font-cursive text-[#e6ca65] text-3xl mb-1">The Bride</span>
          <h3 className="font-cormorant text-2xl md:text-3xl text-[#f9f8f5] font-medium tracking-wide mb-2">
            {bride.fullName}
          </h3>
          <p className="text-xs tracking-wider text-[#d5d3ce]/70 uppercase mb-4">
            {bride.title}
          </p>

          <div className="border-t border-b border-[#252530] py-3 my-2 w-full max-w-xs">
            <p className="text-xs text-[#d5d3ce]/80 leading-relaxed">
              Putri tercinta dari:<br />
              <strong className="text-[#f9f8f5] font-medium">{bride.father}</strong><br />
              &amp; <strong className="text-[#f9f8f5] font-medium">{bride.mother}</strong>
            </p>
          </div>

          {/* Instagram Button */}
          <a
            href={bride.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/30 text-xs tracking-widest uppercase text-[#f3e5ab] hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all"
          >
            <Instagram className="w-4 h-4 text-[#e6ca65]" />
            <span>@{bride.instagram}</span>
          </a>
        </article>

        {/* THE GROOM */}
        <article className="glass-card rounded-3xl p-8 lg:p-10 flex flex-col items-center text-center relative overflow-hidden group hover:border-[#d4af37]/50 transition-all duration-500 shadow-2xl">
          <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Portrait Frame */}
          <div className="relative w-56 h-72 md:w-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/30 mb-8 p-1.5 bg-[#121216]">
            <img
              src={groom.image}
              alt={groom.fullName}
              className="w-full h-full object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          <span className="font-cursive text-[#e6ca65] text-3xl mb-1">The Groom</span>
          <h3 className="font-cormorant text-2xl md:text-3xl text-[#f9f8f5] font-medium tracking-wide mb-2">
            {groom.fullName}
          </h3>
          <p className="text-xs tracking-wider text-[#d5d3ce]/70 uppercase mb-4">
            {groom.title}
          </p>

          <div className="border-t border-b border-[#252530] py-3 my-2 w-full max-w-xs">
            <p className="text-xs text-[#d5d3ce]/80 leading-relaxed">
              Putra terkasih dari:<br />
              <strong className="text-[#f9f8f5] font-medium">{groom.father}</strong><br />
              &amp; <strong className="text-[#f9f8f5] font-medium">{groom.mother}</strong>
            </p>
          </div>

          {/* Instagram Button */}
          <a
            href={groom.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#d4af37]/30 text-xs tracking-widest uppercase text-[#f3e5ab] hover:bg-[#d4af37]/15 hover:border-[#e6ca65] transition-all"
          >
            <Instagram className="w-4 h-4 text-[#e6ca65]" />
            <span>@{groom.instagram}</span>
          </a>
        </article>
      </div>
    </section>
  );
};
