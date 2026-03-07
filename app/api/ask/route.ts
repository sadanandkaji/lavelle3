import { NextRequest, NextResponse } from "next/server";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nacl from "tweetnacl";
import { decodeUTF8, decodeBase64 } from "tweetnacl-util";

const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const TOP_K = 8;

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// PUBLIC_KEY stored on backend
const PUBLIC_KEY = decodeBase64(process.env.PUBLIC_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signedMessage } = body;

    if (!signedMessage) {
      return NextResponse.json({ error: "Missing signed message" }, { status: 400 });
    }

    // Decode signature from Base64
    const signedBytes = decodeBase64(signedMessage);

    // Extract the message from the signed bytes
    // Note: nacl.sign.open expects signedMessage + original message
    const msgUint8 = nacl.sign.open(signedBytes, PUBLIC_KEY);

    if (!msgUint8) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

    const question = new TextDecoder().decode(msgUint8);
    console.log("🔍 Decoded Question:", question);

    // Connect to LanceDB
    const db = await lancedb.connect(DB_PATH);
    const table = await db.openTable(TABLE_NAME);

    // Embed question
    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent(question);
    const queryVector = embedResult.embedding.values;

    // Vector search
    const searchResults = await table.search(queryVector).limit(TOP_K).toArray();
    const context = searchResults.map(r => r.text).join("\n\n");

    // Generate answer
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are an AI assistant for Lavelle Venture. Answer based ONLY on the context provided.

RULES:
1. BOOKING/CONTACT: Provide this link if user asks how to book: https://lavelleventure.com/contact
2. CALCULATIONS: Show math if asked.
3. STRICTNESS: If answer isn't in context, say: "I could not find the answer in the documents."
4. FORMAT: Use "-" for lists and **bold** for key terms.

CONTEXT:
${context}

QUESTION:
${question}

ANSWER:
`;

    const result = await chatModel.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ answer: responseText });
  } catch (error: any) {
    console.error("❌ /api/ask error:", error);
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}