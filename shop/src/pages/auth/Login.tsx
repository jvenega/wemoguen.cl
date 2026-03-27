import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react"

import { useAuthStore } from "@/store/auth.store"
import { useLogin } from "@/hooks/auth.hook"

export default function Login() {
  const navigate = useNavigate()

  const user = useAuthStore((s) => s.user)
  const { mutateAsync, isPending } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /* =========================
     REDIRECT (ÚNICA FUENTE)
  ========================= */

  useEffect(() => {
    if (!user) return

    if (user.role === "ADMIN") {
      navigate("/admin", { replace: true })
    } else {
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await mutateAsync({ email, password })
      // ❌ NO navegar aquí (evita conflicto)
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Credenciales inválidas. Intenta nuevamente."
      )
    }
  }

  /* =========================
     VOLVER
  ========================= */

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">

      {/* LADO IZQUIERDO */}
      <div className="hidden lg:flex items-center justify-center bg-[#4B2863] text-white p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-semibold leading-tight">
            Bienvenido nuevamente
          </h1>
          <p className="text-white/80">
            Accede a tu cuenta para gestionar tus pedidos,
            documentos y beneficios dentro de la comunidad.
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-6 py-12">

        <Card className="relative w-full max-w-md rounded-2xl shadow-sm">

          {/* VOLVER */}
          <button
            title="back"
            onClick={handleBack}
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border bg-white hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <CardContent className="p-8 space-y-6">

            {/* HEADER */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">
                Iniciar sesión
              </h2>
              <p className="text-sm text-muted-foreground">
                Ingresa tus credenciales para continuar
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm bg-red-50 text-red-600 p-3 rounded-md border">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#4B2863]"
                disabled={isPending}
              >
                {isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Ingresar
              </Button>

            </form>

            {/* FOOTER */}
            <div className="text-center text-sm text-muted-foreground space-y-1">
              <p>¿No tienes acceso aún?</p>
              <button
                onClick={() => navigate("/solicitud-acceso")}
                className="underline font-medium text-[#4B2863]"
              >
                Solicitar acceso
              </button>
            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}