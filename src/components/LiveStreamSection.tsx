import React, { useState } from 'react';
import { Radio, Play, Video, X } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const LiveStreamSection: React.FC = () => {
  const [isPlayingEmbed, setIsPlayingEmbed] = useState(false);

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-[#d4af37]/30 text-center relative overflow-hidden shadow-2xl">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
          <Radio className="w-7 h-7 text-[#e6ca65]" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#e6ca65] font-medium">
          Bagi Tamu yang Berhalangan Hadir
        </span>
        <h2 className="font-cormorant text-3xl md:text-4xl text-[#f9f8f5] font-light mt-1 mb-3">
          Live Streaming
        </h2>
        <p className="text-xs md:text-sm text-[#d5d3ce]/70 max-w-lg mx-auto mb-8 font-light">
          Kami memfasilitasi siaran langsung prosesi Akad Nikah secara daring agar keluarga dan sahabat tetap dapat menyaksikan momen bahagia kami.
        </p>

        {/* Video Player Placeholder with Cinematic Aspect Ratio */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#121216] border border-[#252530] mb-8 group shadow-2xl">
          {isPlayingEmbed ? (
            <div className="relative w-full h-full bg-black flex flex-col items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Wedding Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                onClick={() => setIsPlayingEmbed(false)}
                className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors z-20"
                title="Tutup Video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <img
                src={WEDDING_DATA.images.streamThumb}
                alt="Live Stream Thumbnail"
                className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/60"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <button
                  onClick={() => setIsPlayingEmbed(true)}
                  className="w-16 h-16 rounded-full bg-[#d4af37]/85 text-[#0a0a0c] flex items-center justify-center text-2xl shadow-2xl mb-3 cursor-pointer group-hover:scale-110 transition-transform active:scale-95"
                  title="Mulai Live Stream"
                >
                  <Play className="w-6 h-6 fill-[#0a0a0c] ml-1" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-[11px] text-red-200 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>Siaran Langsung YouTube</span>
                </div>
              </div>
            </>
          )}
        </div>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8c2c] text-[#0a0a0c] font-semibold text-xs tracking-widest uppercase hover:brightness-110 shadow-lg transition-all active:scale-95"
        >
          <Video className="w-4 h-4" />
          <span>Klik di sini (Tonton di YouTube)</span>
        </a>
      </div>
    </section>
  );
};
