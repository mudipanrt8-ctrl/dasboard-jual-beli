/* ============================================
   CONFIG - DATA & CONFIGURATION
   TIDAK MENGGUNAKAN JSON - PURE JAVASCRIPT
   ============================================ */

// Data Produk
const PRODUCTS = [
    {
        id: '1',
        name: 'Jaket Denim Vintage',
        description: 'Jaket denim original dengan wash vintage 90s',
        category: 'Jackets',
        price: 299000,
        originalPrice: 599000,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&auto=format&fit=crop&q=60',
        rating: 4.8,
        soldCount: 156,
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Blue', 'Black', 'Light Blue'],
        badge: 'Best Seller',
        discountPercentage: 50
    },
    {
        id: '2',
        name: 'Oversized T-Shirt Streetwear',
        description: 'T-shirt boxy dengan kualitas premium cotton',
        category: 'Tops',
        price: 149000,
        originalPrice: 299000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60',
        rating: 4.6,
        soldCount: 324,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Gray', 'Navy'],
        badge: 'Trending',
        discountPercentage: 50
    },
    {
        id: '3',
        name: 'Celana Chino Slim Fit',
        description: 'Celana chino dengan potongan slim fit modern',
        category: 'Bottoms',
        price: 199000,
        originalPrice: 399000,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&auto=format&fit=crop&q=60',
        rating: 4.5,
        soldCount: 89,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Khaki', 'Black', 'Navy', 'Olive'],
        badge: null,
        discountPercentage: 50
    },
    {
        id: '4',
        name: 'Sneakers Premium White',
        description: 'Sepatu sneakers putih premium untuk segala aktivitas',
        category: 'Shoes',
        price: 649000,
        originalPrice: 1299000,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
        rating: 4.9,
        soldCount: 267,
        sizes: ['35', '36', '37', '38', '39', '40', '41', '42'],
        colors: ['White', 'White/Navy', 'White/Black'],
        badge: 'Popular',
        discountPercentage: 50
    },
    {
        id: '5',
        name: 'Backpack Canvas Vintage',
        description: 'Tas punggung canvas dengan desain vintage unik',
        category: 'Bags',
        price: 349000,
        originalPrice: 699000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60',
        rating: 4.7,
        soldCount: 145,
        sizes: ['One Size'],
        colors: ['Khaki', 'Navy', 'Black'],
        badge: null,
        discountPercentage: 50
    },
    {
        id: '6',
        name: 'Celana Jeans Premium Slim',
        description: 'Celana jeans premium dengan stretch comfortable',
        category: 'Denim',
        price: 399000,
        originalPrice: 799000,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&auto=format&fit=crop&q=60',
        rating: 4.8,
        soldCount: 512,
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Dark Blue', 'Light Blue', 'Black'],
        badge: 'Best Seller',
        discountPercentage: 50
    }
];

// Data Kupon
const COUPONS = [
    { code: 'DISKON80', percentage: 80, description: 'Diskon 80% untuk semua produk' },
    { code: 'DISKON50', percentage: 50, description: 'Diskon 50% untuk pembelian min Rp 500rb' },
    { code: 'DISKON20', percentage: 20, description: 'Diskon 20% untuk member baru' },
    { code: 'GRATIS-ISI', percentage: 100, description: 'Gratis ongkir untuk pembelian min Rp 1juta' }
];

// Data User/Akun
const USERS = [
    {
        id: '1',
        name: 'Luki Hanun',
        email: 'lukihanun@gmail.com',
        password: 'password123',
        role: 'buyer',
        avatar: 'https://i.pravatar.cc/150?img=1',
        phone: '0812-3456-7890'
    },
    {
        id: '2',
        name: 'Penjual Store',
        email: 'penjual@store.com',
        password: 'seller123',
        role: 'seller',
        avatar: 'https://i.pravatar.cc/150?img=2',
        phone: '0821-9876-5432'
    },
    {
        id: '3',
        name: 'Admin Brand',
        email: 'admin@brand.com',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://i.pravatar.cc/150?img=3',
        phone: '0852-1111-2222'
    }
];

// Brand Settings
const BRAND_SETTINGS = {
    brandName: 'TrendStyle',
    logoLetter: 'T',
    tagline: 'Fashion Style Tren Fashion Gaya',
    heroSubtext: 'Platform e-commerce fashion modern dengan manajemen penjual, keranjang belanja, pelacakan pengiriman real-time, notifikasi otomatis Email/SMS.',
    discountHighlight: '80%',
    announcementText: 'Flash Sale 80% OFF! Gunakan kupon DISKON80 di keranjang belanja.',
    contactEmail: 'info@trendstyle.com',
    contactPhone: '+62 812-3456-7890'
};

// Shipping Options
const SHIPPING_OPTIONS = [
    { name: 'J&T Express Kilat Real-Time', desc: 'Estimasi 1-2 Hari', price: 50000, trackingEnabled: true },
    { name: 'SiCepat BEST Sameday', desc: 'Estimasi Hari Ini', price: 100000, trackingEnabled: true },
    { name: 'JNE Express Prioritas', desc: 'Estimasi 2 Hari', price: 60000, trackingEnabled: true }
];

// Payment Methods
const PAYMENT_METHODS = [
    { name: 'BCA Virtual Account', desc: 'Otomatis Terverifikasi', type: 'bank_transfer' },
    { name: 'QRIS Real-Time', desc: 'Semua Bank & e-Wallet', type: 'qris' },
    { name: 'Mandiri Virtual Account', desc: 'Otomatis Terverifikasi', type: 'bank_transfer' },
    { name: 'GCash / Dana', desc: 'E-Wallet Indonesia', type: 'ewallet' }
];

console.log('✅ Config berhasil dimuat');
