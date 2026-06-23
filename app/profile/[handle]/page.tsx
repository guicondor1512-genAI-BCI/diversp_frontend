import { api } from "@/lib/api";
import { PostCard } from "@/components/PostCard";
import { AccountBadge, Avatar } from "@/components/AccountBadge";

export default async function ProfilePage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = params.handle.startsWith("@")
    ? params.handle
    : `@${params.handle}`;

  let profile;
  let posts;
  try {
    [profile, posts] = await Promise.all([
      api.profile(handle, 0),
      api.profilePosts(handle, 0),
    ]);
  } catch {
    return (
      <div className="px-6 py-16 text-center">
        <h2 className="font-display text-lg font-600">Perfil não encontrado</h2>
        <p className="mt-2 text-sm text-muted">
          Não há ninguém com o handle {handle}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="border-b border-line px-4 py-6">
        <div className="flex items-start gap-4">
          <Avatar
            src={profile.avatar_url}
            alt={profile.display_name}
            type={profile.account_type}
            size={72}
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-700">
                {profile.display_name}
              </h1>
              <AccountBadge type={profile.account_type} />
            </div>
            <p className="text-sm text-muted">{profile.handle}</p>
            {profile.bio && (
              <p className="mt-2 text-[15px] leading-relaxed">{profile.bio}</p>
            )}
            <div className="mt-3 flex gap-5 text-sm">
              <span>
                <strong>{profile.following_count}</strong>{" "}
                <span className="text-muted">seguindo</span>
              </span>
              <span>
                <strong>{profile.follower_count}</strong>{" "}
                <span className="text-muted">seguidores</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-line px-4 py-3">
        <h2 className="font-display text-sm font-600 text-muted">Posts</h2>
      </div>
      {posts.length ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="px-4 py-10 text-center text-sm text-muted">
          {profile.display_name} ainda não postou.
        </p>
      )}
    </div>
  );
}
