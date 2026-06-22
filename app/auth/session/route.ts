// Route Handler de sessão (roda no servidor do frontend).
//
// Fica em /auth/session (NÃO sob /api/, que o gateway roteia para o backend).
//   POST   -> troca o id_token do Google pelo JWT da API e grava os cookies
//   DELETE -> logout (limpa os cookies)
import { NextResponse } from "next/server";

import { SESSION_COOKIE, USER_COOKIE } from "@/lib/auth";

// Server-side fala direto com a API pela rede interna (não passa pelo gateway).
const API = process.env.API_BASE_URL || "http://api:8000";
// TTL alinhado ao JWT de sessão emitido pela API (24h — ver create_session_jwt).
const MAX_AGE = 60 * 60 * 24;
// Em HTTPS, defina COOKIE_SECURE=true. Em dev (http://localhost) fica false,
// senão o browser descarta o cookie e o login não "cola".
const SECURE = process.env.COOKIE_SECURE === "true";

export async function POST(req: Request): Promise<NextResponse> {
  let idToken: unknown;
  try {
    idToken = (await req.json())?.id_token;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ error: "id_token ausente" }, { status: 400 });
  }

  const upstream = await fetch(`${API}/api/v1/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
    cache: "no-store",
  });
  if (!upstream.ok) {
    const status = upstream.status === 401 ? 401 : 502;
    return NextResponse.json({ error: "Falha na autenticação" }, { status });
  }

  // { access_token, token_type, handle, display_name }
  const data = await upstream.json();
  const res = NextResponse.json({
    handle: data.handle,
    display_name: data.display_name,
  });
  const base = { path: "/", maxAge: MAX_AGE, sameSite: "lax" as const, secure: SECURE };
  res.cookies.set(SESSION_COOKIE, data.access_token, { ...base, httpOnly: true });
  res.cookies.set(
    USER_COOKIE,
    JSON.stringify({ handle: data.handle, display_name: data.display_name }),
    { ...base, httpOnly: false },
  );
  return res;
}

export async function DELETE(): Promise<NextResponse> {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  res.cookies.set(USER_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
