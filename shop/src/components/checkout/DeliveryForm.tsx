import { useEffect } from "react"
import { MapPin, Building2, Clock } from "lucide-react"
import type { Delivery } from "@/types/delivery.types"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type User = {
  address?: string
  commune?: string
  city?: string
}

interface Props {
  delivery: Delivery
  setDelivery: React.Dispatch<React.SetStateAction<Delivery>>
  user?: User
}

export default function DeliveryForm({
  delivery,
  setDelivery,
  user
}: Props) {

  const inputStyle =
    "mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"

  function updateField(field: keyof Delivery, value: string) {
    setDelivery(prev => ({ ...prev, [field]: value }))
  }

  // Fecha mínima: mañana
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  useEffect(() => {

    if (!user) return

    setDelivery(prev => {

      if (prev.address || prev.commune || prev.city) {
        return prev
      }

      return {
        ...prev,
        address: user.address ?? "",
        commune: user.commune ?? "",
        city: user.city ?? ""
      }

    })

  }, [user, setDelivery])

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">

      <h2 className="text-lg md:text-xl font-semibold mb-6 text-primary">
        Datos de entrega
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 text-sm">

        <div className="md:col-span-2">

          <label className="text-gray-600 flex items-center gap-2">
            <MapPin size={16} />
            Dirección
          </label>

          <input
            value={delivery.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Ej: Av. Providencia 1234"
            className={inputStyle}
          />

        </div>

        <div>

          <label className="text-gray-600 flex items-center gap-2">
            <Building2 size={16} />
            Comuna
          </label>

          <input
            value={delivery.commune}
            onChange={(e) => updateField("commune", e.target.value)}
            placeholder="Ej: Providencia"
            className={inputStyle}
          />

        </div>

        <div>

          <label className="text-gray-600">
            Ciudad
          </label>

          <input
            value={delivery.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="Ej: Santiago"
            className={inputStyle}
          />

        </div>

      </div>

      {/* ================= CALENDARIO ================= */}
      <div className="mt-8">

        <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
          <Clock size={16} />
          Selecciona fecha y horario de entrega
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Calendario */}
          <div className="border rounded-xl p-3">

            <Calendar
              mode="single"
              selected={delivery.date ? new Date(delivery.date) : undefined}
              onSelect={(date) => {
                if (!date) return
                setDelivery(prev => ({
                  ...prev,
                  date: date.toISOString()
                }))
              }}
              disabled={(date) => date < tomorrow}
              className="rounded-md"
            />

          </div>

          {/* Horario */}
          <div className="flex flex-col gap-3">

            <p className="text-sm text-gray-500">
              Horario disponible
            </p>

            <Button
              type="button"
              variant={delivery.preference === "AM" ? "default" : "outline"}
              className={cn("w-full")}
              onClick={() =>
                setDelivery(prev => ({ ...prev, preference: "AM" }))
              }
            >
              Mañana (09:00 - 13:00)
            </Button>

            <Button
              type="button"
              variant={delivery.preference === "PM" ? "default" : "outline"}
              className={cn("w-full")}
              onClick={() =>
                setDelivery(prev => ({ ...prev, preference: "PM" }))
              }
            >
              Tarde (14:00 - 19:00)
            </Button>

            {!delivery.date && (
              <p className="text-xs text-muted-foreground">
                Selecciona primero una fecha
              </p>
            )}

          </div>

        </div>

      </div>

      {/* ================= OBSERVACIONES ================= */}
      <div className="mt-8">

        <label className="text-gray-600">
          Observaciones para el despacho
        </label>

        <textarea
          value={delivery.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Ej: Dejar en conserjería, llamar antes de llegar..."
          rows={3}
          className={inputStyle}
        />

      </div>

    </div>
  )
}