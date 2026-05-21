import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

async function getOwnListing(id: string, session: { userId: number }) {
  const db = getDb();
  const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(id) as
    | { userId: number; type: string }
    | undefined;
  if (!listing) return { error: "Anuncio no encontrado", status: 404 };
  if (listing.userId !== session.userId)
    return { error: "No autorizado", status: 403 };
  return { listing };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = getDb();
  const listing = db
    .prepare(
      `SELECT l.*, u.name AS userName, u.email AS userEmail
       FROM listings l JOIN users u ON u.id = l.userId
       WHERE l.id = ?`
    )
    .get(id);
  if (!listing) {
    return NextResponse.json({ error: "Anuncio no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ listing });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const result = await getOwnListing(id, session);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  try {
    const { type, name, role, category, qualification, location, description, tags } =
      await request.json();

    if (!name || !category || !description) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    if (!["player", "team", "coach"].includes(type)) {
      return NextResponse.json({ error: "Tipo invalido" }, { status: 400 });
    }

    const db = getDb();
    const tagsJson = JSON.stringify(tags || []);
    db.prepare(
      "UPDATE listings SET type=?, name=?, role=?, category=?, qualification=?, location=?, description=?, tags=? WHERE id=?"
    ).run(type, name, role || "", category, qualification || "", location || "", description, tagsJson, id);

    const listing = db
      .prepare(
        `SELECT l.*, u.name AS userName, u.email AS userEmail
         FROM listings l JOIN users u ON u.id = l.userId
         WHERE l.id = ?`
      )
      .get(id);

    return NextResponse.json({ listing });
  } catch {
    return NextResponse.json(
      { error: "Error al actualizar el anuncio" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const result = await getOwnListing(id, session);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const body = await request.json();
  const db = getDb();

  if (body.active !== undefined) {
    db.prepare("UPDATE listings SET active = ? WHERE id = ?").run(
      body.active ? 1 : 0,
      id
    );
  }

  const listing = db
    .prepare(
      `SELECT l.*, u.name AS userName, u.email AS userEmail
       FROM listings l JOIN users u ON u.id = l.userId
       WHERE l.id = ?`
    )
    .get(id);

  return NextResponse.json({ listing });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const result = await getOwnListing(id, session);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  getDb().prepare("DELETE FROM listings WHERE id = ?").run(id);
  return NextResponse.json({ ok: true });
}
