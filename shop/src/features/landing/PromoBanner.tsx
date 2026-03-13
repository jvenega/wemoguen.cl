import products from "@/mock/products.json"

export default function PromoBanner() {

  const discountedProducts = products.filter(p => p.discountPercentage)

  if (discountedProducts.length === 0) return null

  const maxDiscount = Math.max(
    ...discountedProducts.map(p => p.discountPercentage ?? 0)
  )

  const messages = [
    `🔥 Promoción disponible — hasta ${maxDiscount}% de descuento`,
    `🌿 Productos terapéuticos seleccionados en oferta`,
    `💜 Aprovecha descuentos exclusivos en nuestra tienda`,
  ]

  const loopMessages = [...messages, ...messages]

  return (
    <section className="bg-[#4B2863] text-white overflow-hidden">

      <div className="relative">

        <div className="flex whitespace-nowrap animate-marquee">

          {loopMessages.map((msg, i) => (
            <span
              key={i}
              className="mx-10 text-sm md:text-base font-medium"
            >
              {msg}
            </span>
          ))}

        </div>

      </div>

    </section>
  )
}