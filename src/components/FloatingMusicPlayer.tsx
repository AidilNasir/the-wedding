import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc3, Music2 } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  audioRef,
}) => {
  const [volume, setVolume] = useState<number>(0.7);
  const [showVolumePopup, setShowVolumePopup] = useState<boolean>(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  return (
    <aside aria-label="Music Control" className="fixed bottom-6 right-6 z-40">
      <div className="relative flex items-center">
        {/* Volume popover */}
        {showVolumePopup && (
          <div className="absolute bottom-16 right-0 p-3 rounded-2xl glass-card border border-gold-500/30 text-xs shadow-2xl flex flex-col items-center gap-2 w-36">
            <span className="text-[10px] uppercase tracking-wider text-gold-300 font-medium">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
            <span className="text-[10px] text-mutedivory/60 font-mono">{Math.round(volume * 100)}%</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <button
            onClick={onTogglePlay}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full glass-card border border-gold-500/40 text-cream shadow-2xl hover:border-gold-400 transition-all group active:scale-95"
            title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          >
            <div
              className={`w-7 h-7 rounded-full bg-gold-500/20 text-[#e6ca65] flex items-center justify-center ${
                isPlaying ? 'spin-slow' : ''
              }`}
            >
              <Disc3 className="w-4 h-4 text-[#e6ca65]" />
            </div>
            <span className="text-xs font-medium tracking-wider uppercase text-[#f3e5ab]/90 group-hover:text-[#f3e5ab] hidden sm:inline">
              Wedding Melody
            </span>
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-[#e6ca65]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#d5d3ce]/50" />
            )}
          </button>

          <button
            onClick={() => setShowVolumePopup(!showVolumePopup)}
            className="p-2.5 rounded-full glass-card border border-gold-500/30 text-[#e6ca65] hover:border-gold-400 transition-all text-xs"
            title="Pengaturan Volume"
          >
            <Music2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
