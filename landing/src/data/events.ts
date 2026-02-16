import type { CommunityEvent } from "../types/events";

export const events: CommunityEvent[] = [
  {
    id: "evt-001",
    title: "Taller de Introducción al Cannabis Terapéutico",
    date: "15 de marzo de 2026",
    location: "Puerto Montt",
    organizer: "Equipo WE-MOGÜEN",
    price: "Gratuito para socios",
    description:
      "Taller introductorio orientado a personas que desean conocer los fundamentos del uso terapéutico del cannabis, su marco legal en Chile y buenas prácticas de uso responsable.",
    image: "/events/evento1.png",
  },
  {
    id: "evt-002",
    title: "Charla: Dosificación y Acompañamiento Terapéutico",
    date: "30 de marzo de 2026",
    location: "Sede Comunitaria WE-MOGÜEN",
    organizer: "Área de Salud Integrativa",
    price: "$5.000 (socios) / $10.000 (general)",
    description:
      "Espacio educativo enfocado en la correcta dosificación del cannabis terapéutico, acompañado de orientación clínica y experiencias reales de acompañamiento.",
    image: "/events/evento1.png",
  },
  {
    id: "evt-003",
    title: "Encuentro Comunitario y Redes de Apoyo",
    date: "12 de abril de 2026",
    location: "Puerto Varas",
    organizer: "Comunidad WE-MOGÜEN",
    description:
      "Jornada de encuentro entre socios para fortalecer redes de apoyo, compartir experiencias y generar comunidad en un ambiente seguro y respetuoso.",
    image: "/events/evento1.png",
  },
];
