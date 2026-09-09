import React, { useState } from 'react';
import { SlidersHorizontal, Save, CheckCircle2, RotateCcw, Eye, Sparkles, ShieldAlert } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { INITIAL_BRAND_SETTINGS } from '../data/initialData';

export const AdminBrandDashboard: React.FC = () => {
  const { brandSettings, updateBrandSettings, setActiveView } = useStore();

  const [brandName, setBrandName] = useState(brandSettings.brandName);
  const [tagline, setTagline] = useState(brandSettings.tagline);
  const [announcementText, setAnnouncementText] = useState(brandSettings.announcementText);
  const [discountHighlight, setDiscountHighlight] = useState(brandSettings.discountHighlight);
  const [heroSubtext, setHeroSubtext] = useState(brandSettings.heroSubtext);
  const [contactEmail, setContactEmail] = useState(brandSettings.contactEmail);
  const [contactPhone, setContactPhone] = useState(brandSettings.contactPhone);
  const [logoLetter, setLogoLetter] = useState(brandSettings.logoLetter || 'T');

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandSettings({
      brandName: brandName.trim().toUpperCase(),
      tagline: tagline.trim(),
      announcementText: announcementText.trim(),
      discountHighlight: discountHighlight.trim(),
      heroSubtext: heroSubtext.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      logoLetter: (logoLetter.trim().charAt(0) || brandName.charAt(0) || 'T').toUpperCase(),
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetToDefault = () => {
    updateBrandSettings(INITIAL_BRAND_SETTINGS);
    setBrandName(INITIAL_BRAND_SETTINGS.brandName);
    setTagline(INITIAL_BRAND_SETTINGS.tagline);
    setAnnouncementText(INITIAL_BRAND_SETTINGS.announcementText);
    setDiscountHighlight(INITIAL_BRAND_SETTINGS.discountHighlight);
    setHeroSubtext(INITIAL_BRAND_SETTINGS.heroSubtext);
    setContactEmail(INITIAL_BRAND_SETTINGS.contactEmail);
    setContactPhone(INITIAL_BRAND_SETTINGS.contactPhone);
    setLogoLetter(INITIAL_BRAND_SETTINGS.logoLetter);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Dashboard Khusus Admin Toko</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-gray-900 mt-1">
            Pengaturan Identitas Brand & Toko
          </h2>
          <p className="text-xs text-gray-500">
            Kustomisasi nama brand toko, slogan, banner promosi, dan teks hero yang tampil di seluruh website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('shop')}
            className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Toko</span>
          </button>
          <button
            onClick={handleResetToDefault}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset ke nama bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Bawaan</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-xs animate-toast">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>
              Perubahan identitas brand berhasil disimpan! Nama brand langsung terupdate di Navbar, Banner, Email, & Notifikasi.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">Tersimpan</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <form onSubmit={handleSave} className="space-y-5">
            {/* Nama Brand */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Nama Brand Toko *
              </label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Contoh: TRENDSTYLE, ZARA MODERN, LUXE DISTRO"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-display font-bold uppercase tracking-wider focus:outline-none focus:border-black"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Nama ini akan muncul di logo atas, invoice pesanan, dan subjek email otomatis.
              </p>
            </div>

            {/* Inisial Logo & Slogan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Huruf Logo
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={logoLetter}
                  onChange={(e) => setLogoLetter(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-center uppercase focus:outline-none focus:border-black"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Slogan / Tagline Brand
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Contoh: NEW FASHION STYLE TREN"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold uppercase focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Banner Promo Atas */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Teks Pengumuman Banner Atas
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Contoh: Exclusive Discount Extravaganza — Diskon hingga 80%"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
              />
            </div>

            {/* Highlight Persen Diskon */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Highlight Diskon Utama (Badge)
              </label>
              <input
                type="text"
                value={discountHighlight}
                onChange={(e) => setDiscountHighlight(e.target.value)}
                placeholder="Contoh: 80%"
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-black"
              />
            </div>

            {/* Subteks Hero */}
            <div>
              <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                Subteks Deskripsi Hero Banner
              </label>
              <textarea
                rows={3}
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
              />
            </div>

            {/* Kontak Resmi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Email Dukungan Toko
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Telepon CS / WhatsApp
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Nama Brand & Terapkan Perubahan</span>
            </button>
          </form>
        </div>

        {/* Live Preview Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-100">
              <Eye className="w-4 h-4 text-black" />
              <span>Live Visual Brand Preview</span>
            </div>

            {/* Top bar preview */}
            <div className="bg-black text-white text-[10px] py-1.5 px-3 rounded-md flex items-center justify-between">
              <span className="bg-amber-400 text-black font-bold px-1 rounded-xs">
                HOT -{discountHighlight}
              </span>
              <span className="truncate max-w-[200px]">{announcementText}</span>
            </div>

            {/* Logo & Header preview */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-display font-extrabold text-2xl">
                {logoLetter || brandName.charAt(0) || 'T'}
              </div>
              <div>
                <div className="font-display font-extrabold text-xl text-black tracking-tight uppercase">
                  {brandName || 'BRAND ANDA'}
                </div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase font-medium">
                  {tagline || 'SLOGAN TOKO'}
                </div>
              </div>
            </div>

            {/* Hero Snippet Preview */}
            <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-2">
              <span className="text-[10px] font-bold text-amber-300">
                PROMO UP TO {discountHighlight} OFF
              </span>
              <h4 className="font-display font-bold text-base uppercase leading-tight">
                {tagline || 'NEW FASHION STYLE TREN'}
              </h4>
              <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-3">
                {heroSubtext}
              </p>
            </div>

            {/* Email signature preview */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-[11px] text-gray-500 space-y-0.5">
              <div className="font-bold text-gray-700">Preview Tanda Tangan Email:</div>
              <div>Pengirim: {brandName} Official Support &lt;{contactEmail}&gt;</div>
              <div>CS Hotline: {contactPhone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
