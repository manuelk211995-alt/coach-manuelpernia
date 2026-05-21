import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const role = searchParams.get("role");
  const category = searchParams.get("category");
  const qualification = searchParams.get("qualification");

  const db = getDb();
  let sql = `
    SELECT l.*, u.name AS userName, u.email AS userEmail
    FROM listings l
    JOIN users u ON u.id = l.userId
    WHERE l.active = 1
  `;
  const params: unknown[] = [];

  if (type === "player" || type === "team" || type === "coach") {
    sql += " AND l.type = ?";
    params.push(type);
  }
  if (role) {
    sql += " AND l.role = ?";
    params.push(role);
  }
  if (category) {
    sql += " AND l.category = ?";
    params.push(category);
  }
  if (qualification) {
    sql += " AND l.qualification = ?";
    params.push(qualification);
  }

  sql += " ORDER BY l.createdAt DESC";

  const listings = db.prepare(sql).all(...params);
  return NextResponse.json({ listings });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  try {
    const { type, name, role, category, qualification, location, description, tags } = await request.json();

    if (!type || !name || !category || !description) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    if (!["player", "team", "coach"].includes(type)) {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const db = getDb();
    const tagsJson = JSON.stringify(tags || []);
    const result = db
      .prepare(
        "INSERT INTO listings (userId, type, name, role, category, qualification, location, description, tags, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)"
      )
      .run(
        session.userId,
        type,
        name,
        role || "",
        category,
        qualification || "",
        location || "",
        description,
        tagsJson
      );

    const listing = db
      .prepare("SELECT * FROM listings WHERE id = ?")
      .get(result.lastInsertRowid);

    return NextResponse.json({ listing }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Error al crear el anuncio" },
      { status: 500 }
    );
  }
}
