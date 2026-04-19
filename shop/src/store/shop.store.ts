import { create } from "zustand"

/* =========================
   TYPES MÁS SEGUROS
========================= */

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc"

type ShopState = {
  category: string
  search: string
  sort: SortOption

  setCategory: (v: string) => void
  setSearch: (v: string) => void
  setSort: (v: SortOption) => void

  clearFilters: () => void
}

/* =========================
   CONSTANTES
========================= */

const INITIAL_STATE = {
  category: "all",
  search: "",
  sort: "default" as SortOption,
}

/* =========================
   STORE
========================= */

export const useShopStore = create<ShopState>((set) => ({

  ...INITIAL_STATE,

  /* =========================
     SETTERS (CONSISTENTES)
  ========================= */

  setCategory: (category) =>
    set(() => ({ category })),

  setSearch: (search) =>
    set(() => ({ search })),

  setSort: (sort) =>
    set(() => ({ sort })),

  /* =========================
     RESET CENTRALIZADO
  ========================= */

  clearFilters: () =>
    set(() => INITIAL_STATE),

}))