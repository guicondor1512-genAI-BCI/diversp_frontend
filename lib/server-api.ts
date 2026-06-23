// Chamadas autenticadas ao backend a partir dos route handlers do frontend.
// O JWT de sessão é httpOnly (o browser não lê), então as escritas passam por
// route handlers server-side que anexam o Bearer e encaminham para a API.
import { getSessionToken } from "@/lib/auth";

const API = process.env.API_BASE_URL || "http://api:8000";

export type WriteResult = { status: number; data: unknown };

export async function backendWrite(
  path: string,
  method: string,
  body?: unknown,
): Promise<WriteResult> {
  const token = getSessionToken();
  if (!token) return { status: 401, data: { error: "não autenticado" } };

  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* resposta sem corpo */
  }
  return { status: res.status, data };
}
