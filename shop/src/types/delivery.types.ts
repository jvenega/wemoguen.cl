export type Delivery = {
  address: string
  commune: string
  city: string
  preference: "AM" | "PM" | null
  notes: string
}