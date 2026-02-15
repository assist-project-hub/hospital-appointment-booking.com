import { useState } from 'react';
import { Stethoscope, Menu, X } from 'lucide-react';
import { getSettings } from '../../lib/storage';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'departments', label: 'Departments' },
  { id: 'doctors', label: 'Doctors' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const settings = getSettings();
  const name = settings?.hospitalName ?? 'LuminaCare';

  const handleNav = (id) => {
    if (id === 'booking') {
      scrollToSection('booking');
    } else {
      scrollToSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-blue-600 p-2 rounded-xl">
              <Stethoscope className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {name}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium transition-colors hover:text-blue-600 text-slate-600"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav('booking')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Book Appointment
            </button>
          </div>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="block w-full text-left px-4 py-2 text-slate-600 font-medium"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav('booking')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-center font-semibold"
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
}
