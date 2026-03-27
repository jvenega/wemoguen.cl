import { useEffect, useState } from "react"
import SplashScreen from "../components/ui/SplashScreen"
import AppRouter from "@/app/router"

export default function RootLoader() {
  const [loading, setLoading] = useState(() => {
    const alreadyLoaded = sessionStorage.getItem("app_loaded")
    return !alreadyLoaded
  })

  useEffect(() => {
    if (!loading) return

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem("app_loaded", "true")
    }, 1800)

    return () => clearTimeout(timer)
  }, [loading])

  if (loading) return <SplashScreen />

  return <AppRouter />
}