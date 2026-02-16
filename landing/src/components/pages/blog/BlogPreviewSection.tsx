import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { blogPosts } from "../../../data/blog";

export default function BlogPreviewSection() {
  return (
    <Box id="blog-preview" component="section" py={12}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Artículos recientes del Blog
          </Typography>
          <Typography color="text.secondary">
            Contenido educativo y actualizado para nuestra comunidad.
          </Typography>
        </Box>

        {/* Cards */}
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent="center"
        >
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              sx={{
                width: {
                  xs: "100%",
                  sm: "48%",
                  md: "31%",
                  lg: "15%",
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={post.image}
                alt={post.title}
                height="140"
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                >
                  <CalendarMonthIcon fontSize="inherit" />
                  {post.date}
                </Typography>

                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  mt={1}
                  gutterBottom
                >
                  {post.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </CardContent>

              <Box p={2}>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  fullWidth
                  href="/blog"
                >
                  Leer más
                </Button>
              </Box>
            </Card>
          ))}
        </Box>

        {/* CTA */}
        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            color="success"
            size="large"
            href="/blog"
          >
            Ver todos los artículos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}