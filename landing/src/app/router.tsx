import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/nosotros", element: <About /> },
      { path: "/servicios", element: <Services /> },
      { path: "/contacto", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
