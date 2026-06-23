// Cria um post como o usuário logado (encaminha o token de sessão ao backend).
import { NextResponse } from "next/server";

import { backendWrite } from "@/lib/server-api";

export async function POST(req: Request): Promise<NextResponse> {
  let content: unknown;
  try {
    content = (await req.json())?.content;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "conteúdo vazio" }, { status: 400 });
  }
  const r = await backendWrite("/api/v1/posts", "POST", { content: content.trim() });
  return NextResponse.json(r.data, { status: r.status });
}
