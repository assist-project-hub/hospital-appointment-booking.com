import { Stethoscope } from 'lucide-react';
import { getSettings } from '../../lib/storage';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  const settings = getSettings();
  const name = settings?.hospitalName ?? 'LuminaCare';
  const about = settings?.about ?? {};
  const footerText = about.footerText ?? 'Dedicated to providing accessible, high-quality healthcare to our community.';

  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white">{name}</span>
            </div>
            <p className="max-w-sm mb-6 leading-relaxed">{footerText}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button type="button" onClick={() => scrollToSection('home')} className="hover:text-blue-400 transition-colors">Home</button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('departments')} className="hover:text-blue-400 transition-colors">Specializations</button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('doctors')} className="hover:text-blue-400 transition-colors">Our Doctors</button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('booking')} className="hover:text-blue-400 transition-colors">Appointments</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Patient Rights</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs">© {new Date().getFullYear()} {name} Hospital Management. All rights reserved.</p>
          <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
