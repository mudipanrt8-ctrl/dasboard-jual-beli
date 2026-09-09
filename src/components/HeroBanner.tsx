import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  const { brandSettings, setActiveView } = useStore();

  return (
    <div className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Background Subtle Gradient & Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Catchphrase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COLLECTION 2026 • UP TO {brandSettings.discountHighlight} OFF</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] uppercase">
              {brandSettings.tagline || 'NEW FASHION STYLE TREN'}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-normal max-w-lg leading-relaxed">
              {brandSettings.heroSubtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-white text-black font-bold text-sm rounded-md hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg cursor-pointer group"
              >
                <span>Lihat Koleksi Terbaru</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('tracking')}
                className="px-5 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-sm rounded-md border border-neutral-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Lacak Kurir Real-Time</span>
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Produk Original</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pengiriman Kilat & Resi Real-Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Notifikasi Otomatis SMS & Email</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Inspiration Layout matching uploaded image */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-xl bg-neutral-800 border border-neutral-700">
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=700&auto=format&fit=crop&q=80"
                alt="Denim Fashion Models"
                className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  Featured Look
                </span>
                <h3 className="font-display font-bold text-lg text-white">Denim Duo Iconics</h3>
                <p className="text-xs text-gray-300">Potongan santai wash 90s</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded-xl bg-neutral-800 border border-neutral-700 h-[152px]">
                <img
                  src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80"
                  alt="Vintage Denim Jacket"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-sm border border-neutral-700">
                  TREND 2026
                </div>
                <div className="absolute bottom-2 left-3">
                  <span className="text-xs font-bold text-white bg-black/70 px-2 py-0.5 rounded-xs">
                    Vintage Wash
                  </span>
                </div>
              </div>

              <div className="relative p-4 rounded-xl bg-linear-to-r from-amber-500/20 to-neutral-800 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Kupon Terbatas
                  </div>
                  <div className="font-display font-extrabold text-2xl text-white">DISKON80</div>
                  <div className="text-[11px] text-gray-300">Gunakan saat checkout</div>
                </div>
                <div className="bg-amber-400 text-black font-extrabold text-xl px-3 py-2 rounded-lg font-display">
                  -80%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
