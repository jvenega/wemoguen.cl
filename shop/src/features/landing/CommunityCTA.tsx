import { Button } from "@/components/ui/button"

export default function CommunityCTA() {

  return (
    <section className="bg-[#faf9fb]">

      <div className="max-w-5xl mx-auto px-6 py-20 text-center">

        <h2 className="text-3xl font-semibold text-[#4B2863]">
          Forma parte de nuestra comunidad
        </h2>

        <p className="mt-4 text-muted-foreground">
          Regístrate para acceder a beneficios exclusivos y productos terapéuticos.
        </p>

        <Button className="mt-6 bg-[#4B2863]">
          Crear cuenta
        </Button>

      </div>

    </section>
  )
}