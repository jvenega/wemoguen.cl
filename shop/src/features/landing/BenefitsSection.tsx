export default function BenefitsSection() {

  return (
    <section className="bg-white border-t">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">

        <div>
          <h3 className="font-semibold text-[#4B2863]">
            Productos Certificados
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
            Seleccionados con estándares de calidad terapéutica.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#4B2863]">
            Comunidad
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
            Accede a beneficios y apoyo de nuestra comunidad.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[#4B2863]">
            Soporte
          </h3>

          <p className="text-sm text-muted-foreground mt-2">
            Orientación personalizada para elegir tus productos.
          </p>
        </div>

      </div>

    </section>
  )
}