import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';

// Kumpulan foto romantis berkualitas tinggi, jelas dan cerah
const ROMANTIC_BACKGROUNDS = [
  {
    id: 1,
    url: '/images/gallery/photo2.jpg',
    title: 'Momen Bahagia',
  },
  {
    id: 2,
    url: '/images/gallery/photo1.jpg',
    title: 'Harmoni Alam',
  },
  {
    id: 3,
    url: '/images/gallery/photo3.jpg',
    title: 'Buket Kasih',
  },
  {
    id: 4,
    url: WEDDING_DATA.images.heroCover,
    title: 'Janji Abadi',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
    title: 'Genggaman Kasih',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1920&q=80',
    title: 'Senja Abadi',
  },
];

export const AmbientRomanticBackground: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Otomatis ganti gambar setiap 8 detik dengan transisi halus
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROMANTIC_BACKGROUNDS.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Container Gambar Bergerak (Lebih Jelas, Tajam, & Terang) */}
      {ROMANTIC_BACKGROUNDS.map((item, idx) => {
        const isActive = idx === currentIndex;
        const animationClass = idx % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2';

        return (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              isActive ? 'opacity-85 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={item.url}
              alt=""
              className={`w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] saturate-[1.12] ${
                isActive ? animationClass : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Layer Gradient Halus agar foto belakang tetap jelas dan teks di depan tetap mudah dibaca */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/60 via-[#0a0a0c]/45 to-[#0a0a0c]/70 z-20"></div>
      <div className="absolute inset-0 vignette-overlay z-20 opacity-40"></div>

      {/* Radial soft golden warmth in center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent z-20 pointer-events-none"></div>

      {/* Floating Ambient Sparkles/Dust */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-35">
        <div className="ambient-sparkle sparkle-1"></div>
        <div className="ambient-sparkle sparkle-2"></div>
        <div className="ambient-sparkle sparkle-3"></div>
        <div className="ambient-sparkle sparkle-4"></div>
        <div className="ambient-sparkle sparkle-5"></div>
      </div>
    </div>
  );
};
