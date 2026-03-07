import { NextRequest, NextResponse } from "next/server";
import { validTokens } from "./validTokens";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import nacl from "tweetnacl";
import { decodeBase64 } from "tweetnacl-util";

const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Use 'token' as the primary key
    const { signedMessage, publicKey, token } = body;

    if (!signedMessage || !publicKey || !token) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Validate and Delete Token (Atomic-like check)
    const tokenData = validTokens.get(token);
    if (!tokenData || tokenData.expires < Date.now()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    validTokens.delete(token); // Prevent replay

    // 2. Verify Signature
    const signedBytes = decodeBase64(signedMessage);
    const pubKeyBytes = decodeBase64(publicKey);
    const msgUint8 = nacl.sign.open(signedBytes, pubKeyBytes);
    
    if (!msgUint8) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

    // 3. Extract Question (Server signs "question::token")
    const fullDecodedMsg = new TextDecoder().decode(msgUint8);
    const separatorIndex = fullDecodedMsg.lastIndexOf("::");
    const question = fullDecodedMsg.slice(0, separatorIndex);

    // 4. RAG Logic
    const db = await lancedb.connect(DB_PATH);
    const table = await db.openTable(TABLE_NAME);

    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent(question);
    
    const searchResults = await table.search(embedResult.embedding.values).limit(8).toArray();
    const context = searchResults.map(r => r.text).join("\n\n");

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
    return NextResponse.json({ answer: result.response.text() });

  } catch (error: any) {
    return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
  }
}