import { Routes, Route, Navigate } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/Home";

import Login from "@/pages/auth/Login";
import SolicitudAcceso from "@/pages/auth/SolicitudAcceso";

import Cart from "@/pages/shop/Cart";
import Checkout from "@/pages/shop/Checkout";
import Transfer from "@/pages/shop/Transfer";
import Confirmation from "@/pages/shop/Confirmation";
import Orders from "@/pages/shop/Order";
import OrderDetail from "@/pages/shop/OrderDetail";
import Profile from "@/pages/auth/Profile";

import ProtectedRoute from "@/features/auth/ProtectedRoute";
import PublicOnlyRoute from "@/features/auth/PublicOnlyRoute";

/* ADMIN */
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProducts from "@/pages/admin/Products";
import AdminOrders from "@/pages/admin/Orders";
import AdminUsers from "@/pages/admin/Users";

export default function AppRouter() {
  return (
    <Routes>

      {/* =========================
         PUBLICAS (SOLO NO LOGUEADOS)
      ========================= */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/solicitud-acceso" element={<SolicitudAcceso />} />
      </Route>

      {/* =========================
         APP (AUTH REQUERIDO)
      ========================= */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="carrito" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="transferencia/:id" element={<Transfer />} />
          <Route path="confirmacion/:id" element={<Confirmation />} />

          <Route path="profile" element={<Profile />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="pedidos/:id" element={<OrderDetail />} />
        </Route>
      </Route>

      {/* =========================
         ADMIN (SOLO ADMIN)
      ========================= */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* =========================
         FALLBACK GLOBAL
      ========================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}