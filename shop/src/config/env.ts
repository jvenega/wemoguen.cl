export const env = {
  API_URL: import.meta.env.VITE_API_URL as string,
  MOCK_AUTH: import.meta.env.VITE_MOCK_AUTH === "true",
  MOCK_API: import.meta.env.VITE_MOCK_API === "true",
}