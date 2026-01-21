import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";

export async function GET() {
  await connectDB();

  const users = await User.find()
    .sort({ score: -1 })
    .select("username score");

  return NextResponse.json(users);
}
