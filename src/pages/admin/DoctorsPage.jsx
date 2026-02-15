import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Stethoscope } from 'lucide-react';
import { getDoctors, setDoctors, getDepartments } from '../../lib/storage';

export function DoctorsPage() {
  const [doctors, setDoctorsState] = useState([]);
  const [departments, setDepartmentsState] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filterDept, setFilterDept] = useState('all');
  const [form, setForm] = useState({
    name: '', departmentId: '', bio: '', availability: '', image: '',
  });

  const load = () => {
    setDoctorsState(getDoctors());
    setDepartmentsState(getDepartments());
  };

  useEffect(() => {
    load();
  }, []);

  const filteredDoctors = filterDept === 'all'
    ? doctors
    : doctors.filter((d) => d.departmentId === filterDept);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, departmentId, bio, availability, image } = form;
    if (!name?.trim() || !departmentId) return;
    const next = [...doctors];
    const payload = { name: name.trim(), departmentId, bio: bio?.trim() || '', availability: availability?.trim() || '', image: image?.trim() || '' };
    if (editingId) {
      const i = next.findIndex((d) => d.id === editingId);
      if (i >= 0) next[i] = { ...next[i], ...payload };
      setEditingId(null);
    } else {
      const id = `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      next.push({ id, ...payload });
    }
    setDoctors(next);
    load();
    setForm({ name: '', departmentId: '', bio: '', availability: '', image: '' });
  };

  const handleEdit = (d) => {
    setEditingId(d.id);
    setForm({
      name: d.name,
      departmentId: d.departmentId,
      bio: d.bio || '',
      availability: d.availability || '',
      image: d.image || '',
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    const next = doctors.filter((d) => d.id !== id);
    setDoctors(next);
    load();
    if (editingId === id) setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Stethoscope className="w-9 h-9 text-blue-600" />
        Doctors
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Doctor' : 'Add Doctor'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Dr. Jane Smith"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select
                  value={form.departmentId}
                  onChange={(e) => setForm((f) => ({ ...f, departmentId: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Short bio"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Availability</label>
                <input
                  type="text"
                  value={form.availability}
                  onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value }))}
                  placeholder="Mon - Fri"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setForm({ name: '', departmentId: '', bio: '', availability: '', image: '' }); }}
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
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-bold text-slate-800">All Doctors</h2>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="all">All departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            {filteredDoctors.length === 0 ? (
              <div className="p-12 text-center text-slate-500">No doctors yet. Add one above.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {filteredDoctors.map((d) => (
                  <li key={d.id} className="p-4 flex items-center gap-4 hover:bg-slate-50">
                    <img
                      src={d.image || 'https://via.placeholder.com/80'}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">{d.name}</p>
                      <p className="text-sm text-blue-600 capitalize">{d.departmentId}</p>
                      <p className="text-sm text-slate-500 truncate">{d.bio || '—'}</p>
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
