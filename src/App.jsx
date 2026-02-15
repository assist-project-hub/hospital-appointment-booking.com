import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { CustomerHome } from './pages/CustomerHome';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { DepartmentsPage } from './pages/admin/DepartmentsPage';
import { DoctorsPage } from './pages/admin/DoctorsPage';
import { BookingsPage } from './pages/admin/BookingsPage';
import { CustomersPage } from './pages/admin/CustomersPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { ContactsPage } from './pages/admin/ContactsPage';
import { isAdminLoggedIn } from './lib/storage';

function AdminGuard({ children }) {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<CustomerHome />} />
        </Route>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<Navigate to="departments" replace />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
