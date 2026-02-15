import { Heart, Activity, Users, ShieldCheck, User } from 'lucide-react';
import { getDepartments } from '../../lib/storage';

const iconMap = {
  Heart,
  Activity,
  Users,
  ShieldCheck,
  User,
};

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Departments() {
  const departments = getDepartments();

  if (!departments.length) {
    return (
      <section id="departments" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specializations</h2>
            <p className="text-slate-500">No departments added yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="departments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specializations</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Providing advanced care across multiple disciplines with specialized experts and modern infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {departments.map((dept) => {
            const Icon = iconMap[dept.icon] ?? Heart;
            return (
              <button
                key={dept.id}
                type="button"
                onClick={() => {
                  scrollToSection('doctors');
                  window.__filterDept?.(dept.id);
                }}
                className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-blue-600 hover:border-blue-600 transition-all cursor-pointer text-center w-full"
              >
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-white group-hover:bg-white/20 text-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{dept.name}</h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 transition-colors line-clamp-2 text-left">
                  {dept.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
