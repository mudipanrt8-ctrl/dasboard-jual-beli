import { ShipmentStatus } from '../types/ecommerce';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getStatusLabel(status: ShipmentStatus): string {
  switch (status) {
    case 'confirmed':
      return 'Pesanan Dikonfirmasi';
    case 'packing':
      return 'Sedang Dipacking';
    case 'in_transit':
      return 'Dalam Pengiriman Kurir';
    case 'out_for_delivery':
      return 'Menuju Alamat Tujuan';
    case 'delivered':
      return 'Paket Diterima';
    default:
      return status;
  }
}

export function getStatusStepIndex(status: ShipmentStatus): number {
  switch (status) {
    case 'confirmed':
      return 0;
    case 'packing':
      return 1;
    case 'in_transit':
      return 2;
    case 'out_for_delivery':
      return 3;
    case 'delivered':
      return 4;
    default:
      return 0;
  }
}

export function getStatusBadgeClass(status: ShipmentStatus): string {
  switch (status) {
    case 'confirmed':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'packing':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'in_transit':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'out_for_delivery':
      return 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
    case 'delivered':
      return 'bg-teal-50 text-teal-800 border-teal-300 font-bold';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}
