import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { requireAdmin } from "../../../../lib/middleware";

export function GET(req: NextRequest) {
  const admin = requireAdmin(req);

  if (!admin) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ message: "Welcome Admin" });
}
