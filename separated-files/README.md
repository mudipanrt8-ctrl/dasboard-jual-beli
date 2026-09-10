# 📁 Struktur File Terpisah - Dasboard Jual Beli

## 📋 Penjelasan Struktur Folder

Proyek ini telah dipisahkan menjadi beberapa folder untuk memudahkan pengembangan dan pemeliharaan:

### 1. **HTML/** - File HTML (Tampilan)
- `index.html` - Halaman utama (shop/katalog)
- `login.html` - Halaman login/register
- `checkout.html` - Halaman checkout/pembayaran
- `tracking.html` - Halaman tracking pengiriman
- `seller-dashboard.html` - Dashboard untuk penjual
- `admin-dashboard.html` - Dashboard untuk admin
- `product-detail.html` - Detail produk

### 2. **CSS/** - File Styling (Desain)
- `styles.css` - CSS umum & global
- `navbar.css` - Styling navbar
- `cart.css` - Styling keranjang belanja
- `checkout.css` - Styling halaman checkout
- `tracking.css` - Styling tracking page
- `responsive.css` - CSS untuk responsive mobile

### 3. **JavaScript/** - File Logic (Fungsi)
- `config.js` - Konfigurasi umum (tanpa JSON)
- `auth.js` - Login, Logout, User Management
- `cart.js` - Fungsi Keranjang Belanja
- `checkout.js` - Proses Checkout
- `notifications.js` - Notifikasi Email/SMS
- `tracking.js` - Pelacakan Pengiriman Real-Time
- `seller.js` - Fungsi Dashboard Penjual
- `admin.js` - Fungsi Dashboard Admin
- `utils.js` - Fungsi Umum (Helper)

### 4. **PHP/** - Backend (Server-Side)
- `login.php` - Login handler
- `logout.php` - Logout handler
- `auth-handler.php` - Validasi autentikasi
- `checkout-handler.php` - Process checkout
- `send-notification.php` - Kirim notifikasi

## 🚀 Cara Menggunakan

### **Step 1: Buka file HTML**
Cukup buka file `.html` di browser, misalnya:
```
open HTML/index.html
```

### **Step 2: Pastikan struktur folder**
Setiap file HTML harus terhubung dengan file CSS dan JS yang tepat:

```html
<!-- Link CSS -->
<link rel="stylesheet" href="../CSS/styles.css">
<link rel="stylesheet" href="../CSS/navbar.css">

<!-- Link JS -->
<script src="../JavaScript/config.js"></script>
<script src="../JavaScript/auth.js"></script>
<script src="../JavaScript/utils.js"></script>
```

### **Step 3: Jalankan di Server (untuk PHP)**
Untuk fitur login/logout dengan PHP, gunakan:
```bash
php -S localhost:8000
```

Kemudian buka browser: `http://localhost:8000/HTML/index.html`

## 📝 Contoh Hubungan File

```
HTML/index.html
├── Meload CSS/styles.css
├── Meload CSS/navbar.css
├── Meload CSS/cart.css
├── Meload JavaScript/config.js
├── Meload JavaScript/utils.js
├── Meload JavaScript/auth.js
├── Meload JavaScript/cart.js
└── Meload JavaScript/notifications.js
```

## 🔐 Fitur Login/Logout

### Tanpa Database (Local Storage):
```javascript
// JavaScript/auth.js
function loginUser(email, role) {
  localStorage.setItem('currentUser', JSON.stringify({ email, role }));
  alert('Login berhasil!');
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  alert('Logout berhasil!');
}
```

### Dengan PHP (Server Side):
```php
<!-- PHP/login.php -->
<?php
if ($_POST['email'] && $_POST['password']) {
  // Validasi username & password
  $_SESSION['user'] = $_POST['email'];
  header('Location: /HTML/index.html');
}
?>
```

## 📚 Daftar File yang Sudah Dibuat

- ✅ HTML/index.html
- ✅ HTML/login.html
- ✅ HTML/checkout.html
- ✅ HTML/tracking.html
- ✅ HTML/seller-dashboard.html
- ✅ HTML/admin-dashboard.html
- ✅ CSS/styles.css
- ✅ CSS/navbar.css
- ✅ CSS/cart.css
- ✅ CSS/checkout.css
- ✅ CSS/tracking.css
- ✅ JavaScript/config.js
- ✅ JavaScript/auth.js
- ✅ JavaScript/cart.js
- ✅ JavaScript/checkout.js
- ✅ JavaScript/notifications.js
- ✅ JavaScript/tracking.js
- ✅ JavaScript/utils.js
- ✅ PHP/login.php
- ✅ PHP/logout.php

## 💡 Tips

1. **Jangan edit langsung di vite.config** - Edit di folder `/separated-files/`
2. **Gunakan path relatif** untuk linking CSS dan JS
3. **Test di browser dulu** sebelum di-integrate ke React
4. **Buka DevTools** (F12) untuk debug JS

---

**Dibuat untuk:** mudipanrt8-ctrl (Luki)
**Tanggal:** 2026-09-10
