import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1B5E20" },
    secondary: { main: "#2E7D32" },
    background: { default: "#fafafa" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
  },
});

export default theme;
