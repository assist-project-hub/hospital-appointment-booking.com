import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { getContacts } from '../../lib/storage';

export function ContactsPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <Mail className="w-9 h-9 text-blue-600" />
        Contact List
      </h1>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <p className="text-slate-600">Messages from the contact form</p>
        </div>
        {contacts.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No contact messages yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 font-semibold text-slate-700">Name</th>
                  <th className="p-4 font-semibold text-slate-700">Email</th>
                  <th className="p-4 font-semibold text-slate-700">Subject</th>
                  <th className="p-4 font-semibold text-slate-700">Message</th>
                  <th className="p-4 font-semibold text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">{c.name}</td>
                    <td className="p-4 text-slate-600">{c.email}</td>
                    <td className="p-4 text-slate-600">{c.subject}</td>
                    <td className="p-4 text-slate-500 max-w-md truncate">{c.message}</td>
                    <td className="p-4 text-slate-400 text-sm">{c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}</td>
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
