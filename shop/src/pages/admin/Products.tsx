import { useState, useMemo, useRef } from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"

import { useProductsStore, type Product } from "@/store/products.store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
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
  Package,
  Search,
  Plus
} from "lucide-react"

// =========================
// DATA
// =========================

const categories = ["Ropa", "Tecnología", "Accesorios", "Hogar", "Aceites"]

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

function ImageUpload({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (!validTypes.includes(file.type)) return

    const url = URL.createObjectURL(file)
    onChange(url)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full border border-dashed rounded-xl p-6 text-center hover:bg-muted transition"
        aria-label="Subir imagen"
      >
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <Upload className="w-5 h-5" />
          Subir imagen
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        title="Subir imagen"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {value && (
        <img
          src={value}
          alt="Imagen del producto"
          className="w-24 h-24 rounded-xl object-cover border"
        />
      )}
    </div>
  )
}

// =========================
// MAIN
// =========================

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useProductsStore()

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<ProductForm>(initialForm)
  const [search, setSearch] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])

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
      discountPercentage: p.discountPercentage ?? 0,
    })
    setOpen(true)
  }

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [products, search])

  // =========================
  // COLUMNS
  // =========================

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Producto",
      cell: ({ row }) => {
        const p = row.original
        return (
          <div className="flex items-center gap-3">
            <img
              src={p.image}
              alt={p.name}
              className="w-10 h-10 rounded-md object-cover"
            />
            <div>
              <div className="font-medium">{p.name}</div>
              {p.discountPercentage ? (
                <div className="text-xs text-green-600">
                  {p.discountPercentage}% descuento
                </div>
              ) : null}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "category",
      header: "Categoría",
    },
    {
      id: "price",
      header: "Precio final",
      cell: ({ row }) => {
        const p = row.original
        const discount = p.discountPercentage ?? 0
        const final = getFinalPrice(p.price, discount)

        return (
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-xs line-through text-muted-foreground">
                {formatCLP(p.price)}
              </span>
            )}
            <span className="font-semibold">
              {formatCLP(final)}
            </span>
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const p = row.original

        return (
          <div className="flex justify-end gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => editProduct(p)}
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              onClick={() => deleteProduct(p.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Catálogo de productos
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestión avanzada de productos
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9 w-60"
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={openCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo producto
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">

          <table className="w-full text-sm">

            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="p-4 text-left font-medium cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="p-10 text-center text-muted-foreground">
                      No hay productos
                    </div>
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t hover:bg-muted/40 transition"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl">

          <DialogHeader>
            <DialogTitle>
              {editingId ? "Editar producto" : "Nuevo producto"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="space-y-5">

              <Input
                placeholder="Nombre"
                aria-label="Nombre"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Precio"
                aria-label="Precio"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Math.max(0, Number(e.target.value)),
                  })
                }
              />

              <select
                aria-label="Categoría"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full border rounded-lg h-10 px-3 text-sm"
              >
                <option value="">Seleccionar</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <Input
                type="number"
                placeholder="Descuento %"
                aria-label="Descuento"
                value={form.discountPercentage}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountPercentage: Math.min(
                      100,
                      Math.max(0, Number(e.target.value))
                    ),
                  })
                }
              />

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit()
                    setOpen(false)
                  }}
                >
                  Guardar
                </Button>
              </div>
            </div>

            <div className="space-y-5">

              <ImageUpload
                value={form.image}
                onChange={(url) =>
                  setForm({ ...form, image: url })
                }
              />

              <Card className="p-5">
                <div className="space-y-3">

                  <div className="h-40 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Vista previa
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="font-medium">
                      {form.name || "Producto"}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {form.category || "Categoría"}
                    </div>

                    <div className="mt-2 font-semibold">
                      {formatCLP(
                        getFinalPrice(
                          form.price,
                          form.discountPercentage
                        )
                      )}
                    </div>
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