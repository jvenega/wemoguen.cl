export type Delivery = {
  address: string
  commune: string
  city: string
  notes: string
  preference: "AM" | "PM"
  date?: string
}