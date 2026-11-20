export type ProductCategory = 'skincare' | 'cosmetics' | 'bundling';

export interface ProductVariant {
  id: string;
  label: string; // e.g., "30 ml", "50 ml", "01 Terracotta Muse", "02 Rose Petal"
  price: number;
  originalPrice?: number;
  colorHex?: string; // For cosmetic shades (lipstick, cushion)
  stockStatus?: 'available' | 'low';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string; // Concise 1-line benefit
  category: ProductCategory;
  categoryLabel: string; // e.g., "SERUM WAJAH", "LIP VELVET"
  badge?: 'Terlaris' | 'Baru' | 'Paket Hemat' | 'Favorit';
  image: string;
  rating: number;
  soldCount: number;
  bpomNumber: string;
  skinTypes: string[];
  concerns: ('mencerahkan' | 'barrier' | 'jerawat' | 'anti-aging' | 'makeup')[];
  description: string;
  keyIngredients: { name: string; benefit: string }[];
  howToUse: string;
  variants: ProductVariant[];
}

export interface CartItem {
  cartKey: string; // `${product.id}__${variant.id}`
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  cityDistrict: string;
  fullAddress: string;
  paymentMethod: 'Transfer Bank (BCA / Mandiri / BRI)' | 'QRIS Instan (E-Wallet & M-Banking)' | 'COD (Bayar di Tempat)';
  courier: 'Reguler (J&T / JNE / SiCepat)' | 'Instant / Same Day';
  notes: string;
}

export interface SkinRoutineOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  morningTip: string;
  nightTip: string;
  recommendedProductIds: string[];
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  skinType: string;
  productPurchased: string;
  rating: number;
  comment: string;
  date: string;
}
