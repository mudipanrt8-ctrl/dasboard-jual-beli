import React, { useState } from 'react';
import { ShoppingBag, Star, Tag, Edit3, Percent, Check } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { formatRupiah } from '../utils/formatters';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, currentUser, updateProductPrice, updateProductDiscount } = useStore();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPriceInput, setNewPriceInput] = useState(product.price.toString());
  const [isEditingDiscount, setIsEditingDiscount] = useState(false);
  const [discountInput, setDiscountInput] = useState(
    product.discountPercentage ? product.discountPercentage.toString() : '20'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, product.colors[0] || 'Default');
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleSavePrice = () => {
    const val = parseInt(newPriceInput, 10);
    if (!isNaN(val) && val > 0) {
      updateProductPrice(product.id, val, product.originalPrice || product.price);
      setIsEditingPrice(false);
    }
  };

  const handleSaveDiscount = () => {
    const val = parseInt(discountInput, 10);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      updateProductDiscount(product.id, val);
      setIsEditingDiscount(false);
    }
  };

  const canManage = currentUser?.role === 'seller' || currentUser?.role === 'admin';

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discountPercentage && (
          <span className="bg-amber-400 text-black font-extrabold text-[11px] px-2 py-0.5 rounded-xs tracking-wider">
            -{product.discountPercentage}%
          </span>
        )}
        {product.badge && (
          <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-xs tracking-wider">
            {product.badge}
          </span>
        )}
      </div>

      {/* Quick Seller Actions button if logged in as seller/admin */}
      {canManage && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-md shadow-xs border border-gray-200">
          <button
            onClick={() => setIsEditingPrice(true)}
            className="p-1 hover:bg-gray-100 rounded text-gray-700 hover:text-black text-xs flex items-center gap-1 cursor-pointer"
            title="Ganti Harga Produk"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-medium hidden sm:inline">Ubah Harga</span>
          </button>
          <button
            onClick={() => setIsEditingDiscount(true)}
            className="p-1 hover:bg-gray-100 rounded text-gray-700 hover:text-black text-xs flex items-center gap-1 cursor-pointer"
            title="Atur Diskon Produk"
          >
            <Percent className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] font-medium hidden sm:inline">Diskon</span>
          </button>
        </div>
      )}

      {/* Product Image */}
      <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden product-image-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />

        {/* Quick Size Pill Selector on Hover */}
        <div className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-xs rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
          <span className="text-[10px] font-bold text-gray-400 mr-1">SIZE:</span>
          {product.sizes.map((sz) => (
            <button
              key={sz}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(sz);
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                selectedSize === sz
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="uppercase tracking-wider font-semibold">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400">({product.soldCount})</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 group-hover:text-black">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart */}
        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display font-bold text-lg text-black">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Masuk Keranjang!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>+ Keranjang Belanja</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal / Dialog: Ganti Harga Produk (Feature 3) */}
      {isEditingPrice && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-200">
            <h4 className="font-display font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <span>Ganti Harga Produk</span>
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Ubah harga jual untuk <strong>{product.name}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Harga Jual Baru (IDR)
                </label>
                <input
                  type="number"
                  value={newPriceInput}
                  onChange={(e) => setNewPriceInput(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-black"
                />
              </div>
              <div className="text-xs text-gray-500">
                Harga sebelumnya: {formatRupiah(product.price)}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setIsEditingPrice(false)}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSavePrice}
                className="px-4 py-2 text-xs font-bold bg-black text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
              >
                Simpan Harga Baru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Dialog: Nambah Diskon Produk (Feature 5) */}
      {isEditingDiscount && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl border border-gray-200">
            <h4 className="font-display font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
              <Percent className="w-4 h-4 text-amber-600" />
              <span>Atur Diskon Produk</span>
            </h4>
            <p className="text-xs text-gray-500 mb-4">
              Tentukan persentase potongan harga untuk <strong>{product.name}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Persentase Diskon (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-black"
                  />
                  <span className="text-sm font-bold text-gray-500">%</span>
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-1.5 pt-1">
                {[10, 20, 30, 50, 80].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setDiscountInput(pct.toString())}
                    className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer"
                  >
                    {pct}%
                  </button>
                ))}
              </div>

              <div className="text-xs text-gray-500 pt-1">
                Estimasi harga setelah diskon:{' '}
                <strong>
                  {formatRupiah(
                    Math.round(
                      (product.originalPrice || product.price) *
                        (1 - (parseInt(discountInput, 10) || 0) / 100)
                    )
                  )}
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-5">
              <button
                onClick={() => setIsEditingDiscount(false)}
                className="px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveDiscount}
                className="px-4 py-2 text-xs font-bold bg-amber-500 text-black rounded-lg hover:bg-amber-400 cursor-pointer"
              >
                Terapkan Diskon
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
