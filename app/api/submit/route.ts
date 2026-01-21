import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAuth } from "../../../lib/middleware";
import { connectDB } from "../../../lib/db";
import Challenge from "../../../models/Challenge";
import Submission from "../../../models/Submission";
import User from "../../../models/User";

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { challengeId, flag } = await req.json();

  await connectDB();

  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    return NextResponse.json({ message: "Challenge not found" }, { status: 404 });
  }

  const alreadySolved = await Submission.findOne({
    userId: user.id,
    challengeId,
    isCorrect: true,
  });

  if (alreadySolved) {
    return NextResponse.json({ message: "Already solved" }, { status: 400 });
  }

  const isCorrect = await bcrypt.compare(flag, challenge.flagHash);

  await Submission.create({
    userId: user.id,
    challengeId,
    isCorrect,
  });

  if (isCorrect) {
    await User.findByIdAndUpdate(user.id, {
      $inc: { score: challenge.points },
    });
  }

  return NextResponse.json({
    correct: isCorrect,
  });
}
