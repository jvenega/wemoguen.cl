import { ShieldCheck, Users, LifeBuoy } from "lucide-react"

const benefits = [
  {
    title: "Productos Certificados",
    description: "Seleccionados con estándares de calidad terapéutica.",
    icon: ShieldCheck,
  },
  {
    title: "Comunidad",
    description: "Accede a beneficios y apoyo de nuestra comunidad.",
    icon: Users,
  },
  {
    title: "Soporte",
    description: "Orientación personalizada para elegir tus productos.",
    icon: LifeBuoy,
  },
]

export default function BenefitsSection() {
  return (
    <section className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <h2 className="mb-10 text-center text-2xl font-semibold">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon

            return (
              <div key={benefit.title} className="space-y-2">
                <Icon className="mx-auto h-6 w-6 text-primary" />

                <h3 className="font-semibold text-primary">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}