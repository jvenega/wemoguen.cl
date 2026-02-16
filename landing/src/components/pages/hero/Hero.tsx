import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: "url('/Puerto-Montt-en-invierno.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box mb={3}>
            <Box
              component="img"
              src="/logo.png"
              alt="WE-MOGÜEN"
              height={80}
            />
          </Box>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Asociación de Usuarios de Medicina Ancestral
          </Typography>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <Button
            href="#contacto"
            size="large"
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Únete a nuestra comunidad
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}