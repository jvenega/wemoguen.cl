import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/store/auth.store"

export default function ProfileInfoCard() {
  const user = useAuthStore((s) => s.user)

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-sm">

        <div className="flex justify-between">
          <span className="text-muted-foreground">Nombre</span>
          <span className="font-medium">{user.fullName}</span>
        </div>

        <Separator />

        <div className="flex justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{user.email}</span>
        </div>

        <Separator />

        <div className="flex justify-between">
          <span className="text-muted-foreground">Rol</span>
          <Badge variant="secondary">{user.role}</Badge>
        </div>

      </CardContent>
    </Card>
  )
}