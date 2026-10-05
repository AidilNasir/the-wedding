import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { GalleryPhoto } from '../types/wedding';

export const GallerySection: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Touch swipe support untuk modal lightbox di mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const photos = WEDDING_DATA.gallery;

  // Lightbox navigation
  const handleLightboxNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

  const handleLightboxPrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + photos.length) % photos.length
      );
    }
  }, [activePhotoIndex, photos.length]);

  // Touch Swipe Handlers for Mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 45;
    const isRightSwipe = distance < -45;

    if (isLeftSwipe) {
      handleLightboxNext();
    } else if (isRightSwipe) {
      handleLightboxPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleLightboxNext();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
    },
    [activePhotoIndex, handleLightboxNext, handleLightboxPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const currentPhoto: GalleryPhoto | null =
    activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  // Membagi array foto ke dalam kluster pola 5-foto ritmik:
  // Row 1: 1 Foto Full Width
  // Row 2: 2 Foto Berdampingan Asimetris (Kiri ~38%, Kanan ~62%)
  // Row 3: 2 Foto Berdampingan Asimetris Terbalik (Kiri ~62%, Kanan ~38%)
  const clusters: GalleryPhoto[][] = [];
  for (let i = 0; i < photos.length; i += 5) {
    clusters.push(photos.slice(i, i + 5));
  }

  const getGlobalIndex = (photoId: number) => {
    return photos.findIndex((p) => p.id === photoId);
  };

  return (
    <section id="gallerySection" className="py-20 px-3 sm:px-6 max-w-5xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
          Momen Terindah Kami
          <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          Prewedding Gallery
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4"></div>
        <p className="text-xs md:text-sm text-[#d5d3ce]/80 max-w-md mx-auto mt-3 font-light leading-relaxed">
          Untaian potret sinematik perjalanan kasih kedua mempelai
        </p>
      </div>

      {/* ========================================================================= */}
      {/* FRAME KOLASE BERSIH TANPA TEKS (Murni Foto Seperti Contoh Referensi)       */}
      {/* ========================================================================= */}
      <div className="relative p-2.5 sm:p-5 md:p-6 rounded-3xl bg-gradient-to-b from-[#1b221a]/85 via-[#121614]/80 to-[#0e120f]/85 backdrop-blur-xl border border-[#7d9171]/40 shadow-2xl">
        {/* Kontainer Pola Ritmik Kolase */}
        <div className="space-y-2.5 sm:space-y-3.5">
          {clusters.map((cluster, cIdx) => {
            const [p1, p2, p3, p4, p5] = cluster;

            return (
              <div key={cIdx} className="space-y-2.5 sm:space-y-3.5">
                {/* 1. Baris Pertama: 1 Foto Full Width (Lanskap Penuh) */}
                {p1 && (
                  <div
                    onClick={() => setActivePhotoIndex(getGlobalIndex(p1.id))}
                    className="relative w-full h-56 sm:h-72 md:h-84 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/70 group cursor-pointer shadow-lg transition-all duration-500 hover:shadow-2xl"
                  >
                    <img
                      src={p1.src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                )}

                {/* 2. Baris Kedua: 2 Foto Terbagi (Kiri ~38%, Kanan ~62%) */}
                {(p2 || p3) && (
                  <div className="flex gap-2.5 sm:gap-3.5 h-48 sm:h-60 md:h-72">
                    {/* Foto Kiri (38%) */}
                    {p2 && (
                      <div
                        onClick={() => setActivePhotoIndex(getGlobalIndex(p2.id))}
                        className={`${
                          p3 ? 'w-[38%]' : 'w-full'
                        } h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/70 group cursor-pointer shadow-lg transition-all duration-500`}
                      >
                        <img
                          src={p2.src}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}

                    {/* Foto Kanan (62%) */}
                    {p3 && (
                      <div
                        onClick={() => setActivePhotoIndex(getGlobalIndex(p3.id))}
                        className={`${
                          p2 ? 'w-[62%]' : 'w-full'
                        } h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/70 group cursor-pointer shadow-lg transition-all duration-500`}
                      >
                        <img
                          src={p3.src}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Baris Ketiga: 2 Foto Terbagi Terbalik (Kiri ~62%, Kanan ~38%) */}
                {(p4 || p5) && (
                  <div className="flex gap-2.5 sm:gap-3.5 h-48 sm:h-60 md:h-72">
                    {/* Foto Kiri (62%) */}
                    {p4 && (
                      <div
                        onClick={() => setActivePhotoIndex(getGlobalIndex(p4.id))}
                        className={`${
                          p5 ? 'w-[62%]' : 'w-full'
                        } h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/70 group cursor-pointer shadow-lg transition-all duration-500`}
                      >
                        <img
                          src={p4.src}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}

                    {/* Foto Kanan (38%) */}
                    {p5 && (
                      <div
                        onClick={() => setActivePhotoIndex(getGlobalIndex(p5.id))}
                        className={`${
                          p4 ? 'w-[38%]' : 'w-full'
                        } h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[#d4af37]/70 group cursor-pointer shadow-lg transition-all duration-500`}
                      >
                        <img
                          src={p5.src}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL LIGHTBOX FULLSCREEN ZOOM                                            */}
      {/* ========================================================================= */}
      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full glass-card text-[#f3e5ab] flex items-center justify-center hover:text-white hover:border-[#e6ca65] transition-all z-30 cursor-pointer shadow-2xl"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handleLightboxPrev}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full glass-card text-[#f3e5ab] hover:text-white hover:border-[#e6ca65] flex items-center justify-center transition-all z-30 cursor-pointer shadow-2xl"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleLightboxNext}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full glass-card text-[#f3e5ab] hover:text-white hover:border-[#e6ca65] flex items-center justify-center transition-all z-30 cursor-pointer shadow-2xl"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content - Bersih & Fokus Pada Foto */}
          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center select-none w-full animate-in fade-in zoom-in-95 duration-300">
            <div className="relative max-h-[75vh] flex items-center justify-center">
              <img
                src={currentPhoto.src}
                alt=""
                className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-[#d4af37]/35"
              />
            </div>

            {/* Quick Strip Thumbnails in Lightbox */}
            <div className="flex gap-2 overflow-x-auto max-w-full py-2 px-3 mt-4 no-scrollbar">
              {photos.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 transition-all border cursor-pointer ${
                    idx === activePhotoIndex
                      ? 'border-[#e6ca65] opacity-100 ring-2 ring-[#d4af37]/60 scale-105'
                      : 'border-white/10 opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
