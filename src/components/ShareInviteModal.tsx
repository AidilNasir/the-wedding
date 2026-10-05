import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle } from 'lucide-react';

import { WEDDING_DATA } from '../data/weddingData';

interface ShareInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGuest: string;
}

export const ShareInviteModal: React.FC<ShareInviteModalProps> = ({
  isOpen,
  onClose,
  currentGuest,
}) => {
  const [targetName, setTargetName] = useState(currentGuest || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  const customUrl = targetName.trim()
    ? `${baseUrl}?to=${encodeURIComponent(targetName.trim())}`
    : baseUrl;

  const shareText =
    `Kepada Yth. ${targetName.trim() || 'Bapak/Ibu/Saudara/i'},\n\n` +
    `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:\n\n` +
    `${WEDDING_DATA.couple.groom.nickname} & ${WEDDING_DATA.couple.bride.nickname}\n` +
    `📅 ${WEDDING_DATA.dates.heroDisplay}\n\n` +
    `Untuk melihat detail informasi acara dan konfirmasi kehadiran, silakan kunjungi tautan undangan online berikut:\n` +
    `${customUrl}\n\n` +
    `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\n` +
    `Terima kasih.`;

  const copyUrlOnly = () => {
    navigator.clipboard.writeText(customUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const copyFullMessage = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    });
  };

  const shareDirectWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37]/40 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#121216] border border-[#252530] text-[#f3e5ab] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#e6ca65]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cormorant text-2xl text-[#f9f8f5] font-medium">
              Bagikan Undangan
            </h3>
            <p className="text-xs text-[#d5d3ce]/60">Buat tautan personal untuk tamu spesial</p>
          </div>
        </div>

        <div className="space-y-4 my-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
              Nama Tamu yang Dituju
            </label>
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="Contoh: dr. Dimas Pratama & Keluarga"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121216] border border-[#252530] text-[#f9f8f5] text-sm focus:outline-none focus:border-[#e6ca65]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
              Tautan Undangan Khusus
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={customUrl}
                className="flex-1 px-3 py-2 rounded-xl bg-[#18181f] border border-[#252530] text-xs text-[#f3e5ab] font-mono select-all truncate"
              />
              <button
                onClick={copyUrlOnly}
                className="px-3.5 py-2 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3e5ab] text-xs flex items-center gap-1.5 hover:bg-[#d4af37]/30 transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
              Pratinjau Pesan WhatsApp
            </label>
            <div className="p-3.5 rounded-xl bg-[#121216]/90 border border-[#252530] max-h-36 overflow-y-auto text-xs text-[#d5d3ce]/80 whitespace-pre-line font-sans">
              {shareText}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={copyFullMessage}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-semibold uppercase tracking-wider hover:bg-[#d4af37]/15 transition-all cursor-pointer"
          >
            {copiedMessage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedMessage ? 'Pesan Tersalin!' : 'Salin Teks Lengkap'}</span>
          </button>

          <button
            onClick={shareDirectWhatsApp}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-semibold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
