import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Product,
  CartItem,
  DiscountCoupon,
  Order,
  ShipmentStatus,
  NotificationMessage,
  BrandSettings,
} from '../types/ecommerce';
import {
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_BRAND_SETTINGS,
} from '../data/initialData';
import { generateId, getStatusLabel } from '../utils/formatters';

interface StoreContextType {
  // Auth & Roles
  currentUser: User | null;
  usersList: User[];
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Brand Settings (Admin)
  brandSettings: BrandSettings;
  updateBrandSettings: (settings: Partial<BrandSettings>) => void;

  // Products
  products: Product[];
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt' | 'rating' | 'soldCount'>) => void;
  updateProductPrice: (id: string, newPrice: number, newOriginalPrice?: number) => void;
  updateProductDiscount: (id: string, discountPercentage: number) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  coupons: DiscountCoupon[];
  addCoupon: (coupon: DiscountCoupon) => void;
  appliedCoupon: DiscountCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;

  // Checkout & Orders
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orders: Order[];
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;
  checkout: (data: {
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    shippingAddress: string;
    courierName: string;
    paymentMethod: string;
  }) => Order;

  // Real-time tracking
  updateShipmentStatus: (orderId: string, status: ShipmentStatus) => void;
  simulateNextStep: (orderId: string) => void;
  isAutoSimulating: boolean;
  setIsAutoSimulating: React.Dispatch<React.SetStateAction<boolean>>;

  // Notifications
  notifications: NotificationMessage[];
  unreadNotificationCount: number;
  markNotificationsAsRead: () => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  latestAlertToast: NotificationMessage | null;
  dismissToast: () => void;

  // Active view navigation
  activeView: 'shop' | 'tracking' | 'seller' | 'admin';
  setActiveView: (view: 'shop' | 'tracking' | 'seller' | 'admin') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('trendstyle_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default to Buyer Luki Hanun
  });

  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    const saved = localStorage.getItem('trendstyle_brand');
    return saved ? JSON.parse(saved) : INITIAL_BRAND_SETTINGS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('trendstyle_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [coupons, setCoupons] = useState<DiscountCoupon[]>(() => {
    const saved = localStorage.getItem('trendstyle_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<DiscountCoupon | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('trendstyle_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('trendstyle_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(orders[0] || null);
  const [notifications, setNotifications] = useState<NotificationMessage[]>(() => {
    return [
      {
        id: 'notif-init-email',
        type: 'email',
        orderId: INITIAL_ORDERS[0]?.id || 'ord-101',
        recipient: 'lukihanun@gmail.com',
        subject: `[${INITIAL_BRAND_SETTINGS.brandName}] Update Pengiriman: Kurir Menuju Alamat Anda`,
        title: 'Status Paket: Menuju Alamat Tujuan',
        content: `Halo Luki Hanun, paket Anda nomor resi JT998273618ID sedang dibawa oleh kurir express kami menuju Jl. Sudirman No. 45. Estimasi tiba hari ini sebelum 17:00 WIB.`,
        timestamp: 'Hari Ini, 13:10 WIB',
        statusTag: 'out_for_delivery',
        isRead: false,
      },
      {
        id: 'notif-init-sms',
        type: 'sms',
        orderId: INITIAL_ORDERS[0]?.id || 'ord-101',
        recipient: '0812-3456-7890',
        title: `SMS dari ${INITIAL_BRAND_SETTINGS.brandName} Express`,
        content: `Kurir J&T Express (Budi) sedang mengantar paket Anda no JT998273618ID. Mohon pastikan ada penerima di lokasi. Lacak: https://trendstyle.id/track/JT998273618ID`,
        timestamp: 'Hari Ini, 13:10 WIB',
        statusTag: 'out_for_delivery',
        isRead: false,
      }
    ];
  });

  const [latestAlertToast, setLatestAlertToast] = useState<NotificationMessage | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeView, setActiveView] = useState<'shop' | 'tracking' | 'seller' | 'admin'>('shop');
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('trendstyle_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('trendstyle_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('trendstyle_brand', JSON.stringify(brandSettings));
  }, [brandSettings]);

  useEffect(() => {
    localStorage.setItem('trendstyle_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('trendstyle_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('trendstyle_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth Methods
  const login = (email: string, role?: UserRole): boolean => {
    const matchedUser = INITIAL_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role)
    );
    if (matchedUser) {
      setCurrentUser(matchedUser);
      setIsAuthModalOpen(false);
      return true;
    } else {
      // Create user if not existing
      const newUser: User = {
        id: generateId('usr'),
        name: email.split('@')[0] || 'User',
        email,
        phone: '0812-9988-7766',
        role: role || 'buyer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      };
      setCurrentUser(newUser);
      setIsAuthModalOpen(false);
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('shop');
  };

  const switchRole = (role: UserRole) => {
    const found = INITIAL_USERS.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      if (role === 'seller') setActiveView('seller');
      else if (role === 'admin') setActiveView('admin');
      else setActiveView('shop');
    } else if (currentUser) {
      setCurrentUser({ ...currentUser, role });
      if (role === 'seller') setActiveView('seller');
      else if (role === 'admin') setActiveView('admin');
      else setActiveView('shop');
    }
  };

  // Brand Settings
  const updateBrandSettings = (settings: Partial<BrandSettings>) => {
    setBrandSettings((prev) => ({ ...prev, ...settings }));
  };

  // Product Methods
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'soldCount'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: generateId('prod'),
      createdAt: new Date().toISOString(),
      rating: 5.0,
      soldCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProductPrice = (id: string, newPrice: number, newOriginalPrice?: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const orig = newOriginalPrice !== undefined ? newOriginalPrice : (p.originalPrice || p.price);
          const discountPct = orig > newPrice ? Math.round(((orig - newPrice) / orig) * 100) : 0;
          return {
            ...p,
            price: newPrice,
            originalPrice: orig > newPrice ? orig : undefined,
            discountPercentage: discountPct > 0 ? discountPct : undefined,
          };
        }
        return p;
      })
    );
  };

  const updateProductDiscount = (id: string, discountPercentage: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const original = p.originalPrice || p.price;
          const discountedPrice = Math.round(original * (1 - discountPercentage / 100));
          return {
            ...p,
            originalPrice: original,
            price: discountedPrice,
            discountPercentage: discountPercentage > 0 ? discountPercentage : undefined,
            badge: discountPercentage >= 40 ? 'SALE' : p.badge,
          };
        }
        return p;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Coupon Methods
  const addCoupon = (coupon: DiscountCoupon) => {
    setCoupons((prev) => [coupon, ...prev]);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );
    if (!found) {
      return { success: false, message: 'Kode kupon tidak valid atau telah kedaluwarsa' };
    }
    const currentSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (currentSubtotal < found.minPurchase) {
      return {
        success: false,
        message: `Minimal belanja untuk kupon ini adalah Rp ${found.minPurchase.toLocaleString('id-ID')}`,
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Kupon ${found.code} berhasil dipasang!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Cart Methods
  const addToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    const selectedSize = size || (product.sizes.length > 0 ? product.sizes[0] : 'All Size');
    const selectedColor = color || (product.colors.length > 0 ? product.colors[0] : 'Standard');

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize, selectedColor }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          (!size || item.selectedSize === size) &&
          (!color || item.selectedColor === color)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    const calculated = (subtotal * appliedCoupon.percentage) / 100;
    discountAmount = appliedCoupon.maxDiscount
      ? Math.min(calculated, appliedCoupon.maxDiscount)
      : calculated;
  }
  const shippingFee = cart.length > 0 ? 15000 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Trigger automatic notifications helper
  const triggerAutoNotifications = (
    order: Order,
    newStatus: ShipmentStatus,
    customNote?: string
  ) => {
    const statusLabel = getStatusLabel(newStatus);
    const timeNow = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

    // 1. Automatic Email Message
    const emailNotif: NotificationMessage = {
      id: generateId('notif-email'),
      type: 'email',
      orderId: order.id,
      recipient: order.buyerEmail,
      subject: `[${brandSettings.brandName}] Update Status Pesanan #${order.invoiceNumber} -> ${statusLabel}`,
      title: `Update Pesanan: ${statusLabel}`,
      content:
        customNote ||
        `Halo ${order.buyerName}, pesanan Anda (${order.invoiceNumber}) dengan nomor resi ${order.trackingNumber} sekarang berstatus: ${statusLabel}. Lokasi saat ini: ${order.currentLocation}.`,
      timestamp: `Hari ini, ${timeNow}`,
      statusTag: newStatus,
      isRead: false,
    };

    // 2. Automatic SMS Message
    const smsNotif: NotificationMessage = {
      id: generateId('notif-sms'),
      type: 'sms',
      orderId: order.id,
      recipient: order.buyerPhone,
      title: `SMS dari ${brandSettings.brandName} Express`,
      content: `[${brandSettings.brandName}] Resi ${order.trackingNumber}: Status berubah menjadi "${statusLabel}". Kurir: ${order.courierName}. Lacak langsung di sistem: https://${brandSettings.brandName.toLowerCase()}.id/track`,
      timestamp: `Hari ini, ${timeNow}`,
      statusTag: newStatus,
      isRead: false,
    };

    setNotifications((prev) => [emailNotif, smsNotif, ...prev]);
    // Show live alert toast
    setLatestAlertToast(emailNotif);
  };

  // Checkout function
  const checkout = (data: {
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    shippingAddress: string;
    courierName: string;
    paymentMethod: string;
  }): Order => {
    const invoiceNum = `INV/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}/TS/${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNum = `EXP${Date.now().toString().slice(-8)}ID`;

    const newOrder: Order = {
      id: generateId('ord'),
      invoiceNumber: invoiceNum,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      buyerPhone: data.buyerPhone,
      shippingAddress: data.shippingAddress,
      courierName: data.courierName,
      trackingNumber: trackingNum,
      items: [...cart],
      subtotal,
      discountAmount,
      shippingFee,
      totalAmount: grandTotal,
      paymentMethod: data.paymentMethod,
      paymentStatus: 'paid',
      currentStatus: 'confirmed',
      estimatedDelivery: '1-2 Hari Kerja',
      currentLocation: 'Warehouse TrendStyle Pusat, Jakarta',
      checkpoints: [
        {
          id: generateId('cp'),
          title: 'Pesanan Dikonfirmasi & Pembayaran Sukses',
          location: 'Sistem Pusat E-Commerce',
          timestamp: 'Baru saja',
          status: 'confirmed',
          description: `Pembayaran ${data.paymentMethod} sebesar Rp ${grandTotal.toLocaleString('id-ID')} telah sukses diverifikasi.`,
          completed: true,
        },
        {
          id: generateId('cp'),
          title: 'Sedang Diproses & Dipacking',
          location: 'Gudang Seller TrendStyle',
          timestamp: 'Menunggu proses packing',
          status: 'packing',
          description: 'Penjual sedang menyiapkan barang dan membungkus pesanan dengan aman.',
          completed: false,
        },
        {
          id: generateId('cp'),
          title: 'Diserahkan ke Kurir Logistik',
          location: 'Sorting Hub Logistik',
          timestamp: 'Menunggu penyerahan',
          status: 'in_transit',
          description: 'Barang dijemput kurir untuk dibawa ke pusat penyortiran paket.',
          completed: false,
        },
        {
          id: generateId('cp'),
          title: 'Kurir Menuju Alamat Pengantaran',
          location: 'Hub Kurir Terdekat Penerima',
          timestamp: 'Menunggu jadwal antar',
          status: 'out_for_delivery',
          description: 'Kurir bergerak menuju alamat pengantaran penerima.',
          completed: false,
        },
        {
          id: generateId('cp'),
          title: 'Paket Telah Berhasil Diterima',
          location: 'Alamat Tujuan Penerima',
          timestamp: 'Estimasi 1-2 Hari',
          status: 'delivered',
          description: 'Paket telah sampai di tujuan dan diterima dengan baik.',
          completed: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveView('tracking');

    // Trigger initial notification
    triggerAutoNotifications(
      newOrder,
      'confirmed',
      `Pesanan baru Anda #${newOrder.invoiceNumber} telah berhasil dibuat! Kami akan mengabari Anda setiap kali status berubah via Email & SMS otomatis.`
    );

    return newOrder;
  };

  // Real-time tracking status update
  const updateShipmentStatus = (orderId: string, nextStatus: ShipmentStatus) => {
    const statusOrder: ShipmentStatus[] = [
      'confirmed',
      'packing',
      'in_transit',
      'out_for_delivery',
      'delivered',
    ];
    const targetIdx = statusOrder.indexOf(nextStatus);

    const locationsMap: Record<ShipmentStatus, string> = {
      confirmed: 'Sistem Toko & Payment Gateway',
      packing: 'Warehouse Seller - Quality Check & Packing',
      in_transit: 'J&T Sorting Center Gateway Jakarta',
      out_for_delivery: 'Armada Van Kurir - Menuju Jl. Sudirman',
      delivered: 'Alamat Tujuan - Diterima oleh Penerima',
    };

    let updatedOrderObj: Order | null = null;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WIB';

          const newCheckpoints = ord.checkpoints.map((cp) => {
            const cpIdx = statusOrder.indexOf(cp.status);
            if (cpIdx <= targetIdx) {
              return {
                ...cp,
                completed: true,
                timestamp: cp.completed ? cp.timestamp : `Hari ini, ${nowStr}`,
              };
            }
            return { ...cp, completed: false };
          });

          const updated: Order = {
            ...ord,
            currentStatus: nextStatus,
            currentLocation: locationsMap[nextStatus],
            checkpoints: newCheckpoints,
            updatedAt: new Date().toISOString(),
          };

          updatedOrderObj = updated;
          return updated;
        }
        return ord;
      })
    );

    if (activeTrackingOrder && activeTrackingOrder.id === orderId && updatedOrderObj) {
      setActiveTrackingOrder(updatedOrderObj);
    }

    if (updatedOrderObj) {
      triggerAutoNotifications(updatedOrderObj, nextStatus);
    }
  };

  // Simulate Next Step helper
  const simulateNextStep = (orderId: string) => {
    const ord = orders.find((o) => o.id === orderId);
    if (!ord) return;
    const statusOrder: ShipmentStatus[] = [
      'confirmed',
      'packing',
      'in_transit',
      'out_for_delivery',
      'delivered',
    ];
    const currentIdx = statusOrder.indexOf(ord.currentStatus);
    if (currentIdx < statusOrder.length - 1) {
      updateShipmentStatus(orderId, statusOrder[currentIdx + 1]);
    } else {
      // Loop back or reset to confirmed for continuous demo testing
      updateShipmentStatus(orderId, 'confirmed');
    }
  };

  // Auto simulation ticker
  useEffect(() => {
    if (!isAutoSimulating || !activeTrackingOrder) return;
    const timer = setInterval(() => {
      simulateNextStep(activeTrackingOrder.id);
    }, 9000);
    return () => clearInterval(timer);
  }, [isAutoSimulating, activeTrackingOrder, orders]);

  // Notifications Helpers
  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissToast = () => {
    setLatestAlertToast(null);
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        usersList: INITIAL_USERS,
        login,
        logout,
        switchRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        brandSettings,
        updateBrandSettings,
        products,
        addProduct,
        updateProductPrice,
        updateProductDiscount,
        deleteProduct,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        coupons,
        addCoupon,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discountAmount,
        shippingFee,
        grandTotal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orders,
        activeTrackingOrder,
        setActiveTrackingOrder,
        checkout,
        updateShipmentStatus,
        simulateNextStep,
        isAutoSimulating,
        setIsAutoSimulating,
        notifications,
        unreadNotificationCount,
        markNotificationsAsRead,
        isNotificationOpen,
        setIsNotificationOpen,
        latestAlertToast,
        dismissToast,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
