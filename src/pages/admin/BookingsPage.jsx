import { useState, useEffect } from 'react';
import { Calendar, Download } from 'lucide-react';
import { getAppointments } from '../../lib/storage';
import { getDepartments } from '../../lib/storage';
import { getDoctors } from '../../lib/storage';

export function BookingsPage() {
  const [appointments, setAppointments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const load = () => {
    setAppointments(getAppointments());
    setDepartments(getDepartments());
    setDoctors(getDoctors());
  };

  useEffect(() => {
    load();
  }, []);

  const getDeptName = (id) => departments.find((d) => d.id === id)?.name ?? id;
  const getDoctorName = (id) => doctors.find((d) => d.id === id)?.name ?? id;

  const exportJson = () => {
    const data = JSON.stringify(appointments, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Calendar className="w-9 h-9 text-blue-600" />
        Booked Appointments
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-slate-600">All customer bookings</p>
          <button
            type="button"
            onClick={exportJson}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 font-medium hover:bg-slate-50 text-slate-700"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
        </div>
        {appointments.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No bookings yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 font-semibold text-slate-700">Customer</th>
                  <th className="p-4 font-semibold text-slate-700">Email</th>
                  <th className="p-4 font-semibold text-slate-700">Phone</th>
                  <th className="p-4 font-semibold text-slate-700">Department</th>
                  <th className="p-4 font-semibold text-slate-700">Doctor</th>
                  <th className="p-4 font-semibold text-slate-700">Date</th>
                  <th className="p-4 font-semibold text-slate-700">Message</th>
                  <th className="p-4 font-semibold text-slate-700">Booked at</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">{a.customerName}</td>
                    <td className="p-4 text-slate-600">{a.email}</td>
                    <td className="p-4 text-slate-600">{a.phone}</td>
                    <td className="p-4 text-slate-600 capitalize">{getDeptName(a.departmentId)}</td>
                    <td className="p-4 text-slate-600">{getDoctorName(a.doctorId)}</td>
                    <td className="p-4 text-slate-600">{a.date}</td>
                    <td className="p-4 text-slate-500 max-w-xs truncate">{a.message || '—'}</td>
                    <td className="p-4 text-slate-400 text-sm">{a.createdAt ? new Date(a.createdAt).toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
