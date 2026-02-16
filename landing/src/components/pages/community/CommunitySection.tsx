import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useState } from "react";
import { events } from "../../../data/events";
import type { CommunityEvent } from "../../../types/events";
import EventDialog from "./EventDialog";

export default function CommunitySection() {
  const [selected, setSelected] = useState<CommunityEvent | null>(null);

  return (
    <Box
      id="comunidad"
      component="section"
      py={10}
      sx={{ backgroundColor: "#f9f9f9" }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          gutterBottom
        >
          Comunidad Unida
        </Typography>

        <Box mt={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximos Eventos
              </Typography>

              {events.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <Typography>
                    No hay eventos programados actualmente.
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" flexWrap="wrap" gap={3}>
                  {events.map((ev) => (
                    <Card
                      key={ev.id}
                      sx={{ width: { xs: "100%", md: "48%" } }}
                    >
                      <CardContent>
                        <Typography variant="h6">{ev.title}</Typography>
                        <Typography variant="body2">
                          {ev.date} — {ev.location}
                        </Typography>

                        <Box mt={2}>
                          <Button
                            size="small"
                            onClick={() => setSelected(ev)}
                          >
                            Ver detalles
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>

      <EventDialog
        open={Boolean(selected)}
        event={selected}
        onClose={() => setSelected(null)}
      />
    </Box>
  );
}