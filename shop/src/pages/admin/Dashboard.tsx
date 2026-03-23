import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

export default function Dashboard() {

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <Card>

        <CardHeader>
          <CardTitle>Ventas</CardTitle>
        </CardHeader>

        <CardContent>
          $0
        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>

        <CardContent>
          0
        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
        </CardHeader>

        <CardContent>
          0
        </CardContent>

      </Card>

    </div>
  )
}