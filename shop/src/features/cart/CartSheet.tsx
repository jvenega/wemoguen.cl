import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart.store"
import { Link } from "react-router-dom"

export default function CartSheet({ children }: any) {
  const { items, removeItem } = useCartStore()

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Tu carrito está vacío.
            </p>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  x{item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p>${(item.price * item.quantity).toLocaleString()}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-red-500"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}

          {items.length > 0 && (
            <>
              <div className="flex justify-between font-semibold pt-4">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <Link to="/checkout">
                <Button className="w-full mt-4">
                  Ir a pagar
                </Button>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}