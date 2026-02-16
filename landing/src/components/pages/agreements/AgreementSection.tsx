import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { agreements } from "../../../data/agreements";

export default function AgreementsSection() {
  const [index, setIndex] = useState(0);
  const current = agreements[index];

  const prev = () =>
    setIndex((i) => (i === 0 ? agreements.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === agreements.length - 1 ? 0 : i + 1));

  return (
    <Box id="convenios" component="section" py={12} bgcolor="#fafafa">
      <Container maxWidth="lg">
        {/* Título */}
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          gutterBottom
        >
          Convenios para la comunidad
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          maxWidth={600}
          mx="auto"
        >
          Beneficios y alianzas estratégicas pensadas para el bienestar de
          nuestra comunidad.
        </Typography>

        {/* Beneficios */}
        <Box
          mt={8}
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={4}
        >
          {[
            {
              icon: <PercentIcon sx={{ fontSize: 46, color: "success.main" }} />,
              title: "Descuentos Exclusivos",
              text: "Acceso a descuentos especiales en establecimientos aliados.",
            },
            {
              icon: (
                <HandshakeIcon sx={{ fontSize: 46, color: "success.main" }} />
              ),
              title: "Alianzas Estratégicas",
              text: "Convenios con proveedores confiables y especializados.",
            },
            {
              icon: (
                <FavoriteIcon sx={{ fontSize: 46, color: "success.main" }} />
              ),
              title: "Beneficios Integrales",
              text: "Acompañamiento, educación y apoyo continuo.",
            },
          ].map((item) => (
            <Card
              key={item.title}
              sx={{
                flex: 1,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <CardContent>
                {item.icon}
                <Typography variant="h6" mt={2} fontWeight={700}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Carousel */}
        <Box mt={10} position="relative">
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 3,
              px: { xs: 2, md: 4 },
              py: 3,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
                gap={5}
              >
                {/* Logo container */}
                <Box
                  sx={{
                    minWidth: 220,
                    minHeight: 140,
                    bgcolor: "#fff",
                    borderRadius: 3,
                    boxShadow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={current.logo}
                    alt={current.name}
                    sx={{
                      maxHeight: 100,
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* Info */}
                <Box flex={1}>
                  <Typography variant="h5" fontWeight={700}>
                    {current.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {current.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography fontWeight={700} color="success.main">
                    Beneficios
                  </Typography>

                  <Box component="ul" pl={2} mt={1}>
                    {current.benefits.map((b) => (
                      <li key={b}>
                        <Typography>{b}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    color="success"
                    href={current.url}
                    target="_blank"
                    sx={{ mt: 2 }}
                  >
                    Visitar sitio
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Controles */}
          <IconButton
            onClick={prev}
            sx={{
              position: "absolute",
              top: "50%",
              left: -20,
              bgcolor: "white",
              boxShadow: 1,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={next}
            sx={{
              position: "absolute",
              top: "50%",
              right: -20,
              bgcolor: "white",
              boxShadow: 1,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}