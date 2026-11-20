import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';
import {
  HANOV_DISPLAY_PHONE,
  buildSkinConsultationMessage,
  createWhatsAppUrl,
} from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Koleksi Produk', href: '#koleksi' },
    { label: 'Rekomendasi Kulit', href: '#rekomendasi' },
    { label: 'Filosofi Formula', href: '#filosofi' },
    { label: 'Ulasan & Cara Pesan', href: '#ulasan' },
  ];

  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage());

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-[#FAF8F5] text-[11px] sm:text-xs tracking-wide py-2 px-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center sm:justify-between gap-2 text-center">
          <p className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D89D8E] shrink-0" />
            <span>
              Resmi Terdaftar BPOM &amp; Halal • Gratis Ongkir Seluruh Indonesia Min. Rp 300.000
            </span>
          </p>
          <a
            href={consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[#E8DFD6] hover:text-white transition-colors"
          >
            <span>WhatsApp Resmi HANOV:</span>
            <span className="font-semibold underline underline-offset-2">{HANOV_DISPLAY_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Main Translucent Header */}
      <div className="bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E6DFD7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left: Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-[#1C1917] hover:text-[#A65E4E] transition-colors rounded-lg"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a href="#" className="group flex flex-col">
              <span className="font-serif text-2xl sm:text-[28px] font-semibold tracking-[0.26em] text-[#1C1917] leading-none">
                HANOV
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#6B625B] mt-1 font-medium">
                Skincare &amp; Cosmetics
              </span>
            </a>
          </div>

          {/* Center: Clean Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#4A433E] hover:text-[#A65E4E] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Direct WA Consultation & Cart Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#D8CFC5] bg-white/70 hover:bg-white hover:border-[#1B7A43] text-xs font-medium text-[#1C1917] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#1B7A43]" />
              <span>Konsultasi WA</span>
            </a>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#322C28] text-[#FAF8F5] text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-xs"
              aria-label="Buka keranjang belanja"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Keranjang</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#A65E4E] text-white text-[11px] font-semibold tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E6DFD7] bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-3 animate-fade-in">
            <nav className="flex flex-col divide-y divide-[#EDE7DF]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm font-medium text-[#1C1917] hover:text-[#A65E4E] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1B7A43] text-white text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat &amp; Konsultasi Kulit ({HANOV_DISPLAY_PHONE})</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
