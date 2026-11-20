import { useEffect, useMemo, useState } from 'react';
import { MessageCircle, Search, ShoppingBag, SlidersHorizontal, X } from 'lucide-react';
import { HANOV_PRODUCTS } from './data/products';
import { CartItem, Product, ProductCategory, ProductVariant } from './types/store';
import {
  buildSkinConsultationMessage,
  createWhatsAppUrl,
  formatRupiah,
} from './utils/whatsapp';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SkinAdvisorSection } from './components/SkinAdvisorSection';
import { BrandPhilosophyAndReviews } from './components/BrandPhilosophyAndReviews';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

const CART_STORAGE_KEY = 'hanov_cart_items_v1';

type FilterTab = 'all' | ProductCategory;
type SortOption = 'popular' | 'price-asc' | 'price-desc';

export function App() {
  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  // Catalog Filters & Search
  const [activeCategory, setActiveCategory] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Product Detail Modal State
  const [selectedModalProduct, setSelectedModalProduct] = useState<{
    product: Product;
    variant: ProductVariant;
  } | null>(null);

  // Cart Drawer State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartInitialStep, setCartInitialStep] = useState<'cart' | 'checkout'>('cart');

  // Subtle Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore storage errors
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Add item to cart
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    const cartKey = `${product.id}__${variant.id}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { cartKey, product, variant, quantity }];
    });

    showToast(`${product.name} (${variant.label}) ditambahkan ke keranjang.`);
  };

  // Buy Now -> Add item & immediately open Checkout Form step
  const handleBuyNowToCheckout = (product: Product, variant: ProductVariant, quantity = 1) => {
    handleAddToCart(product, variant, quantity);
    setSelectedModalProduct(null);
    setCartInitialStep('checkout');
    setIsCartOpen(true);
  };

  // Add entire 3-step skin routine to cart
  const handleAddRoutineToCart = (products: Product[]) => {
    products.forEach((prod) => {
      const defaultVar = prod.variants[0];
      const cartKey = `${prod.id}__${defaultVar.id}`;
      setCartItems((prev) => {
        const idx = prev.findIndex((item) => item.cartKey === cartKey);
        if (idx > -1) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
          return updated;
        }
        return [...prev, { cartKey, product: prod, variant: defaultVar, quantity: 1 }];
      });
    });
    showToast('3 produk rekomendasi rutinitas ditambahkan ke keranjang.');
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalCartPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.variant.price * item.quantity, 0),
    [cartItems]
  );

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = HANOV_PRODUCTS.filter((prod) => {
      const matchesCategory = activeCategory === 'all' || prod.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.subtitle.toLowerCase().includes(q) ||
        prod.categoryLabel.toLowerCase().includes(q) ||
        prod.skinTypes.some((s) => s.toLowerCase().includes(q))
      );
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.variants[0].price - b.variants[0].price;
      }
      if (sortBy === 'price-desc') {
        return b.variants[0].price - a.variants[0].price;
      }
      return b.soldCount - a.soldCount;
    });
  }, [activeCategory, searchQuery, sortBy]);

  const categoryTabs: { id: FilterTab; label: string; count: number }[] = [
    { id: 'all', label: 'Semua Koleksi', count: HANOV_PRODUCTS.length },
    {
      id: 'skincare',
      label: 'Skincare Wajah',
      count: HANOV_PRODUCTS.filter((p) => p.category === 'skincare').length,
    },
    {
      id: 'cosmetics',
      label: 'Kosmetik & Bibir',
      count: HANOV_PRODUCTS.filter((p) => p.category === 'cosmetics').length,
    },
    {
      id: 'bundling',
      label: 'Paket Bundling',
      count: HANOV_PRODUCTS.filter((p) => p.category === 'bundling').length,
    },
  ];

  const consultationUrl = createWhatsAppUrl(buildSkinConsultationMessage());

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      {/* Sticky Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => {
          setCartInitialStep('cart');
          setIsCartOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero + Trust Strip */}
        <HeroSection />

        {/* Curated Product Catalog Section */}
        <section id="koleksi" className="py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Section Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65E4E]">
                  Katalog Resmi HANOV
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1C1917] leading-tight">
                  Perawatan Esensial &amp; Kosmetik Pilihan
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B625B] max-w-sm">
                Klik produk untuk melihat detail kandungan aktif, nomor BPOM, atau pilih varian
                sebelum memesan via WhatsApp.
              </p>
            </div>

            {/* Single Clean Filter & Search Toolbar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pt-2 pb-2 border-b border-[#E6DFD7]">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                {categoryTabs.map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveCategory(tab.id)}
                      className={`shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                          : 'bg-[#F3EFEA] hover:bg-[#E8E1D8] text-[#4A433E]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`ml-1.5 text-[11px] tabular-nums ${
                          isActive ? 'text-[#D89D8E]' : 'text-[#8C8279]'
                        }`}
                      >
                        ({tab.count})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Input + Sort Select */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-[#8C8279] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari serum, cushion, bibir..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#D8CFC5] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#9C9288] focus:outline-none focus:border-[#A65E4E]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8279] hover:text-[#1C1917] cursor-pointer"
                      aria-label="Hapus pencarian"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="relative inline-flex items-center">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B625B] absolute left-3.5 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Urutkan produk"
                    className="w-full sm:w-auto pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#D8CFC5] text-xs sm:text-sm font-medium text-[#1C1917] focus:outline-none focus:border-[#A65E4E] cursor-pointer"
                  >
                    <option value="popular">Paling Diminati</option>
                    <option value="price-asc">Harga Terendah</option>
                    <option value="price-desc">Harga Tertinggi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={(prod, variant) =>
                      setSelectedModalProduct({ product: prod, variant })
                    }
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-[#E6DFD7] px-4 space-y-3">
                <p className="font-serif text-2xl font-semibold text-[#1C1917]">
                  Produk tidak ditemukan
                </p>
                <p className="text-xs sm:text-sm text-[#6B625B]">
                  Coba kata kunci lain atau tampilkan kembali seluruh koleksi HANOV.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold cursor-pointer"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Skin Routine Advisor */}
        <SkinAdvisorSection
          onSelectProduct={(prod, variant) => setSelectedModalProduct({ product: prod, variant })}
          onAddRoutineToCart={handleAddRoutineToCart}
        />

        {/* Brand Formulation Story & Customer Reviews */}
        <BrandPhilosophyAndReviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedModalProduct?.product || null}
        initialVariant={selectedModalProduct?.variant || null}
        onClose={() => setSelectedModalProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNowToCheckout={handleBuyNowToCheckout}
      />

      {/* Slide-Over Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        initialStep={cartInitialStep}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toastMessage && !isCartOpen && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md rounded-2xl bg-[#1C1917] text-[#FAF8F5] px-4 py-3 shadow-xl border border-[#38322E] flex items-center justify-between gap-3 animate-fade-in">
          <p className="text-xs font-medium line-clamp-1">{toastMessage}</p>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setCartInitialStep('cart');
              setIsCartOpen(true);
            }}
            className="shrink-0 text-xs font-semibold text-[#E2A898] hover:underline cursor-pointer"
          >
            Lihat Keranjang
          </button>
        </div>
      )}

      {/* Floating Direct WhatsApp Chat Button (Desktop & when Mobile Cart Bar is empty) */}
      {!isCartOpen && (
        <a
          href={consultationUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat langsung ke WhatsApp HANOV"
          className={`fixed right-4 sm:right-6 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#1B7A43] hover:bg-[#156336] text-white text-xs font-semibold shadow-lg transition-all ${
            totalCartCount > 0 ? 'bottom-22 sm:bottom-6' : 'bottom-5 sm:bottom-6'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Chat Admin WA</span>
        </a>
      )}

      {/* Sticky Mobile Bottom Cart Conversion Bar */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E6DFD7] px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-8px_24px_rgba(28,25,23,0.08)]">
          <div>
            <p className="text-[11px] text-[#6B625B]">{totalCartCount} produk dipilih</p>
            <p className="text-sm font-bold text-[#1C1917] tabular-nums">
              {formatRupiah(totalCartPrice)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartInitialStep('checkout');
              setIsCartOpen(true);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#1B7A43] text-white text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pesan via WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
