import React from 'react';
import { Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import {
  HANOV_DISPLAY_PHONE,
  HANOV_RAW_PHONE,
  buildSkinConsultationMessage,
  createWhatsAppUrl,
} from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage());

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] border-t border-[#2E2926]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-3xl font-semibold tracking-[0.26em] text-white">
                HANOV
              </span>
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#B8AFA6] mt-1">
                Official Skincare &amp; Cosmetics
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#C8BFB6] leading-relaxed max-w-md">
              Toko resmi perawatan wajah dermatologis dan kosmetik botani bernutrisi. Seluruh
              rangkaian HANOV telah teruji aman, terdaftar BPOM RI, dan diformulasikan untuk
              kesehatan kulit jangka panjang.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#282421] border border-[#3B3530] text-xs text-[#E8DFD6]">
              <ShieldCheck className="w-4 h-4 text-[#D89D8E]" />
              <span>100% Produk Original • Garansi Resmi HANOV</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D89D8E]">
              Eksplorasi Toko
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#C8BFB6]">
              <li>
                <a href="#koleksi" className="hover:text-white transition-colors">
                  Katalog Skincare &amp; Kosmetik
                </a>
              </li>
              <li>
                <a href="#rekomendasi" className="hover:text-white transition-colors">
                  Panduan Rutinitas Kulit
                </a>
              </li>
              <li>
                <a href="#filosofi" className="hover:text-white transition-colors">
                  Filosofi &amp; Standar BPOM
                </a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-white transition-colors">
                  Ulasan Pembeli &amp; Cara Pesan
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Official WhatsApp Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D89D8E]">
              Pemesanan &amp; Layanan Pelanggan
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#C8BFB6]">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#34B368] shrink-0" />
                <span>
                  WhatsApp Resmi: <strong className="text-white">{HANOV_DISPLAY_PHONE}</strong> (
                  {HANOV_RAW_PHONE})
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D89D8E] shrink-0" />
                <span>Setiap Hari: 08.00 – 21.00 WIB (Fast Response)</span>
              </p>
            </div>

            <a
              href={consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1B7A43] hover:bg-[#156336] text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp HANOV Sekarang</span>
            </a>

            <div className="pt-2">
              <p className="text-[11px] text-[#9E948A] mb-2">Dukungan Pembayaran &amp; Pengiriman:</p>
              <div className="flex flex-wrap gap-1.5">
                {['QRIS', 'BCA', 'Mandiri', 'BRI', 'COD', 'J&T', 'JNE', 'SiCepat'].map((badge) => (
                  <span
                    key={badge}
                    className="px-2.5 py-1 rounded-md bg-[#282421] border border-[#3B3530] text-[11px] font-medium text-[#DCD4CC]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#2E2926] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9E948A]">
          <p>© {new Date().getFullYear()} HANOV Official Store. Hak Cipta Dilindungi.</p>
          <p>Pemesanan terhubung resmi ke WhatsApp {HANOV_RAW_PHONE}</p>
        </div>
      </div>
    </footer>
  );
};
