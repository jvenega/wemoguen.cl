import { Loader2 } from "lucide-react"

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#4B2863] text-white">
      
      <img
        src="/logo2.png"
        alt="logo"
        className="w-28 mb-6 animate-fade-in"
      />

      <div className="flex items-center gap-2 text-sm opacity-90">
        <Loader2 className="h-5 w-5 animate-spin" />
        Cargando experiencia...
      </div>

    </div>
  )
}