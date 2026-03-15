import products from "@/mock/products.json"

export default function PromoBanner() {

  const discounts = products
    .map(p => p.discountPercentage ?? 0)
    .filter(d => d > 0)

  if (discounts.length === 0) return null

  const maxDiscount = Math.max(...discounts)

  const messages = [
    `🔥 Promoción disponible — hasta ${maxDiscount}% de descuento`,
    `🌿 Productos terapéuticos seleccionados en oferta`,
    `💜 Aprovecha descuentos exclusivos en nuestra tienda`,
  ]

  const loopMessages = Array(3).fill(messages).flat()

  return (
    <section className="overflow-hidden bg-[#4B2863] text-white">
      <div className="flex whitespace-nowrap animate-marquee">
        {loopMessages.map((msg, i) => (
          <span
            key={i}
            className="mx-10 text-sm font-medium text-white md:text-base"
          >
            {msg}
          </span>
        ))}
      </div>
    </section>
  )
}