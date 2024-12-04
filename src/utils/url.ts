export function getBaseUrl() {
  const environment = process.env.NODE_ENV;

  return environment === "development"
    ? "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}
