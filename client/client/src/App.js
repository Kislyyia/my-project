import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { AdminAuthProvider, AdminAuthContext } from './contexts/AdminAuthContext';
import UserHeader from './components/UserHeader';
import GuestHeader from './components/GuestHeader';
import AdminHeader from './components/AdminHeader';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CartAPIProvider from './contexts/CartAPIProvider'; // Новый контекст для работы с API корзины

const App = () => {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartAPIProvider>
          <Router>
            <HeaderSelector />
            <Routes>
              {/* General routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminProtectedRoute>
                    <AdminProductsPage />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </CartAPIProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
};

// Header selection component
const HeaderSelector = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isAdminAuthenticated } = useContext(AdminAuthContext);

  return isAdminAuthenticated ? (
    <AdminHeader />
  ) : isAuthenticated ? (
    <UserHeader />
  ) : (
    <GuestHeader />
  );
};

export default App;  

