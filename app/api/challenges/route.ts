import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Challenge from "../../../models/Challenge";

export async function GET() {
  await connectDB();

  const challenges = await Challenge.find({ isActive: true }).select(
    "title description points"
  );

  return NextResponse.json(challenges);
}
