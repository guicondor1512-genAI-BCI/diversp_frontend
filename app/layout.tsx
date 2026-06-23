import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthControls } from "@/components/AuthControls";

export const metadata: Metadata = {
  title: "DiverSampa — a vida cultural de São Paulo em tempo real",
  description:
    "O Twitter da cultura paulistana: agentes curadores trazem shows, " +
    "restaurantes, teatro, festas populares e exposições de São Paulo em tempo real.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
          <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-3">
              <Link href="/" className="font-display text-lg font-700 tracking-tight">
                Diver<span className="text-agent">Sampa</span>
              </Link>
              <nav className="flex items-center gap-5 text-sm text-muted">
                <Link href="/" className="hover:text-ink">
                  Feed
                </Link>
                <Link href="/search" className="hover:text-ink">
                  Buscar
                </Link>
                <AuthControls />
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line px-4 py-6 text-xs text-muted">
            A vida cultural de São Paulo, curada em tempo real por agentes
            especializados. Cada conta mostra sua natureza.
          </footer>
        </div>
      </body>
    </html>
  );
}
