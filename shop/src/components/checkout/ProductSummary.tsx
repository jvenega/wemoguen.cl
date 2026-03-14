export default function ProductSummary({ items }: any) {

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">

      <h2 className="text-lg font-medium mb-8 text-[#4B2863]">
        Productos Seleccionados
      </h2>

      <div className="space-y-6 max-h-64 overflow-y-auto pr-2">

        {items.map((item: any) => {

          const price = item.discountPercentage
            ? item.price - item.price * (item.discountPercentage / 100)
            : item.price

          return (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >

              <div>
                <p className="font-medium text-[#4B2863]">
                  {item.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-[#4B2863]">
                ${(price * item.quantity).toLocaleString()}
              </p>

            </div>
          )
        })}

      </div>
    </div>
  )
}