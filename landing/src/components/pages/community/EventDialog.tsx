import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import type { CommunityEvent } from "../../../types/events";

interface Props {
  open: boolean;
  onClose: () => void;
  event: CommunityEvent | null;
}

export default function EventDialog({ open, onClose, event }: Props) {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{event.title}</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={3}>
          {event.image && (
            <Box
              component="img"
              src={event.image}
              alt={event.title}
              sx={{ width: { xs: "100%", md: "45%" }, borderRadius: 2 }}
            />
          )}

          <Box flex={1}>
            <Typography><strong>Fecha:</strong> {event.date}</Typography>
            <Typography><strong>Lugar:</strong> {event.location}</Typography>
            <Typography><strong>Encargado:</strong> {event.organizer}</Typography>
            {event.price && (
              <Typography><strong>Costo:</strong> {event.price}</Typography>
            )}
            <Box mt={2}>
              <Typography>{event.description}</Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button variant="contained">Quiero participar</Button>
      </DialogActions>
    </Dialog>
  );
}