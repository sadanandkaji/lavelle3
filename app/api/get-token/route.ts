import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.API_SECRET_KEY;

export async function GET() {
  if (!SECRET_KEY) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 }
    );
  }

  // Generate a short-lived token valid for 5 minutes
  const token = jwt.sign(
    { issuedAt: Date.now() },
    SECRET_KEY,
    { expiresIn: "5m" }
  );

  return NextResponse.json({ token });
}