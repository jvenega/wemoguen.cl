import { Routes, Route } from "react-router-dom"
import App from "@/App"
import Home from "@/pages/Home"
import Login from "@/pages/auth/Login"
import Cart from "@/pages/shop/Cart"
import Checkout from "@/pages/shop/Checkout"
import Transfer from "@/pages/shop/Transfer"
import Confirmation from "@/pages/shop/Confirmation"
import Orders from "@/pages/shop/Order"
import SolicitudAcceso from "@/pages/auth/SolicitudAcceso"
import ProtectedRoute from "@/features/auth/ProtectedRoute"
import OrderDetail from "@/pages/shop/OrderDetail"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/*" element={<App />}>

        {/* Públicas */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="solicitud-acceso" element={<SolicitudAcceso />} />

        {/* Protegidas */}
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="transfer/:id"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />

        {/* 🔥 NUEVA RUTA CONFIRMATION */}
        <Route
          path="confirmation/:id"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />

        {/* Opcional: Mis pedidos */}
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  )
}