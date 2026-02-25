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

const BRAND_PURPLE_DARK = "#4B2863";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: BRAND_PURPLE_DARK,
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
              src="/logo2.png"
              alt="WE-MOGÜEN"
              height={55}
              mb={2}
            />
            <Typography color="rgba(255,255,255,0.85)">
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
                href="#"
                aria-label="Facebook"
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6C3A8C",
                  },
                }}
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                href="#"
                aria-label="Instagram"
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6C3A8C",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                href="#"
                aria-label="WhatsApp"
                sx={{
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6C3A8C",
                  },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box textAlign="center">
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            © 2025 WE-MOGÜEN. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}