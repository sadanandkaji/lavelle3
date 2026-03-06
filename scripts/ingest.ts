// scripts/ingest.ts
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import * as lancedb from "@lancedb/lancedb";
import { GoogleGenerativeAI } from "@google/generative-ai";
// Use the legacy build for Node.js compatibility
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

/** * CONFIGURATION
 * Ensure these folders exist in your project root
 */
const DOCS_FOLDER = "./docs";
const DB_PATH = "./lancedb";
const TABLE_NAME = "docs";
const CHUNK_SIZE = 600; // Character count per chunk

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function extractPDFText(filePath: string): Promise<string> {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = pdfjs.getDocument({
    data,
    useSystemFonts: true,
    disableFontFace: true,
  });
  
  const pdf = await loadingTask.promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str)
      .join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
}

async function main() {
  // 1. Validation
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ Error: GEMINI_API_KEY is missing in your .env file");
    process.exit(1);
  }

  if (!fs.existsSync(DOCS_FOLDER)) {
    console.log(`📁 Creating ${DOCS_FOLDER} folder...`);
    fs.mkdirSync(DOCS_FOLDER);
    console.log("👉 Add your PDFs to the /docs folder and run again.");
    return;
  }

  const files = fs.readdirSync(DOCS_FOLDER).filter(f => f.endsWith(".pdf"));
  if (files.length === 0) {
    console.log("📭 No PDF files found in /docs.");
    return;
  }

  console.log(`🔍 Found ${files.length} files. Connecting to LanceDB...`);
  const db = await lancedb.connect(DB_PATH);
  
  const rows: any[] = [];
  const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

  // 2. Processing
  for (const file of files) {
    console.log(`📄 Processing: ${file}...`);
    const filePath = path.join(DOCS_FOLDER, file);
    const text = await extractPDFText(filePath);

    // Chunking logic
    for (let i = 0; i < text.length; i += CHUNK_SIZE) {
      const chunk = text.slice(i, i + CHUNK_SIZE);
      
      try {
        // Create vector embedding
        const result = await embedModel.embedContent(chunk);
        const vector = result.embedding.values;

        rows.push({
          vector: vector,
          text: chunk,
          source: file
        });
      } catch (err) {
        console.error(`⚠️ Failed to embed chunk in ${file}:`, err);
      }
    }
  }

  // 3. Save to LanceDB
  console.log(`📦 Creating table '${TABLE_NAME}' with ${rows.length} chunks...`);
  
  // This will overwrite the table if it exists
  await db.createTable(TABLE_NAME, rows, { mode: "overwrite" });

  console.log("✅ All documents indexed successfully in /lancedb");
}

main().catch(err => {
  console.error("❌ Ingestion failed:", err);
});