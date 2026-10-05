import React, { useState } from 'react';
import { Gift, MailCheck, Copy, Check, Send, MapPin, CreditCard, MessageSquare, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WEDDING_DATA } from '../data/weddingData';
import { RsvpRecord } from '../types/wedding';

interface GiftRsvpSectionProps {
  onNewRsvp?: (rsvp: RsvpRecord) => void;
  rsvpCount: number;
}

export const GiftRsvpSection: React.FC<GiftRsvpSectionProps> = ({ onNewRsvp, rsvpCount }) => {
  const [showGiftAccounts, setShowGiftAccounts] = useState(false);
  const [activeGiftTab, setActiveGiftTab] = useState<'bank' | 'address'>('bank');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [pax, setPax] = useState('1');
  const [attend, setAttend] = useState<'Hadir' | 'Tidak Hadir' | 'Masih Ragu'>('Hadir');
  const [notes, setNotes] = useState('');
  const [submittedRsvp, setSubmittedRsvp] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(label);
      setTimeout(() => setCopiedAccount(null), 3000);
    });
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#d4af37', '#f3e5ab', '#ffffff', '#10b981'],
      });
    } catch {
      // Ignore if confetti not supported
    }

    const newRecord: RsvpRecord = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      pax: parseInt(pax),
      status: attend,
      message: notes.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    if (onNewRsvp) {
      onNewRsvp(newRecord);
    }
    setSubmittedRsvp(true);

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `Halo Aidil & Talitha,\n\nSaya ingin konfirmasi kehadiran pada acara pernikahan kalian:\n` +
        `• Nama: ${name.trim()}\n` +
        `• Jumlah Tamu: ${pax} Orang\n` +
        `• Status Kehadiran: ${attend}\n` +
        (notes.trim() ? `• Catatan: ${notes.trim()}\n\n` : `\n`) +
        `Semoga acaranya lancar, penuh berkah, dan bahagia selalu!`
    );

    // Open WhatsApp in new tab
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
  };

  return (
    <section id="giftRsvpSection" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* WEDDING GIFT BOX */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-[#252530] flex flex-col justify-between shadow-2xl">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl mb-6 shadow-inner">
              <Gift className="w-7 h-7 text-[#e6ca65]" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#e6ca65] font-medium">
              Tanda Kasih
            </span>
            <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-light mt-1 mb-4">
              Wedding Gift
            </h3>
            <p className="text-xs md:text-sm text-[#d5d3ce]/70 leading-relaxed font-light mb-6">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih berupa kado digital atau amplop virtual, silakan menekan tombol di bawah ini:
            </p>

            <button
              onClick={() => setShowGiftAccounts(!showGiftAccounts)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#121216] border border-[#d4af37]/40 text-xs tracking-widest uppercase text-[#f3e5ab] hover:bg-[#d4af37]/15 transition-all shadow-md cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-[#e6ca65]" />
              <span>
                {showGiftAccounts
                  ? 'Sembunyikan Nomor Rekening'
                  : 'Klik di sini (Tampilkan Nomor Rekening)'}
              </span>
            </button>
          </div>

          {/* Hidden Bank / E-Wallet Info Accordion */}
          {showGiftAccounts && (
            <div className="mt-8 space-y-4 pt-6 border-t border-[#252530] animate-in fade-in duration-300">
              {/* Tab Selector */}
              <div className="flex gap-2 p-1 bg-[#121216] rounded-xl border border-[#252530] text-xs">
                <button
                  onClick={() => setActiveGiftTab('bank')}
                  className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                    activeGiftTab === 'bank'
                      ? 'bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40'
                      : 'text-[#d5d3ce]/60 hover:text-white'
                  }`}
                >
                  Transfer Bank
                </button>
                <button
                  onClick={() => setActiveGiftTab('address')}
                  className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                    activeGiftTab === 'address'
                      ? 'bg-[#d4af37]/20 text-[#f3e5ab] border border-[#d4af37]/40'
                      : 'text-[#d5d3ce]/60 hover:text-white'
                  }`}
                >
                  Kirim Kado Fisik
                </button>
              </div>

              {activeGiftTab === 'bank' ? (
                <>
                  {WEDDING_DATA.banks.map((acc) => (
                    <div
                      key={acc.accountNumber}
                      className="p-4 rounded-xl bg-[#121216]/90 border border-[#d4af37]/20 flex items-center justify-between shadow-lg"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#d5d3ce]/60">
                          {acc.bank}
                        </span>
                        <p className="font-mono text-base text-[#f3e5ab] font-semibold tracking-wider">
                          {acc.accountNumber}
                        </p>
                        <p className="text-xs text-[#f9f8f5]/80">a.n. {acc.holderName}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(acc.accountNumber, acc.bank)}
                        className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/30 text-xs text-[#f3e5ab] hover:bg-[#d4af37]/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedAccount === acc.bank ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <div className="p-4 rounded-xl bg-[#121216]/90 border border-[#d4af37]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#f3e5ab]">
                    <MapPin className="w-4 h-4 text-[#e6ca65]" />
                    <span>Alamat Pengiriman Kado</span>
                  </div>
                  <p className="text-xs text-[#f9f8f5]/90 leading-relaxed">
                    <strong>Penerima:</strong> {WEDDING_DATA.giftAddress.recipient} ({WEDDING_DATA.giftAddress.phone})
                  </p>
                  <p className="text-xs text-[#d5d3ce]/80 leading-relaxed">
                    {WEDDING_DATA.giftAddress.address}
                  </p>
                  <p className="text-[11px] text-[#e6ca65]/80 italic">
                    *{WEDDING_DATA.giftAddress.notes}
                  </p>
                  <button
                    onClick={() => copyToClipboard(WEDDING_DATA.giftAddress.address, 'Alamat')}
                    className="mt-2 px-3.5 py-1.5 rounded-lg border border-[#d4af37]/30 text-xs text-[#f3e5ab] hover:bg-[#d4af37]/20 flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Alamat Lengkap</span>
                  </button>
                </div>
              )}

              {copiedAccount && (
                <p className="text-center text-xs text-[#e6ca65] pt-2 animate-fade-in font-medium">
                  ✓ Berhasil disalin ke clipboard!
                </p>
              )}
            </div>
          )}
        </div>

        {/* RSVP FORM BOX */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-[#d4af37]/30 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#e6ca65] text-2xl shadow-inner">
                <MailCheck className="w-7 h-7 text-[#e6ca65]" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121216] border border-[#252530] text-[11px] text-[#f3e5ab]">
                <Users className="w-3.5 h-3.5 text-[#e6ca65]" />
                <span>{rsvpCount} Tamu Terdaftar</span>
              </div>
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#e6ca65] font-medium">
              Konfirmasi Kedatangan
            </span>
            <h3 className="font-cormorant text-3xl text-[#f9f8f5] font-light mt-1 mb-4">
              Formulir RSVP
            </h3>

            {submittedRsvp && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Terima kasih! RSVP Anda telah tercatat dan tersambung ke WhatsApp.</span>
              </div>
            )}

            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="rsvpName" className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="rsvpName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Raden Danang & Partner"
                  className="w-full px-4 py-3 rounded-xl bg-[#121216]/80 border border-[#252530] text-[#f9f8f5] text-sm focus:outline-none focus:border-[#e6ca65] placeholder:text-[#d5d3ce]/30"
                />
              </div>

              <div>
                <label htmlFor="rsvpPax" className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
                  Jumlah Tamu (Pax)
                </label>
                <select
                  id="rsvpPax"
                  value={pax}
                  onChange={(e) => setPax(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#121216] border border-[#252530] text-[#f9f8f5] text-sm focus:outline-none focus:border-[#e6ca65]"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                  <option value="5">5 Orang</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-2">
                  Konfirmasi Kehadiran
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#121216]/60 border border-[#252530]/80 cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                    <input
                      type="radio"
                      name="rsvpAttend"
                      value="Hadir"
                      checked={attend === 'Hadir'}
                      onChange={() => setAttend('Hadir')}
                      className="accent-[#d4af37]"
                    />
                    <span className="text-xs text-[#f9f8f5] font-medium">Ya, Saya akan hadir</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#121216]/60 border border-[#252530]/80 cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                    <input
                      type="radio"
                      name="rsvpAttend"
                      value="Masih Ragu"
                      checked={attend === 'Masih Ragu'}
                      onChange={() => setAttend('Masih Ragu')}
                      className="accent-[#d4af37]"
                    />
                    <span className="text-xs text-[#f3e5ab]">Masih Ragu / Menyesuaikan Jadwal</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-[#121216]/60 border border-[#252530]/80 cursor-pointer hover:border-[#d4af37]/40 transition-colors">
                    <input
                      type="radio"
                      name="rsvpAttend"
                      value="Tidak Hadir"
                      checked={attend === 'Tidak Hadir'}
                      onChange={() => setAttend('Tidak Hadir')}
                      className="accent-[#d4af37]"
                    />
                    <span className="text-xs text-[#d5d3ce]/80">Maaf, Saya berhalangan hadir</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="rsvpNotes" className="block text-xs uppercase tracking-wider text-[#d5d3ce]/80 mb-1.5">
                  Pesan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  id="rsvpNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ucapan singkat atau doa..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121216]/80 border border-[#252530] text-[#f9f8f5] text-xs focus:outline-none focus:border-[#e6ca65] placeholder:text-[#d5d3ce]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold text-xs tracking-widest uppercase hover:brightness-110 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Reservasi via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
