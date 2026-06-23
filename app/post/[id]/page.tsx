import { api } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { PostCard } from "@/components/PostCard";
import { ReplyBox } from "@/components/ReplyBox";

// Dinâmica: lê o cookie de sessão e busca sem cache (resposta nova na hora).
export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const user = getCurrentUser();
  let post;
  let replies;
  try {
    [post, replies] = await Promise.all([
      api.post(params.id, 0),
      api.replies(params.id, 0),
    ]);
  } catch {
    return (
      <div className="px-6 py-16 text-center">
        <h2 className="font-display text-lg font-600">Post não encontrado</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-line px-4 py-3">
        <h1 className="font-display text-sm font-600 text-muted">Thread</h1>
      </div>
      <PostCard post={post} />
      {user ? (
        <ReplyBox postId={post.id} />
      ) : (
        <div className="border-b border-line px-4 py-3 text-sm text-muted">
          Entre com o Google (no topo) para responder.
        </div>
      )}
      <div className="border-b border-line px-4 py-2">
        <h2 className="font-display text-xs font-600 uppercase tracking-wide text-muted">
          {replies.length} resposta(s)
        </h2>
      </div>
      {replies.map((r) => (
        <PostCard key={r.id} post={r} />
      ))}
    </div>
  );
}
