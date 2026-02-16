import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center">
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" gutterBottom>
        Página no encontrada.
      </Typography>
      <Link to="/">Volver al inicio</Link>
    </Box>
  );
}
