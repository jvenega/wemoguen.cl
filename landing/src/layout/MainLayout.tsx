import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LogoLoader from "../components/Loader/LogoLoader";

const HAS_LOADED_KEY = "app_has_loaded";

export default function MainLayout() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem(HAS_LOADED_KEY);
  });

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(HAS_LOADED_KEY, "true");
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {/* Contenido siempre montado */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <Navbar />

        <Box component="main" flex={1}>
          <Outlet />
        </Box>

        <Footer />
      </Box>

      {/* Loader como overlay */}
      <AnimatePresence>
        {loading && <LogoLoader />}
      </AnimatePresence>
    </>
  );
}
