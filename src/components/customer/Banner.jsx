import { Calendar } from 'lucide-react';
import { getSettings } from '../../lib/storage';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Banner() {
  const settings = getSettings();
  const banner = settings?.banner ?? {};
  const tagline = settings?.tagline ?? 'Excellence in Healthcare';

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={banner.imageUrl || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000'}
          className="w-full h-full object-cover opacity-20"
          alt="Hospital"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {tagline}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
            {banner.title === 'Your Health is Our Top Priority' || !banner.title ? (
              <>Your Health is Our <span className="text-blue-600">Top Priority</span></>
            ) : (
              banner.title
            )}
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {banner.subtitle ?? 'Experience world-class medical services with a touch of compassion.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('booking')}
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
            >
              <Calendar className="w-5 h-5" />
              {banner.ctaText ?? 'Book Your Visit'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              Our Facility
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
