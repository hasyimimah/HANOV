import React from 'react';
import { CheckCircle2, Droplets, Leaf, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { STORE_IMAGES } from '../data/images';
import { CUSTOMER_REVIEWS } from '../data/products';
import {
  HANOV_DISPLAY_PHONE,
  buildSkinConsultationMessage,
  createWhatsAppUrl,
} from '../utils/whatsapp';

export const BrandPhilosophyAndReviews: React.FC = () => {
  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage());

  const orderSteps = [
    {
      step: '01',
      title: 'Pilih Produk & Varian',
      desc: 'Masukkan produk skincare, shade lipstik, atau paket bundling favorit Anda ke dalam keranjang HANOV.',
    },
    {
      step: '02',
      title: 'Isi Alamat Singkat',
      desc: 'Buka keranjang belanja, gunakan kode promo bila ada, lalu isi nama, alamat pengiriman, dan metode bayar.',
    },
    {
      step: '03',
      title: 'Terkirim Otomatis ke WA',
      desc: `Klik tombol Pesan — rincian struk pesanan Anda langsung terkirim ke WhatsApp Admin HANOV (${HANOV_DISPLAY_PHONE}).`,
    },
  ];

  return (
    <>
      {/* Brand Formulation Philosophy Section */}
      <section id="filosofi" className="py-16 lg:py-24 bg-[#FAF8F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Editorial Macro Formulation Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[#E6DFD7] bg-[#F3EFEA] shadow-xs">
                <img
                  src={STORE_IMAGES.editorialRitual}
                  alt="Tekstur Serum dan Krim Botani Dermatologis HANOV"
                  loading="lazy"
                  className="w-full aspect-[4/4.4] object-cover object-center"
                />
              </div>
            </div>

            {/* Editorial Copy & Formulation Standards */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65E4E]">
                Filosofi Formulasi HANOV
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1C1917] leading-[1.14]">
                Diformulasikan dengan Presisi Sains, Ditenangkan oleh Kemurnian Alam.
              </h2>

              <p className="text-sm sm:text-base text-[#6B625B] leading-relaxed">
                Di <strong className="font-semibold text-[#1C1917]">HANOV</strong>, kami percaya
                bahwa kulit sehat bercahaya tidak membutuhkan tahapan yang rumit atau bahan keras
                yang mengiritasi. Setiap tetes serum dan pulasan kosmetik kami menggabungkan bahan
                aktif teruji klinis dalam takaran efektif dengan ekstrak botani pilihan yang ramah
                bagi kulit tropis Indonesia.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#E6DFD7] space-y-2">
                  <Droplets className="w-5 h-5 text-[#A65E4E]" />
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Tekstur Tropis Ringan
                  </h3>
                  <p className="text-xs text-[#6B625B] leading-relaxed">
                    Cepat meresap tanpa rasa lengket atau berminyak di udara lembap Indonesia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DFD7] space-y-2">
                  <Leaf className="w-5 h-5 text-[#5A6B5C]" />
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    0% Bahan Iritan Keras
                  </h3>
                  <p className="text-xs text-[#6B625B] leading-relaxed">
                    Bebas paraben, SLS, merkuri, hidrokuinon, dan pewangi sintetis berlebih.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E6DFD7] space-y-2">
                  <ShieldCheck className="w-5 h-5 text-[#1C1917]" />
                  <h3 className="font-serif text-lg font-semibold text-[#1C1917]">
                    Jaminan Resmi 100%
                  </h3>
                  <p className="text-xs text-[#6B625B] leading-relaxed">
                    Seluruh produk memiliki izin edar BPOM RI resmi dan jaminan produk original.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & How To Order via WhatsApp Section */}
      <section id="ulasan" className="py-16 lg:py-24 bg-[#F3EFEA] border-t border-[#E6DFD7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 3-Step Seamless WhatsApp Ordering Banner */}
          <div className="rounded-3xl bg-white border border-[#E6DFD7] p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-8 border-b border-[#EDE7DF]">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1B7A43]">
                  Belanja Praktis Tanpa Ribet Login
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
                  3 Langkah Mudah Pesan di HANOV
                </h2>
              </div>
              <a
                href={consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1B7A43] hover:bg-[#156336] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Hubungi Admin WA ({HANOV_DISPLAY_PHONE})</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {orderSteps.map((s) => (
                <div key={s.step} className="space-y-2">
                  <span className="font-serif text-3xl font-semibold text-[#A65E4E]">{s.step}</span>
                  <h3 className="font-sans text-base font-semibold text-[#1C1917]">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-[#6B625B] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65E4E]">
                Cerita Pelanggan HANOV
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917]">
                Dipercaya Ribuan Perempuan Indonesia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CUSTOMER_REVIEWS.map((rev) => (
                <article
                  key={rev.id}
                  className="p-6 rounded-2xl bg-white border border-[#E6DFD7] flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="w-3.5 h-3.5 fill-[#C98B4B] text-[#C98B4B]"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#9C9288]">{rev.date}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A433E] leading-relaxed">
                      “{rev.comment}”
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F0EAE2] space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1C1917]">{rev.name}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5A6B5C]">
                        <CheckCircle2 className="w-3 h-3" />
                        Pembeli Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-[#6B625B]">
                      {rev.city} • {rev.skinType}
                    </p>
                    <p className="text-[11px] font-medium text-[#A65E4E] pt-0.5">
                      Produk: {rev.productPurchased}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
