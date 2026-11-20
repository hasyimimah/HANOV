import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Leaf, Truck } from 'lucide-react';
import { STORE_IMAGES } from '../data/images';
import { buildSkinConsultationMessage, createWhatsAppUrl } from '../utils/whatsapp';

export const HeroSection: React.FC = () => {
  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage());

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: 'Terdaftar Resmi BPOM RI',
      desc: 'Nomor registrasi transparan di setiap produk',
    },
    {
      icon: Sparkles,
      title: 'Dermatologically Tested',
      desc: 'Aman untuk kulit sensitif & berjerawat',
    },
    {
      icon: Leaf,
      title: 'Halal & Clean Botanicals',
      desc: 'Bebas paraben, merkuri, & alkohol keras',
    },
    {
      icon: Truck,
      title: 'Order Mudah via WhatsApp',
      desc: 'Respon cepat, bisa Transfer, QRIS, atau COD',
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#E6DFD7]">
      {/* Main Split Editorial Hero */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 55% (7 cols on 12-col grid) */}
          <div className="lg:col-span-7 space-y-6 lg:pr-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#E6DFD7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A65E4E]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5A6B5C]">
                HANOV Official Store • Formulasi Kulit Tropis
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[58px] font-medium text-[#1C1917] leading-[1.09] tracking-[-0.02em]">
              Kemurnian Botani &amp; Sains untuk{' '}
              <span className="italic text-[#A65E4E]">Kilau Alami</span> Kulit Anda.
            </h1>

            <p className="text-base sm:text-lg text-[#6B625B] leading-relaxed max-w-xl">
              Rangkaian skincare klinis lembut dan kosmetik bernutrisi dari{' '}
              <strong className="font-semibold text-[#1C1917]">HANOV</strong>. Dirancang khusus
              untuk merawat skin barrier, mencerahkan kusam, dan menyempurnakan tampilan wajah di
              iklim tropis Indonesia.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#koleksi"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#A65E4E] hover:bg-[#8E4D3E] text-white text-sm font-semibold transition-all shadow-xs"
              >
                <span>Jelajahi Koleksi HANOV</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#F3EFEA] border border-[#D8CFC5] text-[#1C1917] text-sm font-medium transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#1B7A43]" />
                <span>Konsultasi Gratis via WhatsApp</span>
              </a>
            </div>

            {/* Subtle Stats / Social Proof */}
            <div className="pt-4 grid grid-cols-3 gap-4 sm:gap-8 border-t border-[#E6DFD7] max-w-lg">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums">
                  4.9/5
                </p>
                <p className="text-xs text-[#6B625B] mt-0.5">Kepuasan Pelanggan</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums">
                  100%
                </p>
                <p className="text-xs text-[#6B625B] mt-0.5">Terdaftar BPOM &amp; Halal</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums">
                  11rb+
                </p>
                <p className="text-xs text-[#6B625B] mt-0.5">Produk Terjual</p>
              </div>
            </div>
          </div>

          {/* Right Column: 45% (5 cols on 12-col grid) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden bg-[#F3EFEA] border border-[#E6DFD7] shadow-sm">
              <div className="aspect-[4/4.3] sm:aspect-[4/3.8] lg:aspect-[4/4.6] w-full overflow-hidden">
                <img
                  src={STORE_IMAGES.heroHanov}
                  alt="Koleksi Skincare dan Kosmetik Eksklusif HANOV"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Subtle Single Editorial Caption Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 rounded-2xl bg-[#FAF8F5]/92 backdrop-blur-md border border-[#E6DFD7] p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A65E4E]">
                    Koleksi Unggulan 2025
                  </p>
                  <p className="font-serif text-lg font-semibold text-[#1C1917] leading-snug">
                    Luminous Barrier &amp; Velvet Series
                  </p>
                </div>
                <a
                  href="#koleksi"
                  className="shrink-0 px-3.5 py-2 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-medium hover:bg-[#A65E4E] transition-colors"
                >
                  Lihat Harga
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Trust & Formulation Strip */}
      <div className="bg-[#F3EFEA] border-t border-[#E6DFD7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {trustPillars.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#E6DFD7] flex items-center justify-center shrink-0 text-[#5A6B5C]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-[#1C1917] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6B625B] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
