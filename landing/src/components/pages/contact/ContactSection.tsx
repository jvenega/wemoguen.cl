import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

const BRAND_PURPLE_DARK = "#4B2863";
const SOFT_BACKGROUND = "#f6f2f8";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      telefono: formData.get("telefono"),
      rut: formData.get("rut"),
      asunto: formData.get("asunto"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch(
        "https://wemoguen.cl/api/contact.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result?.error || "Error enviando formulario");
      }

      setMessage("Mensaje enviado correctamente.");
      form.reset();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      id="contacto"
      py={10}
      sx={{ backgroundColor: SOFT_BACKGROUND }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          mb={6}
          sx={{ color: BRAND_PURPLE_DARK }}
        >
          Contáctanos
        </Typography>

        <Grid container spacing={4}>
          {/* INFORMACIÓN */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(75,40,99,0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  ¿Cómo ser parte de la comunidad?
                </Typography>

                <Typography mb={2}>
                  Tomar contacto con el directorio y realizar un
                  requerimiento de incorporación:
                </Typography>

                <Typography fontWeight={600} mt={3}>
                  Requisitos
                </Typography>

                <Box component="ul" sx={{ pl: 3, mt: 1 }}>
                  <li>Cédula de Identidad por ambos lados.</li>
                  <li>Receta médica vigente.</li>
                  <li>
                    Certificado de antecedentes vigente (renovable cada 6 meses).
                  </li>
                  <li>
                    Certificados relacionados con pensión alimenticia:
                    <ul style={{ marginTop: 6 }}>
                      <li>
                        Certificado General de Deuda de Alimentos con Alimentario.
                      </li>
                      <li>
                        Certificado General de Deuda de Alimentos.
                      </li>
                    </ul>
                  </li>
                  <li>Declaración de ingreso completa y firmada.</li>
                  <li>Reglamento Interno completo.</li>
                </Box>

                <Typography mt={3}>
                  Te invitamos a ser parte de WE-MOGÜEN.
                  Déjanos tus datos y relátanos un pequeño testimonio.
                  Uno de nuestros cooperadores te llamará.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* FORMULARIO */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(75,40,99,0.08)",
              }}
            >
              <CardContent>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Nombre Completo" name="nombre" required />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Correo Electrónico" name="email" type="email" required />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="Teléfono" name="telefono" required />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField fullWidth label="RUN" name="rut" required />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField select fullWidth label="Asunto" name="asunto" required>
                        <MenuItem value="inscripcion">Inscripción a la comunidad</MenuItem>
                        <MenuItem value="taller">Quiero presentar mi taller</MenuItem>
                        <MenuItem value="participar">Participar en taller</MenuItem>
                        <MenuItem value="otras">Otras consultas</MenuItem>
                      </TextField>
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Mensaje/Testimonio"
                        name="mensaje"
                        required
                      />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={loading}
                        sx={{
                          py: 1.6,
                          fontWeight: 700,
                          borderRadius: 3,
                          textTransform: "none",
                          backgroundColor: BRAND_PURPLE_DARK,
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#3d1f52",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "#fff" }} />
                        ) : (
                          "Enviar Mensaje"
                        )}
                      </Button>
                    </Grid>

                  </Grid>
                </Box>

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}