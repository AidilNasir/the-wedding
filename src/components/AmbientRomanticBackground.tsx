import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

// Kumpulan foto romantis bernuansa belaian lembut, keintiman hangat, dan sentuhan kasih
const ROMANTIC_BACKGROUNDS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    title: 'Genggaman Kasih',
    subtitle: 'Sentuhan jemari dalam ikatan janji abadi',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80',
    title: 'Dekapan Hangat',
    subtitle: 'Kehangatan pelukan di bawah cahaya senja',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1920&q=80',
    title: 'Tatapan Teduh',
    subtitle: 'Dua tatap yang saling menenangkan jiwa',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1920&q=80',
    title: 'Belaian Lembut',
    subtitle: 'Kasih yang membelai setiap hembusan waktu',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1920&q=80',
    title: 'Langkah Beriringan',
    subtitle: 'Berjalan berdampingan menuju mahligai surga',
  },
  {
    id: 6,
    url: WEDDING_DATA.images.heroCover,
    title: 'Aidil & Talitha',
    subtitle: 'Cinta yang mekar dalam doa dan restu',
  },
];

export const AmbientRomanticBackground: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Otomatis ganti gambar setiap 7.5 detik dengan transisi membelai yang halus
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % ROMANTIC_BACKGROUNDS.length);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 7500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Container Gambar Bergerak (Ken-Burns Animated Slides) */}
      {ROMANTIC_BACKGROUNDS.map((item, idx) => {
        const isActive = idx === currentIndex;
        // Berikan variasi animasi per gambar (zoom in lembut atau pan lembut)
        const animationClass = idx % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2';

        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-[2200ms] ease-in-out ${
              isActive ? 'opacity-35 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.url}
              alt=""
              className={`w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] saturate-[1.12] ${
                isActive ? animationClass : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Layer Gradient & Vignette Mewah untuk menjaga keterbacaan teks utama */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/85 via-[#0a0a0c]/70 to-[#0a0a0c]/90 z-20"></div>
      <div className="absolute inset-0 vignette-overlay z-20 opacity-80"></div>

      {/* Radial soft golden warmth in center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/8 via-transparent to-transparent z-20 pointer-events-none"></div>

      {/* Floating Ambient Sparkles/Dust (Animasi kelap-kelip partikel cinta) */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-40">
        <div className="ambient-sparkle sparkle-1"></div>
        <div className="ambient-sparkle sparkle-2"></div>
        <div className="ambient-sparkle sparkle-3"></div>
        <div className="ambient-sparkle sparkle-4"></div>
        <div className="ambient-sparkle sparkle-5"></div>
      </div>

      {/* Subtle indicator minimalis di pojok bawah kiri */}
      <div className="absolute bottom-6 left-6 z-30 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0c]/60 backdrop-blur-md border border-[#d4af37]/20 text-[10px] text-[#f3e5ab]/80">
        <Sparkles className="w-3 h-3 text-[#e6ca65] animate-pulse" />
        <span className="font-serif-luxury tracking-wider">
          {ROMANTIC_BACKGROUNDS[currentIndex].title}
        </span>
        <span className="text-[#d5d3ce]/40">•</span>
        <span className="font-mono text-[9px] text-[#d5d3ce]/60">
          {currentIndex + 1}/{ROMANTIC_BACKGROUNDS.length}
        </span>
      </div>
    </div>
  );
};
