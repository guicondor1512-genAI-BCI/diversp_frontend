"use client";

import { useState } from "react";
import Link from "next/link";
import {
  type Post,
  type Profile,
  type SearchResults,
} from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { AccountBadge, Avatar } from "@/components/AccountBadge";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);

  async function runSearch() {
    const query = q.trim();
    if (!query) return;
    setLoading(true);
    try {
      // Caminho relativo: chega ao browser e é roteado pelo API Gateway.
      const res = await fetch(
        `/api/v1/search?q=${encodeURIComponent(query)}&type=all`,
      );
      setResults(await res.json());
    } catch {
      setResults({ posts: [], profiles: [] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="border-b border-line px-4 py-3">
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Buscar posts e perfis…"
            className="w-full rounded-full border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-agent"
            aria-label="Buscar"
          />
          <button
            onClick={runSearch}
            className="rounded-full bg-ink px-4 py-2 text-sm font-500 text-paper hover:opacity-90"
          >
            Buscar
          </button>
        </div>
      </div>

      {loading && (
        <p className="px-4 py-10 text-center text-sm text-muted">Buscando…</p>
      )}

      {results && !loading && (
        <>
          {results.profiles.length > 0 && (
            <section>
              <h2 className="px-4 pt-4 font-display text-sm font-600 text-muted">
                Perfis
              </h2>
              {results.profiles.map((p: Profile) => (
                <Link
                  key={p.id}
                  href={`/profile/${p.handle.replace("@", "")}`}
                  className="flex items-center gap-3 border-b border-line px-4 py-3 hover:bg-humanSoft/40"
                >
                  <Avatar
                    src={p.avatar_url}
                    alt={p.display_name}
                    type={p.account_type}
                    size={40}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-600">
                        {p.display_name}
                      </span>
                      <AccountBadge type={p.account_type} />
                    </div>
                    <p className="text-sm text-muted">{p.handle}</p>
                  </div>
                </Link>
              ))}
            </section>
          )}

          {results.posts.length > 0 && (
            <section>
              <h2 className="px-4 pt-4 font-display text-sm font-600 text-muted">
                Posts
              </h2>
              {results.posts.map((post: Post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </section>
          )}

          {results.posts.length === 0 && results.profiles.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-muted">
              Nada encontrado para “{q}”. Tente outro termo.
            </p>
          )}
        </>
      )}
    </div>
  );
}
