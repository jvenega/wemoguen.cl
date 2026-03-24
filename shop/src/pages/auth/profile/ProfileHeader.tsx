import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/auth.store"

export default function ProfileHeader() {
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback>
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
        </div>
      </div>

      <Badge variant="outline">
        Cuenta en revisión
      </Badge>

    </div>
  )
}