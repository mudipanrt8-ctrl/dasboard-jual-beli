/* ============================================
   UTILITY FUNCTIONS - Helper & Tools
   ============================================ */

function formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(num);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('id-ID', options);
}

function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`✅ Saved to storage: ${key}`);
    } catch (error) {
        console.error('❌ Error saving to storage:', error);
    }
}

function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('❌ Error reading from storage:', error);
        return defaultValue;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        console.log(`✅ Removed from storage: ${key}`);
    } catch (error) {
        console.error('❌ Error removing from storage:', error);
    }
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function generateUniqueId() {
    return 'ID_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function calculateDiscount(price, discount) {
    return Math.round(price * (1 - discount / 100));
}

function isLoggedIn() {
    return getFromStorage('currentUser') !== null;
}

function getCurrentUser() {
    return getFromStorage('currentUser', null);
}

console.log('✅ Utility functions loaded');
