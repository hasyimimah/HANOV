import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { CartItem, CheckoutFormData } from '../types/store';
import {
  HANOV_DISPLAY_PHONE,
  buildCartOrderMessage,
  createWhatsAppUrl,
  formatRupiah,
} from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  initialStep?: 'cart' | 'checkout';
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 300000;
const CUSTOMER_STORAGE_KEY = 'hanov_customer_checkout_v1';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  initialStep = 'cart',
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'sent'>(initialStep);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [formError, setFormError] = useState('');
  const [lastOrderUrl, setLastOrderUrl] = useState('');

  const [customer, setCustomer] = useState<CheckoutFormData>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return {
      customerName: '',
      customerPhone: '',
      cityDistrict: '',
      fullAddress: '',
      paymentMethod: 'QRIS Instan (E-Wallet & M-Banking)',
      courier: 'Reguler (J&T / JNE / SiCepat)',
      notes: '',
    };
  });

  useEffect(() => {
    if (isOpen) {
      setStep(items.length === 0 ? 'cart' : initialStep);
      setFormError('');
    }
  }, [isOpen, initialStep, items.length]);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
    } catch {
      // ignore storage errors
    }
  }, [customer]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.variant.price * item.quantity, 0),
    [items]
  );

  const discountAmount = useMemo(() => {
    if (appliedPromo === 'HANOV10') {
      return Math.round(subtotal * 0.1);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const finalTotal = Math.max(0, subtotal - discountAmount);
  const freeShippingUnlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const orderCode = useMemo(() => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = String(( subtotal % 899 ) + 100);
    return `HNV-${mm}${dd}-${rand}`;
  }, [subtotal]);

  const formattedWaMessage = useMemo(
    () =>
      buildCartOrderMessage({
        items,
        customer,
        subtotal,
        discountAmount,
        promoCode: appliedPromo || undefined,
        freeShippingUnlocked,
        finalTotal,
        orderCode,
      }),
    [
      items,
      customer,
      subtotal,
      discountAmount,
      appliedPromo,
      freeShippingUnlocked,
      finalTotal,
      orderCode,
    ]
  );

  const handleApplyPromo = (codeToApply?: string) => {
    const clean = (codeToApply ?? promoInput).trim().toUpperCase();
    if (!clean) return;
    if (clean === 'HANOV10') {
      setAppliedPromo('HANOV10');
      setPromoInput('HANOV10');
      setPromoError('');
    } else {
      setPromoError('Kode voucher tidak ditemukan. Coba kode: HANOV10');
    }
  };

  const handleSubmitWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.customerName.trim()) {
      setFormError('Mohon isi Nama Lengkap Penerima terlebih dahulu.');
      return;
    }
    if (!customer.customerPhone.trim() || customer.customerPhone.replace(/\D/g, '').length < 9) {
      setFormError('Mohon isi Nomor WhatsApp / HP aktif Anda dengan benar.');
      return;
    }
    if (!customer.cityDistrict.trim()) {
      setFormError('Mohon isi Kota / Kabupaten & Kecamatan tujuan pengiriman.');
      return;
    }
    if (!customer.fullAddress.trim()) {
      setFormError('Mohon lengkapi Alamat Pengiriman (Nama Jalan & No. Rumah).');
      return;
    }

    setFormError('');
    const waUrl = createWhatsAppUrl(formattedWaMessage);
    setLastOrderUrl(waUrl);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setStep('sent');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Keranjang Belanja dan Checkout WhatsApp HANOV"
    >
      <div
        className="w-full max-w-md sm:max-w-lg h-full bg-[#FAF8F5] border-l border-[#E6DFD7] shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Drawer Header */}
        <div className="px-5 py-4 bg-white border-b border-[#E6DFD7] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-[#F3EFEA] text-[#1C1917] cursor-pointer"
                aria-label="Kembali ke keranjang"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#1C1917] leading-none">
                {step === 'cart' && 'Tas Belanja HANOV'}
                {step === 'checkout' && 'Data Pengiriman WhatsApp'}
                {step === 'sent' && 'Pesanan Siap Dikirim'}
              </h2>
              <p className="text-[11px] text-[#6B625B] mt-1">
                {step === 'cart' && `${items.reduce((s, i) => s + i.quantity, 0)} produk dipilih`}
                {step === 'checkout' && `Terhubung langsung ke WA Resmi ${HANOV_DISPLAY_PHONE}`}
                {step === 'sent' && `Nomor tujuan: ${HANOV_DISPLAY_PHONE}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F3EFEA] hover:bg-[#E6DFD7] flex items-center justify-center text-[#1C1917] transition-colors cursor-pointer"
            aria-label="Tutup keranjang"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Strip (when cart has items and not in sent screen) */}
        {items.length > 0 && step !== 'sent' && (
          <div className="px-5 py-3 bg-[#F3EFEA] border-b border-[#E6DFD7] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#1C1917]">
                <Truck className="w-3.5 h-3.5 text-[#5A6B5C]" />
                {freeShippingUnlocked ? (
                  <span className="text-[#1B7A43] font-semibold">
                    Selamat! Anda mendapat Gratis Ongkir Seluruh Indonesia
                  </span>
                ) : (
                  <span>
                    Tambah <strong>{formatRupiah(remainingForFreeShipping)}</strong> lagi untuk{' '}
                    <strong>Gratis Ongkir</strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] font-semibold text-[#6B625B] tabular-nums">
                {shippingProgressPct}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E2D9CE] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#5A6B5C] transition-all duration-300"
                style={{ width: `${shippingProgressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* EMPTY STATE */}
          {items.length === 0 && step !== 'sent' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3EFEA] border border-[#E6DFD7] flex items-center justify-center text-[#A65E4E]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
                  Tas Belanja Masih Kosong
                </h3>
                <p className="text-xs sm:text-sm text-[#6B625B] max-w-xs leading-relaxed">
                  Pilih produk skincare atau kosmetik favorit Anda dari katalog HANOV untuk memesan
                  langsung via WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#A65E4E] hover:bg-[#8E4D3E] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          )}

          {/* STEP 1: CART ITEMS + PROMO */}
          {items.length > 0 && step === 'cart' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="p-3.5 rounded-2xl bg-white border border-[#E6DFD7] flex gap-3.5"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-20 rounded-xl object-cover shrink-0 bg-[#F3EFEA] border border-[#EDE7DF]"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#1C1917] leading-snug line-clamp-2">
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-[#6B625B] mt-0.5 flex items-center gap-1.5">
                            {item.variant.colorHex && (
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                                style={{ backgroundColor: item.variant.colorHex }}
                              />
                            )}
                            <span>{item.variant.label}</span>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartKey)}
                          className="p-1 text-[#9C9288] hover:text-red-600 transition-colors cursor-pointer"
                          aria-label={`Hapus ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-[#1C1917] tabular-nums">
                          {formatRupiah(item.variant.price * item.quantity)}
                        </span>

                        <div className="inline-flex items-center rounded-lg border border-[#D8CFC5] bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, -1)}
                            className="px-2 py-1 text-[#1C1917] hover:text-[#A65E4E] cursor-pointer"
                            aria-label="Kurangi"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.cartKey, 1)}
                            className="px-2 py-1 text-[#1C1917] hover:text-[#A65E4E] cursor-pointer"
                            aria-label="Tambah"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Voucher Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E6DFD7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917]">
                    <Tag className="w-3.5 h-3.5 text-[#A65E4E]" />
                    Kode Voucher Promo
                  </span>
                  {!appliedPromo ? (
                    <button
                      type="button"
                      onClick={() => handleApplyPromo('HANOV10')}
                      className="text-[11px] font-semibold text-[#A65E4E] hover:underline cursor-pointer"
                    >
                      Pakai HANOV10 (Diskon 10%)
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedPromo(null);
                        setPromoInput('');
                      }}
                      className="text-[11px] font-medium text-[#6B625B] hover:text-red-600 cursor-pointer"
                    >
                      Hapus Voucher
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Masukkan kode (cth: HANOV10)"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#D8CFC5] bg-[#FAF8F5] text-xs font-medium uppercase placeholder:normal-case focus:outline-none focus:border-[#A65E4E]"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyPromo()}
                    className="px-4 py-2 rounded-xl bg-[#1C1917] hover:bg-[#322C28] text-white text-xs font-semibold cursor-pointer"
                  >
                    Pakai
                  </button>
                </div>

                {appliedPromo && (
                  <p className="text-xs text-[#1B7A43] font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Voucher {appliedPromo} aktif! Hemat {formatRupiah(discountAmount)}.
                  </p>
                )}
                {promoError && <p className="text-xs text-red-600">{promoError}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: WHATSAPP CHECKOUT FORM */}
          {items.length > 0 && step === 'checkout' && (
            <form id="wa-checkout-form" onSubmit={handleSubmitWhatsAppOrder} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-[#EBF5EE] border border-[#C6E2CF] text-xs text-[#165B33] leading-relaxed">
                Pesanan Anda akan diformat otomatis dan dikirim langsung ke WhatsApp Admin{' '}
                <strong>HANOV ({HANOV_DISPLAY_PHONE})</strong> untuk konfirmasi pengiriman.
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {formError}
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Nama Lengkap Penerima <span className="text-[#A65E4E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.customerName}
                    onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                    placeholder="Contoh: Siti Rahmawati"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Nomor HP / WhatsApp Pembeli <span className="text-[#A65E4E]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.customerPhone}
                    onChange={(e) => setCustomer({ ...customer, customerPhone: e.target.value })}
                    placeholder="Contoh: 0812xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Kota / Kabupaten &amp; Kecamatan <span className="text-[#A65E4E]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.cityDistrict}
                    onChange={(e) => setCustomer({ ...customer, cityDistrict: e.target.value })}
                    placeholder="Contoh: Kec. Coblong, Kota Bandung"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Alamat Lengkap &amp; Kode Pos <span className="text-[#A65E4E]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={customer.fullAddress}
                    onChange={(e) => setCustomer({ ...customer, fullAddress: e.target.value })}
                    placeholder="Nama jalan, nomor rumah, RT/RW, patokan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Metode Pembayaran
                    </label>
                    <select
                      value={customer.paymentMethod}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          paymentMethod: e.target.value as CheckoutFormData['paymentMethod'],
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                    >
                      <option value="QRIS Instan (E-Wallet & M-Banking)">QRIS Instan</option>
                      <option value="Transfer Bank (BCA / Mandiri / BRI)">Transfer Bank</option>
                      <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Pilihan Ekspedisi
                    </label>
                    <select
                      value={customer.courier}
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          courier: e.target.value as CheckoutFormData['courier'],
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl border border-[#D8CFC5] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                    >
                      <option value="Reguler (J&T / JNE / SiCepat)">Reguler (J&amp;T/JNE)</option>
                      <option value="Instant / Same Day">Instant / Same Day</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Catatan Tambahan (Opsional)
                  </label>
                  <input
                    type="text"
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Contoh: Tolong packing bubble wrap tebal / kartu ucapan"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D8CFC5] bg-white text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#A65E4E]"
                  />
                </div>
              </div>

              {/* Live WhatsApp Message Preview Accordion */}
              <div className="rounded-2xl border border-[#E6DFD7] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowMessagePreview(!showMessagePreview)}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-[#1C1917] hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#A65E4E]" />
                    <span>Pratinjau Pesan Struk WhatsApp</span>
                  </span>
                  <span className="text-[#A65E4E]">{showMessagePreview ? 'Tutup' : 'Lihat'}</span>
                </button>
                {showMessagePreview && (
                  <pre className="px-4 pb-4 pt-1 text-[11px] text-[#4A433E] whitespace-pre-wrap font-sans bg-[#FAF8F5] border-t border-[#EDE7DF] leading-relaxed">
                    {formattedWaMessage}
                  </pre>
                )}
              </div>
            </form>
          )}

          {/* STEP 3: ORDER DISPATCHED CONFIRMATION */}
          {step === 'sent' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-8 px-3 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#1B7A43] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917]">
                  Mengarahkan ke WhatsApp HANOV
                </h3>
                <p className="text-xs sm:text-sm text-[#6B625B] max-w-sm leading-relaxed">
                  Jendela chat WhatsApp ke nomor resmi{' '}
                  <strong className="text-[#1C1917]">{HANOV_DISPLAY_PHONE}</strong> telah dibuka
                  dengan detail pesanan Anda. Silakan klik tombol <strong>Kirim (Send)</strong> di
                  aplikasi WhatsApp Anda.
                </p>
              </div>

              <div className="w-full space-y-2.5 pt-2">
                {lastOrderUrl && (
                  <a
                    href={lastOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#1B7A43] hover:bg-[#156336] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Buka Ulang Chat WhatsApp ({HANOV_DISPLAY_PHONE})</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClearCart();
                    setStep('cart');
                    onClose();
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-white hover:bg-[#F3EFEA] border border-[#D8CFC5] text-xs sm:text-sm font-semibold text-[#1C1917] cursor-pointer"
                >
                  Selesai &amp; Kosongkan Keranjang
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Drawer Footer Summary & Primary Action */}
        {items.length > 0 && step !== 'sent' && (
          <div className="p-5 bg-white border-t border-[#E6DFD7] space-y-3.5">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[#6B625B]">
                <span>Subtotal Produk</span>
                <span className="tabular-nums font-medium text-[#1C1917]">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1B7A43]">
                  <span>Diskon Voucher ({appliedPromo})</span>
                  <span className="tabular-nums font-semibold">
                    -{formatRupiah(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-[#1C1917] pt-1.5 border-t border-[#F0EAE2]">
                <span>Total Estimasi</span>
                <span className="tabular-nums">{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-5 rounded-xl bg-[#1C1917] hover:bg-[#A65E4E] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Lanjut Isi Alamat &amp; Pesan WA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="wa-checkout-form"
                className="w-full py-3.5 px-5 rounded-xl bg-[#1B7A43] hover:bg-[#156336] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Sekarang via WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
