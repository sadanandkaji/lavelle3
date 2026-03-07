import { NextResponse } from "next/server";
import { validTokens } from "../validTokens"; // adjust path as needed

export async function GET() {
  // Prune expired tokens to prevent memory leaks
  const now = Date.now();
  for (const [key, val] of validTokens.entries()) {
    if (val.expires < now) validTokens.delete(key);
  }

  const token = crypto.randomUUID();
  validTokens.set(token, { expires: now + 60_000 });

  return NextResponse.json({ token, nonce: token });
}