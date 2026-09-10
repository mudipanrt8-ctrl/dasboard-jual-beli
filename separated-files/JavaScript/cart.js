/* ============================================
   CART - Keranjang Belanja
   ============================================ */

/**
 * Tambah produk ke keranjang
 * @param {string} productId - ID produk
 * @param {string} productName - Nama produk
 * @param {number} price - Harga produk
 */
function addToCart(productId, productName, price) {
    const cart = getFromStorage('cart', []);
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`✅ ${productName} ditambah 1`, 'success');
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1,
            addedTime: new Date().toISOString()
        });
        showToast(`✅ ${productName} ditambah ke keranjang`, 'success');
    }
    
    saveToStorage('cart', cart);
    updateCartCount();
    console.log('🛒 Cart updated:', cart);
}

/**
 * Hapus produk dari keranjang
 * @param {string} productId - ID produk
 */
function removeFromCart(productId) {
    const cart = getFromStorage('cart', []);
    const item = cart.find(i => i.id === productId);
    
    const updatedCart = cart.filter(item => item.id !== productId);
    saveToStorage('cart', updatedCart);
    
    showToast(`🗑️ ${item?.name || 'Produk'} dihapus dari keranjang`, 'info');
    updateCartCount();
    updateCartDisplay();
}

/**
 * Update jumlah produk di keranjang
 * @param {string} productId - ID produk
 * @param {number} quantity - Jumlah baru
 */
function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const cart = getFromStorage('cart', []);
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity = quantity;
        saveToStorage('cart', cart);
        updateCartCount();
        updateCartDisplay();
    }
}

/**
 * Kosongkan semua keranjang
 */
function clearCart() {
    if (confirm('Yakin ingin mengosongkan keranjang?')) {
        removeFromStorage('cart');
        removeFromStorage('appliedCoupon');
        updateCartCount();
        updateCartDisplay();
        showToast('🗑️ Keranjang dikosongkan', 'info');
    }
}

/**
 * Update jumlah item di navbar cart button
 */
function updateCartCount() {
    const cart = getFromStorage('cart', []);
    const cartCountEl = document.getElementById('cartCount');
    
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }
}

/**
 * Update tampilan keranjang (cart drawer)
 */
function updateCartDisplay() {
    const cart = getFromStorage('cart', []);
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartTotalEl = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty-message">
                <p>😢 Keranjang kosong</p>
                <p style="font-size: 0.85rem; color: #999;">Tambahkan produk untuk mulai berbelanja</p>
            </div>
        `;
        if (cartTotalEl) cartTotalEl.textContent = 'Rp 0';
        return;
    }
    
    // Hitung total harga
    let total = 0;
    
    const cartHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        
        return `
            <div class="cart-item">
                <img src="https://via.placeholder.com/80x100?text=${item.name}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatRupiah(item.price)}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">−</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
                    </div>
                </div>
                <p style="font-weight: 700;">${formatRupiah(subtotal)}</p>
            </div>
        `;
    }).join('');
    
    cartItemsContainer.innerHTML = cartHTML;
    if (cartTotalEl) cartTotalEl.textContent = formatRupiah(total);
}

/**
 * Buka cart drawer
 */
function openCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartDrawer) {
        cartDrawer.classList.add('show');
        updateCartDisplay();
    }
}

/**
 * Tutup cart drawer
 */
function closeCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    if (cartDrawer) {
        cartDrawer.classList.remove('show');
    }
}

// Event listener untuk cart button
if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', openCart);
}

// Initialize cart count saat page load
window.addEventListener('load', updateCartCount);

console.log('✅ Cart functions loaded');
