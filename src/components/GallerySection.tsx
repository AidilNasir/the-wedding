import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  LayoutGrid,
  Layers,
  Camera,
  Film,
  Play,
  Pause,
} from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { GalleryPhoto } from '../types/wedding';

type GalleryModel = 'carousel' | 'mosaic' | 'polaroid' | 'reels';

export const GallerySection: React.FC = () => {
  // Model tampilan galeri: carousel (slider kartu), mosaic (2-kolom dinamis), polaroid (album vintage), reels (sinema)
  const [currentModel, setCurrentModel] = useState<GalleryModel>('carousel');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Touch swipe support untuk mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const photos = WEDDING_DATA.gallery;

  // Autoplay untuk model Carousel dan Reels
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % photos.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length]);

  const handleNextPhoto = useCallback(() => {
    setCarouselIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const handlePrevPhoto = useCallback(() => {
    setCarouselIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Touch Handlers for swipeable mobile experience
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
      if (activePhotoIndex !== null) {
        setActivePhotoIndex((prev) => (prev! + 1) % photos.length);
      } else {
        handleNextPhoto();
      }
    } else if (isRightSwipe) {
      if (activePhotoIndex !== null) {
        setActivePhotoIndex((prev) => (prev! - 1 + photos.length) % photos.length);
      } else {
        handlePrevPhoto();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lightbox navigation
  const handleLightboxNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

  const handleLightboxPrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

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

  return (
    <section id="gallerySection" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#e6ca65]/90 font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
          Momen Terindah
          <Sparkles className="w-3.5 h-3.5 text-[#e6ca65]" />
        </span>
        <h2 className="font-cormorant text-4xl md:text-5xl text-[#f9f8f5] font-light mt-2">
          Prewedding Gallery
        </h2>
        <div className="w-16 h-px bg-[#d4af37]/40 mx-auto mt-4"></div>
        <p className="text-xs md:text-sm text-[#d5d3ce]/80 max-w-lg mx-auto mt-3 font-light">
          Untaian potret sinematik perjalanan kasih dalam bingkai abadi
        </p>

        {/* Model Switcher Tabs: Pengunjung bisa memilih gaya tampilan galeri sesuai selera */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto p-1.5 rounded-full bg-[#14141a]/80 backdrop-blur-md border border-[#d4af37]/25 shadow-xl">
          <button
            onClick={() => setCurrentModel('carousel')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
              currentModel === 'carousel'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] shadow-lg shadow-[#d4af37]/20 font-semibold'
                : 'text-[#d5d3ce]/70 hover:text-[#f3e5ab] hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Card Deck</span>
          </button>

          <button
            onClick={() => setCurrentModel('mosaic')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
              currentModel === 'mosaic'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] shadow-lg shadow-[#d4af37]/20 font-semibold'
                : 'text-[#d5d3ce]/70 hover:text-[#f3e5ab] hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Mosaic 2-Kolom</span>
          </button>

          <button
            onClick={() => setCurrentModel('polaroid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
              currentModel === 'polaroid'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] shadow-lg shadow-[#d4af37]/20 font-semibold'
                : 'text-[#d5d3ce]/70 hover:text-[#f3e5ab] hover:bg-white/5'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Polaroid</span>
          </button>

          <button
            onClick={() => setCurrentModel('reels')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
              currentModel === 'reels'
                ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] shadow-lg shadow-[#d4af37]/20 font-semibold'
                : 'text-[#d5d3ce]/70 hover:text-[#f3e5ab] hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Reel Story</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODEL 1: SWIPE CARD DECK / CAROUSEL 3D (Solusi Utama Anti Bersusun di Mobile) */}
      {/* ============================================================== */}
      {currentModel === 'carousel' && (
        <div
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card Viewport */}
          <div className="relative h-[390px] sm:h-[460px] md:h-[520px] rounded-3xl overflow-hidden glass-card border border-[#d4af37]/35 shadow-2xl flex items-center justify-center">
            {photos.map((item, idx) => {
              const isActive = idx === carouselIndex;
              const isPrev = (idx === (carouselIndex - 1 + photos.length) % photos.length);
              const isNext = (idx === (carouselIndex + 1) % photos.length);

              if (!isActive && !isPrev && !isNext) return null;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isActive) setActivePhotoIndex(idx);
                    else setCarouselIndex(idx);
                  }}
                  className={`absolute inset-0 transition-all duration-700 ease-out cursor-pointer flex flex-col justify-end p-6 md:p-8 ${
                    isActive
                      ? 'opacity-100 scale-100 z-20 pointer-events-auto'
                      : isPrev
                      ? 'opacity-30 -translate-x-[25%] scale-90 z-10 pointer-events-auto filter blur-[1px]'
                      : 'opacity-30 translate-x-[25%] scale-90 z-10 pointer-events-auto filter blur-[1px]'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/25 to-transparent"></div>

                  {/* Active Card Badge & Title */}
                  {isActive && (
                    <div className="relative z-10 animate-in fade-in duration-500">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/25 border border-[#d4af37]/50 text-[#f3e5ab] text-[11px] uppercase tracking-widest backdrop-blur-md mb-2">
                        {item.caption}
                      </span>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-md">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-[#d5d3ce]/70 text-xs">
                        <span>Ketuk foto untuk memperbesar</span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#e6ca65]" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[#d4af37]/40 text-[#f3e5ab] hover:text-white hover:border-[#e6ca65] flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass-card border border-[#d4af37]/40 text-[#f3e5ab] hover:text-white hover:border-[#e6ca65] flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Autoplay Pause/Play button */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[#f3e5ab] text-xs flex items-center gap-1.5 px-3 hover:bg-black/70 transition-all cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline">
                {isAutoPlaying ? 'Auto' : 'Pause'}
              </span>
            </button>
          </div>

          {/* Indicator Dots & Thumbnail Strip */}
          <div className="flex items-center justify-between mt-5 px-2">
            <div className="flex items-center gap-1.5">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === carouselIndex
                      ? 'w-7 bg-[#d4af37]'
                      : 'w-2 bg-[#252530] hover:bg-[#d4af37]/50'
                  }`}
                  aria-label={`Ke slide ${idx + 1}`}
                />
              ))}
            </div>

            <span className="text-xs text-[#d5d3ce]/60 font-mono tracking-wider">
              {carouselIndex + 1} / {photos.length}
            </span>
          </div>

          {/* Horizontal Mini Thumbnails */}
          <div className="flex gap-2.5 overflow-x-auto py-3 px-1 no-scrollbar mt-3">
            {photos.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCarouselIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border ${
                  idx === carouselIndex
                    ? 'border-[#e6ca65] scale-105 shadow-md shadow-[#d4af37]/30 ring-2 ring-[#d4af37]/30'
                    : 'border-[#252530] opacity-50 hover:opacity-100'
                }`}
              >
                <img src={item.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODEL 2: MOSAIC 2-KOLOM (Staggered Pinterest Layout, BUKAN 1 Kolom Vertikal) */}
      {/* ============================================================== */}
      {currentModel === 'mosaic' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          {photos.map((item, idx) => {
            // Memberikan variasi tinggi foto agar tampil dinamis seperti editorial majalah
            const isTall = idx % 3 === 0 || idx === 1;
            const aspectClass = isTall
              ? 'aspect-[3/4.2]'
              : idx % 2 === 0
              ? 'aspect-square'
              : 'aspect-[4/3.2]';

            return (
              <div
                key={item.id}
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative ${aspectClass} rounded-2xl sm:rounded-3xl overflow-hidden glass-card border border-[#252530] hover:border-[#d4af37]/60 group cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-1`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity"></div>

                {/* Corner Expand icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-[#f3e5ab] opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Caption at bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] text-[#f3e5ab] uppercase tracking-wider font-light line-clamp-1">
                    {item.caption}
                  </span>
                  <h4 className="text-xs sm:text-sm text-white font-serif-luxury font-medium line-clamp-1">
                    {item.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODEL 3: VINTAGE POLAROID COLLAGE (Nuansa Album Romantis & Sentuhan Tulisan Tangan) */}
      {/* ============================================================== */}
      {currentModel === 'polaroid' && (
        <div>
          {/* Petunjuk swipe di mobile */}
          <div className="text-center text-[11px] text-[#d5d3ce]/60 mb-3 flex items-center justify-center gap-1.5 md:hidden">
            <span>Geser ke samping untuk melihat album polaroid</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#e6ca65]" />
          </div>

          <div className="flex md:grid md:grid-cols-4 gap-5 overflow-x-auto pb-6 pt-3 px-2 snap-x no-scrollbar">
            {photos.map((item, idx) => {
              // Rotasi sudut acak artistik untuk efek polaroid asli
              const rotations = ['rotate-[-2deg]', 'rotate-[2.5deg]', 'rotate-[-1.5deg]', 'rotate-[2deg]'];
              const rotClass = rotations[idx % rotations.length];

              return (
                <div
                  key={item.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`flex-shrink-0 w-64 md:w-auto snap-center bg-[#17161d] p-3 pb-5 rounded-xl border border-[#d4af37]/35 shadow-2xl hover:border-[#e6ca65] hover:scale-105 transition-all duration-300 cursor-pointer ${rotClass} group relative`}
                >
                  {/* Tape pita dekorasi di atas polaroid */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#d4af37]/35 border border-[#d4af37]/50 rounded-sm backdrop-blur-sm transform rotate-[-3deg] z-10"></div>

                  {/* Foto Polaroid */}
                  <div className="aspect-[4/4.5] overflow-hidden rounded-lg bg-black mb-3">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Tulisan Tangan Khas Album Kenangan */}
                  <div className="text-center px-1">
                    <p className="font-cursive text-xl text-[#f3e5ab] leading-tight">
                      {item.caption}
                    </p>
                    <p className="font-serif-luxury text-[11px] text-[#d5d3ce]/70 uppercase tracking-widest mt-1">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODEL 4: CINEMA REEL / STORY HIGHLIGHT (Instagram/WhatsApp Stories Feel) */}
      {/* ============================================================== */}
      {currentModel === 'reels' && (
        <div
          className="relative max-w-md mx-auto aspect-[9/16] max-h-[620px] rounded-3xl overflow-hidden glass-card border border-[#d4af37]/40 shadow-2xl select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress Bars at top */}
          <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
            {photos.map((_, idx) => (
              <div
                key={idx}
                className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
              >
                <div
                  className={`h-full bg-[#f3e5ab] transition-all duration-300 ${
                    idx < carouselIndex
                      ? 'w-full'
                      : idx === carouselIndex
                      ? 'w-full animate-pulse'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Active Story Image */}
          <div className="relative w-full h-full">
            <img
              src={photos[carouselIndex].src}
              alt=""
              className="w-full h-full object-cover animate-kenburns-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>

            {/* Click left/right zone to flip story */}
            <div
              onClick={handlePrevPhoto}
              className="absolute left-0 top-12 bottom-20 w-1/2 z-20 cursor-pointer"
              title="Foto Sebelumnya"
            />
            <div
              onClick={handleNextPhoto}
              className="absolute right-0 top-12 bottom-20 w-1/2 z-20 cursor-pointer"
              title="Foto Selanjutnya"
            />

            {/* Story Content Overlay at Bottom */}
            <div className="absolute bottom-6 inset-x-6 z-20 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#d4af37]/30 border border-[#d4af37]/50 text-[#f3e5ab] text-[10px] tracking-widest uppercase backdrop-blur-md mb-2">
                {photos[carouselIndex].caption}
              </span>
              <h3 className="font-cormorant text-2xl text-white font-medium drop-shadow-lg">
                {photos[carouselIndex].title}
              </h3>
              <p className="text-xs text-[#d5d3ce]/80 font-light mt-1">
                Ketuk sisi kanan/kiri untuk berganti cerita
              </p>

              <button
                onClick={() => setActivePhotoIndex(carouselIndex)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#f3e5ab] hover:underline"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Buka Layar Penuh</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL LIGHTBOX FULLSCREEN ZOOM UNTUK SEMUA MODEL */}
      {/* ============================================================== */}
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
            className="absolute top-5 right-5 w-12 h-12 rounded-full glass-card text-[#f3e5ab] flex items-center justify-center text-2xl hover:text-white transition-colors z-30 cursor-pointer"
            aria-label="Tutup Galeri"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handleLightboxPrev}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card text-[#f3e5ab] hover:text-white flex items-center justify-center transition-colors z-30 cursor-pointer"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleLightboxNext}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card text-[#f3e5ab] hover:text-white flex items-center justify-center transition-colors z-30 cursor-pointer"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl max-h-[90vh] flex flex-col items-center select-none w-full">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="max-h-[72vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-[#d4af37]/30"
            />
            <div className="text-center mt-4">
              <p className="text-sm md:text-base text-[#f3e5ab] tracking-widest uppercase font-serif-luxury font-medium">
                {currentPhoto.title}
              </p>
              <p className="text-xs text-[#d5d3ce]/70 uppercase tracking-widest mt-1">
                {currentPhoto.caption} • Foto {activePhotoIndex! + 1} dari {photos.length}
              </p>
            </div>

            {/* Quick Strip Thumbnails in Lightbox */}
            <div className="flex gap-2 overflow-x-auto max-w-full py-2 px-2 mt-2 no-scrollbar">
              {photos.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-opacity border ${
                    idx === activePhotoIndex
                      ? 'border-[#e6ca65] opacity-100 ring-2 ring-[#d4af37]/50'
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
