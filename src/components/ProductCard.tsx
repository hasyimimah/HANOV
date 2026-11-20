import React, { useState } from 'react';
import { Check, Eye, Plus, Star } from 'lucide-react';
import { Product, ProductVariant } from '../types/store';
import { formatRupiah } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product, initialVariant: ProductVariant) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [justAdded, setJustAdded] = useState(false);

  const hasColorSwatches = product.variants.some((v) => Boolean(v.colorHex));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1300);
  };

  return (
    <article className="group bg-white rounded-2xl border border-[#E6DFD7] hover:border-[#CBBFB2] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(28,25,23,0.09)]">
      {/* 4:5 Studio Image Container */}
      <div
        onClick={() => onSelectProduct(product, selectedVariant)}
        className="relative aspect-[4/4.7] w-full bg-[#F3EFEA] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Single Clean Badge */}
        {product.badge && (
          <span
            className={`absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
              product.badge === 'Paket Hemat'
                ? 'bg-[#5A6B5C] text-white'
                : product.badge === 'Baru'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'bg-[#FAF8F5]/95 text-[#1C1917] border border-[#E6DFD7]'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick View Pill on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product, selectedVariant);
          }}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5]/92 backdrop-blur-sm border border-[#E6DFD7] text-[11px] font-medium text-[#1C1917] opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white"
          aria-label={`Lihat detail ${product.name}`}
        >
          <Eye className="w-3.5 h-3.5 text-[#A65E4E]" />
          <span>Detail</span>
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-1.5">
          {/* Category + Rating Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B625B]">
              {product.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#4A433E] tabular-nums">
              <Star className="w-3.5 h-3.5 fill-[#C98B4B] text-[#C98B4B]" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product, selectedVariant)}
            className="font-serif text-[19px] sm:text-[20px] font-semibold text-[#1C1917] leading-snug cursor-pointer hover:text-[#A65E4E] transition-colors line-clamp-2"
          >
            {product.name}
          </h3>

          {/* Concise 1-line Benefit */}
          <p className="text-xs text-[#6B625B] leading-relaxed line-clamp-2">{product.subtitle}</p>

          {/* Shade Swatches (for Cosmetics) or Variant Label */}
          {hasColorSwatches ? (
            <div className="pt-2 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {product.variants.map((variant) => {
                  const isSelected = variant.id === selectedVariant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(variant);
                      }}
                      title={variant.label}
                      aria-label={`Pilih varian ${variant.label}`}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#1C1917] scale-105'
                          : 'hover:scale-110 ring-1 ring-black/10'
                      }`}
                      style={{ backgroundColor: variant.colorHex }}
                    />
                  );
                })}
              </div>
              <span className="text-[11px] text-[#6B625B] truncate">{selectedVariant.label}</span>
            </div>
          ) : product.variants.length > 1 ? (
            <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
              {product.variants.map((variant) => {
                const isSelected = variant.id === selectedVariant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVariant(variant);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1C1917] text-[#FAF8F5]'
                        : 'bg-[#F3EFEA] text-[#6B625B] hover:text-[#1C1917]'
                    }`}
                  >
                    {variant.label.split(' ')[0]} {variant.label.split(' ')[1] || ''}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="pt-1 text-[11px] font-medium text-[#6B625B]">{selectedVariant.label}</p>
          )}
        </div>

        {/* Price + Single Add-to-Cart Action */}
        <div className="pt-3 border-t border-[#F0EAE2] space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-[17px] font-bold text-[#1C1917] tabular-nums">
              {formatRupiah(selectedVariant.price)}
            </span>
            {selectedVariant.originalPrice && (
              <span className="text-xs text-[#9C9288] line-through tabular-nums">
                {formatRupiah(selectedVariant.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
              justAdded
                ? 'bg-[#5A6B5C] text-white'
                : 'bg-[#FAF8F5] hover:bg-[#A65E4E] text-[#1C1917] hover:text-white border border-[#D8CFC5] hover:border-[#A65E4E]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Masuk Keranjang</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
