"use client";

// Botão "Entrar com Google" via Google Identity Services (GIS).
// Recebe o id_token do Google e o envia ao route handler /auth/session, que
// troca pelo JWT da API e grava os cookies de sessão.
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type CredentialResponse = { credential: string };

interface GoogleAccountsId {
  initialize(config: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
  }): void;
  renderButton(
    parent: HTMLElement,
    options: { theme?: string; size?: string; text?: string; shape?: string },
  ): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

export function LoginButton({ clientId }: { clientId?: string }) {
  const router = useRouter();
  const slot = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const onCredential = useCallback(
    async (response: CredentialResponse) => {
      setError(null);
      const r = await fetch("/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: response.credential }),
      });
      if (!r.ok) {
        setError("Não foi possível entrar.");
        return;
      }
      router.refresh();
    },
    [router],
  );

  const init = useCallback(() => {
    if (!clientId || !window.google || !slot.current) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: onCredential,
    });
    window.google.accounts.id.renderButton(slot.current, {
      theme: "outline",
      size: "medium",
      text: "signin_with",
      shape: "pill",
    });
  }, [clientId, onCredential]);

  // Caso o script do GIS já tenha carregado antes deste componente montar.
  useEffect(() => {
    if (window.google) init();
  }, [init]);

  if (!clientId) {
    return (
      <span className="text-xs text-muted" title="Defina GOOGLE_CLIENT_ID no ambiente">
        login indisponível
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={init}
      />
      <div ref={slot} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
