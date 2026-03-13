import { useEffect, useState } from "react"
import category from "@/mock/categories.json"


interface Props {
  onSelectCategory: (category: string) => void
}



export default function HeroCategoriesCarousel({ onSelectCategory }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % category.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-90 sm:h-105 md:h-120 lg:h-130 overflow-hidden">

      {category.map((cat, i) => (
        <div
          key={cat.value}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* IMAGE */}

          <img
            src={cat.image}
            alt={cat.label}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* GRADIENT */}

          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent" />

          {/* CONTENT */}

          <div className="absolute inset-0 flex items-end md:items-center">

            <div className="max-w-7xl mx-auto px-5 w-full pb-10 md:pb-0">

              <div className="backdrop-blur-lg bg-white/10 p-5 md:p-8 rounded-xl max-w-md md:max-w-lg text-white">

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
                  {cat.label}
                </h1>

                <p className="mt-2 text-white/90 text-xs sm:text-sm md:text-base">
                  {cat.description}
                </p>

                <button
                  onClick={() => {
                    const selected = category[index]

                    onSelectCategory(selected.value)

                    requestAnimationFrame(() => {
                      const section = document.getElementById("shop")
                      section?.scrollIntoView({
                        behavior: "smooth",
                      })
                    })
                  }}
                  className="mt-4 bg-white text-[#4B2863] px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition text-sm md:text-base"
                >
                  Ver productos
                </button>

              </div>

            </div>

          </div>

        </div>
      ))}

      {/* CATEGORY SELECTOR */}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">

        <div className="flex gap-2 overflow-x-auto px-4 scrollbar-hide">

          {category.map((cat, i) => {

            const active = i === index

            return (
              <button
                key={cat.value}
                onClick={() => setIndex(i)}
                className={`
                  whitespace-nowrap px-3 py-1.5 rounded-full text-xs sm:text-sm transition
                  ${active
                    ? "bg-white text-[#4B2863] shadow"
                    : "bg-white/20 text-white hover:bg-white/30"}
                `}
              >
                {cat.label}
              </button>
            )
          })}

        </div>

      </div>

    </section>
  )
}