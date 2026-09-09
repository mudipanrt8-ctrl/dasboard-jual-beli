import React, { useState } from 'react';
import { X, User, Lock, Mail, Store, ShieldCheck, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types/ecommerce';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    currentUser,
    login,
    logout,
    usersList,
    switchRole,
    brandSettings,
  } = useStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [emailInput, setEmailInput] = useState('lukihanun@gmail.com');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMessage('Silakan masukkan alamat email');
      return;
    }
    const ok = login(emailInput.trim(), selectedRole);
    if (ok) {
      setIsAuthModalOpen(false);
    } else {
      setErrorMessage('Login gagal, silakan coba lagi');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden animate-toast">
        {/* Modal Header */}
        <div className="p-5 bg-black text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Akses Sistem
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {currentUser ? 'Kelola Akun & Logout' : 'Masuk ke Dashboard E-Commerce'}
            </h3>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {currentUser ? (
            /* Logged in state: Show profile info & Logout button */
            <div className="space-y-5 text-center">
              <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-4 border-gray-200 shadow-md">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-display font-bold text-lg text-gray-900">
                  {currentUser.name}
                </h4>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
                <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-bold capitalize text-gray-800 border border-gray-200">
                  <span>Role:</span>
                  <span className="text-black">
                    {currentUser.role === 'buyer' && '🛍️ Akun Pembeli'}
                    {currentUser.role === 'seller' && '🏪 Akun Penjual'}
                    {currentUser.role === 'admin' && '👑 Admin Brand'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-left space-y-2">
                <span className="font-bold text-gray-700 block">Ganti Peran Langsung:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleQuickDemoLogin('buyer')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold cursor-pointer border ${
                      currentUser.role === 'buyer'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    🛍️ Pembeli
                  </button>
                  <button
                    onClick={() => handleQuickDemoLogin('seller')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold cursor-pointer border ${
                      currentUser.role === 'seller'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    🏪 Penjual
                  </button>
                  <button
                    onClick={() => handleQuickDemoLogin('admin')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold cursor-pointer border ${
                      currentUser.role === 'admin'
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    👑 Admin
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  setIsAuthModalOpen(false);
                }}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Dashboard Logout (Keluar)</span>
              </button>
            </div>
          ) : (
            /* Login Form */
            <div className="space-y-5">
              {/* Quick 1-Click Login Demo Shortcuts */}
              <div className="space-y-2 pb-4 border-b border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Pilih Cepat Mode Akun Demo:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('buyer')}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-left transition-all cursor-pointer"
                  >
                    <div className="text-base">🛍️</div>
                    <div className="text-xs font-bold text-gray-900 mt-1">Pembeli</div>
                    <div className="text-[10px] text-gray-500">Belanja & Lacak</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('seller')}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-left transition-all cursor-pointer"
                  >
                    <div className="text-base">🏪</div>
                    <div className="text-xs font-bold text-gray-900 mt-1">Penjual</div>
                    <div className="text-[10px] text-gray-500">Atur Produk</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-black bg-gray-50 hover:bg-white text-left transition-all cursor-pointer"
                  >
                    <div className="text-base">👑</div>
                    <div className="text-xs font-bold text-gray-900 mt-1">Admin</div>
                    <div className="text-[10px] text-gray-500">Ubah Brand</div>
                  </button>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleManualLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Pengguna
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Tipe Hak Akses
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['buyer', 'seller', 'admin'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRole(r)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition-all cursor-pointer capitalize ${
                          selectedRole === r
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {r === 'buyer' && 'Pembeli'}
                        {r === 'seller' && 'Penjual'}
                        {r === 'admin' && 'Admin'}
                      </button>
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 font-semibold">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Dashboard Login Masuk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
