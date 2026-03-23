import { useState } from "react"
import { useProductsStore, type Product } from "@/store/products.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

import { Pencil, Trash2} from "lucide-react"

export default function AdminProducts() {

  const { products, addProduct, updateProduct, deleteProduct } =
    useProductsStore()

  const [editing, setEditing] = useState<Product | null>(null)

  const [form, setForm] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    image: "",
    category: "",
  })

  const reset = () => {
    setForm({
      id: 0,
      name: "",
      price: 0,
      image: "",
      category: "",
    })
    setEditing(null)
  }

  const handleSubmit = () => {

    if (editing) {
      updateProduct(form)
    } else {
      addProduct({
        ...form,
        id: Date.now(),
      })
    }

    reset()
  }

  const editProduct = (p: Product) => {
    setEditing(p)
    setForm(p)
  }

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold">
        Gestión de productos
      </h1>

      {/* FORM */}

      <Card className="p-4 grid gap-3 md:grid-cols-5">

        <Input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          placeholder="Precio"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
        />

        <Input
          placeholder="Imagen URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <Input
          placeholder="Categoría"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <Button onClick={handleSubmit}>
          {editing ? "Actualizar" : "Agregar"}
        </Button>

      </Card>

      {/* TABLA */}

      <div className="grid gap-4">

        {products.map((p) => (
          <Card
            key={p.id}
            className="flex items-center justify-between p-4"
          >

            <div className="flex items-center gap-4">

              <img
                title="image"
                src={p.image}
                className="w-14 h-14 rounded object-cover"
              />

              <div>

                <p className="font-medium">
                  {p.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  ${p.price}
                </p>

              </div>

            </div>

            <div className="flex gap-2">

              <Button
                variant="outline"
                size="icon"
                onClick={() => editProduct(p)}
              >
                <Pencil size={16} />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteProduct(p.id)}
              >
                <Trash2 size={16} />
              </Button>

            </div>

          </Card>
        ))}

      </div>

    </div>
  )
}