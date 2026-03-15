import { create } from "zustand"

type ShopState = {
  category: string
  search: string
  sort: string

  setCategory: (v: string) => void
  setSearch: (v: string) => void
  setSort: (v: string) => void

  clearFilters: () => void
}

export const useShopStore = create<ShopState>((set) => ({
  category: "all",
  search: "",
  sort: "default",

  setCategory: (v) => set({ category: v }),
  setSearch: (v) => set({ search: v }),
  setSort: (v) => set({ sort: v }),

  clearFilters: () =>
    set({
      category: "all",
      search: "",
      sort: "default",
    }),
}))