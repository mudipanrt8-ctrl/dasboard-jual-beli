import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Play,
  Pause,
  ChevronRight,
  Bell,
  Mail,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  PhoneCall,
  Share2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getStatusLabel, getStatusBadgeClass, getStatusStepIndex, formatRupiah } from '../utils/formatters';
import { ShipmentStatus } from '../types/ecommerce';

export const TrackingView: React.FC = () => {
  const {
    orders,
    activeTrackingOrder,
    setActiveTrackingOrder,
    updateShipmentStatus,
    simulateNextStep,
    isAutoSimulating,
    setIsAutoSimulating,
    setIsNotificationOpen,
    notifications,
  } = useStore();

  const [selectedResiSearch, setSelectedResiSearch] = useState('');

  const currentOrder = activeTrackingOrder || orders[0];

  if (!currentOrder) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="font-display font-bold text-lg text-gray-800">Belum Ada Riwayat Pesanan</h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
          Silakan lakukan checkout di keranjang belanja untuk mengaktifkan pelacakan kurir real-time.
        </p>
      </div>
    );
  }

  const currentStepIdx = getStatusStepIndex(currentOrder.currentStatus);

  // Status progression stages for map
  const stages = [
    { key: 'confirmed', label: 'Dikonfirmasi', icon: CheckCircle2, pct: 10 },
    { key: 'packing', label: 'Dipacking', icon: Package, pct: 32 },
    { key: 'in_transit', label: 'Sorting Gateway', icon: Truck, pct: 58 },
    { key: 'out_for_delivery', label: 'Kurir Menuju Lokasi', icon: Truck, pct: 82 },
    { key: 'delivered', label: 'Paket Diterima', icon: CheckCircle2, pct: 100 },
  ];

  const currentProgressPct = stages[currentStepIdx]?.pct || 15;

  const handleManualStatusChange = (status: ShipmentStatus) => {
    updateShipmentStatus(currentOrder.id, status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Simulator Control Toolbar */}
      <div className="bg-neutral-950 text-white rounded-2xl p-5 md:p-6 shadow-xl border border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-active" />
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              Live Satellite GPS Tracking
            </span>
          </div>
          <h2 className="font-display font-bold text-xl md:text-2xl text-white flex items-center gap-2">
            <span>Pelacakan Pengiriman Barang Real-Time</span>
          </h2>
          <p className="text-xs text-gray-400 max-w-2xl">
            Sistem memantau posisi armada kurir secara langsung. Setiap pergantian titik status akan
            memicu notifikasi instan otomatis via Email dan SMS.
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => simulateNextStep(currentOrder.id)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            title="Klik untuk memajukan status kurir ke tahap berikutnya"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Langkah Selanjutnya (Real-Time)</span>
          </button>

          <button
            onClick={() => setIsAutoSimulating(!isAutoSimulating)}
            className={`px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border cursor-pointer ${
              isAutoSimulating
                ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
            }`}
          >
            {isAutoSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoSimulating ? 'Jeda Auto Simulator' : 'Auto Simulator (9s)'}</span>
          </button>

          <button
            onClick={() => setIsNotificationOpen(true)}
            className="px-3.5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-xl border border-neutral-700 transition-all flex items-center gap-1.5 cursor-pointer relative"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Cek Email & SMS ({notifications.length})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left is Order Info & Interactive Map, Right is Timeline Checkpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Tracking Header + Live Route Map + Driver Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Header Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Nomor Resi / AWB
                </span>
                <div className="font-display font-bold text-xl text-black flex items-center gap-2">
                  <span>{currentOrder.trackingNumber}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(currentOrder.currentStatus)}`}>
                    {getStatusLabel(currentOrder.currentStatus)}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-400 block uppercase tracking-widest">
                  Kurir Ekspedisi
                </span>
                <span className="text-xs font-bold text-gray-800">{currentOrder.courierName}</span>
              </div>
            </div>

            {/* Quick Resi Switcher if multiple orders */}
            {orders.length > 1 && (
              <div className="flex items-center gap-2 pt-3 overflow-x-auto">
                <span className="text-[11px] font-semibold text-gray-500 whitespace-nowrap">
                  Pilih Pesanan:
                </span>
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setActiveTrackingOrder(ord)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer ${
                      currentOrder.id === ord.id
                        ? 'bg-black text-white font-bold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ord.trackingNumber} ({getStatusLabel(ord.currentStatus)})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Live Route Map Simulation */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-display font-bold text-sm text-white uppercase tracking-wider">
                  Live GPS Route & Armada Position
                </span>
              </div>
              <span className="text-[11px] text-gray-400 font-mono">
                Lat: -6.2088 • Long: 106.8456
              </span>
            </div>

            {/* Visual Styled Map Canvas Simulation */}
            <div className="relative h-56 bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden flex flex-col justify-between p-4">
              {/* Map Grid and Road visual lines */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:28px_28px]" />

              {/* Highway Curves (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                  d="M 30 140 Q 180 30, 360 120 T 700 80"
                  fill="none"
                  stroke="#333333"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 30 140 Q 180 30, 360 120 T 700 80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>

              {/* Origin Marker (Warehouse) */}
              <div className="absolute left-6 bottom-8 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  🏭
                </div>
                <span className="text-[10px] text-gray-300 font-semibold mt-1 bg-black/80 px-1.5 py-0.5 rounded-xs">
                  Gudang Pusat
                </span>
              </div>

              {/* Transit Hub Marker */}
              <div className="absolute left-[48%] top-12 z-10 flex flex-col items-center -translate-x-1/2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  🏢
                </div>
                <span className="text-[10px] text-gray-300 font-semibold mt-1 bg-black/80 px-1.5 py-0.5 rounded-xs">
                  Sorting Hub
                </span>
              </div>

              {/* Destination Marker */}
              <div className="absolute right-6 top-8 z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  📍
                </div>
                <span className="text-[10px] text-gray-300 font-semibold mt-1 bg-black/80 px-1.5 py-0.5 rounded-xs">
                  Alamat Anda
                </span>
              </div>

              {/* Animated Courier Van Moving Dynamically */}
              <div
                className="absolute z-20 transition-all duration-1000 ease-in-out"
                style={{
                  left: `calc(${currentProgressPct}% - 24px)`,
                  top: currentStepIdx === 0 ? '65%' : currentStepIdx === 1 ? '55%' : currentStepIdx === 2 ? '30%' : currentStepIdx === 3 ? '42%' : '20%',
                }}
              >
                <div className="relative flex flex-col items-center courier-live">
                  <div className="bg-emerald-400 text-neutral-950 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>Kurir J&T</span>
                  </div>
                  <div className="w-3 h-3 bg-emerald-400 rotate-45 -mt-1" />
                  <div className="w-4 h-4 rounded-full bg-emerald-400/40 pulse-active absolute -bottom-1" />
                </div>
              </div>

              {/* Bottom Real-Time Status Ticker inside Map */}
              <div className="relative z-10 bg-neutral-900/90 backdrop-blur-xs p-3 rounded-lg border border-neutral-800 flex items-center justify-between text-xs mt-auto">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-gray-400">Posisi Kurir:</span>
                  <span className="font-bold text-white">{currentOrder.currentLocation}</span>
                </div>
                <div className="text-emerald-400 font-mono text-[11px] font-semibold">
                  ETA: {currentOrder.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-4 pt-4 border-t border-neutral-800">
              <div className="flex justify-between text-[11px] font-semibold text-gray-400 mb-1.5">
                <span>Progres Perjalanan</span>
                <span className="text-emerald-400 font-bold">{currentProgressPct}% Terlewati</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full route-progress-bar"
                  style={{ width: `${currentProgressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Courier Driver & Delivery Info Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Courier Driver"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Kurir Bertugas
                </div>
                <h4 className="text-sm font-bold text-gray-900">Budi Santoso</h4>
                <p className="text-xs text-gray-500">Armada Van B 1948 SKR</p>
              </div>
            </div>

            <div className="flex items-center sm:justify-end gap-2">
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Lihat SMS Kurir</span>
              </button>
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lihat Email Resi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Detailed Real-Time Checkpoints Timeline */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-black" />
                <h3 className="font-display font-bold text-base text-gray-900">
                  Timeline Status Resi
                </h3>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Real-Time Sync
              </span>
            </div>

            {/* Checkpoint list */}
            <div className="relative pl-6 pt-4 space-y-6 before:absolute before:left-2.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-gray-200">
              {currentOrder.checkpoints.map((cp, idx) => {
                const isCurrentActive = cp.status === currentOrder.currentStatus;
                return (
                  <div key={cp.id} className="relative">
                    {/* Circle marker */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                        cp.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : isCurrentActive
                          ? 'bg-amber-400 border-black text-black pulse-active'
                          : 'bg-white border-gray-300 text-gray-300'
                      }`}
                    >
                      {cp.completed ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>

                    {/* Checkpoint content */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-xs font-bold leading-tight ${
                            cp.completed || isCurrentActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {cp.title}
                        </h4>
                        <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                          {cp.timestamp}
                        </span>
                      </div>

                      <div className="text-[11px] font-medium text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="line-clamp-1">{cp.location}</span>
                      </div>

                      <p className="text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-100 mt-1">
                        {cp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manual Status Controller for Demonstration */}
            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                Simulasi Ganti Status Pengiriman (Seller / Kurir):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    'confirmed',
                    'packing',
                    'in_transit',
                    'out_for_delivery',
                    'delivered',
                  ] as ShipmentStatus[]
                ).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleManualStatusChange(st)}
                    className={`px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-all cursor-pointer text-left flex items-center justify-between ${
                      currentOrder.currentStatus === st
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{getStatusLabel(st)}</span>
                    {currentOrder.currentStatus === st && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 pt-1">
                *Klik salah satu status di atas untuk langsung mengirimkan notifikasi Email & SMS otomatis ke pembeli.
              </p>
            </div>
          </div>

          {/* Purchased Items Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
            <h4 className="font-display font-bold text-sm text-gray-900 mb-3 flex items-center justify-between">
              <span>Isi Paket Pesanan</span>
              <span className="text-xs text-gray-500 font-normal">
                {currentOrder.items.length} Barang
              </span>
            </h4>

            <div className="space-y-3">
              {currentOrder.items.map((it, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    className="w-12 h-14 object-cover rounded-md bg-gray-100"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 line-clamp-1">{it.product.name}</h5>
                    <div className="text-[10px] text-gray-500">
                      {it.quantity}x • Size {it.selectedSize} • {it.selectedColor}
                    </div>
                  </div>
                  <div className="font-bold text-gray-900">
                    {formatRupiah(it.product.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-900">
              <span>Total Pesanan</span>
              <span className="font-display text-sm">{formatRupiah(currentOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
