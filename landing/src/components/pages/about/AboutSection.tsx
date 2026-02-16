import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { motion } from "motion/react";

export default function AboutSection() {
  return (
    <Box
      id="quienes-somos"
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        backgroundImage: "url('/about-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(2px)",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.92), rgba(255,255,255,0.97))",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          {/* Texto */}
          <motion.div
            style={{ flex: 1 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              gutterBottom
              sx={{ lineHeight: 1.2 }}
            >
              Quiénes Somos
            </Typography>

            <Typography paragraph sx={{ color: "text.secondary" }}>
              Una comunidad privada de usuarios de medicina ancestral
              “Cannabis terapéutico” con personalidad jurídica vigente bajo
              el régimen civil y municipal de Puerto Montt, constituida el año
              2024.
            </Typography>

            <Typography sx={{ color: "text.secondary" }}>
              Con estatutos, términos y condiciones que nos invitan a tener
              una comunidad de grato ambiente. Nuestra labor es otorgar
              medicina junto a un acompañamiento integral por parte de
              nuestro equipo y alianzas colaborativas.
            </Typography>
          </motion.div>

          {/* Imagen */}
          <motion.div
            style={{ flex: 1 }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box
              component="img"
              src="/about.png"
              alt="Equipo WE-MOGÜEN"
              sx={{
                width: "100%",
                maxWidth: { md: 520 },
                borderRadius: 4,
                boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
              }}
            />
          </motion.div>
        </Box>

        {/* Misión */}
        <Box mt={{ xs: 6, md: 10 }}>
          <Card
            elevation={0}
            sx={{
              maxWidth: 900,
              mx: "auto",
              p: { xs: 1, md: 2 },
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(1px)",
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
                gutterBottom
              >
                Misión
              </Typography>

              <Typography color="text.secondary">
                Nuestra gran misión es otorgar herramientas con propuestas
                medicinales, culturales y educativas, abordando temas
                relevantes y actuales sobre el uso clínico terapéutico de la
                cannabis y su industria.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Instagram */}
        <Box textAlign="center" mt={5}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<InstagramIcon />}
            href="#"
            target="_blank"
            rel="noreferrer"
            sx={{
              borderRadius: 8,
              px: 4,
            }}
          >
            Instagram
          </Button>
        </Box>
      </Container>
    </Box>
  );
}