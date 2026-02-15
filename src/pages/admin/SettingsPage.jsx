import { useState, useEffect } from 'react';
import { Settings, Save } from 'lucide-react';
import { getSettings, setSettings } from '../../lib/storage';

const defaultForm = {
  hospitalName: '',
  tagline: '',
  bannerTitle: '',
  bannerSubtitle: '',
  bannerImageUrl: '',
  bannerCtaText: '',
  aboutHeading: '',
  aboutImageUrl: '',
  aboutStats: '',
  aboutStatsLabel: '',
  aboutPoint1Title: '',
  aboutPoint1Text: '',
  aboutPoint2Title: '',
  aboutPoint2Text: '',
  aboutPoint3Title: '',
  aboutPoint3Text: '',
  aboutFooterText: '',
  contactPhone: '',
  contactPhoneLabel: '',
  contactPhoneSub: '',
  contactEmail: '',
  contactEmailLabel: '',
  contactEmailSub: '',
  contactAddress: '',
  contactAddressLabel: '',
  contactAddressSub: '',
};

export function SettingsPage() {
  const [form, setForm] = useState(defaultForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getSettings();
    setForm({
      hospitalName: s?.hospitalName ?? '',
      tagline: s?.tagline ?? '',
      bannerTitle: s?.banner?.title ?? '',
      bannerSubtitle: s?.banner?.subtitle ?? '',
      bannerImageUrl: s?.banner?.imageUrl ?? '',
      bannerCtaText: s?.banner?.ctaText ?? '',
      aboutHeading: s?.about?.heading ?? '',
      aboutImageUrl: s?.about?.imageUrl ?? '',
      aboutStats: s?.about?.stats ?? '',
      aboutStatsLabel: s?.about?.statsLabel ?? '',
      aboutPoint1Title: s?.about?.points?.[0]?.title ?? '',
      aboutPoint1Text: s?.about?.points?.[0]?.text ?? '',
      aboutPoint2Title: s?.about?.points?.[1]?.title ?? '',
      aboutPoint2Text: s?.about?.points?.[1]?.text ?? '',
      aboutPoint3Title: s?.about?.points?.[2]?.title ?? '',
      aboutPoint3Text: s?.about?.points?.[2]?.text ?? '',
      aboutFooterText: s?.about?.footerText ?? '',
      contactPhone: s?.contact?.phone ?? '',
      contactPhoneLabel: s?.contact?.phoneLabel ?? '',
      contactPhoneSub: s?.contact?.phoneSub ?? '',
      contactEmail: s?.contact?.email ?? '',
      contactEmailLabel: s?.contact?.emailLabel ?? '',
      contactEmailSub: s?.contact?.emailSub ?? '',
      contactAddress: s?.contact?.address ?? '',
      contactAddressLabel: s?.contact?.addressLabel ?? '',
      contactAddressSub: s?.contact?.addressSub ?? '',
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings({
      hospitalName: form.hospitalName,
      tagline: form.tagline,
      banner: {
        title: form.bannerTitle,
        subtitle: form.bannerSubtitle,
        imageUrl: form.bannerImageUrl,
        ctaText: form.bannerCtaText,
      },
      about: {
        heading: form.aboutHeading,
        imageUrl: form.aboutImageUrl,
        stats: form.aboutStats,
        statsLabel: form.aboutStatsLabel,
        points: [
          { title: form.aboutPoint1Title, text: form.aboutPoint1Text },
          { title: form.aboutPoint2Title, text: form.aboutPoint2Text },
          { title: form.aboutPoint3Title, text: form.aboutPoint3Text },
        ],
        footerText: form.aboutFooterText,
      },
      contact: {
        phone: form.contactPhone,
        phoneLabel: form.contactPhoneLabel,
        phoneSub: form.contactPhoneSub,
        email: form.contactEmail,
        emailLabel: form.contactEmailLabel,
        emailSub: form.contactEmailSub,
        address: form.contactAddress,
        addressLabel: form.contactAddressLabel,
        addressSub: form.contactAddressSub,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Settings className="w-9 h-9 text-blue-600" />
        Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hospital name</label>
              <input type="text" value={form.hospitalName} onChange={(e) => update('hospitalName', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
              <input type="text" value={form.tagline} onChange={(e) => update('tagline', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Banner (Hero)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input type="text" value={form.bannerTitle} onChange={(e) => update('bannerTitle', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
              <textarea value={form.bannerSubtitle} onChange={(e) => update('bannerSubtitle', e.target.value)} rows={2} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input type="url" value={form.bannerImageUrl} onChange={(e) => update('bannerImageUrl', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">CTA button text</label>
              <input type="text" value={form.bannerCtaText} onChange={(e) => update('bannerCtaText', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">About section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Heading</label>
              <input type="text" value={form.aboutHeading} onChange={(e) => update('aboutHeading', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input type="url" value={form.aboutImageUrl} onChange={(e) => update('aboutImageUrl', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Stats number</label>
                <input type="text" value={form.aboutStats} onChange={(e) => update('aboutStats', e.target.value)} placeholder="25+" className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Stats label</label>
                <input type="text" value={form.aboutStatsLabel} onChange={(e) => update('aboutStatsLabel', e.target.value)} placeholder="Years of Excellence" className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 1 title</label>
              <input type="text" value={form.aboutPoint1Title} onChange={(e) => update('aboutPoint1Title', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none mb-2" />
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 1 text</label>
              <input type="text" value={form.aboutPoint1Text} onChange={(e) => update('aboutPoint1Text', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 2 title</label>
              <input type="text" value={form.aboutPoint2Title} onChange={(e) => update('aboutPoint2Title', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none mb-2" />
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 2 text</label>
              <input type="text" value={form.aboutPoint2Text} onChange={(e) => update('aboutPoint2Text', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 3 title</label>
              <input type="text" value={form.aboutPoint3Title} onChange={(e) => update('aboutPoint3Title', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none mb-2" />
              <label className="block text-sm font-medium text-slate-700 mb-1">Point 3 text</label>
              <input type="text" value={form.aboutPoint3Text} onChange={(e) => update('aboutPoint3Text', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Footer about text</label>
              <textarea value={form.aboutFooterText} onChange={(e) => update('aboutFooterText', e.target.value)} rows={2} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">Contact info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input type="text" value={form.contactPhone} onChange={(e) => update('contactPhone', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone label</label>
              <input type="text" value={form.contactPhoneLabel} onChange={(e) => update('contactPhoneLabel', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" value={form.contactEmail} onChange={(e) => update('contactEmail', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email label</label>
              <input type="text" value={form.contactEmailLabel} onChange={(e) => update('contactEmailLabel', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input type="text" value={form.contactAddress} onChange={(e) => update('contactAddress', e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            <Save className="w-4 h-4" />
            Save settings
          </button>
          {saved && <span className="text-green-600 font-medium">Settings saved.</span>}
        </div>
      </form>
    </div>
  );
}
