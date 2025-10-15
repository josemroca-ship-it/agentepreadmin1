// Basic Auth para TODO el sitio (incluye / y /api/*)
export async function onRequest(context) {
  const { request } = context;

  // ❗ Credenciales fijas (lo que pediste)
  const USER = "josemaria";
  const PASS = "M3gafy2025,";

  // Respuesta 401 con prompt de login del navegador
  const unauthorized = () =>
    new Response("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Megafy - Privado", charset="UTF-8"' }
    });

  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Basic ")) return unauthorized();

  // Decodificar "Basic base64(user:pass)"
  try {
    const [user, pass] = atob(auth.slice(6)).split(":");
    if (user === USER && pass === PASS) {
      // OK → continuar con la petición (HTML, assets o /api)
      return context.next();
    }
  } catch (_) {
    // caemos a 401 abajo
  }
  return unauthorized();
}
