import React, { useState } from 'react';
import {
  ShoppingBag,
  Bell,
  User as UserIcon,
  Search,
  Truck,
  Store,
  SlidersHorizontal,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types/ecommerce';

interface NavbarProps {
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchChange,
  selectedCategory = 'Semua',
  onSelectCategory,
}) => {
  const {
    brandSettings,
    currentUser,
    logout,
    switchRole,
    setIsAuthModalOpen,
    cartCount,
    setIsCartOpen,
    unreadNotificationCount,
    setIsNotificationOpen,
    activeView,
    setActiveView,
  } = useStore();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const categories = ['Semua', 'Denim', 'Streetwear', 'Jackets', 'Tops', 'Bags', 'Shoes'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      {/* Top Announcement Bar - editable by Admin */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span className="bg-amber-400 text-black font-bold px-1.5 py-0.5 rounded-xs text-[10px]">
          HOT SALE -{brandSettings.discountHighlight}
        </span>
        <span className="truncate max-w-xl">{brandSettings.announcementText}</span>
        <button
          onClick={() => setActiveView('shop')}
          className="underline hover:text-amber-300 ml-1 cursor-pointer"
        >
          Belanja Sekarang
        </button>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo - Customized by Admin */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveView('shop')}
              className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-display font-extrabold text-xl rounded-sm tracking-tighter group-hover:bg-neutral-800 transition-colors">
                {brandSettings.logoLetter || brandSettings.brandName.charAt(0)}
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl tracking-tighter text-black uppercase leading-none">
                  {brandSettings.brandName}
                </h1>
                <p className="text-[10px] text-gray-500 tracking-widest uppercase font-medium mt-0.5">
                  {brandSettings.tagline}
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveView('shop')}
              className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeView === 'shop'
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              Katalog Toko
            </button>
            <button
              onClick={() => setActiveView('tracking')}
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'tracking'
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Truck className="w-4 h-4 text-emerald-500" />
              <span>Lacak Kurir Real-Time</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-active ml-0.5" />
            </button>
            <button
              onClick={() => setActiveView('seller')}
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'seller'
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              <Store className="w-4 h-4 text-indigo-500" />
              <span>Dashboard Penjual</span>
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeView === 'admin'
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-100'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>Admin Brand</span>
            </button>
          </nav>

          {/* Search bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari denim, jaket, streetwear..."
              value={searchInput}
              onChange={handleSearch}
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Actions & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-800 transition-colors border border-gray-200 cursor-pointer"
                title="Ganti Mode Akun"
              >
                <span className="capitalize">
                  {currentUser?.role === 'buyer' && '🛍️ Pembeli'}
                  {currentUser?.role === 'seller' && '🏪 Penjual'}
                  {currentUser?.role === 'admin' && '👑 Admin Brand'}
                  {!currentUser && 'Tamu'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-toast">
                  <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Ganti Peran Akun
                  </div>
                  <button
                    onClick={() => {
                      switchRole('buyer');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                      currentUser?.role === 'buyer' ? 'font-bold text-black bg-gray-50' : 'text-gray-700'
                    }`}
                  >
                    <span>🛍️ Akun Pembeli (Buyer)</span>
                    {currentUser?.role === 'buyer' && <Check className="w-3.5 h-3.5 text-black" />}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('seller');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                      currentUser?.role === 'seller' ? 'font-bold text-black bg-gray-50' : 'text-gray-700'
                    }`}
                  >
                    <span>🏪 Akun Penjual (Seller)</span>
                    {currentUser?.role === 'seller' && <Check className="w-3.5 h-3.5 text-black" />}
                  </button>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                      currentUser?.role === 'admin' ? 'font-bold text-black bg-gray-50' : 'text-gray-700'
                    }`}
                  >
                    <span>👑 Admin Brand (Custom Brand)</span>
                    {currentUser?.role === 'admin' && <Check className="w-3.5 h-3.5 text-black" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell (Email & SMS) */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Notifikasi Otomatis (Email & SMS)"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Auth (Login/Logout) */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <div className="hidden xl:block text-left">
                  <div className="text-xs font-bold text-gray-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-gray-500 capitalize">{currentUser.role}</div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Dashboard Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between py-2.5 border-t border-gray-100 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveView('shop')}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              activeView === 'shop' ? 'bg-black text-white' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Katalog
          </button>
          <button
            onClick={() => setActiveView('tracking')}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap flex items-center gap-1 ${
              activeView === 'tracking' ? 'bg-black text-white' : 'text-gray-600 bg-gray-100'
            }`}
          >
            <Truck className="w-3 h-3 text-emerald-400" />
            <span>Lacak Real-Time</span>
          </button>
          <button
            onClick={() => setActiveView('seller')}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              activeView === 'seller' ? 'bg-black text-white' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Penjual
          </button>
          <button
            onClick={() => setActiveView('admin')}
            className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
              activeView === 'admin' ? 'bg-black text-white' : 'text-gray-600 bg-gray-100'
            }`}
          >
            Admin Brand
          </button>
        </div>

        {/* Category Filter Chips Bar (Shown when activeView is shop) */}
        {activeView === 'shop' && onSelectCategory && (
          <div className="flex items-center gap-2 py-3 border-t border-gray-100 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-black text-white font-bold shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
