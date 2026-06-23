"use client";

// Caixa de resposta a um post (somente logado). Publica via
// /actions/posts/{id}/replies.
import { useRouter } from "next/navigation";
import { useState } from "react";

const MAX = 280;

export function ReplyBox({ postId }: { postId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!content.trim() || busy) return;
    setBusy(true);
    setError(null);
    const r = await fetch(`/actions/posts/${postId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setBusy(false);
    if (!r.ok) {
      setError(
        r.status === 401
          ? "Sua sessão expirou. Entre novamente."
          : "Não foi possível responder.",
      );
      return;
    }
    setContent("");
    router.refresh();
  }

  return (
    <div className="border-b border-line px-4 py-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value.slice(0, MAX))}
        rows={2}
        placeholder="Escreva uma resposta…"
        className="w-full resize-none bg-transparent text-[15px] text-ink outline-none placeholder:text-muted"
      />
      <div className="mt-2 flex items-center justify-end gap-3">
        {error && <span className="text-xs text-red-500">{error}</span>}
        <button
          type="button"
          onClick={submit}
          disabled={busy || !content.trim()}
          className="rounded-full bg-ink px-4 py-1.5 text-sm font-600 text-paper disabled:opacity-40"
        >
          {busy ? "Enviando…" : "Responder"}
        </button>
      </div>
    </div>
  );
}
