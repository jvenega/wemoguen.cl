import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { motion } from "framer-motion";
import { agreements } from "../../../data/agreements";

const MotionBox = motion(Box);
const MotionImg = motion("img");

export default function AgreementsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);

  const speed = 0.5;
  const cardWidth = 340;

  const loopItems = [...agreements, ...agreements];

  /* =============================
     AUTO SCROLL
  ============================= */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += speed;

        const totalWidth = container.scrollWidth / 2;

        if (container.scrollLeft >= totalWidth) {
          container.scrollLeft = 0;
        }

        const index = Math.floor(container.scrollLeft / cardWidth);
        setActiveIndex(index % agreements.length);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    setIsPaused(true);

    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setActiveIndex(index);

    setTimeout(() => {
      setIsPaused(false);
    }, 1200);
  };

  return (
    <Box
      id="convenios"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#f7f7f9",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={900} mb={6}>
          Convenios para la comunidad
        </Typography>

        <Box
          sx={{
            position: "relative",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <Box
            ref={containerRef}
            onMouseEnter={() => !isMobile && setIsPaused(true)}
            onMouseLeave={() => !isMobile && setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            sx={{
              display: "flex",
              gap: 3,
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {loopItems.map((a, index) => {
              const realIndex = index % agreements.length;
              const isActive = realIndex === activeIndex;
              const isOpen = openId === a.id;

              return (
                <MotionBox
                  key={`${a.id}-${index}`}
                  initial="rest"
                  animate={
                    !isMobile
                      ? "rest"
                      : isOpen
                      ? "hover"
                      : "rest"
                  }
                  whileHover={!isMobile ? "hover" : undefined}
                  onClick={() =>
                    isMobile &&
                    setOpenId((prev) =>
                      prev === a.id ? null : a.id
                    )
                  }
                  transition={{ duration: 0.4 }}
                  sx={{
                    minWidth: 320,
                    maxWidth: 320,
                    height: 260,
                    flexShrink: 0,
                    borderRadius: 3,
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "#ffffff",
                    border: "1px solid #eee",
                    boxShadow: isActive
                      ? "0 30px 80px rgba(0,0,0,0.14)"
                      : "0 20px 60px rgba(0,0,0,0.06)",
                    cursor: isMobile ? "pointer" : "default",
                  }}
                >
                  <MotionImg
                    src={a.logo}
                    alt={a.name}
                    variants={{
                      rest: {
                        scale: 1,
                        filter: "blur(0px) brightness(1)",
                      },
                      hover: {
                        scale: 1.05,
                        filter: "blur(3px) brightness(0.6)",
                      },
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "48px",
                    }}
                  />

                  <MotionBox
                    variants={{
                      rest: { opacity: 0, y: 20 },
                      hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.35 }}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      p: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      color: "white",
                      textAlign: "center",
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.65), rgba(0,0,0,0.85))",
                    }}
                  >
                    <Typography fontWeight={900} mb={1}>
                      {a.name}
                    </Typography>

                    <Stack spacing={0.7} mb={2}>
                      {a.benefits.map((b) => (
                        <Typography key={b} variant="body2">
                          • {b}
                        </Typography>
                      ))}
                    </Stack>

                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      href={a.url}
                      target="_blank"
                      endIcon={<LaunchIcon />}
                      sx={{
                        textTransform: "none",
                        borderRadius: 999,
                        fontSize: 12,
                        alignSelf: "center",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ir al sitio
                    </Button>
                  </MotionBox>
                </MotionBox>
              );
            })}
          </Box>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          mt={4}
        >
          {agreements.map((_, i) => {
            const isActive = i === activeIndex;

            return (
              <MotionBox
                key={i}
                layout
                onClick={() => scrollToIndex(i)}
                sx={{
                  cursor: "pointer",
                  height: 4,
                  borderRadius: 10,
                  bgcolor: isActive
                    ? "success.main"
                    : "rgba(0,0,0,0.2)",
                }}
                animate={{
                  width: isActive ? 32 : 12,
                }}
                transition={{ duration: 0.4 }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
}