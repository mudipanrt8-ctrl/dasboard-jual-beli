import React, { useState } from 'react';
import { X, CheckCircle2, Truck, CreditCard, MapPin, Mail, Phone, User, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    currentUser,
    checkout,
    grandTotal,
    cart,
  } = useStore();

  const [buyerName, setBuyerName] = useState(currentUser?.name || 'Luki Hanun');
  const [buyerEmail, setBuyerEmail] = useState(currentUser?.email || 'lukihanun@gmail.com');
  const [buyerPhone, setBuyerPhone] = useState(currentUser?.phone || '0812-3456-7890');
  const [shippingAddress, setShippingAddress] = useState(
    'Jl. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan 12190'
  );
  const [courierName, setCourierName] = useState('J&T Express Kilat Real-Time (GPS Aktif)');
  const [paymentMethod, setPaymentMethod] = useState('BCA Virtual Account (Otomatis Terverifikasi)');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkout({
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress,
      courierName,
      paymentMethod,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-black text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
              Selesai Belanja
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              Konfirmasi Pesanan & Pengiriman Real-Time
            </h3>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Notification Info Notice */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Notifikasi Otomatis Aktif:</span> Setiap perubahan status
              resi kurir akan langsung terkirim otomatis ke Email (<strong>{buyerEmail}</strong>) &
              SMS (<strong>{buyerPhone}</strong>).
            </div>
          </div>

          {/* Recipient Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-black" />
              <span>Data Penerima Paket</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                  Nomor HP / WhatsApp (Untuk SMS Resi)
                </label>
                <input
                  type="text"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Alamat Email (Untuk Bukti Invoice & Notifikasi)
              </label>
              <input
                type="email"
                required
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                Alamat Lengkap Pengiriman
              </label>
              <textarea
                required
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Courier Selection */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Opsi Kurir Pengiriman</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { name: 'J&T Express Kilat Real-Time (GPS Aktif)', desc: 'Estimasi 1-2 Hari' },
                { name: 'SiCepat BEST Sameday Delivery', desc: 'Estimasi Hari Ini' },
                { name: 'JNE Express Prioritas Cargo', desc: 'Estimasi 2 Hari' },
              ].map((c) => (
                <label
                  key={c.name}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex flex-col justify-between transition-all ${
                    courierName === c.name
                      ? 'border-black bg-neutral-50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1">
                    <input
                      type="radio"
                      name="courier"
                      checked={courierName === c.name}
                      onChange={() => setCourierName(c.name)}
                      className="accent-black"
                    />
                    <span className="line-clamp-1">{c.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 pl-4">{c.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>Metode Pembayaran</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                'BCA Virtual Account (Otomatis Terverifikasi)',
                'QRIS Real-Time (Semua Bank & e-Wallet)',
                'Mandiri Virtual Account Otomatis',
              ].map((p) => (
                <label
                  key={p}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 transition-all ${
                    paymentMethod === p
                      ? 'border-black bg-neutral-50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === p}
                    onChange={() => setPaymentMethod(p)}
                    className="accent-black"
                  />
                  <span className="font-semibold text-gray-800 text-[11px] leading-tight">{p}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary footer */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-gray-500 block">Total yang Harus Dibayar:</span>
              <span className="font-display font-extrabold text-xl text-black">
                {formatRupiah(grandTotal)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="px-4 py-2.5 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
              >
                <span>Bayar Sekarang & Buka Pelacakan</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
