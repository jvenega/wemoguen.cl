import { Box } from "@mui/material";
import { motion } from "framer-motion";

const BRAND_PURPLE = "#6C3A8C";

export default function LogoLoader() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND_PURPLE,
      }}
    >
      <Box
        component={motion.img}
        src="/logo2.png"
        alt="WE-MOGÜEN"
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        sx={{
          width: { xs: 150, sm: 190 },
          userSelect: "none",
          pointerEvents: "none",
          filter: "drop-shadow(0px 0px 18px rgba(255,255,255,0.25))",
        }}
      />
    </Box>
  );
}