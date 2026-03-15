import { Routes, Route } from "react-router-dom"

import App from "@/App"
import Home from "@/pages/Home"

import Login from "@/pages/auth/Login"
import SolicitudAcceso from "@/pages/auth/SolicitudAcceso"

import Cart from "@/pages/shop/Cart"
import Checkout from "@/pages/shop/Checkout"
import Transfer from "@/pages/shop/Transfer"
import Confirmation from "@/pages/shop/Confirmation"
import Orders from "@/pages/shop/Order"
import OrderDetail from "@/pages/shop/OrderDetail"

import ProtectedRoute from "@/features/auth/ProtectedRoute"

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>

        {/* Rutas públicas */}
        <Route index element={<Home />} />
        <Route path="iniciar-sesion" element={<Login />} />
        <Route path="solicitud-acceso" element={<SolicitudAcceso />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>

          <Route path="carrito" element={<Cart />} />

          <Route path="checkout" element={<Checkout />} />

          <Route path="transferencia/:id" element={<Transfer />} />

          <Route path="confirmacion/:id" element={<Confirmation />} />

          <Route path="pedidos" element={<Orders />} />

          <Route path="pedidos/:id" element={<OrderDetail />} />

        </Route>

      </Route>
    </Routes>
  )
}