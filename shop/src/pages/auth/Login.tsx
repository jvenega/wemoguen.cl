import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";

import { useLogin } from "@/hooks/auth.hook";
import { getPostLoginRoute } from "@/types/auth.types";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutateAsync, isPending } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorId = "login-error";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await mutateAsync({ email: email.trim(), password });
      const from = location.state?.from as string | undefined;

      navigate(getPostLoginRoute(data.user.role, from), { replace: true });
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Credenciales inválidas. Intenta nuevamente.",
      );
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(109,76,138,0.16),transparent_30%),linear-gradient(180deg,#fcfbfd_0%,#f3edf8_48%,#fcfbfd_100%)]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(75,40,99,0.98)_0%,rgba(95,57,126,0.96)_55%,rgba(34,20,45,0.98)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_55%_78%,rgba(255,255,255,0.10),transparent_26%)]" />

          <div className="relative flex w-full flex-col justify-between p-10 text-white xl:p-14">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-fit text-lg font-semibold tracking-[0.28em] transition hover:opacity-90"
            >
              WEMOGUEN
            </button>

            <div className="max-w-xl space-y-8">
              <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
                Portal privado de la comunidad
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight xl:text-5xl">
                  Bienvenido de vuelta,
                  <span className="text-[#F4E1F5]">¡te extrañamos!</span>
                </h1>
                <p className="max-w-lg text-base leading-7 text-white/78">
                  Accede a tu cuenta para descubrir ofertas exclusivas,
                  gestionar tus pedidos y disfrutar de una experiencia
                  personalizada diseñada para ti.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm text-white/70">Experiencia</p>
                  <p className="mt-2 text-2xl font-semibold">Pacientes</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Perfil, pedidos y estado de compra en un solo lugar.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <p className="text-sm text-white/70">Operación</p>
                  <p className="mt-2 text-2xl font-semibold">Administración</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Acceso rápido al panel para gestión y seguimiento interno.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/60">
              wemoguen.cl © {new Date().getFullYear()}. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 lg:px-10">
          <Card className="relative w-full max-w-xl overflow-hidden rounded-[28px] border-white/60 bg-white/90 shadow-[0_30px_80px_rgba(75,40,99,0.12)] backdrop-blur">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#4B2863_0%,#8D6BA4_100%)]" />

            <button
              title="Volver"
              type="button"
              onClick={handleBack}
              className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </button>

            <CardContent className="space-y-8 p-8 pt-16 sm:p-10 sm:pt-16">
              <div className="space-y-3 text-center">
                <div className="mx-auto w-fit rounded-full border border-[#4B2863]/10 bg-[#4B2863]/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[#4B2863]">
                  Acceso seguro
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Iniciar sesión
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Ingresa tus credenciales para continuar en tu espacio
                  personal.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    required
                    className="h-11 rounded-xl border-slate-200 bg-white"
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
                      aria-invalid={!!error}
                      aria-describedby={error ? errorId : undefined}
                      required
                      className="h-11 rounded-xl border-slate-200 bg-white pr-11"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      title={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    id={errorId}
                    role="alert"
                    aria-live="polite"
                    className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
                  >
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="h-11 w-full rounded-xl bg-[#4B2863] text-white hover:bg-[#5d377a]"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Ingresar
                </Button>
              </form>

              <div className="space-y-1 text-center text-sm text-muted-foreground">
                <p>¿No tienes acceso aún?</p>
                <button
                  type="button"
                  onClick={() => navigate("/solicitud-acceso")}
                  className="font-medium text-[#4B2863] underline underline-offset-4"
                >
                  Solicitar acceso
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
