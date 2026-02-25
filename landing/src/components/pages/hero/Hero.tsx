import { Box, Container, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "85vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: { xs: "-100px", md: "-15px", sm:"-150px" },
        pt: { xs: 10, md: 14 },
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
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.55))",
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box mb={4}>
            <Box
              component="img"
              src="/logo2.png"
              alt="WE-MOGÜEN"
              sx={{
                height: { xs: 70, md: 90 },
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.4))",
              }}
            />
          </Box>
        </motion.div>

        {/* Título centrado y protagonista */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Typography
            fontWeight={800}
            sx={{
              fontSize: { xs: "1.7rem", md: "2.4rem" },
              lineHeight: 1.3,
              maxWidth: 750,
              mx: "auto",
            }}
          >
            Asociación de Usuarios de Medicina Ancestral
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: "1rem", md: "1.1rem" },
              opacity: 0.9,
            }}
          >
            Comunidad, acompañamiento y saberes compartidos.
          </Typography>
        </motion.div>
      </Container>

      {/* Invitación a scrollear */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "#fff",
          zIndex: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            opacity: 0.85,
            mb: 1,
            fontWeight: 500,
            letterSpacing: 0.5,
          }}
        >
          Descubre más
        </Typography>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
          }}
        >
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.9,
              lineHeight: 1,
            }}
          >
            v
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}