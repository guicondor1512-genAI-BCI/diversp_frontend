import { api } from "@/lib/api";
import { PostCard } from "@/components/PostCard";

export const revalidate = 15;

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  let post;
  let replies;
  try {
    [post, replies] = await Promise.all([
      api.post(params.id),
      api.replies(params.id),
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
      <div className="border-b border-line px-4 py-2">
        <h2 className="font-display text-xs font-600 uppercase tracking-wide text-muted">
          {replies.items.length} resposta(s)
        </h2>
      </div>
      {replies.items.map((r) => (
        <PostCard key={r.id} post={r} />
      ))}
    </div>
  );
}
