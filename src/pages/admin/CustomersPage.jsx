import { useState, useEffect, useMemo } from 'react';
import { Users } from 'lucide-react';
import { getAppointments } from '../../lib/storage';

export function CustomersPage() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const customers = useMemo(() => {
    const byKey = {};
    appointments.forEach((a) => {
      const key = (a.email || '').toLowerCase().trim();
      if (!key) return;
      if (!byKey[key]) {
        byKey[key] = {
          customerName: a.customerName,
          email: a.email,
          phone: a.phone,
          bookingCount: 0,
          firstBooking: a.createdAt,
          lastBooking: a.createdAt,
        };
      }
      byKey[key].bookingCount += 1;
      if (a.createdAt) {
        if (!byKey[key].firstBooking || a.createdAt < byKey[key].firstBooking) {
          byKey[key].firstBooking = a.createdAt;
        }
        if (!byKey[key].lastBooking || a.createdAt > byKey[key].lastBooking) {
          byKey[key].lastBooking = a.createdAt;
        }
      }
    });
    return Object.values(byKey).sort((a, b) => (b.lastBooking || '').localeCompare(a.lastBooking || ''));
  }, [appointments]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Users className="w-9 h-9 text-blue-600" />
        Customers
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <p className="text-slate-600">Unique customers from appointment bookings</p>
        </div>
        {customers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No customers yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 font-semibold text-slate-700">Name</th>
                  <th className="p-4 font-semibold text-slate-700">Email</th>
                  <th className="p-4 font-semibold text-slate-700">Phone</th>
                  <th className="p-4 font-semibold text-slate-700">Bookings</th>
                  <th className="p-4 font-semibold text-slate-700">First booking</th>
                  <th className="p-4 font-semibold text-slate-700">Last booking</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">{c.customerName}</td>
                    <td className="p-4 text-slate-600">{c.email}</td>
                    <td className="p-4 text-slate-600">{c.phone}</td>
                    <td className="p-4 text-slate-600">{c.bookingCount}</td>
                    <td className="p-4 text-slate-500 text-sm">{c.firstBooking ? new Date(c.firstBooking).toLocaleString() : '—'}</td>
                    <td className="p-4 text-slate-500 text-sm">{c.lastBooking ? new Date(c.lastBooking).toLocaleString() : '—'}</td>
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
