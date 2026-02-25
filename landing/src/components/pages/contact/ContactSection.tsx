import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ContactFormData } from "../../../types/contact";

const BRAND_PURPLE_DARK = "#4B2863";
const SOFT_BACKGROUND = "#f6f2f8";

/* ===========================
   VALIDACIÓN RUT CHILENO
=========================== */
function cleanRut(rut: string) {
  return rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
}

function validateRut(rut: string) {
  const cleaned = cleanRut(rut);
  if (cleaned.length < 8) return false;

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += Number(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const result = 11 - (sum % 11);
  const expectedDV =
    result === 11 ? "0" : result === 10 ? "K" : String(result);

  return dv === expectedDV;
}

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    const normalizedRut = cleanRut(data.rut);
    const formattedRut =
      normalizedRut.slice(0, -1) + "-" + normalizedRut.slice(-1);

    console.log({
      ...data,
      rut: formattedRut,
    });

    reset();
    setOpen(false);
  };

  return (
    <Box component="section" py={{ xs: 10, md: 14 }} bgcolor={SOFT_BACKGROUND}>
      <Container maxWidth="lg">

        {/* ============================ */}
        {/* HEADER */}
        {/* ============================ */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h4"
            fontWeight={800}
            gutterBottom
            sx={{ color: BRAND_PURPLE_DARK }}
          >
            ¿Cómo ser parte de WE-MOGÜEN?
          </Typography>

          <Typography
            color="text.secondary"
            maxWidth={650}
            mx="auto"
            fontSize="1.05rem"
          >
            Queremos conocerte. Para integrarte a nuestra comunidad,
            necesitaremos algunos documentos básicos. Nuestro equipo
            te acompañará en cada paso.
          </Typography>
        </Box>

        {/* ============================ */}
        {/* DOCUMENTOS */}
        {/* ============================ */}
        <Card
          sx={{
            maxWidth: 900,
            mx: "auto",
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            backgroundColor: "#ffffff",
            boxShadow: "0 15px 50px rgba(75,40,99,0.08)",
            mb: 6,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                display: "grid",
                gap: 3,
              }}
            >
              {[
                "Cédula de identidad vigente (ambos lados)",
                "Receta médica vigente",
                "Certificado de antecedentes vigente",
                "Certificados relacionados con pensión alimenticia",
                "Declaración de ingreso firmada",
                "Reglamento interno firmado",
              ].map((item, index) => (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    fontSize: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: BRAND_PURPLE_DARK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    ✓
                  </Box>
                  {item}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* ============================ */}
        {/* CTA */}
        {/* ============================ */}
        <Box textAlign="center">
          <Button
            size="large"
            onClick={() => setOpen(true)}
            sx={{
              px: 6,
              py: 1.6,
              fontWeight: 700,
              borderRadius: 4,
              textTransform: "none",
              backgroundColor: BRAND_PURPLE_DARK,
              color: "#fff",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#3d1f52",
              },
            }}
          >
            Quiero ser parte
          </Button>
        </Box>

        {/* ============================ */}
        {/* MODAL FORMULARIO */}
        {/* ============================ */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", md: 820 },
              maxHeight: "90vh",
              overflowY: "auto",
              bgcolor: "#fff",
              borderRadius: 6,
              boxShadow: 24,
              p: { xs: 3, md: 6 },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              mb={4}
              sx={{ color: BRAND_PURPLE_DARK }}
            >
              Cuéntanos sobre ti
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexWrap="wrap" gap={3}>

                <Box sx={{ width: { xs: "100%", md: "calc(50% - 12px)" } }}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                    })}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message as string}
                  />
                </Box>

                <Box sx={{ width: { xs: "100%", md: "calc(50% - 12px)" } }}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    {...register("email", {
                      required: "El correo es obligatorio",
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message as string}
                  />
                </Box>

                <Box sx={{ width: { xs: "100%", md: "calc(50% - 12px)" } }}>
                  <TextField
                    fullWidth
                    label="RUT"
                    placeholder="12345678-9"
                    {...register("rut", {
                      required: "El RUT es obligatorio",
                      validate: (value) =>
                        validateRut(value) || "RUT inválido",
                    })}
                    error={!!errors.rut}
                    helperText={errors.rut?.message as string}
                  />
                </Box>

                <Box sx={{ width: { xs: "100%", md: "calc(50% - 12px)" } }}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    {...register("telefono", {
                      required: "El teléfono es obligatorio",
                    })}
                    error={!!errors.telefono}
                    helperText={errors.telefono?.message as string}
                  />
                </Box>

                <Box sx={{ width: "100%" }}>
                  <TextField
                    fullWidth
                    label="¿Por qué quieres ser parte?"
                    multiline
                    rows={4}
                    {...register("mensaje", {
                      required: "El mensaje es obligatorio",
                    })}
                    error={!!errors.mensaje}
                    helperText={errors.mensaje?.message as string}
                  />
                </Box>
              </Box>

              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 5,
                  py: 1.6,
                  fontWeight: 700,
                  borderRadius: 4,
                  textTransform: "none",
                  backgroundColor: BRAND_PURPLE_DARK,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#3d1f52",
                  },
                }}
              >
                Enviar mi solicitud
              </Button>
            </form>
          </Box>
        </Modal>

      </Container>
    </Box>
  );
}