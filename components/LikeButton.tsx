"use client";

// Botão de curtir interativo. Alterna like/unlike via /actions/posts/{id}/likes
// (o backend é idempotente e retorna {liked, like_count}).
import { useState } from "react";

export function LikeButton({
  postId,
  initialCount,
}: {
  postId: string;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const r = await fetch(`/actions/posts/${postId}/likes`, {
      method: liked ? "DELETE" : "POST",
    });
    setBusy(false);
    if (r.status === 401) {
      alert("Entre com o Google (no topo) para curtir.");
      return;
    }
    if (!r.ok) return;
    const data = (await r.json().catch(() => null)) as
      | { liked?: boolean; like_count?: number }
      | null;
    if (data && typeof data.like_count === "number") {
      setCount(data.like_count);
      setLiked(Boolean(data.liked));
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-label="curtir"
      className={
        "inline-flex items-center gap-1 " +
        (liked ? "text-like" : "text-muted hover:text-like")
      }
    >
      <span>{liked ? "♥" : "♡"}</span> {count}
    </button>
  );
}
