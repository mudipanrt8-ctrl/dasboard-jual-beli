# 📖 PANDUAN LENGKAP PENGGUNAAN FILE-FILE

## 1️⃣ CONFIG.JS - Data & Konfigurasi

**Apa itu?** File berisi semua data produk, user, kupon, dll.

**Isinya:**
```javascript
// Data Produk
const PRODUCTS = [
    {
        id: '1',
        name: 'Jaket Denim Vintage',
        price: 299000,
        ...
    }
];

// Data User
const USERS = [
    {
        email: 'lukihanun@gmail.com',
        password: 'password123',
        role: 'buyer'
    }
];

// Data Kupon
const COUPONS = [
    { code: 'DISKON80', percentage: 80 }
];
```

**Cara Menggunakan:**
```javascript
// Di file lain (pastikan config.js di-load dulu):
console.log(PRODUCTS[0].name); // "Jaket Denim Vintage"
console.log(USERS[0].email);   // "lukihanun@gmail.com"
```

---

## 2️⃣ UTILS.JS - Fungsi Helper Umum

**Fungsi Tersedia:**

### formatRupiah() - Format angka ke Rupiah
```javascript
formatRupiah(299000);
// Output: "Rp 299.000"

formatRupiah(1500000);
// Output: "Rp 1.500.000"
```

### formatDate() - Format tanggal
```javascript
formatDate('2026-09-10');
// Output: "10 September 2026"
```

### saveToStorage() - Simpan ke LocalStorage
```javascript
const cart = [{id: '1', name: 'Jaket', quantity: 2}];
saveToStorage('cart', cart);
// LocalStorage sekarang menyimpan data cart
```

### getFromStorage() - Ambil dari LocalStorage
```javascript
const cart = getFromStorage('cart', []);
// Jika tidak ada, return array kosong []

console.log(cart);
// [{id: '1', name: 'Jaket', quantity: 2}]
```

### removeFromStorage() - Hapus dari LocalStorage
```javascript
removeFromStorage('cart');
// Data cart dihapus
```

### showToast() - Notifikasi sederhana
```javascript
showToast('Produk ditambah ke keranjang!', 'success', 3000);
// Tipe: 'success', 'error', 'info'
// Duration: 3000 ms
```

### isValidEmail() - Validasi email
```javascript
isValidEmail('user@email.com');   // true
isValidEmail('invalid.email');     // false
```

### generateUniqueId() - Generate ID unik
```javascript
const id = generateUniqueId();
// Output: "ID_1694337204000_a1b2c3d4e"
```

### calculateDiscount() - Hitung harga diskon
```javascript
calculateDiscount(100000, 20);  // 20% diskon
// Output: 80000
```

### getCurrentUser() - Ambil user yang login
```javascript
const user = getCurrentUser();
console.log(user);
// {id: '1', name: 'Luki Hanun', email: 'lukihanun@gmail.com', role: 'buyer'}
```

### isLoggedIn() - Cek apakah user sudah login
```javascript
if (isLoggedIn()) {
    console.log('User sudah login');
} else {
    console.log('User belum login');
}
```

---

## 3️⃣ AUTH.JS - Login & Logout

**Fungsi Tersedia:**

### loginUser() - Login
```javascript
loginUser('lukihanun@gmail.com', 'password123', 'buyer');
// Akan menyimpan user ke localStorage
// Akan menampilkan toast sukses
// Akan redirect ke index.html setelah 1 detik
```

### logoutUser() - Logout
```javascript
logoutUser();
// Akan hapus user, cart, coupon dari localStorage
// Akan redirect ke index.html
```

### checkUserLogin() - Cek & update UI
```javascript
checkUserLogin();
// Akan hide login button jika sudah login
// Akan show logout button dengan nama user
```

---

## 4️⃣ CART.JS - Keranjang Belanja

**Fungsi Tersedia:**

### addToCart() - Tambah ke keranjang
```javascript
addToCart('1', 'Jaket Denim', 299000);
// Jika produk sudah ada, quantity +1
// Jika produk baru, tambahkan ke keranjang
// Tampilkan toast sukses
```

### removeFromCart() - Hapus dari keranjang
```javascript
removeFromCart('1');
// Hapus produk dengan id '1'
// Update cart display & count
```

### updateCartQuantity() - Update jumlah
```javascript
updateCartQuantity('1', 5);
// Set quantity produk '1' menjadi 5

updateCartQuantity('1', 0);
// Jika 0, produk akan dihapus otomatis
```

### clearCart() - Kosongkan semua keranjang
```javascript
clearCart();
// Hapus semua item di keranjang
// Tampilkan konfirmasi
```

### updateCartCount() - Update badge di navbar
```javascript
updateCartCount();
// Akan update angka di tombol keranjang
```

### openCart() - Buka cart drawer
```javascript
openCart();
// Tampilkan sidebar keranjang
```

### closeCart() - Tutup cart drawer
```javascript
closeCart();
// Sembunyikan sidebar keranjang
```

---

## 5️⃣ CHECKOUT.JS - Proses Checkout

**Fungsi Tersedia:**

### processCheckout() - Proses checkout
```javascript
const formData = {
    fullName: 'Luki Hanun',
    email: 'luki@gmail.com',
    phone: '08123456789',
    address: 'Jl. Sudirman No. 45',
    city: 'Jakarta',
    zipcode: '12190',
    shippingMethod: 'J&T Express Kilat Real-Time',
    paymentMethod: 'BCA Virtual Account'
};

processCheckout(formData);
// Validasi form
// Buat order object
// Kosongkan keranjang
// Redirect ke tracking page
```

### applyCoupon() - Terapkan kupon
```javascript
applyCoupon('DISKON80');
// Validasi kupon
// Simpan ke localStorage
// Tampilkan discount di checkout
```

### removeCoupon() - Hapus kupon
```javascript
removeCoupon();
// Hapus kupon yang diterapkan
```

### calculateCartTotal() - Hitung total harga
```javascript
const total = calculateCartTotal();
console.log(total);
// Output: 500000 (sudah include diskon + ongkir)
```

---

## 6️⃣ NOTIFICATIONS.JS - Notifikasi Email & SMS

**Fungsi Tersedia:**

### sendNotification() - Kirim notifikasi
```javascript
sendNotification('ID_1694337204000_a1b2c3d4e', 'order_created', 'both');
// channel: 'email', 'sms', atau 'both'
// Akan log ke console (simulasi)
```

### Tipe Notifikasi:
- `order_created` - Pesanan dibuat
- `payment_confirmed` - Pembayaran diterima
- `shipped` - Paket dikirim
- `delivered` - Paket diterima

---

## 🔄 FLOW CONTOH: Login → Belanja → Checkout

```javascript
// 1. USER LOGIN
loginUser('lukihanun@gmail.com', 'password123', 'buyer');
// ✓ User tersimpan di localStorage
// ✓ UI diupdate (tombol logout muncul)

// 2. USER LIHAT PRODUK DI index.html
// Produk sudah dimuat dari PRODUCTS di config.js

// 3. USER TAMBAH KE KERANJANG
addToCart('1', 'Jaket Denim Vintage', 299000);
addToCart('4', 'Sneakers Premium White', 649000);
// ✓ Cart tersimpan di localStorage
// ✓ Notifikasi toast muncul
// ✓ Badge keranjang di navbar update

// 4. USER BUKA KERANJANG
openCart();
// ✓ Sidebar keranjang terbuka
// ✓ Tampilkan item & total harga

// 5. USER TERAPKAN KUPON
applyCoupon('DISKON80');
// ✓ Diskon diterapkan
// ✓ Total harga berkurang

// 6. USER CHECKOUT
const formData = { ... };
processCheckout(formData);
// ✓ Order dibuat
// ✓ Keranjang dikosongkan
// ✓ Redirect ke tracking page

// 7. KIRIM NOTIFIKASI
sendNotification(orderId, 'order_created', 'both');
// ✓ Email & SMS dikirim (simulasi)
```

---

## 🐛 DEBUGGING TIPS

### Check Console Log
```javascript
// Tekan F12 → Tab Console
// Lihat semua log dari aplikasi
```

### Check LocalStorage
```javascript
// Di console:
localStorage
// Atau DevTools → Application → Local Storage
```

### Test Fungsi di Console
```javascript
// Buka console (F12) dan ketik:
formatRupiah(500000);
showToast('Test notifikasi', 'success');
getCurrentUser();
```

### Hapus Data untuk Reset
```javascript
// Di console:
localStorage.clear();
// Semua data di localStorage dihapus
```

---

**Ready to use! 🚀**
