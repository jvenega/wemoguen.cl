import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
} from "@mui/material";

const navItems = [
  { label: "Quiénes Somos", href: "#quienes-somos" },
  { label: "Comunidad Unida", href: "#comunidad" },
  { label: "Convenios", href: "#convenios" },
  { label: "Contáctanos", href: "#contacto" },
];

export default function Navbar() {
  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component="a" href="/" sx={{ display: "flex" }}>
            <Box
              component="img"
              src="/logo.png"
              alt="WE-MOGÜEN"
              height={48}
            />
          </Box>

          {/* Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                color="inherit"
                sx={{ fontWeight: 600 }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              href="/blog"
              variant="outlined"
              color="inherit"
            >
              Blog
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
