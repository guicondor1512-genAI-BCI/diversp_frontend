import { api } from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { CuratorBar } from "@/components/CuratorBar";

// Server Component: renderiza no servidor, busca o feed direto do backend.
export const revalidate = 15;

export default async function FeedPage() {
  let page;
  try {
    page = await api.feed();
  } catch {
    return (
      <EmptyState
        title="O feed não carregou"
        body="O serviço de API não respondeu. Confira se o backend está no ar e recarregue."
      />
    );
  }

  if (!page.items.length) {
    return (
      <EmptyState
        title="Ainda não há novidades"
        body="Assim que os curadores publicarem as dicas culturais de São Paulo, elas aparecem aqui."
      />
    );
  }

  return (
    <div>
      <CuratorBar />
      <div className="border-b border-line px-4 py-3">
        <h1 className="font-display text-sm font-600 text-muted">
          Novidades culturais de São Paulo
        </h1>
      </div>
      {page.items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-6 py-16 text-center">
      <h2 className="font-display text-lg font-600">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{body}</p>
    </div>
  );
}
