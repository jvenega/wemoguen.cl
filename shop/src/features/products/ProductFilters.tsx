import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
    category: string
    setCategory: (v: string) => void
    sort: string
    setSort: (v: string) => void
    search: string
    setSearch: (v: string) => void
}

export default function ProductFilters({
    category,
    setCategory,
    sort,
    setSort,
    search,
    setSearch,
}: Props) {
    return (
        <div className="space-y-8">

            <div>
                <h3 className="text-sm font-medium text-[#4B2863] mb-3">
                    Buscar
                </h3>
                <Input
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div>
                <h3 className="text-sm font-medium text-[#4B2863] mb-3">
                    Categoría
                </h3>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="flores">Flores Medicinales</SelectItem>
                        <SelectItem value="aceites">Aceites CBD</SelectItem>
                        <SelectItem value="extractos">Extractos Terapéuticos</SelectItem>
                        <SelectItem value="equipos">Equipos Médicos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <h3 className="text-sm font-medium text-[#4B2863] mb-3">
                    Ordenar por
                </h3>
                <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Relevancia</SelectItem>
                        <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                        <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    )
}