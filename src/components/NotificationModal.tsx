import React, { useState } from 'react';
import {
  X,
  Mail,
  MessageSquare,
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  Smartphone,
  Send,
  Trash2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getStatusLabel, getStatusBadgeClass } from '../utils/formatters';

export const NotificationModal: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    unreadNotificationCount,
    markNotificationsAsRead,
    brandSettings,
    setActiveView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'email' | 'sms'>('all');
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>(null);

  if (!isNotificationOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'email') return n.type === 'email';
    if (activeTab === 'sms') return n.type === 'sms';
    return true;
  });

  const selectedNotification =
    notifications.find((n) => n.id === selectedNotificationId) ||
    filteredNotifications[0] ||
    null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] max-h-[700px] shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-black flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
                <span>Notifikasi Otomatis (Email & Pesan Singkat SMS)</span>
              </h3>
              <p className="text-xs text-gray-400">
                Setiap perubahan status resi kurir otomatis memicu pengiriman pesan instan ke pembeli.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadNotificationCount > 0 && (
              <button
                onClick={markNotificationsAsRead}
                className="hidden sm:inline-flex px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Tandai Sudah Dibaca
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              Semua Notifikasi ({notifications.length})
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'email'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Resmi ({notifications.filter((n) => n.type === 'email').length})</span>
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sms'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>SMS / WA ({notifications.filter((n) => n.type === 'sms').length})</span>
            </button>
          </div>

          <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hidden md:inline">
            ● Gateway Terhubung
          </span>
        </div>

        {/* Dual Panel Body */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: List of Notifications (5 cols) */}
          <div className="md:col-span-5 border-r border-gray-200 overflow-y-auto p-3 space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-xs">
                Tidak ada notifikasi untuk kategori ini.
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const isSelected = selectedNotification?.id === notif.id;
                return (
                  <button
                    key={notif.id}
                    onClick={() => setSelectedNotificationId(notif.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-black bg-neutral-50 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        {notif.type === 'email' ? (
                          <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                            <Mail className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="p-1 rounded-md bg-blue-100 text-blue-700">
                            <Smartphone className="w-3.5 h-3.5" />
                          </span>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                          {notif.type === 'email' ? 'EMAIL NOTIF' : 'SMS ALERT'}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{notif.timestamp}</span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{notif.title}</h4>

                    <p className="text-[11px] text-gray-500 line-clamp-2">{notif.content}</p>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-gray-400 truncate max-w-[140px]">
                        Ke: {notif.recipient}
                      </span>
                      <span className={`px-2 py-0.5 rounded-xs border font-medium ${getStatusBadgeClass(notif.statusTag)}`}>
                        {getStatusLabel(notif.statusTag)}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Preview (7 cols) */}
          <div className="md:col-span-7 bg-gray-50 overflow-y-auto p-4 sm:p-6 flex flex-col justify-start">
            {selectedNotification ? (
              selectedNotification.type === 'email' ? (
                /* Email Preview Layout */
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden max-w-lg mx-auto w-full">
                  {/* Fake Email Client Bar */}
                  <div className="bg-gray-100 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-gray-700 ml-2">Inbox Mail Preview</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">Status: Terkirim Otomatis</span>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="space-y-1 pb-3 border-b border-gray-100 text-xs">
                      <div className="text-gray-500">
                        <strong className="text-gray-700">Dari:</strong> {brandSettings.brandName} Official Delivery &lt;{brandSettings.contactEmail}&gt;
                      </div>
                      <div className="text-gray-500">
                        <strong className="text-gray-700">Kepada:</strong> {selectedNotification.recipient}
                      </div>
                      <div className="text-gray-900 font-bold text-sm pt-1">
                        Subjek: {selectedNotification.subject || selectedNotification.title}
                      </div>
                    </div>

                    {/* Styled Email Body Template */}
                    <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <div className="font-display font-black text-lg text-black uppercase">
                          {brandSettings.brandName}
                        </div>
                        <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-xs">
                          Pemberitahuan Otomatis
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="inline-block">
                          <span className={`text-xs px-2.5 py-1 rounded-md border ${getStatusBadgeClass(selectedNotification.statusTag)}`}>
                            Status Terkini: {getStatusLabel(selectedNotification.statusTag)}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {selectedNotification.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {selectedNotification.content}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-[11px] text-gray-500">
                          Dikirim pada: {selectedNotification.timestamp}
                        </span>
                        <button
                          onClick={() => {
                            setIsNotificationOpen(false);
                            setActiveView('tracking');
                          }}
                          className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-md hover:bg-neutral-800 cursor-pointer flex items-center gap-1"
                        >
                          <span>Buka Pelacakan GPS</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Smartphone SMS / WA Preview */
                <div className="max-w-sm mx-auto w-full bg-neutral-900 rounded-[36px] p-3 shadow-2xl border-4 border-neutral-700">
                  {/* Phone Speaker Notch */}
                  <div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-8 h-1 bg-neutral-600 rounded-full" />
                  </div>

                  <div className="bg-white rounded-[26px] overflow-hidden flex flex-col h-[480px]">
                    {/* SMS App Header */}
                    <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        SMS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">
                          {brandSettings.brandName} Express
                        </div>
                        <div className="text-[10px] text-gray-500">Pesan Singkat Otomatis</div>
                      </div>
                    </div>

                    {/* Chat Bubble Area */}
                    <div className="flex-1 p-4 bg-gray-50 flex flex-col justify-end space-y-3">
                      <div className="text-center text-[10px] text-gray-400">
                        {selectedNotification.timestamp}
                      </div>

                      {/* Incoming Message Bubble */}
                      <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-sm border border-gray-200 max-w-[90%] space-y-2">
                        <div className="text-xs font-bold text-blue-700">
                          {selectedNotification.title}
                        </div>
                        <p className="text-xs text-gray-800 leading-relaxed">
                          {selectedNotification.content}
                        </p>
                        <div className="text-[10px] text-gray-400 text-right">
                          Terkirim via SMS Gateway
                        </div>
                      </div>
                    </div>

                    {/* Phone Bottom Bar */}
                    <div className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2">
                      <input
                        disabled
                        type="text"
                        placeholder="Pesan otomatis sistem (hanya baca)"
                        className="flex-1 text-[11px] bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 text-gray-400"
                      />
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <Send className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                Pilih notifikasi di sebelah kiri untuk melihat rincian pengiriman.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
