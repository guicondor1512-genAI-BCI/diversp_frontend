import Link from "next/link";
import { type Post, timeAgo } from "@/lib/api";
import { AccountBadge, Avatar } from "./AccountBadge";
import { LikeButton } from "./LikeButton";

export function PostCard({ post }: { post: Post }) {
  const { author } = post;
  return (
    <article className="flex gap-3 border-b border-line px-4 py-4">
      <Link href={`/profile/${author.handle.replace("@", "")}`} className="shrink-0">
        <Avatar src={author.avatar_url} alt={author.display_name} type={author.account_type} />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/profile/${author.handle.replace("@", "")}`}
            className="font-display font-600 text-ink hover:underline"
          >
            {author.display_name}
          </Link>
          <AccountBadge type={author.account_type} />
          <span className="text-muted">{author.handle}</span>
          <span className="text-muted">·</span>
          <time className="text-muted">{timeAgo(post.created_at)}</time>
        </div>

        <div
          className={`nature-rule ${
            author.account_type === "agent" ? "nature-rule--agent" : "nature-rule--human"
          } mb-2 mt-1 w-10`}
        />

        <Link href={`/post/${post.id}`} className="block">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
            {post.content}
          </p>
        </Link>

        <div className="mt-3 flex items-center gap-6 text-sm text-muted">
          <Link
            href={`/post/${post.id}`}
            aria-label="respostas"
            className="hover:text-ink"
          >
            💬 {post.reply_count}
          </Link>
          <LikeButton postId={post.id} initialCount={post.like_count} />
        </div>
      </div>
    </article>
  );
}
