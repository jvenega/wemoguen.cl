import { useEffect } from "react"
import { MapPin, Building2, Clock } from "lucide-react"

export default function DeliveryForm({
  delivery,
  setDelivery,
  user
}: any) {

  const inputStyle =
    "mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4B2863]/20 focus:border-[#4B2863]"

  /* Autocompletar desde perfil */
  useEffect(() => {

    if (!user) return

    setDelivery((prev: any) => ({
      ...prev,
      address: prev.address || user.address || "",
      commune: prev.commune || user.commune || "",
      city: prev.city || user.city || ""
    }))

  }, [user, setDelivery])

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">

      {/* Header */}
      <h2 className="text-lg md:text-xl font-semibold mb-6 text-[#4B2863]">
        Datos de entrega
      </h2>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 text-sm">

        {/* Dirección */}
        <div className="md:col-span-2">

          <label className="text-gray-600 flex items-center gap-2">
            <MapPin size={16} />
            Dirección
          </label>

          <input
            value={delivery.address}
            onChange={(e) =>
              setDelivery({ ...delivery, address: e.target.value })
            }
            placeholder="Ej: Av. Providencia 1234"
            className={inputStyle}
          />

        </div>

        {/* Comuna */}
        <div>

          <label className="text-gray-600 flex items-center gap-2">
            <Building2 size={16} />
            Comuna
          </label>

          <input
            value={delivery.commune}
            onChange={(e) =>
              setDelivery({ ...delivery, commune: e.target.value })
            }
            placeholder="Ej: Providencia"
            className={inputStyle}
          />

        </div>

        {/* Ciudad */}
        <div>

          <label className="text-gray-600">
            Ciudad
          </label>

          <input
            value={delivery.city}
            onChange={(e) =>
              setDelivery({ ...delivery, city: e.target.value })
            }
            placeholder="Ej: Santiago"
            className={inputStyle}
          />

        </div>

      </div>

      {/* Horario */}
      <div className="mt-8">

        <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
          <Clock size={16} />
          Horario preferido de entrega
        </p>

        {/* Responsive: vertical en mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <button
            type="button"
            onClick={() =>
              setDelivery({ ...delivery, preference: "AM" })
            }
            className={`
              py-3 rounded-xl border text-sm font-medium transition
              ${delivery.preference === "AM"
                ? "bg-[#4B2863] text-white border-[#4B2863]"
                : "hover:bg-gray-50"}
            `}
          >
            Mañana (AM)
          </button>

          <button
            type="button"
            onClick={() =>
              setDelivery({ ...delivery, preference: "PM" })
            }
            className={`
              py-3 rounded-xl border text-sm font-medium transition
              ${delivery.preference === "PM"
                ? "bg-[#4B2863] text-white border-[#4B2863]"
                : "hover:bg-gray-50"}
            `}
          >
            Tarde (PM)
          </button>

        </div>

      </div>

      {/* Observaciones */}
      <div className="mt-8">

        <label className="text-gray-600">
          Observaciones para el despacho
        </label>

        <textarea
          value={delivery.notes}
          onChange={(e) =>
            setDelivery({ ...delivery, notes: e.target.value })
          }
          placeholder="Ej: Dejar en conserjería, llamar antes de llegar..."
          rows={3}
          className={inputStyle}
        />

      </div>

    </div>
  )
}