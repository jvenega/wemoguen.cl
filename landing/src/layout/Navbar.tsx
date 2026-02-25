import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const BRAND_PURPLE = "#6C3A8C";
const BRAND_PURPLE_DARK = "#5A2F73";

const navItems = [
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Comunidad Unida", href: "#comunidad" },
  { label: "Convenios", href: "#convenios" },
  { label: "Únete a nuestra comunidad", href: "#contacto" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: BRAND_PURPLE,
          backdropFilter: "blur(6px)",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
              py: { xs: 1.5, md: 2 },
            }}
          >
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                textDecoration: "none",
              }}
            >
              <Box
                component="img"
                src="/logo2.png"
                alt="WE-MOGÜEN"
                sx={{
                  height: { xs: 42, md: 50 },
                  filter:
                    "drop-shadow(0px 0px 8px rgba(255,255,255,0.25))",
                }}
              />
            </Box>

            {/* Desktop Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component="a"
                  href={item.href}
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    textTransform: "none",
                    px: 2.5,
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: BRAND_PURPLE_DARK,
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: BRAND_PURPLE,
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 3,
                  px: 3,
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "#f3f3f3",
                  },
                }}
              >
                Iniciar sesión
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              onClick={toggleDrawer}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "#fff",
                borderRadius: 3,
                p: 1,
                "&:hover": {
                  backgroundColor: BRAND_PURPLE_DARK,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 270,
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box
          sx={{
            p: 3,
            pt: 5,
          }}
        >
          <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component="a"
                  href={item.href}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Box mt={2}>
              <Button
                fullWidth
                component={RouterLink}
                to="/login"
                sx={{
                  backgroundColor: BRAND_PURPLE,
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 3,
                  py: 1.2,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: BRAND_PURPLE_DARK,
                  },
                }}
              >
                Iniciar sesión
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
}