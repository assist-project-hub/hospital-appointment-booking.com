import { useState, useMemo, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { getDoctors } from '../../lib/storage';
import { getDepartments } from '../../lib/storage';

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Doctors() {
  const doctors = getDoctors();
  const departments = getDepartments();
  const [filterDept, setFilterDept] = useState('all');

  useEffect(() => {
    const unsub = (setter) => {
      window.__filterDept = setter;
      return () => { window.__filterDept = null; };
    };
    unsub(setFilterDept);
    return () => { window.__filterDept = null; };
  }, []);

  const filteredDoctors = useMemo(() => {
    if (filterDept === 'all') return doctors;
    return doctors.filter((doc) => doc.departmentId === filterDept);
  }, [doctors, filterDept]);

  if (!doctors.length) {
    return (
      <section id="doctors" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-slate-500">No doctors added yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
            <p className="text-slate-500">Highly qualified doctors dedicated to your wellness.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterDept('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filterDept === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              All
            </button>
            {departments.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setFilterDept(d.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filterDept === d.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={doc.image || 'https://via.placeholder.com/300'}
                  alt={doc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase text-blue-600 shadow-sm capitalize">
                  {doc.departmentId}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-1">{doc.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-4 capitalize">{doc.departmentId} Specialist</p>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{doc.bio}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <Clock className="w-4 h-4" />
                    {doc.availability}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToSection('booking')}
                    className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Book Appointment <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
