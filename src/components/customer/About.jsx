import { CheckCircle2 } from 'lucide-react';
import { getSettings } from '../../lib/storage';

export function About() {
  const settings = getSettings();
  const about = settings?.about ?? {};

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={about.imageUrl || 'https://images.unsplash.com/photo-1504813184591-01592fd03cf7?auto=format&fit=crop&q=80&w=1000'}
              alt="Modern Facility"
              className="rounded-3xl shadow-2xl relative z-10 w-full"
            />
            {about.stats && (
              <div className="absolute -bottom-10 -right-10 bg-blue-600 p-8 rounded-3xl text-white shadow-2xl z-20 hidden md:block">
                <p className="text-4xl font-bold mb-1">{about.stats}</p>
                <p className="text-sm opacity-80 font-medium">{about.statsLabel ?? 'Years of Excellence'}</p>
              </div>
            )}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full -z-0 opacity-50" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              {about.heading ?? 'We Are Committed To Your Better Health'}
            </h2>
            <div className="space-y-6">
              {(about.points || []).map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{point.title}</h4>
                    <p className="text-slate-500 text-sm">{point.text}</p>
                  </div>
                </div>
              ))}
              {(!about.points || about.points.length === 0) && (
                <>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Modern Equipment</h4>
                      <p className="text-slate-500 text-sm">Our facility is equipped with the latest diagnostic and surgical technology.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Expert Medical Team</h4>
                      <p className="text-slate-500 text-sm">Our doctors are board-certified and leaders in their respective fields.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Patient-Centered Care</h4>
                      <p className="text-slate-500 text-sm">We believe in a holistic approach where patient comfort and safety come first.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
