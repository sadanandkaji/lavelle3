// app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validTokens } from "./validTokens";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nacl from "tweetnacl";
import { decodeBase64 } from "tweetnacl-util";

const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const TOP_K = 8;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signedMessage, publicKey, token } = body;

    // 1. Basic Validation
    if (!signedMessage || !publicKey || !token) {
      return NextResponse.json(
        { error: "Missing signedMessage, publicKey or token" },
        { status: 400 }
      );
    }

    // 2. Token Validation
    const tokenData = validTokens.get(token);

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    if (tokenData.expires < Date.now()) {
      validTokens.delete(token);
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    // Delete immediately to prevent replay attacks
    validTokens.delete(token);

    // 3. Signature Verification
    const signedBytes = decodeBase64(signedMessage);
    const pubKeyBytes = decodeBase64(publicKey);
    const msgUint8 = nacl.sign.open(signedBytes, pubKeyBytes);

    if (!msgUint8) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 4. Extract Question and Token from Signed Message
    const fullDecodedMsg = new TextDecoder().decode(msgUint8);
    const separatorIndex = fullDecodedMsg.lastIndexOf("::");

    if (separatorIndex === -1) {
      return NextResponse.json({ error: "Malformed signed message" }, { status: 400 });
    }

    const question = fullDecodedMsg.slice(0, separatorIndex).trim();
    const signedToken = fullDecodedMsg.slice(separatorIndex + 2).trim();

    if (signedToken !== token) {
      return NextResponse.json({ error: "Token mismatch in signature" }, { status: 401 });
    }

    console.log("🔍 Question Verified:", question);

    // ----- Handle Greetings only for standalone greetings -----
    const greetings = ["hi", "hello", "hey", "greetings"];
    const normalizedQuestion = question.toLowerCase().replace(/[^\w\s]/g, "").trim();

    // Only respond if the entire message is exactly a greeting
    if (greetings.includes(normalizedQuestion)) {
      return NextResponse.json({ answer: "Hello! How can I help you today?" });
    }

    // 5. Connect to LanceDB
    const db = await lancedb.connect(DB_PATH);
    const table = await db.openTable(TABLE_NAME);

    // 6. Embed Question
    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent(question);
    const queryVector = embedResult.embedding.values;

    // 7. Vector Search
    const searchResults = await table.search(queryVector).limit(TOP_K).toArray();
    const context = searchResults.map((r) => r.text).join("\n\n");
    const sources = [...new Set(searchResults.map((r) => r.source))] as string[];

    // 8. Generate Answer
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant for Lavelle Venture. Answer based ONLY on the context provided.

RULES:
1. BOOKING/CONTACT: If the user asks how to book, buy land, or contact the team, you MUST provide this link: https://lavelleventure.com/contact
2. CALCULATIONS: If asked for financial breakdowns (e.g., yearly income to monthly), show the math.
3. STRICTNESS: If the answer isn't in the context, say: "I could not find the answer in the documents."
4. FORMAT: Use "-" bullet points for lists. Use **bold** for key terms.

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;

    const result = await chatModel.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ /api/ask error:", message);
    return NextResponse.json(
      { error: "Server error", details: message },
      { status: 500 }
    );
  }
}