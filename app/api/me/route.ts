import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireAuth } from "../../../lib/middleware";

export function GET(req: NextRequest) {
  const user = requireAuth(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    role: user.role,
  });
}
