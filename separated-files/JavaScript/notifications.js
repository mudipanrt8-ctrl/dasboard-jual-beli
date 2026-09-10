/* ============================================
   NOTIFICATIONS - Email & SMS Notifications
   ============================================ */

/**
 * Kirim notifikasi ke customer
 * @param {string} orderId - ID pesanan
 * @param {string} type - Tipe notifikasi: order_created, payment_confirmed, shipped, etc
 * @param {string} channel - Channel: email, sms, atau both
 */
function sendNotification(orderId, type, channel = 'both') {
    const order = getOrderById(orderId);
    if (!order) {
        console.error('❌ Order tidak ditemukan:', orderId);
        return false;
    }
    
    const notification = createNotificationMessage(order, type);
    
    if (channel === 'email' || channel === 'both') {
        sendEmail(order.customer.email, notification.emailSubject, notification.emailBody);
    }
    
    if (channel === 'sms' || channel === 'both') {
        sendSMS(order.customer.phone, notification.smsBody);
    }
    
    // Simpan notifikasi ke history
    saveNotificationHistory(order.customer.email, notification, channel);
    
    return true;
}

/**
 * Buat pesan notifikasi berdasarkan tipe
 * @param {object} order - Data order
 * @param {string} type - Tipe notifikasi
 * @returns {object} - Object dengan emailSubject, emailBody, smsBody
 */
function createNotificationMessage(order, type) {
    const templates = {
        order_created: {
            emailSubject: `Pesanan Anda Berhasil Dibuat - ${order.orderNumber}`,
            emailBody: `Halo ${order.customer.name},\n\nPesanan Anda dengan nomor ${order.orderNumber} telah berhasil dibuat.\nTotal: ${formatRupiah(order.total)}\n\nSilakan lakukan pembayaran dalam 24 jam.\n\nTerima kasih!`,
            smsBody: `Pesanan ${order.orderNumber} berhasil dibuat. Total: ${formatRupiah(order.total)}. Bayar dalam 24 jam.`
        },
        payment_confirmed: {
            emailSubject: `Pembayaran Diterima - ${order.orderNumber}`,
            emailBody: `Pembayaran untuk pesanan ${order.orderNumber} telah kami terima. Kurir akan mengangkut paket Anda segera.`,
            smsBody: `Pembayaran ${order.orderNumber} diterima. Kurir segera mengangkut paket Anda.`
        },
        shipped: {
            emailSubject: `Paket Anda Telah Dikirim - ${order.orderNumber}`,
            emailBody: `Paket Anda telah dikirim via ${order.shipping.method}. Nomor resi: RESI123456. Lacak di tracking.trendstyle.com`,
            smsBody: `Paket ${order.orderNumber} telah dikirim. Resi: RESI123456. Lacak: trendstyle.com/track`
        },
        delivered: {
            emailSubject: `Paket Anda Telah Diterima - ${order.orderNumber}`,
            emailBody: `Terima kasih telah berbelanja di TrendStyle. Paket Anda telah sampai. Silakan berikan rating dan review.`,
            smsBody: `Paket ${order.orderNumber} telah diterima. Terima kasih berbelanja di TrendStyle!`
        }
    };
    
    return templates[type] || templates.order_created;
}

/**
 * SIMULASI: Kirim Email (dalam praktik real, gunakan service seperti SendGrid, Mailgun, dll)
 * @param {string} email - Alamat email tujuan
 * @param {string} subject - Subject email
 * @param {string} body - Isi email
 */
function sendEmail(email, subject, body) {
    console.log(`📧 Email dikirim ke: ${email}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body: ${body}`);
    
    // Dalam production, gunakan API atau service provider
    // Contoh dengan Fetch API:
    /*
    fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, body })
    });
    */
}

/**
 * SIMULASI: Kirim SMS (dalam praktik real, gunakan Twilio, AWS SNS, dll)
 * @param {string} phone - Nomor telepon
 * @param {string} message - Pesan SMS
 */
function sendSMS(phone, message) {
    console.log(`📱 SMS dikirim ke: ${phone}`);
    console.log(`   Pesan: ${message}`);
    
    // Dalam production, gunakan API seperti Twilio
    /*
    fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, message })
    });
    */
}

/**
 * Simpan notifikasi ke history
 * @param {string} email - Email penerima
 * @param {object} notification - Data notifikasi
 * @param {string} channel - Channel pengiriman
 */
function saveNotificationHistory(email, notification, channel) {
    const history = getFromStorage('notificationHistory', []);
    history.push({
        id: generateUniqueId(),
        email: email,
        subject: notification.emailSubject,
        body: notification.emailBody,
        channel: channel,
        sentAt: new Date().toISOString(),
        status: 'sent'
    });
    saveToStorage('notificationHistory', history);
}

/**
 * Ambil order berdasarkan ID
 * @param {string} orderId - ID order
 * @returns {object|null} - Data order atau null
 */
function getOrderById(orderId) {
    const orders = getFromStorage('orders', []);
    return orders.find(o => o.orderId === orderId) || null;
}

/**
 * Tampilkan notifikasi history
 */
function showNotificationHistory() {
    const history = getFromStorage('notificationHistory', []);
    console.log('📨 Notification History:', history);
    return history;
}

console.log('✅ Notification functions loaded');
