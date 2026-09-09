import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    clearCart,
    coupons,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-display font-bold text-lg text-black">
                Keranjang Belanja ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-base text-gray-800">
                  Keranjangmu Masih Kosong
                </h3>
                <p className="text-xs text-gray-500 max-w-xs">
                  Pilih jaket, denim, atau streetwear favoritmu dari katalog dan tambahkan ke sini.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 cursor-pointer"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                  <span>Daftar Produk ({cart.length} item)</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline cursor-pointer"
                  >
                    Kosongkan Semua
                  </button>
                </div>

                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-lg bg-gray-200 shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() =>
                              removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                            }
                            className="text-gray-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                          <span className="bg-gray-200 px-1.5 py-0.5 rounded-xs font-semibold">
                            Size: {item.selectedSize}
                          </span>
                          <span>Color: {item.selectedColor}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                        <span className="font-display font-bold text-xs text-black">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>

                        {/* Quantity controller */}
                        <div className="flex items-center border border-gray-300 rounded-md bg-white">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer with Coupon & Checkout Calculation */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
              {/* Promo Coupon Form (Feature 5) */}
              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Gunakan Kupon Diskon
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 rounded-lg text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[11px] font-normal text-emerald-700">
                        (-{appliedCoupon.percentage}%)
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: DISKON80"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-neutral-800 cursor-pointer whitespace-nowrap"
                    >
                      Terapkan
                    </button>
                  </form>
                )}

                {/* Available Quick Coupon Suggestions */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                    <span className="text-[10px] text-gray-400">Tersedia:</span>
                    {coupons.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => applyCoupon(c.code)}
                        className="px-2 py-0.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded text-[10px] font-bold cursor-pointer transition-colors"
                      >
                        {c.code} (-{c.percentage}%)
                      </button>
                    ))}
                  </div>
                )}

                {couponFeedback.message && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponFeedback.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal Produk</span>
                  <span className="font-semibold text-gray-900">{formatRupiah(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Potongan Diskon Kupon</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim Flat Express</span>
                  <span className="font-semibold text-gray-900">{formatRupiah(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-gray-200">
                  <span>Total Pembayaran</span>
                  <span className="font-display text-base font-extrabold text-black">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
              >
                <span>Lanjut ke Pembayaran & Pelacakan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
