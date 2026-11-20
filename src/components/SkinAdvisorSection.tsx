import React, { useState } from 'react';
import { Check, MessageCircle, Moon, ShoppingBag, Sun } from 'lucide-react';
import { HANOV_PRODUCTS, SKIN_ROUTINE_OPTIONS } from '../data/products';
import { Product, ProductVariant } from '../types/store';
import {
  HANOV_DISPLAY_PHONE,
  buildSkinConsultationMessage,
  createWhatsAppUrl,
  formatRupiah,
} from '../utils/whatsapp';

interface SkinAdvisorSectionProps {
  onSelectProduct: (product: Product, variant: ProductVariant) => void;
  onAddRoutineToCart: (products: Product[]) => void;
}

export const SkinAdvisorSection: React.FC<SkinAdvisorSectionProps> = ({
  onSelectProduct,
  onAddRoutineToCart,
}) => {
  const [selectedRoutineId, setSelectedRoutineId] = useState<string>(SKIN_ROUTINE_OPTIONS[0].id);
  const [routineAdded, setRoutineAdded] = useState(false);

  const activeRoutine =
    SKIN_ROUTINE_OPTIONS.find((r) => r.id === selectedRoutineId) || SKIN_ROUTINE_OPTIONS[0];

  const recommendedProducts = activeRoutine.recommendedProductIds
    .map((id) => HANOV_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const routineTotal = recommendedProducts.reduce(
    (sum, prod) => sum + prod.variants[0].price,
    0
  );

  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage(activeRoutine.title));

  const handleAddAll = () => {
    onAddRoutineToCart(recommendedProducts);
    setRoutineAdded(true);
    setTimeout(() => setRoutineAdded(false), 1600);
  };

  return (
    <section id="rekomendasi" className="py-16 lg:py-24 bg-[#F3EFEA] border-y border-[#E6DFD7]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65E4E]">
            Panduan Personalisasi Kulit
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] leading-tight">
            Bingung Memilih Produk? Temukan Rutinitas Kulit Anda.
          </h2>
          <p className="text-sm sm:text-base text-[#6B625B] leading-relaxed">
            Pilih fokus kebutuhan kulit Anda di bawah ini untuk melihat rekomendasi tahapan dari
            tim formulasi HANOV, atau tanyakan langsung melalui WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4 Skin Condition Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            {SKIN_ROUTINE_OPTIONS.map((option, index) => {
              const isActive = option.id === activeRoutine.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedRoutineId(option.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-md'
                      : 'bg-white hover:bg-[#FAF8F5] text-[#1C1917] border-[#E6DFD7]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          isActive ? 'text-[#D89D8E]' : 'text-[#A65E4E]'
                        }`}
                      >
                        Pilihan 0{index + 1}
                      </span>
                      <h3 className="font-serif text-xl font-semibold mt-0.5">{option.title}</h3>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isActive ? 'text-[#DCD4CC]' : 'text-[#6B625B]'
                        }`}
                      >
                        {option.subtitle}
                      </p>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isActive ? 'border-[#D89D8E] bg-[#A65E4E]' : 'border-[#D8CFC5]'
                      }`}
                    >
                      {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Recommended Regimen Showcase */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DFD7] p-5 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E6DFD7] text-[11px] font-semibold text-[#5A6B5C]">
                Rekomendasi 3 Langkah HANOV
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                Rangkaian untuk {activeRoutine.title}
              </h3>
              <p className="text-sm text-[#6B625B] leading-relaxed">{activeRoutine.description}</p>
            </div>

            {/* Morning & Night Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DF] flex items-start gap-3">
                <Sun className="w-4 h-4 text-[#A65E4E] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-[#1C1917]">Ritual Pagi</p>
                  <p className="text-[#6B625B] mt-0.5 leading-relaxed">{activeRoutine.morningTip}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EDE7DF] flex items-start gap-3">
                <Moon className="w-4 h-4 text-[#5A6B5C] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-[#1C1917]">Ritual Malam</p>
                  <p className="text-[#6B625B] mt-0.5 leading-relaxed">{activeRoutine.nightTip}</p>
                </div>
              </div>
            </div>

            {/* 3 Recommended Products Row */}
            <div className="space-y-3">
              {recommendedProducts.map((prod, idx) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod, prod.variants[0])}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-[#EDE7DF] hover:border-[#CBBFB2] bg-[#FAF8F5]/60 hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E6DFD7]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#A65E4E]">
                      {prod.categoryLabel}
                    </p>
                    <p className="text-sm font-semibold text-[#1C1917] truncate">{prod.name}</p>
                    <p className="text-xs text-[#6B625B]">{prod.variants[0].label}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#1C1917] tabular-nums">
                      {formatRupiah(prod.variants[0].price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#E6DFD7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#6B625B]">Total 3 Produk Rekomendasi</p>
                <p className="text-xl font-bold text-[#1C1917] tabular-nums">
                  {formatRupiah(routineTotal)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleAddAll}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    routineAdded
                      ? 'bg-[#5A6B5C] text-white'
                      : 'bg-[#A65E4E] hover:bg-[#8E4D3E] text-white'
                  }`}
                >
                  {routineAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>3 Produk Masuk Keranjang</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ambil Paket Ini</span>
                    </>
                  )}
                </button>

                <a
                  href={consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D8CFC5] text-[#1C1917] text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#1B7A43]" />
                  <span>Tanya WA ({HANOV_DISPLAY_PHONE})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
