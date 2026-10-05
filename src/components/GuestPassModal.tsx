import React from 'react';
import { X, QrCode, Sparkles, CheckCircle2, Printer } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface GuestPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
}

export const GuestPassModal: React.FC<GuestPassModalProps> = ({
  isOpen,
  onClose,
  guestName,
}) => {
  if (!isOpen) return null;

  const passId = 'AT-' + Math.abs(
    (guestName || 'VIP')
      .split('')
      .reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString().slice(0, 6).padStart(6, '7');

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-sm w-full rounded-3xl p-6 border-2 border-[#d4af37]/50 shadow-2xl relative text-center text-[#f9f8f5]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#121216] border border-[#252530] text-[#f3e5ab] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header ornament */}
        <div className="flex items-center justify-center gap-2 text-[#e6ca65] mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">
            Digital Guest Check-In Pass
          </span>
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="font-cormorant text-2xl tracking-wider text-[#f3e5ab] mt-1">
          Aidil <span className="font-cursive text-[#e6ca65] text-2xl">&amp;</span> Talitha
        </div>

        {/* Ticket Body */}
        <div className="my-6 p-5 rounded-2xl bg-[#121216] border border-[#d4af37]/30 shadow-inner flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-[#d5d3ce]/60 mb-1">
            Undangan Eksklusif
          </span>
          <h4 className="font-serif-luxury text-lg text-[#f3e5ab] font-medium tracking-wide mb-3">
            {guestName || 'Tamu Undangan Istimewa'}
          </h4>

          {/* QR Code Container */}
          <div className="p-3 bg-white rounded-xl shadow-lg mb-3">
            {/* SVG QR Code Simulation */}
            <svg
              className="w-32 h-32 text-black"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner 1 */}
              <rect x="5" y="5" width="25" height="25" fill="#000" />
              <rect x="9" y="9" width="17" height="17" fill="#fff" />
              <rect x="13" y="13" width="9" height="9" fill="#000" />
              {/* Corner 2 */}
              <rect x="70" y="5" width="25" height="25" fill="#000" />
              <rect x="74" y="9" width="17" height="17" fill="#fff" />
              <rect x="78" y="13" width="9" height="9" fill="#000" />
              {/* Corner 3 */}
              <rect x="5" y="70" width="25" height="25" fill="#000" />
              <rect x="9" y="74" width="17" height="17" fill="#fff" />
              <rect x="13" y="78" width="9" height="9" fill="#000" />
              {/* Internal decorative matrix patterns */}
              <rect x="35" y="10" width="10" height="5" />
              <rect x="50" y="15" width="12" height="6" />
              <rect x="38" y="25" width="6" height="12" />
              <rect x="50" y="32" width="15" height="8" />
              <rect x="10" y="40" width="8" height="18" />
              <rect x="25" y="45" width="15" height="6" />
              <rect x="45" y="45" width="10" height="10" />
              <rect x="65" y="45" width="20" height="8" />
              <rect x="35" y="65" width="8" height="18" />
              <rect x="50" y="65" width="15" height="6" />
              <rect x="70" y="65" width="15" height="15" fill="#000" />
              <rect x="80" y="85" width="10" height="10" />
              <rect x="55" y="80" width="8" height="12" />
            </svg>
          </div>

          <div className="font-mono text-xs text-[#e6ca65] tracking-widest uppercase">
            PASS ID: #{passId}
          </div>

          <div className="w-full border-t border-dashed border-[#252530] my-3"></div>

          <div className="text-[11px] text-[#d5d3ce]/70 space-y-1">
            <p><strong>Tanggal:</strong> {WEDDING_DATA.dates.resepsiDisplay}</p>
            <p><strong>Lokasi:</strong> Grand Ballroom Senayan</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 mb-4">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tunjukkan QR ini pada meja penerima tamu</span>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full py-2.5 rounded-xl border border-[#d4af37]/40 text-[#f3e5ab] text-xs uppercase tracking-wider font-medium hover:bg-[#d4af37]/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan Pass</span>
        </button>
      </div>
    </div>
  );
};
