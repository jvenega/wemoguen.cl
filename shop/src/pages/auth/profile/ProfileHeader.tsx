import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth.store"
import { Progress } from "@/components/ui/progress"

type Props = {
  completion?: number // 0 - 100
  status?: "incomplete" | "review" | "approved"
}

export default function ProfileHeader({
  completion = 0,
  status = "incomplete",
}: Props) {
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  /* =========================
     STATUS CONFIG
  ========================= */

  const statusMap = {
    incomplete: {
      label: "Faltan documentos",
      color: "text-red-500",
      badge: "secondary",
    },
    review: {
      label: "En revisión",
      color: "text-yellow-500",
      badge: "outline",
    },
    approved: {
      label: "Cuenta validada",
      color: "text-green-600",
      badge: "default",
    },
  } as const

  const current = statusMap[status]

  /* =========================
     UI
  ========================= */

  return (
    <div className="flex flex-col gap-4 md:gap-6">

      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg font-semibold">
              {user.fullName?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              {user.fullName}
            </h1>

            <p className="text-sm text-muted-foreground">
              {user.email}
            </p>

            {/* STATUS TEXTO */}
            <p className={`text-xs mt-1 ${current.color}`}>
              {current.label}
            </p>
          </div>
        </div>

        {/* BADGE */}
        <Badge variant={current.badge as any}>
          {current.label}
        </Badge>

      </div>

      {/* PROGRESS */}
      <div className="space-y-2">

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progreso de documentación</span>
          <span>{completion}%</span>
        </div>

        <Progress value={completion} />

      </div>

    </div>
  )
}