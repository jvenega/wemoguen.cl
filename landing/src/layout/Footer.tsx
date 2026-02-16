import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1f1f1f",
        color: "#fff",
        pt: 8,
        pb: 4,
        mt: 12,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={6}
          justifyContent="space-between"
        >
          {/* Logo + descripción */}
          <Box maxWidth={350}>
            <Box
              component="img"
              src="/logo.png"
              alt="WE-MOGÜEN"
              height={50}
              mb={2}
            />
            <Typography color="rgba(255,255,255,0.8)">
              Asociación de Usuarios de Medicina Ancestral
            </Typography>
          </Box>

          {/* Contacto */}
          <Box>
            <Typography fontWeight={700} gutterBottom>
              Contacto
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">
                info@wemoguen.cl
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                Puerto Montt, Chile
              </Typography>
            </Box>
          </Box>

          {/* Redes */}
          <Box>
            <Typography fontWeight={700} gutterBottom>
              Síguenos
            </Typography>

            <Box display="flex" gap={1}>
              <IconButton
                color="inherit"
                href="#"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                color="inherit"
                href="#"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                color="inherit"
                href="#"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box textAlign="center">
          <Typography variant="body2" color="rgba(255,255,255,0.6)">
            © 2025 WE-MOGÜEN. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
