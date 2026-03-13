import categories from "@/mock/categories.json"

interface Props {
  setCategory: (v: string) => void
}

export default function CategoriesSection({ setCategory }: Props) {

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-xl font-semibold text-[#4B2863] mb-8">
        Categorías
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((cat) => (

          <button
            key={cat.value}
            onClick={() => {

              setCategory(cat.value)

              const section = document.getElementById("shop")
              section?.scrollIntoView({ behavior: "smooth" })

            }}
            className="bg-white rounded-xl border p-6 text-center hover:shadow-md transition"
          >

            <p className="font-medium text-[#4B2863]">
              {cat.label}
            </p>

          </button>

        ))}

      </div>

    </section>
  )
}