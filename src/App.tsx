/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { WEDDING_DATA } from './data/weddingData';
import { RsvpRecord } from './types/wedding';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { CoverHero } from './components/CoverHero';
import { AmbientRomanticBackground } from './components/AmbientRomanticBackground';
import { QuoteSection } from './components/QuoteSection';
import { CoupleSection } from './components/CoupleSection';
import { CountdownEventSection } from './components/CountdownEventSection';
import { StorySection } from './components/StorySection';
import { LiveStreamSection } from './components/LiveStreamSection';
import { GallerySection } from './components/GallerySection';
import { GiftRsvpSection } from './components/GiftRsvpSection';
import { WishesSection } from './components/WishesSection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [guestName, setGuestName] = useState('Nama Tamu Undangan');
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aidil_talitha_rsvps');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      { id: '1', name: 'Contoh Tamu Undangan 1', pax: 2, status: 'Hadir', timestamp: '10:30' },
      { id: '2', name: 'Contoh Tamu Undangan 2', pax: 1, status: 'Hadir', timestamp: '11:15' },
      { id: '3', name: 'Contoh Tamu Undangan 3', pax: 4, status: 'Hadir', timestamp: '12:00' },
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
      {/* Background Audio Element - Lagu Bugis Cuppe Atikku */}
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

      {/* Floating Single Music Player Widget (Logo Musik) */}
      <FloatingMusicPlayer
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
        audioRef={audioRef}
      />

      {/* 1. Cover / Hero Screen (Layar Pertama) */}
      <CoverHero
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
        guestName={guestName}
      />

      {/* Main Content */}
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

        {/* 4. Wedding Countdown & Jadwal Acara (Standby Mode) */}
        <CountdownEventSection />

        {/* 5. Love Story Timeline */}
        <StorySection />

        {/* 5. Live Streaming Broadcast */}
        <LiveStreamSection />

        {/* 6. Prewedding Gallery Kolase Murni Foto */}
        <GallerySection />

        {/* 7. Wedding Gift & RSVP Form */}
        <GiftRsvpSection
          onNewRsvp={handleNewRsvp}
          rsvpCount={rsvps.reduce((acc, curr) => acc + curr.pax, 0)}
        />

        {/* 8. Wedding Wish & Prayer (Buku Tamu) */}
        <WishesSection />

        {/* 9. Footer (Terima Kasih & Penutup • Design by A² Dev) */}
        <FooterSection />
      </main>
    </div>
  );
}
