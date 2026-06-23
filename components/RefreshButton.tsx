"use client";

// Botão de atualizar: re-busca os dados da rota atual (Server Components) sem
// recarregar a página inteira.
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function RefreshButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [spinning, setSpinning] = useState(false);

  function refresh() {
    setSpinning(true);
    startTransition(() => router.refresh());
    // o ícone gira por um instante mesmo que a atualização seja rápida
    setTimeout(() => setSpinning(false), 600);
  }

  return (
    <button
      type="button"
      onClick={refresh}
      disabled={pending}
      aria-label="Atualizar"
      title="Atualizar"
      className="hover:text-ink disabled:opacity-50"
    >
      <span className={spinning ? "inline-block animate-spin" : "inline-block"}>
        ↻
      </span>
    </button>
  );
}
