import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#4B2863] text-white">

      {/* LOGO */}
      <motion.img
        src="/assets/logo2.png"
        alt="logo"
        className="w-28 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* LOADING */}
      <motion.div
        className="flex items-center gap-2 text-sm opacity-90"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        Cargando experiencia...
      </motion.div>

      {/* PROGRESS BAR */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white/80"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

    </div>
  )
}