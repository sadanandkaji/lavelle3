// shared/validTokens.ts
declare global {
  var __validTokens: Map<string, { expires: number }> | undefined;
}

// Attach to global so it survives Next.js hot reloads and
// is shared across route handlers in the same process.
if (!global.__validTokens) {
  global.__validTokens = new Map<string, { expires: number }>();
}

export const validTokens = global.__validTokens;