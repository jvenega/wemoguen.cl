import { useMemo, useRef, useState } from "react"
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
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  Pencil,
  Trash2,
  Upload,
  Package,
  Search,
  Plus,
  Tag,
  CircleDollarSign,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react"

import { toast } from "react-hot-toast"

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

type FormErrors = Partial<Record<keyof ProductForm, string>>

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
    maximumFractionDigits: 0,
  }).format(value)

const getFinalPrice = (price: number, discount: number) =>
  price - (price * discount) / 100

const normalize = (value: string) => value.trim().toLowerCase()

// =========================
// IMAGE UPLOAD
// =========================

function ImageUpload({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (url: string) => void
  error?: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]

    if (!validTypes.includes(file.type)) {
      toast.error("Formato inválido. Usa JPG, PNG o WEBP.")
      return
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error("La imagen no debe superar 4 MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={[
          "w-full rounded-2xl border border-dashed p-6 text-center transition",
          "hover:bg-muted/50",
          error ? "border-red-500" : "border-border",
        ].join(" ")}
        aria-label="Subir imagen"
      >
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div className="rounded-full bg-muted p-3">
            <Upload className="h-5 w-5" />
          </div>
          <div className="font-medium text-foreground">Subir imagen</div>
          <div className="text-xs">PNG, JPG o WEBP hasta 4MB</div>
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        title="Subir imagen"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.currentTarget.value = ""
        }}
      />

      {error ? <p className="text-xs text-red-500">{error}</p> : null}

      {value ? (
        <img
          src={value}
          alt="Imagen del producto"
          className="h-24 w-24 rounded-2xl border object-cover"
        />
      ) : null}
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
  const [errors, setErrors] = useState<FormErrors>({})
  const [search, setSearch] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  // =========================
  // DERIVED
  // =========================

  const stats = useMemo(() => {
    const withDiscount = products.filter((p) => (p.discountPercentage ?? 0) > 0).length

    const avgPrice =
      products.length > 0
        ? Math.round(
            products.reduce(
              (acc, p) => acc + getFinalPrice(p.price, p.discountPercentage ?? 0),
              0
            ) / products.length
          )
        : 0

    return {
      total: products.length,
      withDiscount,
      avgPrice,
    }
  }, [products])

  const filtered = useMemo(() => {
    const term = normalize(search)

    if (!term) return products

    return products.filter((p) =>
      [p.name, p.category, String(p.price), String(p.discountPercentage ?? 0)]
        .join(" ")
        .toLowerCase()
        .includes(term)
    )
  }, [products, search])

  // =========================
  // HANDLERS
  // =========================

  const reset = () => {
    setForm(initialForm)
    setErrors({})
    setEditingId(null)
  }

  const openCreate = () => {
    reset()
    setOpen(true)
  }

  const editProduct = (p: Product) => {
    setEditingId(p.id)
    setErrors({})
    setForm({
      name: p.name,
      price: p.price,
      image: p.image,
      category: p.category,
      discountPercentage: p.discountPercentage ?? 0,
    })
    setOpen(true)
  }

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) nextErrors.name = "El nombre es obligatorio."
    if (!form.category.trim()) nextErrors.category = "Selecciona una categoría."
    if (!form.image.trim()) nextErrors.image = "Debes subir una imagen."
    if (!Number.isFinite(form.price) || form.price <= 0) {
      nextErrors.price = "Ingresa un precio válido."
    }
    if (
      !Number.isFinite(form.discountPercentage) ||
      form.discountPercentage < 0 ||
      form.discountPercentage > 100
    ) {
      nextErrors.discountPercentage = "El descuento debe estar entre 0 y 100."
    }

    return nextErrors
  }

  const handleSubmit = () => {
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Revisa los campos obligatorios.")
      return
    }

    const payload: Product = {
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      price: form.price,
      image: form.image,
      category: form.category,
      discountPercentage: form.discountPercentage,
    }

    if (editingId) {
      updateProduct(payload)
      toast.success("Producto actualizado")
    } else {
      addProduct(payload)
      toast.success("Producto creado")
    }

    reset()
    setOpen(false)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteProduct(deleteTarget.id)
    toast.success("Producto eliminado")
    setDeleteTarget(null)
  }

  const finalPreviewPrice = getFinalPrice(
    form.price || 0,
    form.discountPercentage || 0
  )

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
              className="h-12 w-12 rounded-xl border object-cover"
            />
            <div className="min-w-0">
              <div className="truncate font-medium">{p.name}</div>
              <div className="mt-1 flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full">
                  {p.category}
                </Badge>
                {(p.discountPercentage ?? 0) > 0 ? (
                  <Badge className="rounded-full bg-green-600 hover:bg-green-600">
                    -{p.discountPercentage}%
                  </Badge>
                ) : (
                  <Badge variant="outline" className="rounded-full">
                    Sin descuento
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "price",
      header: "Precio",
      cell: ({ row }) => {
        const p = row.original
        const discount = p.discountPercentage ?? 0
        const final = getFinalPrice(p.price, discount)

        return (
          <div className="flex flex-col">
            {discount > 0 ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatCLP(p.price)}
              </span>
            ) : null}
            <span className="font-semibold">{formatCLP(final)}</span>
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
              className="rounded-xl"
              onClick={() => editProduct(p)}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="destructive"
              className="rounded-xl"
              onClick={() => setDeleteTarget(p)}
            >
              <Trash2 className="h-4 w-4" />
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
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-muted p-3">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Catálogo de productos
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestión visual, búsqueda rápida y edición centralizada.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full pl-9 sm:w-72"
              placeholder="Buscar por nombre, categoría o precio"
              aria-label="Buscar productos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button onClick={openCreate} className="gap-2 rounded-xl">
            <Plus className="h-4 w-4" />
            Nuevo producto
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Total productos</p>
              <p className="mt-1 text-2xl font-semibold">{stats.total}</p>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <Package className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Con descuento</p>
              <p className="mt-1 text-2xl font-semibold">{stats.withDiscount}</p>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <Tag className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Precio promedio</p>
              <p className="mt-1 text-2xl font-semibold">
                {formatCLP(stats.avgPrice)}
              </p>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <CircleDollarSign className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DESKTOP TABLE */}
      <Card className="hidden overflow-hidden rounded-2xl md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none p-4 text-left font-medium"
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
                      <div className="flex flex-col items-center gap-2 p-12 text-center text-muted-foreground">
                        <div className="rounded-full bg-muted p-3">
                          <Package className="h-5 w-5 opacity-60" />
                        </div>
                        <p className="font-medium text-foreground">
                          No se encontraron productos
                        </p>
                        <p className="text-sm">
                          Ajusta la búsqueda o crea un nuevo producto.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="group border-t transition hover:bg-muted/40"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4 align-middle">
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
          </div>
        </CardContent>
      </Card>

      {/* MOBILE LIST */}
      <div className="grid gap-4 md:hidden">
        {filtered.length === 0 ? (
          <Card className="rounded-2xl">
            <CardContent className="flex flex-col items-center gap-2 p-10 text-center text-muted-foreground">
              <div className="rounded-full bg-muted p-3">
                <Package className="h-5 w-5 opacity-60" />
              </div>
              <p className="font-medium text-foreground">
                No se encontraron productos
              </p>
              <p className="text-sm">
                Ajusta la búsqueda o crea un nuevo producto.
              </p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((p) => {
            const discount = p.discountPercentage ?? 0
            const final = getFinalPrice(p.price, discount)

            return (
              <Card key={p.id} className="rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-16 w-16 rounded-xl border object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{p.name}</div>
                      <div className="mt-1 flex flex-wrap gap-2 text-zinc-800">
                        <Badge variant="secondary" className="rounded-full text-secondary-foreground">
                          {p.category}
                        </Badge>
                        {discount > 0 ? (
                          <Badge className="rounded-full bg-green-600 hover:bg-green-600">
                            -{discount}%
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-3 flex flex-col">
                        {discount > 0 ? (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatCLP(p.price)}
                          </span>
                        ) : null}
                        <span className="font-semibold">{formatCLP(final)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => editProduct(p)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-xl"
                      onClick={() => setDeleteTarget(p)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* MODAL */}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) {
            reset()
          }
        }}
      >
        <DialogContent className="w-[95vw] max-w-5xl rounded-2xl p-0 overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* FORM SIDE */}
            <div className="p-6 sm:p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-xl">
                  {editingId ? "Editar producto" : "Nuevo producto"}
                </DialogTitle>
                <DialogDescription>
                  Completa la información y revisa la vista previa antes de guardar.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    placeholder="Ej. Aceite esencial premium"
                    aria-label="Nombre"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value })
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                    }}
                  />
                  {errors.name ? (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  ) : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Precio</label>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      aria-label="Precio"
                      value={form.price}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          price: Math.max(0, Number(e.target.value)),
                        })
                        if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }))
                      }}
                    />
                    {errors.price ? (
                      <p className="text-xs text-red-500">{errors.price}</p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descuento %</label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0"
                      aria-label="Descuento"
                      value={form.discountPercentage}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          discountPercentage: Math.min(
                            100,
                            Math.max(0, Number(e.target.value))
                          ),
                        })
                        if (errors.discountPercentage) {
                          setErrors((prev) => ({
                            ...prev,
                            discountPercentage: undefined,
                          }))
                        }
                      }}
                    />
                    {errors.discountPercentage ? (
                      <p className="text-xs text-red-500">
                        {errors.discountPercentage}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoría</label>
                  <select
                    aria-label="Categoría"
                    value={form.category}
                    onChange={(e) => {
                      setForm({ ...form, category: e.target.value })
                      if (errors.category) {
                        setErrors((prev) => ({ ...prev, category: undefined }))
                      }
                    }}
                    className={[
                      "h-10 w-full rounded-lg border bg-background px-3 text-sm",
                      errors.category ? "border-red-500" : "border-input",
                    ].join(" ")}
                  >
                    <option value="">Seleccionar</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category ? (
                    <p className="text-xs text-red-500">{errors.category}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Imagen</label>
                  <ImageUpload
                    value={form.image}
                    error={errors.image}
                    onChange={(url) => {
                      setForm({ ...form, image: url })
                      if (errors.image) setErrors((prev) => ({ ...prev, image: undefined }))
                    }}
                  />
                </div>

                <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => {
                      setOpen(false)
                      reset()
                    }}
                  >
                    Cancelar
                  </Button>

                  <Button className="rounded-xl gap-2" onClick={handleSubmit}>
                    <Sparkles className="h-4 w-4" />
                    {editingId ? "Guardar cambios" : "Crear producto"}
                  </Button>
                </div>
              </div>
            </div>

            {/* PREVIEW SIDE */}
            <div className="border-t bg-muted/30 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-xl bg-background p-2 shadow-sm">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Vista previa</h3>
                  <p className="text-sm text-muted-foreground">
                    Así se verá el producto dentro del panel.
                  </p>
                </div>
              </div>

              <Card className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                <div className="aspect-4/3 bg-muted">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      Sin imagen
                    </div>
                  )}
                </div>

                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full text-secondary-foreground">
                      {form.category || "Categoría"}
                    </Badge>

                    {form.discountPercentage > 0 ? (
                      <Badge className="rounded-full bg-green-600 hover:bg-green-600">
                        -{form.discountPercentage}%
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-full">
                        Sin descuento
                      </Badge>
                    )}
                  </div>

                  <div>
                    <div className="text-lg font-semibold">
                      {form.name || "Nombre del producto"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Vista previa comercial del ítem.
                    </p>
                  </div>

                  <div className="flex flex-col">
                    {form.discountPercentage > 0 ? (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatCLP(form.price || 0)}
                      </span>
                    ) : null}
                    <span className="text-2xl font-bold">
                      {formatCLP(finalPreviewPrice)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar producto</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `Se eliminará "${deleteTarget.name}" del catálogo. Esta acción no se puede deshacer.`
                : "Esta acción no se puede deshacer."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}