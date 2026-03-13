import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"

import {
  Search,
  X,
  Filter
} from "lucide-react"

import { useEffect, useState } from "react"

interface Props {
  category: string
  setCategory: (v: string) => void
  sort: string
  setSort: (v: string) => void
  search: string
  setSearch: (v: string) => void
}

/* =========================
   CATEGORY CONFIG
========================= */

const categories = [
  { label: "Todas", value: "all" },
  { label: "Flores", value: "flores" },
  { label: "Aceites", value: "aceites" },
  { label: "Extractos", value: "extractos" },
  { label: "Equipos", value: "equipos" },
]

export default function ProductFilters({
  category,
  setCategory,
  sort,
  setSort,
  search,
  setSearch,
}: Props) {

  const [localSearch, setLocalSearch] = useState(search)

  /* =========================
     SEARCH DEBOUNCE
  ========================= */

  useEffect(() => {

    const timeout = setTimeout(() => {
      setSearch(localSearch)
    }, 350)

    return () => clearTimeout(timeout)

  }, [localSearch])

  /* =========================
     CLEAR FILTERS
  ========================= */

  const clearFilters = () => {
    setCategory("all")
    setSort("default")
    setSearch("")
    setLocalSearch("")
  }

  const hasActiveFilters =
    category !== "all" || sort !== "default" || search !== ""

  return (
    <div className="bg-white rounded-xl border p-6 space-y-8 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2 text-[#4B2863] font-semibold text-sm">
          <Filter className="h-4 w-4" />
          Filtros
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs flex items-center gap-1"
          >
            <X className="h-3 w-3"/>
            Limpiar
          </Button>
        )}

      </div>

      {/* SEARCH */}

      <div>

        <label className="text-sm font-semibold text-[#4B2863] mb-3 block">
          Buscar
        </label>

        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="pl-9"
          />

        </div>

      </div>

      {/* CATEGORY */}

      <div>

        <label className="text-sm font-semibold text-[#4B2863] mb-3 block">
          Categoría
        </label>

        <div className="flex flex-wrap gap-2">

          {categories.map((cat) => {

            const active = category === cat.value

            return (
              <Button
                key={cat.value}
                size="sm"
                variant={active ? "default" : "outline"}
                onClick={() => setCategory(cat.value)}
                className={`
                  transition
                  ${active
                    ? "bg-[#4B2863] hover:bg-[#3e2053]"
                    : "hover:border-[#4B2863]/40"}
                `}
              >
                {cat.label}
              </Button>
            )
          })}

        </div>

      </div>

      {/* SORT */}

      <div>

        <label className="text-sm font-semibold text-[#4B2863] mb-3 block">
          Ordenar por
        </label>

        <Select value={sort} onValueChange={setSort}>

          <SelectTrigger>
            <SelectValue placeholder="Seleccionar orden" />
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="default">
              Relevancia
            </SelectItem>

            <SelectItem value="price-asc">
              Precio: menor a mayor
            </SelectItem>

            <SelectItem value="price-desc">
              Precio: mayor a menor
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      {/* ACTIVE FILTERS */}

      {hasActiveFilters && (

        <div className="pt-4 border-t space-y-2">

          <p className="text-xs text-muted-foreground">
            Filtros activos
          </p>

          <div className="flex flex-wrap gap-2">

            {category !== "all" && (
              <span className="text-xs bg-[#4B2863]/10 text-[#4B2863] px-2 py-1 rounded-md">
                {categories.find(c => c.value === category)?.label}
              </span>
            )}

            {search && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                "{search}"
              </span>
            )}

            {sort !== "default" && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                orden aplicado
              </span>
            )}

          </div>

        </div>

      )}

    </div>
  )
}