import { Link } from "react-router-dom"
import { Instagram, Mail, Phone } from "lucide-react"
import { useShopStore } from "@/store/shop.store"

export default function Footer() {

  const setCategory = useShopStore(s => s.setCategory)

  const goToCategory = (value: string) => {
    setCategory(value)

    document
      .getElementById("shop")
      ?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="bg-[#4B2863] text-amber-50">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Marca */}

          <div className="space-y-4">

            <h3 className="text-xl md:text-2xl tracking-[0.25em] font-semibold">
              WEMÖGUEN
            </h3>

            <p className="text-sm text-amber-100/80 leading-relaxed">
              Productos terapéuticos de alta calidad orientados al bienestar
              y la salud de nuestra comunidad.
            </p>

          </div>

          {/* Navegación */}

          <div>

            <h4 className="font-semibold mb-4">
              Navegación
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  className="hover:text-amber-200 transition"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <button
                  onClick={() =>
                    document
                      .getElementById("shop")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-amber-200 transition"
                >
                  Tienda
                </button>
              </li>

              <li>
                <Link
                  to="/pedidos"
                  className="hover:text-amber-200 transition"
                >
                  Mis pedidos
                </Link>
              </li>

              <li>
                <Link
                  to="/solicitud-acceso"
                  className="hover:text-amber-200 transition"
                >
                  Solicitud de acceso
                </Link>
              </li>

            </ul>

          </div>

          {/* Categorías */}

          <div>

            <h4 className="font-semibold mb-4">
              Categorías
            </h4>

            <ul className="space-y-3 text-sm">

              <li>
                <button
                  onClick={() => goToCategory("flores")}
                  className="hover:text-amber-200 transition"
                >
                  Flores medicinales
                </button>
              </li>

              <li>
                <button
                  onClick={() => goToCategory("aceites")}
                  className="hover:text-amber-200 transition"
                >
                  Aceites CBD
                </button>
              </li>

              <li>
                <button
                  onClick={() => goToCategory("extractos")}
                  className="hover:text-amber-200 transition"
                >
                  Extractos
                </button>
              </li>

              <li>
                <button
                  onClick={() => goToCategory("equipos")}
                  className="hover:text-amber-200 transition"
                >
                  Equipos
                </button>
              </li>

            </ul>

          </div>

          {/* Contacto */}

          <div>

            <h4 className="font-semibold mb-4">
              Contacto
            </h4>

            <ul className="space-y-4 text-sm">

              <li className="flex items-center gap-2 text-amber-100/90">
                <Mail className="h-4 w-4" />
                contacto@wemoguen.cl
              </li>

              <li className="flex items-center gap-2 text-amber-100/90">
                <Phone className="h-4 w-4" />
                +56 9 0000 0000
              </li>

              <li>
                <a
                  rel="noopener"
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-amber-200 transition"
                >
                  <Instagram className="h-4 w-4" />
                  @wemoguen
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-amber-100/20 mt-12 pt-6 text-center text-xs text-amber-100/60">

          © {new Date().getFullYear()} WEMÖGUEN. Todos los derechos reservados.

        </div>

      </div>

    </footer>
  )
}