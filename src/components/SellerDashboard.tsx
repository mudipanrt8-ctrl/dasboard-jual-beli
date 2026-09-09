import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Percent,
  Trash2,
  Package,
  DollarSign,
  TrendingUp,
  Tag,
  Truck,
  CheckCircle2,
  Image as ImageIcon,
  Save,
  X,
  Store,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatRupiah, getStatusBadgeClass, getStatusLabel } from '../utils/formatters';
import { Product, ShipmentStatus, DiscountCoupon } from '../types/ecommerce';

export const SellerDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProductPrice,
    updateProductDiscount,
    deleteProduct,
    orders,
    updateShipmentStatus,
    coupons,
    addCoupon,
    brandSettings,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'add_product' | 'orders' | 'discounts'>('products');

  // Add Product Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('Denim');
  const [price, setPrice] = useState('250000');
  const [originalPrice, setOriginalPrice] = useState('350000');
  const [discountPercentage, setDiscountPercentage] = useState('28');
  const [stock, setStock] = useState('30');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80');
  const [badge, setBadge] = useState<Product['badge']>('TREND');
  const [formSuccess, setFormSuccess] = useState(false);

  // New Coupon Form State
  const [couponCode, setCouponCode] = useState('');
  const [couponDesc, setCouponDesc] = useState('');
  const [couponPct, setCouponPct] = useState('20');
  const [couponMin, setCouponMin] = useState('100000');
  const [couponMax, setCouponMax] = useState('50000');
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Quick edit state for price & discount
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [quickPrice, setQuickPrice] = useState<number>(0);
  const [quickDiscount, setQuickDiscount] = useState<number>(0);

  // Preset image gallery for quick selection
  const imagePresets = [
    { label: 'Denim Jacket Vintage', url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80' },
    { label: 'Streetwear Mustard Hoodie', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80' },
    { label: 'Urban Chic Blouse', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80' },
    { label: 'Relaxed 90s Jeans', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80' },
    { label: 'Tactical Backpack Black', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' },
    { label: 'Classic Canvas Shoes', url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop&q=80' },
  ];

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pVal = parseInt(price, 10);
    const origVal = originalPrice ? parseInt(originalPrice, 10) : undefined;
    const discVal = discountPercentage ? parseInt(discountPercentage, 10) : undefined;
    const stVal = parseInt(stock, 10) || 10;

    addProduct({
      name,
      category,
      price: pVal,
      originalPrice: origVal,
      discountPercentage: discVal,
      image,
      stock: stVal,
      description: description || `Produk busana ${category} berkualitas tinggi edisi terbaru dari ${brandSettings.brandName}.`,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Default', 'Black', 'Indigo'],
      sellerName: 'Denim Studio Official',
      badge,
    });

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setActiveTab('products');
      setName('');
    }, 1200);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const newC: DiscountCoupon = {
      code: couponCode.trim().toUpperCase(),
      description: couponDesc || `Diskon promo ${couponPct}%`,
      percentage: parseInt(couponPct, 10) || 10,
      minPurchase: parseInt(couponMin, 10) || 0,
      maxDiscount: couponMax ? parseInt(couponMax, 10) : undefined,
      isActive: true,
    };
    addCoupon(newC);
    setCouponSuccess(true);
    setTimeout(() => {
      setCouponSuccess(false);
      setCouponCode('');
      setCouponDesc('');
    }, 1500);
  };

  const startEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setQuickPrice(prod.price);
    setQuickDiscount(prod.discountPercentage || 0);
  };

  const saveQuickEdit = (id: string) => {
    if (quickPrice > 0) {
      updateProductPrice(id, quickPrice);
    }
    if (quickDiscount >= 0) {
      updateProductDiscount(id, quickDiscount);
    }
    setEditingProductId(null);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>Dashboard Khusus Penjual (Merchant)</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900 mt-1">
            Manajemen Produk, Harga & Diskon
          </h2>
          <p className="text-xs text-gray-500">
            Kelola etalase busana, sesuaikan harga jual, buat kupon diskon, dan update status kurir.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('add_product')}
          className="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Item Produk Baru</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Total Item Produk</span>
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-gray-900">
            {products.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Aktif di etalase toko</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Total Pesanan</span>
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-gray-900">{orders.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            Resi GPS aktif terpantau
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Pendapatan Toko</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 truncate">
            {formatRupiah(totalRevenue)}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Dari pesanan terkonfirmasi</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold">Voucher Diskon</span>
            <Tag className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-display font-extrabold text-2xl text-gray-900">
            {coupons.length} Kupon
          </div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            Siap digunakan pembeli
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'products'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Daftar Produk & Ganti Harga ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('add_product')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'add_product'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Form Tambah Item</span>
        </button>
        <button
          onClick={() => setActiveTab('discounts')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'discounts'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Percent className="w-3.5 h-3.5" />
          <span>Kupon Diskon & Promo</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'orders'
              ? 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Kelola Pengiriman Resi ({orders.length})</span>
        </button>
      </div>

      {/* TAB 1: Product List with Quick Ganti Harga & Diskon */}
      {activeTab === 'products' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-gray-700">
              Katalog Produk Toko (Klik tombol edit untuk ganti harga atau atur diskon langsung)
            </span>
            <span className="text-gray-500">{products.length} Item Terdaftar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100/50 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="p-3.5">Produk</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Harga Sekarang</th>
                  <th className="p-3.5">Diskon (%)</th>
                  <th className="p-3.5">Stok</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((prod) => {
                  const isEditing = editingProductId === prod.id;
                  return (
                    <tr key={prod.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-14 rounded-lg object-cover bg-gray-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-gray-900 line-clamp-1">{prod.name}</div>
                            <div className="text-[11px] text-gray-400">
                              Terjual: {prod.soldCount} • Rating: {prod.rating}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-xs font-semibold">
                          {prod.category}
                        </span>
                      </td>

                      {/* Harga Column with Ganti Harga edit */}
                      <td className="p-3.5">
                        {isEditing ? (
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-400 block">Harga Jual (Rp)</label>
                            <input
                              type="number"
                              value={quickPrice}
                              onChange={(e) => setQuickPrice(parseInt(e.target.value, 10) || 0)}
                              className="w-28 px-2 py-1 border border-black rounded text-xs font-bold"
                            />
                          </div>
                        ) : (
                          <div>
                            <span className="font-display font-bold text-gray-900 text-sm">
                              {formatRupiah(prod.price)}
                            </span>
                            {prod.originalPrice && prod.originalPrice > prod.price && (
                              <div className="text-[10px] text-gray-400 line-through">
                                {formatRupiah(prod.originalPrice)}
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Diskon Column with Nambah Diskon edit */}
                      <td className="p-3.5">
                        {isEditing ? (
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-400 block">Diskon (%)</label>
                            <input
                              type="number"
                              min="0"
                              max="90"
                              value={quickDiscount}
                              onChange={(e) =>
                                setQuickDiscount(parseInt(e.target.value, 10) || 0)
                              }
                              className="w-20 px-2 py-1 border border-amber-500 rounded text-xs font-bold"
                            />
                          </div>
                        ) : prod.discountPercentage ? (
                          <span className="bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded text-[11px]">
                            -{prod.discountPercentage}%
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">Tidak ada</span>
                        )}
                      </td>

                      <td className="p-3.5 font-semibold text-gray-700">{prod.stock} unit</td>

                      <td className="p-3.5 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => saveQuickEdit(prod.id)}
                              className="px-2.5 py-1.5 bg-black text-white rounded text-xs font-bold hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
                            >
                              <Save className="w-3 h-3" />
                              <span>Simpan</span>
                            </button>
                            <button
                              onClick={() => setEditingProductId(null)}
                              className="p-1.5 text-gray-400 hover:text-black rounded cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => startEditProduct(prod)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                              title="Ganti Harga & Diskon"
                            >
                              <Edit3 className="w-4 h-4" />
                              <span className="text-[11px] font-semibold">Ubah Harga</span>
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Nambah Item Form (Feature 4) */}
      {activeTab === 'add_product' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs max-w-3xl">
          <div className="pb-4 mb-5 border-b border-gray-200">
            <h3 className="font-display font-bold text-lg text-gray-900">
              Formulir Tambah Item Produk Baru
            </h3>
            <p className="text-xs text-gray-500">
              Isi data detail pakaian atau busana yang ingin dijual di platform {brandSettings.brandName}.
            </p>
          </div>

          {formSuccess && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Produk berhasil ditambahkan ke katalog toko!</span>
            </div>
          )}

          <form onSubmit={handleAddProductSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nama Item Produk *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Heavyweight Boxy Jacket"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kategori Busana *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Product['category'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                >
                  <option value="Denim">Denim</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Tops">Tops</option>
                  <option value="Bags">Bags</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Harga Jual (IDR) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Harga Asli (Coret) IDR
                </label>
                <input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Diskon Persen (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Stok Tersedia
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Badge Promosi
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value as Product['badge'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                >
                  <option value="NEW">NEW</option>
                  <option value="TREND">TREND</option>
                  <option value="HOT">HOT</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>
            </div>

            {/* Image Presets & URL */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Pilih Foto Preset Cepat atau Input URL Gambar
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                {imagePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`relative rounded-lg overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                      image === preset.url ? 'border-black ring-2 ring-black/20' : 'border-gray-200'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] truncate px-1 py-0.5">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
              <input
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Deskripsi Produk
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan material katun, potongan, rekomendasi styling..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
              />
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-lg shadow-md cursor-pointer"
              >
                + Terbitkan Produk Sekarang
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Nambah Kupon Diskon (Feature 5) */}
      {activeTab === 'discounts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create Coupon Form */}
          <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-display font-bold text-base text-gray-900 mb-1 flex items-center gap-2">
              <Percent className="w-4 h-4 text-amber-500" />
              <span>Buat Kupon Diskon Baru (Promo Code)</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Tambahkan kode kupon yang dapat dimasukkan pembeli saat membuka keranjang belanja.
            </p>

            {couponSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kupon diskon berhasil diterbitkan dan siap dipakai!</span>
              </div>
            )}

            <form onSubmit={handleAddCouponSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Kode Kupon (Huruf Kapital) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: FLASH80, MEGACHIC"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Persentase Potongan (%) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={couponPct}
                    onChange={(e) => setCouponPct(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Maksimal Diskon (IDR)
                  </label>
                  <input
                    type="number"
                    value={couponMax}
                    onChange={(e) => setCouponMax(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Minimal Pembelian (IDR)
                </label>
                <input
                  type="number"
                  value={couponMin}
                  onChange={(e) => setCouponMin(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Keterangan Singkat
                </label>
                <input
                  type="text"
                  placeholder="Misal: Diskon Spesial Ulang Tahun Brand"
                  value={couponDesc}
                  onChange={(e) => setCouponDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                + Terbitkan Kupon Diskon
              </button>
            </form>
          </div>

          {/* Active Coupons List */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="font-display font-bold text-sm text-gray-900">
              Daftar Kupon Promo yang Aktif ({coupons.length})
            </h4>

            {coupons.map((c) => (
              <div
                key={c.code}
                className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-black bg-amber-100 px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Diskon {c.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{c.description}</p>
                  <div className="text-[10px] text-gray-400">
                    Min. Belanja: {formatRupiah(c.minPurchase)} • Maks. Potongan:{' '}
                    {c.maxDiscount ? formatRupiah(c.maxDiscount) : 'Tanpa Batas'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Kelola Pengiriman & Trigger Notifikasi Otomatis */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h4 className="font-display font-bold text-sm text-gray-900">
                Daftar Pesanan Masuk & Pengiriman Kurir
              </h4>
              <p className="text-xs text-gray-500">
                Ubah status di sini untuk langsung mengirimkan notifikasi Email & SMS otomatis ke pembeli!
              </p>
            </div>
            <span className="text-xs font-bold bg-black text-white px-2.5 py-1 rounded-full">
              {orders.length} Pesanan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-100/50 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                  <th className="p-3.5">Invoice & Resi</th>
                  <th className="p-3.5">Penerima & Kontak</th>
                  <th className="p-3.5">Total Belanja</th>
                  <th className="p-3.5">Status Pengiriman</th>
                  <th className="p-3.5">Ganti Status (Pemicu Notifikasi Otomatis)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50">
                    <td className="p-3.5">
                      <div className="font-mono font-bold text-gray-900">{ord.invoiceNumber}</div>
                      <div className="text-[11px] text-emerald-600 font-mono font-semibold">
                        Resi: {ord.trackingNumber}
                      </div>
                      <div className="text-[10px] text-gray-400">{ord.courierName}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-gray-900">{ord.buyerName}</div>
                      <div className="text-[11px] text-gray-500">{ord.buyerPhone}</div>
                      <div className="text-[10px] text-gray-400">{ord.buyerEmail}</div>
                    </td>

                    <td className="p-3.5">
                      <div className="font-display font-bold text-black">
                        {formatRupiah(ord.totalAmount)}
                      </div>
                      <div className="text-[10px] text-gray-400">{ord.items.length} item barang</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${getStatusBadgeClass(ord.currentStatus)}`}>
                        {getStatusLabel(ord.currentStatus)}
                      </span>
                    </td>

                    {/* Quick Status Setter to Trigger Email & SMS */}
                    <td className="p-3.5">
                      <select
                        value={ord.currentStatus}
                        onChange={(e) =>
                          updateShipmentStatus(ord.id, e.target.value as ShipmentStatus)
                        }
                        className="px-2.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-black bg-white"
                      >
                        <option value="confirmed">1. Pesanan Dikonfirmasi</option>
                        <option value="packing">2. Sedang Dipacking</option>
                        <option value="in_transit">3. Sorting Gateway Kurir</option>
                        <option value="out_for_delivery">4. Kurir Menuju Alamat</option>
                        <option value="delivered">5. Paket Diterima</option>
                      </select>
                      <div className="text-[10px] text-emerald-600 mt-0.5">
                        *Otomatis kirim Email & SMS
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
