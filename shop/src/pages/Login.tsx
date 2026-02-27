import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

import { useAuthStore } from "@/store/auth.store"
import { useLogin } from "@/hooks/auth.hook"

export default function Login() {
  const navigate = useNavigate()

  const user = useAuthStore((s) => s.user)
  const { mutateAsync, isPending } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await mutateAsync({ email, password })
      navigate("/")
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Credenciales inválidas. Intenta nuevamente."
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardContent className="p-8 space-y-6">

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-muted-foreground">
              Accede a tu cuenta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Ingresar
            </Button>

          </form>

          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Regístrate
            </span>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}