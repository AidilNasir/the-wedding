import React, { useState } from 'react';
import { Menu, X, Share2, QrCode } from 'lucide-react';

interface NavbarProps {
  onOpenShareModal: () => void;
  onOpenPassModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShareModal, onOpenPassModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Ayat Suci', href: '#quoteSection' },
    { label: 'Mempelai', href: '#profileSection' },
    { label: 'Love Story', href: '#storySection' },
    { label: 'Jadwal Acara', href: '#eventSection' },
    { label: 'Galeri', href: '#gallerySection' },
    { label: 'RSVP & Gift', href: '#giftRsvpSection' },
    { label: 'Buku Tamu', href: '#wishesSection' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-30 w-full bg-[#0a0a0c]/85 backdrop-blur-md border-b border-[#252530]/60 py-3.5 px-6 flex items-center justify-between">
        {/* Monogram logo */}
        <a href="#coverHero" className="font-cormorant text-2xl tracking-wider text-[#f3e5ab] hover:opacity-80 transition-opacity">
          A <span className="font-cursive text-[#e6ca65] text-2xl">&amp;</span> T
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase text-[#d5d3ce]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#e6ca65] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenShareModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 text-[#f3e5ab] hover:bg-[#d4af37]/15 transition-all cursor-pointer"
            title="Bagikan Undangan"
          >
            <Share2 className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>Bagikan</span>
          </button>

          <button
            onClick={onOpenPassModal}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3e5ab] hover:bg-[#d4af37]/30 transition-all cursor-pointer"
            title="Guest QR Pass"
          >
            <QrCode className="w-3.5 h-3.5 text-[#e6ca65]" />
            <span>Guest Pass</span>
          </button>

          <a
            href="#eventSection"
            className="text-xs px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 text-[#f3e5ab] hover:bg-[#d4af37]/10 transition-colors hidden md:inline-block font-mono"
          >
            24 - 25 Nov 2025
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#252530] text-[#f3e5ab]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] z-30 bg-[#0a0a0c]/95 backdrop-blur-xl border-b border-[#252530] p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm tracking-widest uppercase text-[#d5d3ce] hover:text-[#e6ca65] transition-colors border-b border-[#252530]/40"
              >
                {link.label}
              </a>
            ))}
            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShareModal();
                }}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-[#d4af37]/40 text-[#f3e5ab]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Link</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPassModal();
                }}
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3e5ab]"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Guest Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
