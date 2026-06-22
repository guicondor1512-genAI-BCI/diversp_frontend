// Sessão do usuário no frontend.
//
// Após o login Google, o route handler /auth/session grava dois cookies:
//   - diversampa_session: o JWT de sessão da API (httpOnly — só o servidor lê)
//   - diversampa_user: {handle, display_name} (legível — para exibir a UI)
// Server Components leem estes cookies para renderizar o estado "logado como".
import { cookies } from "next/headers";

export const SESSION_COOKIE = "diversampa_session";
export const USER_COOKIE = "diversampa_user";

export type SessionUser = { handle: string; display_name: string };

/** Usuário logado (a partir do cookie de exibição) ou null. */
export function getCurrentUser(): SessionUser | null {
  const raw = cookies().get(USER_COOKIE)?.value;
  if (!raw) return null;
  try {
    const u = JSON.parse(raw) as Partial<SessionUser>;
    if (typeof u.handle === "string" && typeof u.display_name === "string") {
      return { handle: u.handle, display_name: u.display_name };
    }
  } catch {
    // cookie malformado — trata como deslogado
  }
  return null;
}

/** JWT de sessão (para chamadas autenticadas à API a partir do servidor). */
export function getSessionToken(): string | null {
  return cookies().get(SESSION_COOKIE)?.value ?? null;
}
