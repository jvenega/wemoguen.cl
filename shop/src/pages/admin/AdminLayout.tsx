import { Outlet } from "react-router-dom"
import AdminSidebar from "@/components/admin/AdminSidebar"

export default function AdminLayout() {

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-8">

          <h1 className="text-lg font-semibold text-gray-800">
            Administración
          </h1>

          <div className="text-sm text-muted-foreground">
            Panel de gestión
          </div>

        </header>

        {/* Content */}
        <main className="flex-1 p-8">

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  )
}