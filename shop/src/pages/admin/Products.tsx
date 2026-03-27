import { useState, useMemo, useRef } from "react"
import { useProductsStore, type Product } from "@/store/products.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import {
  Pencil,
  Trash2,
  Upload,
  Tag,
  Image as ImageIcon,
  DollarSign,
  Percent,
  Package
} from "lucide-react"

// =========================
// MOCK CATEGORIES
// =========================

const categories = [
  "Ropa",
  "Tecnología",
  "Accesorios",
  "Hogar",
  "Aceites"
]

// =========================
// TYPES
// =========================

type ProductForm = {
  name: string
  price: number
  image: string
  category: string
  discountPercentage: number
}

const initialForm: ProductForm = {
  name: "",
  price: 0,
  image: "",
  category: "",
  discountPercentage: 0,
}

// =========================
// HELPERS
// =========================

const formatCLP = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value)

const getFinalPrice = (price: number, discount: number) =>
  price - (price * discount) / 100

// =========================
// IMAGE UPLOAD
// =========================

function ImageUpload({ value, onChange }: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]

    if (!validTypes.includes(file.type)) {
      alert("Solo JPG, JPEG o PNG")
      return
    }

    const url = URL.createObjectURL(file)
    onChange(url)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        aria-label="Subir imagen"
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed rounded-xl p-6 text-center hover:bg-muted transition"
      >
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Upload className="w-5 h-5" />
          Subir imagen
        </div>
      </button>

      <input
        title="file"
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {value && (
        <img
          src={value}
          alt="Preview producto"
          className="w-24 h-24 rounded-xl object-cover border"
        />
      )}
    </div>
  )
}

// =========================
// MAIN MODULE
// =========================

export default function AdminProducts() {

  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<ProductForm>(initialForm)
  const [search, setSearch] = useState("")

  // =========================
  // HANDLERS
  // =========================

  const reset = () => {
    setForm(initialForm)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (!form.name || form.price <= 0) return

    const payload: Product = {
      id: editingId ?? Date.now(),
      ...form,
      discountPercentage: form.discountPercentage ?? 0
    }

    if (editingId) updateProduct(payload)
    else addProduct(payload)

    reset()
  }

  const openCreate = () => {
    reset()
    setOpen(true)
  }

  const editProduct = (p: Product) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      discountPercentage: p.discountPercentage ?? 0
    })
    setOpen(true)
  }

  const filtered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6" />
          <div>
            <h1 className="text-2xl font-semibold">Productos</h1>
            <p className="text-sm text-muted-foreground">Gestión de catálogo</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Buscar producto"
            aria-label="Buscar producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button onClick={openCreate} className="gap-2">
            <Tag className="w-4 h-4" />
            Nuevo
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">Producto</th>
                <th className="p-4 text-left">Categoría</th>
                <th className="p-4 text-left">Precio</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => {
                const discount = p.discountPercentage ?? 0
                const finalPrice = getFinalPrice(p.price, discount)

                return (
                  <tr key={p.id} className="border-t hover:bg-muted/40">

                    <td className="p-4 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex flex-col">
                        <span className="font-medium">{p.name}</span>
                        {discount > 0 && (
                          <span className="text-xs text-green-600">-{discount}%</span>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-muted-foreground">{p.category}</td>

                    <td className="p-4">
                      {discount > 0 ? (
                        <div className="flex flex-col">
                          <span className="text-xs line-through text-muted-foreground">
                            {formatCLP(p.price)}
                          </span>
                          <span className="font-semibold text-green-600">
                            {formatCLP(finalPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-semibold">
                          {formatCLP(p.price)}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right flex gap-2 justify-end">
                      <Button size="icon" variant="outline" onClick={() => editProduct(p)}>
                        <Pencil className="w-4 h-4" />
                      </Button>

                      <Button size="icon" variant="destructive" onClick={() => deleteProduct(p.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>

                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl">

          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingId ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
          </DialogHeader>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* LEFT: FORM */}
            <div className="space-y-4">

              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Nombre
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Precio
                </label>
                <Input
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={(e) => {
                    const v = Math.max(0, Number(e.target.value))
                    setForm({ ...form, price: v })
                  }}
                />
                {form.price > 0 && <span className="text-sm text-muted-foreground">{formatCLP(form.price)}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Categoría</label>
                <select
                  title="form"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border rounded-lg h-10 px-3 text-sm"
                >
                  <option value="">Seleccionar</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Percent className="w-4 h-4" /> Descuento
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={form.discountPercentage}
                  onChange={(e) => {
                    let v = Number(e.target.value)
                    if (v < 0) v = 0
                    if (v > 100) v = 100
                    setForm({ ...form, discountPercentage: v })
                  }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={() => { handleSubmit(); setOpen(false) }}>
                  Guardar
                </Button>
              </div>

            </div>

            {/* RIGHT: PREVIEW */}
            <div className="space-y-4">

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Imagen
                </label>
                <ImageUpload
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              {/* PRODUCT PREVIEW */}
              <Card className="p-4">
                <div className="space-y-3">

                  {form.image ? (
                    <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  ) : (
                    <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                      Sin imagen
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="font-medium">
                      {form.name || "Nombre del producto"}
                    </div>

                    {form.discountPercentage > 0 ? (
                      <div className="flex flex-col">
                        <span className="text-xs line-through text-muted-foreground">
                          {formatCLP(form.price)}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {formatCLP(getFinalPrice(form.price, form.discountPercentage))}
                        </span>
                      </div>
                    ) : (
                      <div className="font-semibold">
                        {formatCLP(form.price)}
                      </div>
                    )}
                  </div>

                </div>
              </Card>

            </div>

          </div>

        </DialogContent>
      </Dialog>

    </div>
  )
}
