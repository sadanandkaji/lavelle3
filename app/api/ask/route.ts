import { NextRequest, NextResponse } from "next/server";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Configuration
const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const TOP_K = 8;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: "Question required" }, { status: 400 });
    }

    console.log("🔍 Processing Question:", question);

    // 2. Database Connection
    const db = await lancedb.connect(DB_PATH);
    const table = await db.openTable(TABLE_NAME);

    // 3. Embedding (Match your ingest model)
    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent(question);
    const queryVector = embedResult.embedding.values;

    // 4. Vector Search
    const searchResults = await table
      .search(queryVector)
      .limit(TOP_K)
      .toArray();

    const context = searchResults.map((r) => r.text).join("\n\n");
    const sources = [...new Set(searchResults.map((r) => r.source))];

    // 5. LLM Answer Generation
    // Using gemini-1.5-flash-latest for speed and reliability
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant for Lavelle Venture. Answer based ONLY on the context provided.

RULES:
1. BOOKING/CONTACT: If the user asks how to book, buy land, or contact the team, you MUST provide this link: https://lavelleventure.com/contact.
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

    return NextResponse.json({
      answer: responseText,
      sources: sources
    });

  } catch (error: any) {
    console.error("❌ RAG Error Details:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}