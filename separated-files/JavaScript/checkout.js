/* ============================================
   CHECKOUT - Proses Checkout
   ============================================ */

/**
 * Validasi form checkout
 * @param {object} formData - Data dari form
 * @returns {object} - {valid: boolean, errors: array}
 */
function validateCheckoutForm(formData) {
    const errors = [];
    
    if (!formData.fullName || formData.fullName.trim().length < 3) {
        errors.push('Nama lengkap minimal 3 karakter');
    }
    if (!isValidEmail(formData.email)) {
        errors.push('Email tidak valid');
    }
    if (!formData.phone || formData.phone.length < 10) {
        errors.push('Nomor telepon minimal 10 digit');
    }
    if (!formData.address || formData.address.trim().length < 10) {
        errors.push('Alamat minimal 10 karakter');
    }
    if (!formData.city) {
        errors.push('Kota harus dipilih');
    }
    if (!formData.zipcode) {
        errors.push('Kode pos harus diisi');
    }
    if (!formData.shippingMethod) {
        errors.push('Metode pengiriman harus dipilih');
    }
    if (!formData.paymentMethod) {
        errors.push('Metode pembayaran harus dipilih');
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * Proses checkout
 * @param {object} formData - Data dari form checkout
 */
function processCheckout(formData) {
    const validation = validateCheckoutForm(formData);
    
    if (!validation.valid) {
        showToast('❌ ' + validation.errors[0], 'error');
        return false;
    }
    
    const cart = getFromStorage('cart', []);
    if (cart.length === 0) {
        showToast('❌ Keranjang kosong', 'error');
        return false;
    }
    
    // Buat order object
    const order = {
        orderId: generateUniqueId(),
        orderNumber: 'ORD-' + Date.now(),
        customer: {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone
        },
        shipping: {
            address: formData.address,
            city: formData.city,
            zipcode: formData.zipcode,
            method: formData.shippingMethod
        },
        payment: {
            method: formData.paymentMethod
        },
        items: cart,
        subtotal: calculateCartSubtotal(),
        shippingFee: calculateShippingFee(formData.shippingMethod),
        discount: calculateAppliedDiscount(),
        total: calculateCartTotal(),
        status: 'pending_payment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    // Simpan order
    const orders = getFromStorage('orders', []);
    orders.push(order);
    saveToStorage('orders', orders);
    
    // Kosongkan keranjang
    removeFromStorage('cart');
    removeFromStorage('appliedCoupon');
    
    // Tampilkan success message
    showToast('✅ Pesanan berhasil dibuat! No. Pesanan: ' + order.orderNumber, 'success');
    console.log('📦 Order created:', order);
    
    // Redirect ke halaman order tracking
    setTimeout(() => {
        window.location.href = `tracking.html?orderId=${order.orderId}`;
    }, 2000);
    
    return true;
}

/**
 * Hitung subtotal keranjang
 */
function calculateCartSubtotal() {
    const cart = getFromStorage('cart', []);
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Hitung diskon yang diterapkan
 */
function calculateAppliedDiscount() {
    const appliedCoupon = getFromStorage('appliedCoupon', null);
    if (!appliedCoupon) return 0;
    
    const subtotal = calculateCartSubtotal();
    return Math.round(subtotal * appliedCoupon.percentage / 100);
}

/**
 * Hitung ongkir berdasarkan metode pengiriman
 */
function calculateShippingFee(method) {
    const shipping = SHIPPING_OPTIONS.find(s => s.name === method);
    return shipping ? shipping.price : 0;
}

/**
 * Hitung total harga akhir
 */
function calculateCartTotal() {
    const subtotal = calculateCartSubtotal();
    const discount = calculateAppliedDiscount();
    const shipping = calculateShippingFee(getFromStorage('selectedShipping', SHIPPING_OPTIONS[0].name));
    
    return subtotal - discount + shipping;
}

/**
 * Terapkan kupon diskon
 * @param {string} couponCode - Kode kupon
 */
function applyCoupon(couponCode) {
    const coupon = COUPONS.find(c => c.code === couponCode.toUpperCase());
    
    if (!coupon) {
        showToast('❌ Kupon tidak valid', 'error');
        return false;
    }
    
    saveToStorage('appliedCoupon', coupon);
    showToast(`✅ Kupon ${coupon.code} berhasil diterapkan (-${coupon.percentage}%)`, 'success');
    console.log('🎟️ Coupon applied:', coupon);
    
    return true;
}

/**
 * Hapus kupon yang diterapkan
 */
function removeCoupon() {
    removeFromStorage('appliedCoupon');
    showToast('🎟️ Kupon dihapus', 'info');
}

/**
 * Update tampilan order summary di halaman checkout
 */
function updateOrderSummary() {
    const subtotal = calculateCartSubtotal();
    const discount = calculateAppliedDiscount();
    const shipping = calculateShippingFee(getFromStorage('selectedShipping', SHIPPING_OPTIONS[0].name));
    const total = subtotal - discount + shipping;
    
    const appliedCoupon = getFromStorage('appliedCoupon', null);
    
    // Update HTML elements
    const subtotalEl = document.querySelector('[data-subtotal]');
    const discountEl = document.querySelector('[data-discount]');
    const shippingEl = document.querySelector('[data-shipping]');
    const totalEl = document.querySelector('[data-total]');
    
    if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
    if (discountEl) {
        discountEl.textContent = formatRupiah(discount);
        discountEl.parentElement.style.display = discount > 0 ? 'flex' : 'none';
    }
    if (shippingEl) shippingEl.textContent = formatRupiah(shipping);
    if (totalEl) totalEl.textContent = formatRupiah(total);
}

console.log('✅ Checkout functions loaded');
