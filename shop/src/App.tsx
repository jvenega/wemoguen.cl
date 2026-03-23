import { Outlet, useLocation } from "react-router-dom"

import Navbar from "@/components/layout/Navbar"
import AdminNavbar from "@/components/admin/AdminNavbar"

export default function App() {

  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div className="min-h-screen bg-gray-50">

      {isAdminRoute ? <AdminNavbar /> : <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

    </div>
  )
}