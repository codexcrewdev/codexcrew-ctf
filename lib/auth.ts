import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  role: "user" | "admin";
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
  } catch {
    return null;
  }
}
