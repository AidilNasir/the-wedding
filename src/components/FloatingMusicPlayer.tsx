import React from 'react';
import { Disc3, Music } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  return (
    <aside aria-label="Music Control" className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onTogglePlay}
        className={`relative w-12 h-12 rounded-full glass-card border flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 group ${
          isPlaying
            ? 'border-[#e6ca65] shadow-[#d4af37]/30 ring-2 ring-[#d4af37]/30'
            : 'border-[#d4af37]/30 opacity-70 hover:opacity-100 hover:border-[#d4af37]'
        }`}
        title={isPlaying ? `Jeda Musik (${WEDDING_DATA.music.title})` : `Putar Musik (${WEDDING_DATA.music.title})`}
      >
        {/* Animated spin on disc/note icon when playing */}
        <div
          className={`flex items-center justify-center transition-transform ${
            isPlaying ? 'spin-slow text-[#f3e5ab]' : 'text-[#d5d3ce]/60'
          }`}
        >
          {isPlaying ? (
            <Disc3 className="w-6 h-6 text-[#e6ca65]" />
          ) : (
            <Music className="w-5 h-5 text-[#d5d3ce]/50" />
          )}
        </div>

        {/* Small subtle indicator badge */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0c] transition-colors ${
            isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'
          }`}
        />
      </button>
    </aside>
  );
};
