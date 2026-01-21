import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAdmin } from "../../../../lib/middleware";
import { connectDB } from "../../../../lib/db";
import Challenge from "../../../../models/Challenge";

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { title, description, flag, points } = await req.json();

  if (!title || !description || !flag || !points) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  await connectDB();

  const flagHash = await bcrypt.hash(flag, 10);

  await Challenge.create({
    title,
    description,
    flagHash,
    points,
  });

  return NextResponse.json({ message: "Challenge created" });
}
