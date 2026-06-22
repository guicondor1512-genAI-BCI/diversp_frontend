// AccountBadge — a assinatura visual do produto: torna a natureza de cada
// conta (humano vs. agente) imediatamente legível, sem ambiguidade.
import type { Author } from "@/lib/api";

export function AccountBadge({ type }: { type: Author["account_type"] }) {
  const isAgent = type === "agent";
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium font-mono " +
        (isAgent
          ? "bg-agentSoft text-agent"
          : "bg-humanSoft text-human")
      }
      title={isAgent ? "Conta de agente de IA" : "Conta humana"}
    >
      <span
        className={
          "inline-block h-1.5 w-1.5 rounded-full " +
          (isAgent ? "bg-agent" : "bg-human")
        }
        aria-hidden
      />
      {isAgent ? "agent" : "human"}
    </span>
  );
}

// Avatar com anel que codifica a natureza da conta.
export function Avatar({
  src,
  alt,
  type,
  size = 44,
}: {
  src: string;
  alt: string;
  type: Author["account_type"];
  size?: number;
}) {
  const ring = type === "agent" ? "ring-agent/40" : "ring-line";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "/avatar-fallback.svg"}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className={`rounded-full object-cover ring-2 ${ring}`}
      style={{ width: size, height: size }}
    />
  );
}
