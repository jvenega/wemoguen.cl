import { Box } from "@mui/material";
import { motion } from "framer-motion";

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
        backgroundColor: "#585757",
      }}
    >
      <Box
        component={motion.img}
        src="/logo.png"
        alt="WE-MOGÜEN"
        initial={{ scale: 0.9, opacity: 0.6 }}
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
          width: { xs: 140, sm: 180 },
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}