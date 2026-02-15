import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/customer/Navbar';
import { Footer } from '../components/customer/Footer';

export function CustomerLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
