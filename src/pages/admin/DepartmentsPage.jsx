import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';
import { getDepartments, setDepartments } from '../../lib/storage';

const ICON_OPTIONS = ['Heart', 'Activity', 'Users', 'ShieldCheck', 'User'];

export function DepartmentsPage() {
  const [departments, setDeptsState] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', icon: 'Heart' });

  const load = () => setDeptsState(getDepartments());

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = form.name?.trim();
    const description = form.description?.trim();
    if (!name) return;
    const next = [...departments];
    const payload = { name, description, icon: form.icon || 'Heart' };
    if (editingId) {
      const i = next.findIndex((d) => d.id === editingId);
      if (i >= 0) next[i] = { ...next[i], ...payload };
      setEditingId(null);
    } else {
      const id = `dept-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      next.push({ id, ...payload });
    }
    setDepartments(next);
    load();
    setForm({ name: '', description: '', icon: 'Heart' });
  };

  const handleEdit = (d) => {
    setEditingId(d.id);
    setForm({ name: d.name, description: d.description || '', icon: d.icon || 'Heart' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this department? Doctors in it will need to be reassigned.')) return;
    const next = departments.filter((d) => d.id !== id);
    setDepartments(next);
    load();
    if (editingId === id) setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Building2 className="w-9 h-9 text-blue-600" />
        Departments
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Department' : 'Add Department'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Cardiology"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setForm({ name: '', description: '', icon: 'Heart' }); }}
                    className="px-4 py-3 rounded-xl border border-slate-200 font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">All Departments</h2>
            </div>
            {departments.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No departments yet. Add one above.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {departments.map((d) => (
                  <li key={d.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <p className="font-semibold text-slate-900">{d.name}</p>
                      <p className="text-sm text-slate-500">{d.description || '—'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(d)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => handleDelete(d.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
