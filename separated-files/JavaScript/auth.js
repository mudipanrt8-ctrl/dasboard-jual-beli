/* ============================================
   AUTHENTICATION - Login & Logout
   ============================================ */

/**
 * Fungsi Login
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @param {string} role - Role: buyer, seller, admin
 */
function loginUser(email, password, role) {
    // Cari user di array USERS
    const user = USERS.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
        // Simpan user ke localStorage
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            loginTime: new Date().toISOString()
        };
        
        saveToStorage('currentUser', userData);
        showToast(`✅ Login berhasil! Selamat datang ${user.name}`, 'success');
        console.log('👤 User login:', userData);
        
        // Redirect ke halaman utama setelah 1 detik
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        showToast('❌ Email, password, atau role tidak sesuai!', 'error');
        console.error('Login failed: Invalid credentials');
    }
}

/**
 * Fungsi Logout
 */
function logoutUser() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        removeFromStorage('currentUser');
        removeFromStorage('cart');
        removeFromStorage('appliedCoupon');
        showToast(`👋 Logout berhasil. Sampai jumpa ${currentUser.name}!`, 'success');
        console.log('👋 User logout:', currentUser.name);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

/**
 * Cek user login dan update UI
 */
function checkUserLogin() {
    const user = getCurrentUser();
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn && logoutBtn) {
        if (user) {
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'block';
            logoutBtn.textContent = `👋 ${user.name} - Logout`;
            console.log('✅ User sudah login:', user.name);
        } else {
            loginBtn.style.display = 'block';
            logoutBtn.style.display = 'none';
            console.log('❌ User belum login');
        }
    }
}

/**
 * Toggle login modal
 */
function toggleLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.toggle('show');
    }
}

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Event listeners untuk login/logout buttons
 */
if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').addEventListener('click', openLoginModal);
}

if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('Yakin ingin logout?')) {
            logoutUser();
        }
    });
}

console.log('✅ Auth functions loaded');
