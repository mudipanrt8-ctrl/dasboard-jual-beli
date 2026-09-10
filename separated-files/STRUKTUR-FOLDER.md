# 📁 STRUKTUR FOLDER TERPISAH - Dasboard Jual Beli

## 🎯 Ringkasan Struktur

Proyek telah dipisahkan menjadi folder-folder terorganisir agar mudah diatur di VSCode:

```
separated-files/
├── 📄 README.md (Panduan penggunaan)
│
├── 📁 HTML/ (Halaman Web)
│   ├── index.html ..................... Halaman utama (Shop/Katalog)
│   ├── login.html ..................... Halaman login/register
│   ├── checkout.html ................. Halaman checkout/pembayaran
│   ├── tracking.html ................. Halaman tracking pengiriman
│   ├── seller-dashboard.html ......... Dashboard untuk penjual
│   └── admin-dashboard.html .......... Dashboard untuk admin
│
├── 📁 CSS/ (Styling & Design)
│   ├── styles.css ..................... CSS global & umum
│   ├── navbar.css ..................... Styling navbar & header
│   ├── cart.css ....................... Styling keranjang belanja
│   ├── checkout.css .................. Styling halaman checkout
│   ├── tracking.css .................. Styling halaman tracking
│   └── responsive.css ................ CSS untuk mobile responsive
│
├── 📁 JavaScript/ (Logic & Fungsi)
│   ├── config.js ...................... Data & konfigurasi (PRODUCTS, USERS, COUPONS, dll)
│   ├── utils.js ....................... Fungsi umum helper (format, storage, toast)
│   ├── auth.js ........................ Login, Logout, User Management
│   ├── cart.js ........................ Keranjang belanja (add, remove, update)
│   ├── checkout.js ................... Proses checkout & validasi form
│   ├── notifications.js .............. Notifikasi Email/SMS
│   ├── tracking.js ................... Tracking pengiriman real-time
│   ├── seller.js ..................... Fungsi dashboard penjual
│   └── admin.js ....................... Fungsi dashboard admin
│
├── 📁 PHP/ (Backend - Optional)
│   ├── login.php ..................... Handler login server-side
│   ├── logout.php ................... Handler logout server-side
│   ├── auth-handler.php ............. Validasi autentikasi
│   ├── checkout-handler.php ......... Process checkout di server
│   └── send-notification.php ........ Kirim notifikasi Email/SMS
│
└── 📁 Assets/ (Gambar & Media)
    ├── images/ ....................... Folder gambar produk
    └── icons/ ........................ Folder icon
```

---

## 🔗 HUBUNGAN FILE DAN CARA KERJA

### 1️⃣ **Halaman Utama (index.html)**
```
index.html
├── Link CSS:
│   ├── styles.css (CSS global)
│   ├── navbar.css (Styling navbar)
│   └── cart.css (Styling cart)
│
└── Link JavaScript (DI URUTAN INI!):
    ├── config.js (HARUS PERTAMA - Data produk)
    ├── utils.js (Fungsi helper)
    ├── auth.js (Login/logout)
    ├── cart.js (Keranjang belanja)
    └── notifications.js (Notifikasi)
```

**Contoh HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <!-- CSS LINK -->
    <link rel="stylesheet" href="../CSS/styles.css">
    <link rel="stylesheet" href="../CSS/navbar.css">
    <link rel="stylesheet" href="../CSS/cart.css">
</head>
<body>
    <!-- Konten HTML -->
    
    <!-- JAVASCRIPT (Urutan penting!) -->
    <script src="../JavaScript/config.js"></script>
    <script src="../JavaScript/utils.js"></script>
    <script src="../JavaScript/auth.js"></script>
    <script src="../JavaScript/cart.js"></script>
    <script src="../JavaScript/notifications.js"></script>
</body>
</html>
```

---

## 📋 DAFTAR FILE YANG SUDAH DIBUAT

### ✅ HTML Files:
- ✓ `HTML/index.html` - Halaman shop/katalog
- ✓ `HTML/login.html` - Halaman login

### ✅ CSS Files:
- ✓ `CSS/styles.css` - CSS global
- ✓ `CSS/navbar.css` - Navbar styling
- ✓ `CSS/cart.css` - Cart drawer styling
- ✓ `CSS/checkout.css` - Checkout form styling

### ✅ JavaScript Files:
- ✓ `JavaScript/config.js` - Data & konfigurasi (TANPA JSON!)
- ✓ `JavaScript/utils.js` - Fungsi helper
- ✓ `JavaScript/auth.js` - Login/Logout
- ✓ `JavaScript/cart.js` - Keranjang belanja
- ✓ `JavaScript/checkout.js` - Checkout & pembayaran
- ✓ `JavaScript/notifications.js` - Notifikasi Email/SMS

### ⏳ Akan Dibuat:
- `HTML/checkout.html`
- `HTML/tracking.html`
- `HTML/seller-dashboard.html`
- `HTML/admin-dashboard.html`
- `CSS/tracking.css`
- `CSS/responsive.css`
- `JavaScript/tracking.js`
- `JavaScript/seller.js`
- `JavaScript/admin.js`
- `PHP/login.php`
- `PHP/logout.php`
- dst...

---

## 🎨 FITUR YANG SUDAH TERSEDIA

### 1. **Login/Logout** (auth.js)
```javascript
loginUser('lukihanun@gmail.com', 'password123', 'buyer');
// Akan menyimpan ke localStorage dan redirect ke index.html

logoutUser();
// Akan hapus data user dan redirect ke login
```

### 2. **Keranjang Belanja** (cart.js)
```javascript
addToCart('1', 'Jaket Denim', 299000);
// Tambah produk ke keranjang

removeFromCart('1');
// Hapus dari keranjang

updateCartQuantity('1', 5);
// Update jumlah item
```

### 3. **Format Harga** (utils.js)
```javascript
formatRupiah(299000);
// Output: "Rp 299.000"
```

### 4. **LocalStorage Management** (utils.js)
```javascript
saveToStorage('cart', cartData);
const cart = getFromStorage('cart', []);
removeFromStorage('cart');
```

### 5. **Notifikasi Toast** (utils.js)
```javascript
showToast('Produk ditambah ke keranjang!', 'success', 3000);
// Tipe: 'success', 'error', 'info'
```

---

## 🚀 CARA MENGGUNAKAN

### **Step 1: Copy Folder ke VSCode**
1. Clone atau download repository ini
2. Buka folder `separated-files/` di VSCode
3. Struktur folder sudah siap!

### **Step 2: Buka File HTML di Browser**
```bash
# Buka file index.html secara langsung di browser
# atau gunakan Live Server di VSCode

Alt + L -> Alt + O (Dengan Live Server)
```

### **Step 3: Test Fitur**
1. **Login**: Klik tombol "Masuk" → Gunakan email dari config.js
   - Email: `lukihanun@gmail.com`
   - Password: `password123`
   - Role: `buyer`

2. **Tambah Keranjang**: Klik "+ Keranjang Belanja" pada produk

3. **Buka Keranjang**: Klik tombol keranjang di navbar

4. **Checkout**: Klik "Lanjut Checkout" dari keranjang

---

## 📱 RESPONSIVE DESIGN

Semua file CSS sudah menggunakan:
- ✓ CSS Grid & Flexbox
- ✓ Media Queries untuk mobile
- ✓ Mobile-first approach
- ✓ Touch-friendly buttons

---

## 🔐 DATA USER (untuk testing)

**Pembeli (Buyer):**
```
Email: lukihanun@gmail.com
Password: password123
Role: buyer
```

**Penjual (Seller):**
```
Email: penjual@store.com
Password: seller123
Role: seller
```

**Admin (Admin):**
```
Email: admin@brand.com
Password: admin123
Role: admin
```

---

## 💡 TIPS & TRIK

### 1. **Debug di Browser Console**
Tekan `F12` → Tab "Console" untuk melihat log dan error

### 2. **Check LocalStorage**
```javascript
// Di browser console:
localStorage
// Atau gunakan: DevTools → Application → Local Storage
```

### 3. **Test Notifikasi**
```javascript
// Di browser console:
showToast('Ini adalah test notifikasi', 'success');
```

### 4. **Export Data ke CSV**
```javascript
const orders = getFromStorage('orders', []);
console.table(orders);
// Klik kanan → Save as → File.csv
```

---

## ⚠️ PENTING!

### **Tentang JSON:**
✅ **Config.js TIDAK menggunakan JSON**
- Menggunakan JavaScript Object biasa
- Lebih mudah digunakan tanpa parsing
- Tidak perlu aktivasi JSON

✅ **LocalStorage menggunakan JSON**
- Otomatis di-convert oleh `saveToStorage()` & `getFromStorage()`
- Anda hanya perlu kirim object biasa

---

## 📞 Support

Jika ada error atau pertanyaan:
1. Check console (F12)
2. Lihat struktur folder
3. Pastikan urutan `<script>` di HTML benar
4. Cek path relatif CSS & JS

---

**Created for:** mudipanrt8-ctrl (Luki)
**Date:** 2026-09-10
**Status:** Ready to Use ✅
