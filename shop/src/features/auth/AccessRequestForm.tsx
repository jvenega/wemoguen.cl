import { useForm } from "@tanstack/react-form"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AccessRequestForm() {

  const form = useForm({
    defaultValues: {
      fullName: "",
      rut: "",
      email: "",
      phone: "",
      reason: "",
      document: undefined as File | undefined,
    },

    onSubmit: async ({ value }) => {

      console.log(value)

      // aquí enviarías a tu backend
      // await api.post("/solicitud", value)

      alert("Solicitud enviada correctamente")

    },
  })

  return (
    <Card className="w-full max-w-xl rounded-2xl shadow-sm">

      <CardContent className="p-8 space-y-6">

        {/* HEADER */}

        <div className="space-y-2">

          <h1 className="text-2xl font-semibold">
            Solicitud de acceso
          </h1>

          <p className="text-sm text-muted-foreground">
            Completa el formulario para solicitar acceso a la plataforma.
            Nuestro equipo revisará tu solicitud.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-4"
        >

          {/* NOMBRE */}

          <form.Field
            name="fullName"
            validators={{
              onChange: ({ value }) =>
                !value ? "Nombre requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">

                <Label>Nombre completo</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="Juan Pérez"
                />

                {field.state.meta.errors && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}

              </div>
            )}
          </form.Field>

          {/* RUT */}

          <form.Field
            name="rut"
            validators={{
              onChange: ({ value }) =>
                !value ? "RUT requerido" : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">

                <Label>RUT</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="12.345.678-9"
                />

              </div>
            )}
          </form.Field>

          {/* EMAIL */}

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value.includes("@")
                  ? "Correo inválido"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">

                <Label>Correo electrónico</Label>

                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="correo@ejemplo.com"
                />

              </div>
            )}
          </form.Field>

          {/* TELÉFONO */}

          <form.Field name="phone">
            {(field) => (
              <div className="space-y-2">

                <Label>Teléfono</Label>

                <Input
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(e.target.value)
                  }
                  placeholder="+56 9 1234 5678"
                />

              </div>
            )}
          </form.Field>

          {/* MOTIVO */}

          <form.Field
            name="reason"
            validators={{
              onChange: ({ value }) =>
                value.length < 10
                  ? "Describe brevemente tu solicitud"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">

                <Label>Motivo de la solicitud</Label>

                <Textarea
                  value={field.state.value}
                  onChange={(e) =>
                    {
                          return field.handleChange(e.target.value)
                      }
                  }
                  placeholder="Describe brevemente tu caso..."
                />

              </div>
            )}
          </form.Field>

          {/* DOCUMENTO */}

          <form.Field name="document">
            {(field) => (
              <div className="space-y-2">

                <Label>Documento médico (opcional)</Label>

                <Input
                  type="file"
                  onChange={(e) =>
                    field.handleChange(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>
            )}
          </form.Field>

          {/* SUBMIT */}

          <Button
            type="submit"
            className="w-full bg-[#4B2863] text-amber-50"
          >
            Enviar solicitud
          </Button>

        </form>

      </CardContent>

    </Card>
  )
}