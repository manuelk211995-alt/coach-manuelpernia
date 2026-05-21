import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const db = getDb();
  const listings = db
    .prepare("SELECT * FROM listings WHERE userId = ? ORDER BY createdAt DESC")
    .all(session.userId);

  return NextResponse.json({ listings });
}
