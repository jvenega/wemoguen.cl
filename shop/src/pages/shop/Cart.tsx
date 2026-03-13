import { useCartStore } from "@/store/cart.store"
import { Link } from "react-router-dom"
import ProcessHeader from "@/components/ProcessHeader"
export default function Cart() {
  const { items, removeItem } = useCartStore()

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ProcessHeader currentStep={1} />

        {/* Header */}
        <h1 className="text-3xl font-semibold text-[#4B2863] mb-12">
          Resumen de Solicitud
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

          {/* Lista Productos */}
          <div className="space-y-6">
            {items.length === 0 && (
              <div className="text-muted-foreground">
                No hay productos seleccionados.
              </div>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 flex gap-6 items-start shadow-sm"
              >
                {/* Imagen */}
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-medium text-gray-800">
                    {item.name}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-2">
                    Cantidad: {item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 mt-3 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>

                {/* Precio */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-[#4B2863]">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen Lateral */}
          {items.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm h-fit">

              <h3 className="text-lg font-medium mb-6">
                Resumen
              </h3>

              <div className="flex justify-between mb-4 text-sm">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <div className="border-t pt-6 flex justify-between items-center">
                <span className="text-lg font-medium">
                  Total estimado
                </span>
                <span className="text-2xl font-semibold text-[#4B2863]">
                  ${total.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                Este monto es referencial. La solicitud será revisada conforme a normativa vigente y requerimientos médicos.
              </p>

              <Link
                to="/checkout"
                className="block mt-8 w-full text-center rounded-lg bg-[#4B2863] py-3 text-white font-medium transition hover:bg-[#3c1f4f]"
              >
                Continuar con validación
              </Link>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}