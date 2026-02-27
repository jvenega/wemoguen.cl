import { useMutation } from "@tanstack/react-query"
import { loginRequest } from "@/services/auth.api"
import { useAuthStore } from "@/store/auth.store"

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth)

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken)
    },
  })
}