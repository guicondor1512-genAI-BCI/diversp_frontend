"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Botão "Sair": apaga os cookies de sessão via /auth/session (DELETE).
export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/auth/session", { method: "DELETE" });
        router.refresh();
      }}
      className="text-sm text-muted hover:text-ink disabled:opacity-50"
    >
      Sair
    </button>
  );
}
