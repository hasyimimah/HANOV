import { CartItem, CheckoutFormData, Product, ProductVariant } from '../types/store';

export const HANOV_RAW_PHONE = '081226132798';
export const HANOV_DISPLAY_PHONE = '0812-2613-2798';

/**
 * Mengubah nomor lokal Indonesia (08...) menjadi format internasional wa.me (628...)
 */
export function normalizeWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith('62')) {
    return digits;
  }
  return `62${digits}`;
}

export const HANOV_WA_NUMBER = normalizeWhatsAppNumber(HANOV_RAW_PHONE); // "6281226132798"

/**
 * Format angka menjadi mata uang Rupiah yang bersih (contoh: Rp 189.000)
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/**
 * Membuat URL wa.me resmi dengan encodeURIComponent yang aman
 */
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${HANOV_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Menyusun struk pemesanan lengkap dari Keranjang Belanja + Form Checkout
 */
export function buildCartOrderMessage(params: {
  items: CartItem[];
  customer: CheckoutFormData;
  subtotal: number;
  discountAmount: number;
  promoCode?: string;
  freeShippingUnlocked: boolean;
  finalTotal: number;
  orderCode: string;
}): string {
  const {
    items,
    customer,
    subtotal,
    discountAmount,
    promoCode,
    freeShippingUnlocked,
    finalTotal,
    orderCode,
  } = params;

  const itemLines = items
    .map((item, idx) => {
      const lineTotal = item.variant.price * item.quantity;
      return `${idx + 1}. *${item.product.name}* (${item.variant.label})\n   ${item.quantity}x @ ${formatRupiah(item.variant.price)} = *${formatRupiah(lineTotal)}*`;
    })
    .join('\n');

  const lines: string[] = [
    `Halo Admin *HANOV Official Store* ✨`,
    `Saya ingin memesan produk berikut melalui website resmi HANOV:`,
    ``,
    `*No. Referensi:* #${orderCode}`,
    `────────────────────────`,
    `*DAFTAR PESANAN:*`,
    itemLines,
    `────────────────────────`,
    `Subtotal Produk: ${formatRupiah(subtotal)}`,
  ];

  if (discountAmount > 0 && promoCode) {
    lines.push(`Potongan Voucher (${promoCode}): -${formatRupiah(discountAmount)}`);
  }

  lines.push(
    `Estimasi Ongkir: ${freeShippingUnlocked ? 'GRATIS ONGKIR (Promo Min. Rp 300rb)' : 'Dihitung Admin sesuai kecamatan'}`,
    `*TOTAL BELANJA: ${formatRupiah(finalTotal)}*`,
    `────────────────────────`,
    `*DATA PENGIRIMAN:*`,
    `• Nama Penerima: ${customer.customerName.trim() || '-'}`,
    `• No. HP / WA: ${customer.customerPhone.trim() || '-'}`,
    `• Kota / Kecamatan: ${customer.cityDistrict.trim() || '-'}`,
    `• Alamat Lengkap: ${customer.fullAddress.trim() || '-'}`,
    `• Ekspedisi: ${customer.courier}`,
    `• Pembayaran: ${customer.paymentMethod}`,
  );

  if (customer.notes.trim()) {
    lines.push(`• Catatan: ${customer.notes.trim()}`);
  }

  lines.push(
    ``,
    `Mohon informasi ketersediaan stok dan konfirmasi total pembayarannya ya Kak. Terima kasih! 🙏`
  );

  return lines.join('\n');
}

/**
 * Menyusun pesan beli cepat (1 produk langsung dari modal detail produk)
 */
export function buildQuickSingleProductMessage(
  product: Product,
  variant: ProductVariant,
  quantity: number
): string {
  const total = variant.price * quantity;
  return [
    `Halo Admin *HANOV Official Store* ✨`,
    `Saya tertarik dan ingin memesan langsung produk berikut:`,
    ``,
    `• *Produk:* ${product.name}`,
    `• *Varian:* ${variant.label}`,
    `• *Jumlah:* ${quantity} pcs`,
    `• *Subtotal:* *${formatRupiah(total)}*`,
    ``,
    `Berikut data pengiriman saya:`,
    `• Nama Penerima: `,
    `• Alamat Lengkap & Kecamatan: `,
    `• Metode Pembayaran (Transfer / QRIS / COD): `,
    ``,
    `Mohon dibantu proses pesanannya ya Kak. Terima kasih! 🙏`,
  ].join('\n');
}

/**
 * Menyusun pesan konsultasi kulit gratis dengan Beauty Advisor HANOV
 */
export function buildSkinConsultationMessage(skinConditionTitle?: string): string {
  if (skinConditionTitle) {
    return [
      `Halo Beauty Advisor *HANOV* ✨`,
      `Saya baru saja melihat panduan perawatan di website HANOV untuk kondisi kulit: *${skinConditionTitle}*.`,
      ``,
      `Boleh minta rekomendasi rangkaian produk HANOV yang paling cocok untuk kulit saya? Terima kasih! 🙏`,
    ].join('\n');
  }

  return [
    `Halo Beauty Advisor *HANOV* ✨`,
    `Saya ingin berkonsultasi mengenai produk skincare / kosmetik HANOV yang cocok untuk jenis kulit saya. Mohon dibantu ya Kak! 🙏`,
  ].join('\n');
}
