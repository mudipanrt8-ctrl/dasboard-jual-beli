import React, { useEffect } from 'react';
import { Mail, Smartphone, X, ExternalLink, Bell } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getStatusBadgeClass, getStatusLabel } from '../utils/formatters';

export const NotificationToast: React.FC = () => {
  const { latestAlertToast, dismissToast, setIsNotificationOpen } = useStore();

  useEffect(() => {
    if (latestAlertToast) {
      const timer = setTimeout(() => {
        dismissToast();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [latestAlertToast, dismissToast]);

  if (!latestAlertToast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-toast">
      <div className="bg-neutral-950 text-white rounded-xl p-4 shadow-2xl border border-neutral-700 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-500 text-black shrink-0 mt-0.5">
          <Bell className="w-4 h-4" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <span>Notifikasi Otomatis Terkirim</span>
            </span>
            <button
              onClick={dismissToast}
              className="text-gray-400 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h4 className="text-xs font-bold text-white line-clamp-1">
            {latestAlertToast.title}
          </h4>

          <p className="text-[11px] text-gray-300 line-clamp-2">
            {latestAlertToast.content}
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-mono">
              Via Email & SMS
            </span>
            <button
              onClick={() => {
                dismissToast();
                setIsNotificationOpen(true);
              }}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Buka Pesan</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
