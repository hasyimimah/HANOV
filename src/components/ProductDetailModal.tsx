import React, { useEffect, useState } from 'react';
import {
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import {
  buildQuickSingleProductMessage,
  createWhatsAppUrl,
  formatRupiah,
} from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  initialVariant: ProductVariant | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onBuyNowToCheckout: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialVariant,
  onClose,
  onAddToCart,
  onBuyNowToCheckout,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(initialVariant);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage'>('desc');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariant(initialVariant || product.variants[0]);
      setQuantity(1);
      setActiveTab('desc');
      setAddedFeedback(false);
    }
  }, [product, initialVariant]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product || !selectedVariant) return null;

  const directWaUrl = createWhatsAppUrl(
    buildQuickSingleProductMessage(product, selectedVariant, quantity)
  );

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/55 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] rounded-3xl border border-[#E6DFD7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-[#E6DFD7] flex items-center justify-center text-[#1C1917] transition-colors cursor-pointer"
          aria-label="Tutup detail produk"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Product Visual */}
          <div className="md:col-span-5 bg-[#F3EFEA] relative flex flex-col justify-between">
            <div className="aspect-[4/4.3] md:aspect-auto md:h-full w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* BPOM Verification Pill */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 rounded-xl bg-[#FAF8F5]/92 backdrop-blur-md border border-[#E6DFD7] px-3.5 py-2.5 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#5A6B5C] shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-[#1C1917]">{product.bpomNumber}</p>
                <p className="text-[11px] text-[#6B625B]">Teruji Dermatologis &amp; Halal</p>
              </div>
            </div>
          </div>

          {/* Right: Product Information & Order Controls */}
          <div className="md:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Eyebrow + Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 pr-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A65E4E]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-2 text-xs text-[#6B625B]">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#1C1917]">
                    <Star className="w-3.5 h-3.5 fill-[#C98B4B] text-[#C98B4B]" />
                    {product.rating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{product.soldCount.toLocaleString('id-ID')}+ terjual</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2
                  id="modal-product-title"
                  className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] leading-tight"
                >
                  {product.name}
                </h2>
                <div className="mt-2.5 flex items-baseline gap-2.5">
                  <span className="text-xl sm:text-2xl font-bold text-[#1C1917] tabular-nums">
                    {formatRupiah(selectedVariant.price)}
                  </span>
                  {selectedVariant.originalPrice && (
                    <span className="text-sm text-[#9C9288] line-through tabular-nums">
                      {formatRupiah(selectedVariant.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Skin Type Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {product.skinTypes.map((st) => (
                  <span
                    key={st}
                    className="px-2.5 py-1 rounded-full bg-[#F3EFEA] text-[11px] font-medium text-[#5A6B5C]"
                  >
                    {st}
                  </span>
                ))}
              </div>

              {/* Variant Selector */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B625B]">
                  Pilih Varian / Ukuran: <span className="text-[#1C1917]">{selectedVariant.label}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === selectedVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#1C1917] bg-[#1C1917] text-[#FAF8F5]'
                            : 'border-[#D8CFC5] bg-white text-[#1C1917] hover:border-[#A65E4E]'
                        }`}
                      >
                        {variant.colorHex && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/60 shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}
                        <span>{variant.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clean Information Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-[#E6DFD7] gap-5">
                  {[
                    { id: 'desc', label: 'Manfaat' },
                    { id: 'ingredients', label: 'Kandungan Aktif' },
                    { id: 'usage', label: 'Cara Pakai' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as 'desc' | 'ingredients' | 'usage')}
                      className={`pb-2.5 text-xs sm:text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-[#A65E4E] text-[#1C1917]'
                          : 'border-transparent text-[#6B625B] hover:text-[#1C1917]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="pt-3.5 min-h-[115px] text-xs sm:text-sm text-[#4A433E] leading-relaxed">
                  {activeTab === 'desc' && <p>{product.description}</p>}

                  {activeTab === 'ingredients' && (
                    <ul className="space-y-2.5">
                      {product.keyIngredients.map((ing) => (
                        <li key={ing.name} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#A65E4E] shrink-0 mt-1" />
                          <div>
                            <span className="font-semibold text-[#1C1917]">{ing.name}: </span>
                            <span className="text-[#6B625B]">{ing.benefit}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'usage' && <p>{product.howToUse}</p>}
                </div>
              </div>
            </div>

            {/* Bottom Order Controls */}
            <div className="pt-4 border-t border-[#E6DFD7] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="inline-flex items-center rounded-xl border border-[#D8CFC5] bg-white h-11">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 h-full text-[#1C1917] hover:text-[#A65E4E] cursor-pointer"
                    aria-label="Kurangi jumlah"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 h-full text-[#1C1917] hover:text-[#A65E4E] cursor-pointer"
                    aria-label="Tambah jumlah"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 h-11 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedFeedback
                      ? 'bg-[#5A6B5C] text-white'
                      : 'bg-[#1C1917] hover:bg-[#322C28] text-[#FAF8F5]'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Ditambahkan</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>+ Keranjang</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant WhatsApp Checkout Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onBuyNowToCheckout(product, selectedVariant, quantity)}
                  className="py-3 px-4 rounded-xl bg-[#1B7A43] hover:bg-[#156336] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Beli &amp; Isi Alamat WA</span>
                </button>

                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D8CFC5] text-[#1C1917] text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Chat Produk Ini ke WA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
