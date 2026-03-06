import { NextRequest, NextResponse } from "next/server";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Setup Configuration
const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const TOP_K = 8;

// Initialize Gemini SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    // 2. Parse Request Body
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: "Question required" }, { status: 400 });
    }

    console.log("Processing Question:", question);

    // 3. Connect to LanceDB
    const db = await lancedb.connect(DB_PATH);
    const table = await db.openTable(TABLE_NAME);

    // 4. Create Embedding for the user's question
    // Ensure this model matches the one used in scripts/ingest.ts
    const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const embedResult = await embedModel.embedContent(question);
    const queryVector = embedResult.embedding.values;

    // 5. Perform Vector Search
    const searchResults = await table
      .search(queryVector)
      .limit(TOP_K)
      .toArray();

    // Extract text and sources for the LLM context
    const context = searchResults.map((r) => r.text).join("\n\n");
    const sources = [...new Set(searchResults.map((r) => r.source))]; // Unique sources

    // 6. Generate Answer using the Context
    const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant that answers questions using the provided documents.

Rules:
1. If the answer exists directly in the context, return it clearly.
2. If the answer requires a calculation (example yearly → monthly), compute it.
3. Use ONLY the provided context.
4. If the answer can be presented as multiple items or data points, format each item as a separate bullet point using "-" (dash) or new lines.
5. If the answer cannot be found, say: "I could not find the answer in the documents."

Context:
${context}

Question:
${question}

Answer:
`;

    const result = await chatModel.generateContent(prompt);
    const responseText = result.response.text();

    // 7. Return Response
    return NextResponse.json({
      answer: responseText,
      sources: sources
    });

  } catch (error: any) {
    console.error("RAG Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}