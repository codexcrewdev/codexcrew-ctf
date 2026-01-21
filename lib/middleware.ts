import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
}

export function requireAdmin(req: NextRequest) {
  const payload = requireAuth(req);
  if (!payload || payload.role !== "admin") return null;
  return payload;
}
