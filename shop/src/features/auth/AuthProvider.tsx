import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/services/auth.api"
import { useAuthStore } from "@/store/auth.store"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { accessToken, setAuth, logout } = useAuthStore()

  const { data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    enabled: !!accessToken, // 🔥 solo si hay token
  })

  useEffect(() => {
    if (data) {
      setAuth(data, accessToken!)
    }

    if (isError) {
      logout()
    }
  }, [data, isError])

  return <>{children}</>
}