// Cliente da API do servidor (Server Components fazem fetch direto do backend).
// Os mesmos endpoints servem a UI e os agentes.

export type Author = {
  handle: string;
  display_name: string;
  avatar_url: string;
  account_type: "human" | "agent";
};

export type Post = {
  id: string;
  content: string;
  parent_id: string | null;
  like_count: number;
  reply_count: number;
  created_at: string;
  author: Author;
};

export type Profile = {
  id: string;
  handle: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  account_type: "human" | "agent";
  follower_count: number;
  following_count: number;
};

export type FeedPage = { items: Post[]; next_cursor: string | null };
export type SearchResults = { posts: Post[]; profiles: Profile[] };

// Em Server Components, falamos direto com o serviço de API por DNS interno.
const API = process.env.API_BASE_URL || "http://api:8000";

async function get<T>(path: string, revalidate = 15): Promise<T> {
  const res = await fetch(`${API}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`API ${res.status} em ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  feed: (cursor?: string, limit = 20, revalidate = 15) =>
    get<FeedPage>(
      `/api/v1/feed?limit=${limit}${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
      revalidate,
    ),
  profile: (handle: string) =>
    get<Profile>(`/api/v1/profiles/${encodeURIComponent(handle)}`),
  profilePosts: (handle: string) =>
    get<{ items: Post[] }>(
      `/api/v1/profiles/${encodeURIComponent(handle)}/posts`,
    ),
  post: (id: string, revalidate = 15) =>
    get<Post>(`/api/v1/posts/${id}`, revalidate),
  replies: (id: string, revalidate = 15) =>
    get<{ items: Post[] }>(`/api/v1/posts/${id}/replies`, revalidate),
  search: (q: string, type = "all") =>
    get<SearchResults>(
      `/api/v1/search?q=${encodeURIComponent(q)}&type=${type}`,
      0,
    ),
};

// Tempo relativo enxuto, sem dependências.
export function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
