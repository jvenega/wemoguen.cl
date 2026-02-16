import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { ContactFormData } from "../../../types/contact";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log("Formulario:", data);
    // aquí luego va backend / email / WhatsApp
  };

  return (
    <Box id="contacto" component="section" py={12} bgcolor="#f9f9f9">
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          gutterBottom
        >
          Contáctanos
        </Typography>

        <Box
          mt={8}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={5}
        >
          {/* INFO */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                ¿Cómo ser parte de la comunidad?
              </Typography>

              <Typography paragraph>
                Tomar contacto con el directorio y realizar un requerimiento de
                incorporación.
              </Typography>

              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                Requisitos
              </Typography>

              <Box component="ul" pl={2}>
                <li>Cédula de identidad por ambos lados</li>
                <li>Receta médica vigente</li>
                <li>
                  Certificado de antecedentes vigente (renovable cada 6 meses)
                </li>
                <li>
                  Certificados relacionados con pensión alimenticia
                  <ul>
                    <li>Certificado General de Deuda de Alimentos</li>
                    <li>Certificado con Alimentario</li>
                  </ul>
                </li>
                <li>Declaración de ingreso firmada</li>
                <li>Reglamento interno firmado</li>
              </Box>

              <Typography mt={2}>
                Déjanos tus datos y un breve testimonio. Un cooperador de
                WE-MOGÜEN se pondrá en contacto contigo.
              </Typography>
            </CardContent>
          </Card>

          {/* FORM */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  margin="normal"
                  {...register("nombre", { required: true })}
                  error={!!errors.nombre}
                />

                <TextField
                  fullWidth
                  label="Correo electrónico"
                  margin="normal"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                />

                <TextField
                  fullWidth
                  label="Teléfono"
                  margin="normal"
                  {...register("telefono", { required: true })}
                  error={!!errors.telefono}
                />

                <TextField
                  fullWidth
                  label="RUN"
                  margin="normal"
                  {...register("rut", { required: true })}
                  error={!!errors.rut}
                />

                <TextField
                  select
                  fullWidth
                  label="Asunto"
                  margin="normal"
                  defaultValue=""
                  {...register("asunto", { required: true })}
                  error={!!errors.asunto}
                >
                  <MenuItem value="inscripcion">
                    Inscripción a la comunidad
                  </MenuItem>
                  <MenuItem value="taller">
                    Quiero presentar mi taller
                  </MenuItem>
                  <MenuItem value="participar">
                    Participar en taller
                  </MenuItem>
                  <MenuItem value="otras">
                    Otras consultas
                  </MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Mensaje / Testimonio"
                  margin="normal"
                  multiline
                  rows={4}
                  {...register("mensaje", { required: true })}
                  error={!!errors.mensaje}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}