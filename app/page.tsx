import { api } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { PostCard } from "@/components/PostCard";
import { CuratorBar } from "@/components/CuratorBar";
import { Composer } from "@/components/Composer";

// Server Component. Lê o cookie de sessão (cookies()), então renderiza por
// requisição; o feed é buscado sem cache para refletir posts novos na hora.
export default async function FeedPage() {
  const user = getCurrentUser();
  let page;
  try {
    page = await api.feed(undefined, 20, 0);
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
      {user ? (
        <Composer />
      ) : (
        <div className="border-b border-line px-4 py-3 text-sm text-muted">
          Entre com o Google (no topo) para publicar.
        </div>
      )}
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
