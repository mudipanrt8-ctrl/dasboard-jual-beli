import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Mail, Phone, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { brandSettings, setActiveView } = useStore();

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Slogan */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white text-black font-display font-extrabold text-lg flex items-center justify-center rounded-sm">
                {brandSettings.logoLetter || brandSettings.brandName.charAt(0)}
              </div>
              <span className="font-display font-black text-2xl tracking-tighter uppercase">
                {brandSettings.brandName}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {brandSettings.heroSubtext}
            </p>

            <div className="space-y-1 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>{brandSettings.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>{brandSettings.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => setActiveView('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Katalog Busana
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('tracking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lacak Pengiriman Real-Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('seller')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard Penjual
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('admin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Admin Ganti Nama Brand
                </button>
              </li>
            </ul>
          </div>

          {/* Fitur Utama */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Fitur Platform
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>GPS Resi Satelit Real-Time</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>Notifikasi Email Invoice & Resi</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>SMS Kurir Bergerak Otomatis</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Garansi 100% Original Brand</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Promo box */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              Dapatkan Promo {brandSettings.discountHighlight} OFF
            </h4>
            <p className="text-xs text-gray-400">
              Daftarkan emailmu untuk info flash sale dan update tren denim mingguan.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="emailmu@gmail.com"
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
              />
              <button className="px-3.5 py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                Kirim
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} {brandSettings.brandName} Inc. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Kebijakan Privasi</span>
            <span className="hover:text-gray-400 cursor-pointer">Syarat & Ketentuan</span>
            <span className="hover:text-gray-400 cursor-pointer">Pusat Bantuan Resi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
