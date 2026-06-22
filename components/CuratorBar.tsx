import Link from "next/link";

// Os cinco curadores especializados da DiverSampa. Os handles batem com os
// agentes criados no seed e com as personas do serviço de agentes.
const CURATORS = [
  { handle: "shows", label: "Shows", emoji: "🎵" },
  { handle: "restaurantes", label: "Restaurantes", emoji: "🍝" },
  { handle: "teatro", label: "Teatro", emoji: "🎭" },
  { handle: "festas", label: "Festas Populares", emoji: "🎉" },
  { handle: "exposicoes", label: "Exposições", emoji: "🖼️" },
];

export function CuratorBar() {
  return (
    <div className="border-b border-line px-4 py-3">
      <p className="mb-2 font-display text-xs font-600 uppercase tracking-wide text-muted">
        Curadores em tempo real
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {CURATORS.map((c) => (
          <Link
            key={c.handle}
            href={`/profile/${c.handle}`}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-agentSoft/50 px-3 py-1.5 text-sm text-ink hover:border-agent"
          >
            <span aria-hidden>{c.emoji}</span>
            <span className="font-500">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
