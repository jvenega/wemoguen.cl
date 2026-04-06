export type OrderStatus = "created" | "paid" | "shipped" | "delivered"

export type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type Order = {
  id: string
  customerName: string
  total: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}
export const mockOrders: Order[] = [
  {
    id: "ord_001",
    customerName: "Juan Pérez",
    total: 25000,
    status: "shipped",
    createdAt: "2026-03-20",
    items: [
      {
        id: "p1",
        name: "Aceite CBD 15ml",
        price: 15000,
        quantity: 1,
        image: "https://picsum.photos/seed/p1/100"
      }
    ]
  },
  {
    id: "ord_002",
    customerName: "María González",
    total: 48000,
    status: "paid",
    createdAt: "2026-03-21",
    items: [
      {
        id: "p2",
        name: "Kit Relax CBD",
        price: 24000,
        quantity: 2,
        image: "https://picsum.photos/seed/p2/100"
      }
    ]
  },
  {
    id: "ord_003",
    customerName: "Carlos Soto",
    total: 12000,
    status: "created",
    createdAt: "2026-03-22",
    items: [
      {
        id: "p3",
        name: "Crema CBD",
        price: 12000,
        quantity: 1,
        image: "https://picsum.photos/seed/p3/100"
      }
    ]
  },
  {
    id: "ord_004",
    customerName: "Ana Torres",
    total: 76000,
    status: "delivered",
    createdAt: "2026-03-23",
    items: [
      {
        id: "p4",
        name: "Pack Premium CBD",
        price: 38000,
        quantity: 2,
        image: "https://picsum.photos/seed/p4/100"
      }
    ]
  },
  {
    id: "ord_005",
    customerName: "Luis Rojas",
    total: 33000,
    status: "paid",
    createdAt: "2026-03-24",
    items: [
      {
        id: "p5",
        name: "Aceite CBD 30ml",
        price: 33000,
        quantity: 1,
        image: "https://picsum.photos/seed/p5/100"
      }
    ]
  },
  {
    id: "ord_006",
    customerName: "Fernanda Díaz",
    total: 21000,
    status: "created",
    createdAt: "2026-03-25",
    items: [
      {
        id: "p6",
        name: "Gotas CBD",
        price: 21000,
        quantity: 1,
        image: "https://picsum.photos/seed/p6/100"
      }
    ]
  },
  {
    id: "ord_007",
    customerName: "Pedro Morales",
    total: 54000,
    status: "shipped",
    createdAt: "2026-03-26",
    items: [
      {
        id: "p7",
        name: "Combo CBD + Crema",
        price: 27000,
        quantity: 2,
        image: "https://picsum.photos/seed/p7/100"
      }
    ]
  },
  {
    id: "ord_008",
    customerName: "Valentina Vega",
    total: 15000,
    status: "delivered",
    createdAt: "2026-03-27",
    items: [
      {
        id: "p8",
        name: "Aceite CBD 10ml",
        price: 15000,
        quantity: 1,
        image: "https://picsum.photos/seed/p8/100"
      }
    ]
  },
  {
    id: "ord_009",
    customerName: "Diego Castillo",
    total: 62000,
    status: "paid",
    createdAt: "2026-03-28",
    items: [
      {
        id: "p9",
        name: "Pack Wellness",
        price: 31000,
        quantity: 2,
        image: "https://picsum.photos/seed/p9/100"
      }
    ]
  },
  {
    id: "ord_010",
    customerName: "Camila Herrera",
    total: 18000,
    status: "created",
    createdAt: "2026-03-29",
    items: [
      {
        id: "p10",
        name: "Crema Relajante",
        price: 18000,
        quantity: 1,
        image: "https://picsum.photos/seed/p10/100"
      }
    ]
  },
  {
    id: "ord_011",
    customerName: "Jorge Paredes",
    total: 91000,
    status: "delivered",
    createdAt: "2026-03-30",
    items: [
      {
        id: "p11",
        name: "Pack Full CBD",
        price: 91000,
        quantity: 1,
        image: "https://picsum.photos/seed/p11/100"
      }
    ]
  },
  {
    id: "ord_012",
    customerName: "Natalia Fuentes",
    total: 27000,
    status: "shipped",
    createdAt: "2026-03-31",
    items: [
      {
        id: "p12",
        name: "Aceite CBD + Spray",
        price: 27000,
        quantity: 1,
        image: "https://picsum.photos/seed/p12/100"
      }
    ]
  },
  {
    id: "ord_013",
    customerName: "Ricardo León",
    total: 34000,
    status: "paid",
    createdAt: "2026-04-01",
    items: [
      {
        id: "p13",
        name: "Kit Starter CBD",
        price: 17000,
        quantity: 2,
        image: "https://picsum.photos/seed/p13/100"
      }
    ]
  },
  {
    id: "ord_014",
    customerName: "Paula Silva",
    total: 22000,
    status: "created",
    createdAt: "2026-04-02",
    items: [
      {
        id: "p14",
        name: "Aceite CBD 20ml",
        price: 22000,
        quantity: 1,
        image: "https://picsum.photos/seed/p14/100"
      }
    ]
  },
  {
    id: "ord_015",
    customerName: "Sebastián Núñez",
    total: 67000,
    status: "shipped",
    createdAt: "2026-04-03",
    items: [
      {
        id: "p15",
        name: "Pack Recovery CBD",
        price: 67000,
        quantity: 1,
        image: "https://picsum.photos/seed/p15/100"
      }
    ]
  }
]