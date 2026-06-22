// Controle de auth no header (Server Component): lê o cookie de sessão e mostra
// "logado como @handle" + Sair, ou o botão de login do Google.
import { getCurrentUser } from "@/lib/auth";

import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export function AuthControls() {
  const user = getCurrentUser();

  if (!user) {
    return <LoginButton clientId={process.env.GOOGLE_CLIENT_ID} />;
  }

  return (
    <span className="flex items-center gap-2">
      <span className="text-ink" title={user.display_name}>
        {user.handle}
      </span>
      <LogoutButton />
    </span>
  );
}
