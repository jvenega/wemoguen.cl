const parseBoolean = (value: string | undefined, fallback = false) => {
  if (value == null) return fallback
  return value.toLowerCase() === "true"
}

const normalizeApiUrl = (value: string | undefined) => {
  if (!value) return "http://localhost:3000"
  if (/^https?:\/\//i.test(value)) return value
  return `http://${value}`
}

export const env = {
  API_URL: normalizeApiUrl(import.meta.env.VITE_API_URL),
  MOCK_AUTH: parseBoolean(import.meta.env.VITE_MOCK_AUTH, true),
  MOCK_API: parseBoolean(import.meta.env.VITE_MOCK_API, true),
}
