/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Share2, QrCode } from 'lucide-react';
import { WEDDING_DATA } from './data/weddingData';
import { RsvpRecord } from './types/wedding';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { CoverHero } from './components/CoverHero';
import { AmbientRomanticBackground } from './components/AmbientRomanticBackground';
import { QuoteSection } from './components/QuoteSection';
import { CoupleSection } from './components/CoupleSection';
import { StorySection } from './components/StorySection';
import { CountdownEventSection } from './components/CountdownEventSection';
import { LiveStreamSection } from './components/LiveStreamSection';
import { GallerySection } from './components/GallerySection';
import { GiftRsvpSection } from './components/GiftRsvpSection';
import { WishesSection } from './components/WishesSection';
import { FooterSection } from './components/FooterSection';
import { ShareInviteModal } from './components/ShareInviteModal';
import { GuestPassModal } from './components/GuestPassModal';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan Istimewa');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aidil_talitha_rsvps');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      { id: '1', name: 'dr. Andina Safitri', pax: 2, status: 'Hadir', timestamp: '10:30' },
      { id: '2', name: 'Dimas Anggara', pax: 1, status: 'Hadir', timestamp: '11:15' },
      { id: '3', name: 'Keluarga Soeprapto', pax: 4, status: 'Hadir', timestamp: '12:00' },
    ];
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Parse guest name from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  // Save RSVPs to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aidil_talitha_rsvps', JSON.stringify(rsvps));
    } catch {
      // Ignore
    }
  }, [rsvps]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    // Play music on user gesture
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.warn('Autoplay prevented or pending interaction', err);
        });
    }
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingMusic(true);
        })
        .catch((err) => {
          console.error('Audio play failed', err);
        });
    }
  };

  const handleNewRsvp = (record: RsvpRecord) => {
    setRsvps((prev) => [record, ...prev]);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-[#f9f8f5] selection:bg-[#d4af37]/30 selection:text-[#f3e5ab]">
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={WEDDING_DATA.music.url}
        loop
        preload="auto"
        onPlay={() => setIsPlayingMusic(true)}
        onPause={() => setIsPlayingMusic(false)}
      />

      {/* Dynamic Ambient Romantic Background with Animated Transitions */}
      <AmbientRomanticBackground />

      {/* Floating Music Player Widget */}
      <FloatingMusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
        audioRef={audioRef}
      />

      {/* Floating Quick Action Buttons (Guest Pass & Bagikan) */}
      {isInvitationOpen && (
        <aside
          aria-label="Aksi Cepat"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2"
        >
          <button
            onClick={() => setIsPassModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full glass-card border border-[#d4af37]/40 text-[#f3e5ab] text-xs shadow-2xl hover:border-[#e6ca65] hover:bg-[#d4af37]/20 transition-all active:scale-95 cursor-pointer"
            title="Buka QR Pass Tamu"
          >
            <QrCode className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span className="hidden sm:inline font-medium">Guest Pass</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full glass-card border border-[#d4af37]/40 text-[#f3e5ab] text-xs shadow-2xl hover:border-[#e6ca65] hover:bg-[#d4af37]/20 transition-all active:scale-95 cursor-pointer"
            title="Bagikan Undangan"
          >
            <Share2 className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span className="hidden sm:inline font-medium">Bagikan</span>
          </button>
        </aside>
      )}

      {/* 1. Cover / Hero Screen (Layar Pertama) */}
      <CoverHero
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
        guestName={guestName}
      />

      {/* Main Content (Header navbar removed as requested) */}
      <main
        id="mainInvitation"
        className={`relative z-10 w-full min-h-screen bg-transparent transition-opacity duration-1000 ${
          isInvitationOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* 2. Quote Section (Bismillah & Ar-Rum : 21) */}
        <QuoteSection />

        {/* 3. Profile Mempelai (The Bride & Groom) */}
        <CoupleSection />

        {/* 4. Love Story Timeline */}
        <StorySection />

        {/* 5. Countdown & Event Schedule Details */}
        <CountdownEventSection />

        {/* 6. Live Streaming Broadcast */}
        <LiveStreamSection />

        {/* 7. Prewedding Gallery with Multi-Model Creative Views */}
        <GallerySection />

        {/* 8. Wedding Gift & RSVP Form */}
        <GiftRsvpSection
          onNewRsvp={handleNewRsvp}
          rsvpCount={rsvps.reduce((acc, curr) => acc + curr.pax, 0)}
        />

        {/* 9. Wedding Wish & Prayer (Buku Tamu) */}
        <WishesSection />

        {/* 10. Footer (Terima Kasih & Penutup) */}
        <FooterSection />
      </main>

      {/* Share / Generator Undangan Modal */}
      <ShareInviteModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentGuest={guestName !== 'Tamu Undangan Istimewa' ? guestName : ''}
      />

      {/* Guest Pass QR Modal */}
      <GuestPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        guestName={guestName}
      />
    </div>
  );
}
