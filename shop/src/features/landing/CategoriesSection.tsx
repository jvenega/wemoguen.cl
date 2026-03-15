import categories from "@/mock/categories.json"

interface Props {
  setCategory: (v: string) => void
}

export default function CategoriesSection({ setCategory }: Props) {

  function handleCategoryClick(value: string) {
    setCategory(value)

    document
      .getElementById("shop")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-8 text-2xl font-semibold text-primary">
          Categorías
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className="rounded-xl border bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            >

              <p className="font-medium text-primary">
                {cat.label}
              </p>

            </button>
          ))}

        </div>

      </div>
    </section>
  )
}