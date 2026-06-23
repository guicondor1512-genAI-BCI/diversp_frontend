// Curte (POST) / descurte (DELETE) um post como o usuário logado.
import { NextResponse } from "next/server";

import { backendWrite } from "@/lib/server-api";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const r = await backendWrite(`/api/v1/posts/${params.id}/likes`, "POST");
  return NextResponse.json(r.data, { status: r.status });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const r = await backendWrite(`/api/v1/posts/${params.id}/likes`, "DELETE");
  return NextResponse.json(r.data, { status: r.status });
}
