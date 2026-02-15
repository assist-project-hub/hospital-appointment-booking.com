import { useState } from 'react';
import { Phone, Mail, MapPin, CheckCircle2, Send } from 'lucide-react';
import { getSettings } from '../../lib/storage';
import { addContact } from '../../lib/storage';

export function Contact() {
  const settings = getSettings();
  const contact = settings?.contact ?? {};
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name?.value?.trim();
    const email = form.email?.value?.trim();
    const subject = form.subject?.value?.trim();
    const message = form.message?.value?.trim();
    if (!name || !email || !subject || !message) {
      setLoading(false);
      return;
    }
    addContact({ name, email, subject, message });
    setStatus('success');
    setLoading(false);
    form.reset();
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Have questions about our services? Reach out to our support team or visit us at our main campus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{contact.phoneLabel ?? 'Emergency Call'}</h4>
                <p className="text-slate-600 font-medium">{contact.phone ?? '+1 (800) 999-0000'}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{contact.phoneSub ?? 'Available 24/7'}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{contact.emailLabel ?? 'Email Us'}</h4>
                <p className="text-slate-600 font-medium">{contact.email ?? 'support@hospital.org'}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{contact.emailSub ?? 'Typical reply: 2 hours'}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{contact.addressLabel ?? 'Our Location'}</h4>
                <p className="text-slate-600 font-medium">{contact.address ?? '123 Wellness Ave'}</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{contact.addressSub ?? ''}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>

              {status === 'success' ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
                  <p className="text-slate-500 mt-2">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Your Name</label>
                    <input id="contact-name" name="name" required type="text" placeholder="Jane Smith" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                    <input id="contact-email" name="email" required type="email" placeholder="jane@example.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="contact-subject" className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Subject</label>
                    <input id="contact-subject" name="subject" required type="text" placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Message</label>
                    <textarea id="contact-message" name="message" required rows="4" placeholder="Tell us more about your inquiry..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full bg-slate-900 text-white py-5 rounded-2xl font-bold overflow-hidden hover:bg-blue-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
