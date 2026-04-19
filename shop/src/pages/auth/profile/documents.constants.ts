export const REQUIRED_DOCUMENTS = [
  {
    id: "cedula",
    name: "Cédula de Identidad",
    documents: [
      {
        id: "cedula_frente",
        name: "Cédula (Frente)",
        required: true,
        type: "image",
      },
      {
        id: "cedula_reverso",
        name: "Cédula (Reverso)",
        required: true,
        type: "image",
      },
    ],
  },
  {
    id: "receta",
    name: "Receta Médica",
    documents: [
      {
        id: "receta_medica",
        name: "Receta médica vigente",
        required: true,
        type: "image",
      },
    ],
  },
  {
    id: "antecedentes",
    name: "Certificado de Antecedentes",
    documents: [
      {
        id: "certificado_antecedentes",
        name: "Certificado vigente (6 meses)",
        required: true,
        type: "pdf",
      },
    ],
  },
  {
    id: "pension",
    name: "Pensión Alimenticia",
    documents: [
      {
        id: "certificado_deuda_alimentos_1",
        name: "Certificado Deuda con Alimentario",
        required: true,
        type: "pdf",
      },
      {
        id: "certificado_deuda_alimentos_2",
        name: "Certificado General de Deuda",
        required: true,
        type: "pdf",
      },
    ],
  },
  {
    id: "declaracion",
    name: "Declaración de Ingreso",
    documents: [
      {
        id: "declaracion_ingreso",
        name: "Declaración firmada",
        required: true,
        type: "pdf",
      },
    ],
  },
  {
    id: "reglamento",
    name: "Reglamento Interno",
    documents: [
      {
        id: "reglamento_interno",
        name: "Reglamento completo",
        required: true,
        type: "pdf",
      },
    ],
  },
]