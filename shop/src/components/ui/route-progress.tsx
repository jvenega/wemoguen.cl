import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export default function RouteProgressBar() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div
      className={`
        fixed top-0 left-0 h-0.75 bg-white z-100
        transition-all duration-500 ease-out
        ${loading ? "w-full opacity-100" : "w-0 opacity-0"}
      `}
    />
  )
}