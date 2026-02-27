import { Outlet } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}