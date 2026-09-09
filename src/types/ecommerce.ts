export type UserRole = 'buyer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Denim' | 'Streetwear' | 'Jackets' | 'Tops' | 'Bags' | 'Accessories' | 'Shoes';
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  stock: number;
  rating: number;
  soldCount: number;
  description: string;
  sizes: string[];
  colors: string[];
  sellerName: string;
  badge?: 'NEW' | 'TREND' | 'HOT' | 'SALE';
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface DiscountCoupon {
  code: string;
  description: string;
  percentage: number;
  minPurchase: number;
  maxDiscount?: number;
  isActive: boolean;
}

export type ShipmentStatus = 
  | 'confirmed'
  | 'packing'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

export interface TrackingCheckpoint {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: ShipmentStatus;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  shippingAddress: string;
  courierName: string;
  trackingNumber: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending';
  currentStatus: ShipmentStatus;
  estimatedDelivery: string;
  currentLocation: string;
  checkpoints: TrackingCheckpoint[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationMessage {
  id: string;
  type: 'email' | 'sms';
  orderId: string;
  recipient: string;
  subject?: string; // For email
  title: string;
  content: string;
  timestamp: string;
  statusTag: ShipmentStatus;
  isRead: boolean;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  announcementText: string;
  discountHighlight: string; // e.g. "80%"
  contactEmail: string;
  contactPhone: string;
  logoLetter: string;
  heroSubtext: string;
}
