import { useState, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { getDepartments, getDoctors, addAppointment } from '../../lib/storage';

export function BookingForm() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState('');

  const departments = getDepartments();
  const doctors = getDoctors();
  const doctorsInDept = useMemo(() => {
    if (!selectedDeptId) return [];
    return doctors.filter((d) => d.departmentId === selectedDeptId);
  }, [doctors, selectedDeptId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const customerName = form.customerName?.value?.trim();
    const email = form.email?.value?.trim();
    const phone = form.phone?.value?.trim();
    const departmentId = form.departmentId?.value;
    const doctorId = form.doctorId?.value;
    const date = form.date?.value;
    const message = form.message?.value?.trim() || '';
    if (!customerName || !email || !phone || !departmentId || !doctorId || !date) {
      setLoading(false);
      return;
    }
    addAppointment({ customerName, email, phone, departmentId, doctorId, date, message });
    setStatus('success');
    setLoading(false);
    form.reset();
    setSelectedDeptId('');
  };

  if (!departments.length || !doctors.length) {
    return (
      <section id="booking" className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur rounded-[2rem] p-12 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Book an Appointment</h2>
            <p className="opacity-90">
              {!departments.length ? 'No departments available yet. Please check back later.' : 'No doctors available yet. Please check back later.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -ml-48 -mb-48" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Book an Appointment</h2>
            <p className="text-slate-500">Fill out the form below and we will contact you within 24 hours.</p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-20 bg-blue-50 rounded-2xl">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-slate-600 mb-8">Thank you for choosing us. We will confirm your appointment shortly.</p>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="booking-name" className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input id="booking-name" name="customerName" required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label htmlFor="booking-email" className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <input id="booking-email" name="email" required type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label htmlFor="booking-dept" className="text-sm font-bold text-slate-700 ml-1">Select Department</label>
                <select
                  id="booking-dept"
                  name="departmentId"
                  required
                  value={selectedDeptId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedDeptId(val);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="booking-doctor" className="text-sm font-bold text-slate-700 ml-1">Select Doctor</label>
                <select
                  id="booking-doctor"
                  name="doctorId"
                  required
                  key={selectedDeptId}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="">
                    {selectedDeptId ? (doctorsInDept.length ? 'Select Doctor' : 'No doctors in this department') : 'Select department first'}
                  </option>
                  {doctorsInDept.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="booking-date" className="text-sm font-bold text-slate-700 ml-1">Appointment Date</label>
                <input id="booking-date" name="date" required type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label htmlFor="booking-phone" className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                <input id="booking-phone" name="phone" required type="tel" placeholder="+1 234 567 890" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="booking-msg" className="text-sm font-bold text-slate-700 ml-1">Additional Message (Optional)</label>
                <textarea id="booking-msg" name="message" rows="4" placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Appointment Booking'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
