import React, { useState, useMemo } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrackingView } from './components/TrackingView';
import { NotificationModal } from './components/NotificationModal';
import { NotificationToast } from './components/NotificationToast';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminBrandDashboard } from './components/AdminBrandDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, ArrowRight, Star, Truck, ShieldCheck, Zap } from 'lucide-react';

const MainContent: React.FC = () => {
  const { products, activeView, setActiveView, brandSettings } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'Semua' || prod.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-neutral-900 font-sans-clean">
      {/* Navigation */}
      <Navbar
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'shop' && (
          <div>
            {/* Hero Banner with fashion models & promo badge */}
            <HeroBanner onExploreClick={() => {
              const el = document.getElementById('product-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* Sub-Header Promo Banner matching the uploaded screenshot */}
            <section className="bg-neutral-900 text-white border-y border-neutral-800 py-6 px-4">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-400 text-black font-display font-black text-xl px-3 py-1 rounded-md">
                    -{brandSettings.discountHighlight}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {brandSettings.announcementText}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Gunakan kode kupon <span className="text-amber-300 font-mono font-bold">DISKON80</span> di keranjang belanja.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveView('tracking')}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>Live GPS Tracking</span>
                  </button>
                  <button
                    onClick={() => setActiveView('seller')}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-black text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Kelola Toko (Penjual)
                  </button>
                </div>
              </div>
            </section>

            {/* Catalog Grid Section */}
            <section id="product-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Katalog Pilihan {brandSettings.brandName}</span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-950 uppercase tracking-tight">
                    Popular Web Brand Collection
                  </h2>
                </div>

                <div className="text-xs text-gray-500 font-medium">
                  Menampilkan <strong>{filteredProducts.length}</strong> produk busana
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <p className="text-sm font-bold text-gray-800">
                    Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                    }}
                    className="mt-3 px-4 py-2 bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reset Filter Pencarian
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              )}
            </section>

            {/* Fashion Quote & Testimonials Section */}
            <section className="bg-white border-t border-gray-200 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    Testimoni Pelanggan
                  </span>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mt-1">
                    What People Say About Trend?
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Dian Permata',
                      role: 'Fashion Enthusiast',
                      comment:
                        'Jaket denim vintage-nya luar biasa nyaman dan tebal. Yang paling mengesankan pelacakan kurirnya real-time dan notifikasi SMS-nya langsung masuk!',
                      rating: 5,
                    },
                    {
                      name: 'Rian Pratama',
                      role: 'Streetwear Collector',
                      comment:
                        'Kualitas sablon dan potongan boxy oversized-nya pas banget. Pengiriman kilat J&T langsung sampai di hari yang sama.',
                      rating: 5,
                    },
                    {
                      name: 'Siti Rahma',
                      role: 'Urban Chic Stylist',
                      comment:
                        'Blouse off-shoulder dan aksesorisnya sangat cantik. Notifikasi invoice email sangat rapi dan customer service responsif.',
                      rating: 5,
                    },
                  ].map((t, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3"
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 italic leading-relaxed">
                        "{t.comment}"
                      </p>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="text-xs font-bold text-gray-900">{t.name}</div>
                        <div className="text-[10px] text-gray-400">{t.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* View 2: Real-Time Shipment Tracking (Feature 8) */}
        {activeView === 'tracking' && <TrackingView />}

        {/* View 3: Seller Dashboard (Features 3, 4, 5, 6) */}
        {activeView === 'seller' && <SellerDashboard />}

        {/* View 4: Admin Brand Customizer Dashboard */}
        {activeView === 'admin' && <AdminBrandDashboard />}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <NotificationModal />
      <NotificationToast />
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
