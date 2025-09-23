import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import ExtractTextFromFile from "./extractText";
import dotenv from "dotenv";
import CheckLatency from "./latency";

import { KnowledgeBaseEntryI, MessageI, MessageMetricsI } from "../types/allTypes";
import { FindCorrectKeyword } from "./AI";
import { CHUNK_TYPES } from "../types/allTypes";
import { RetrieveCache, StoreCache } from "./cacheSystem";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
);


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });



async function generateEmbedding(text: string): Promise<number[]> {
    const response = await CheckLatency(() => openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    }), "Embedding request to OpenAI");
    return response.data[0].embedding;
}



export async function GetSimilarChunks(userInput: string, keyword: string | null){
  
  const keywordArray = keyword!.split(",").map(k => k.trim()).slice(0, -1);; // Convert to array

  if (keyword === "NULL") {
    return "";
  }

  console.log("Keywords = " + keywordArray);

  let cachedKnowledgeChunk = ""; // To accumulate cached chunks
  let missingKeywords: string[] = []; // To store keywords without cache

  // First, check cache for each keyword
  keywordArray.forEach((key) => {
    let isAvailable = RetrieveCache("knowledge_base", key);

    if (isAvailable) {
      // console.log(key + " is avaialble")
      cachedKnowledgeChunk += isAvailable; // Append the cached chunk to the result
    } else {
      missingKeywords.push(key); // If no cache, add to missingKeywords for Supabase query
    }
  });

  console.log("Missing keywords: ", missingKeywords);

  // If there is cached content, return it immediately
  if (cachedKnowledgeChunk && missingKeywords.length == 0) {
    // Optionally you can return immediately here if all the chunks are in the cache
    // console.log("cached knowledgebase")
    return cachedKnowledgeChunk;
  }

  // If there are any missing keywords, fetch them from Supabase
    // Generate OR query for the missing keywords
    const orCondition = missingKeywords
      .map(k => `type.ilike.%${k}%`)
      .join(", ");

    console.log("OR Condition: ", orCondition);

    // Query Supabase for the missing chunks
    const { data, error } = await CheckLatency(async () =>
      await supabase
        .from("knowledge_base")
        .select("document")
        .or(orCondition)
        .limit(5),
      "Keyword search to Supabase"
    );

    if (error) {
      console.error("Error fetching similar chunks:", error);
      return "";
    }

    // Join the retrieved chunks
    let chunks = data.map((row: { document: string }) => row.document).join("\n\n");
    console.log("chunks")
    console.dir(chunks)

    // Cache the newly fetched chunks for each missing keyword
    missingKeywords.forEach((key, index) => {
      // console.log(key + " is now cached")
      const cacheMap = new Map();
      cacheMap.set(key, data[index].document); // Store the corresponding document for each keyword
      StoreCache("knowledge_base", cacheMap);
    });

    // Return the cached content + the newly fetched content from Supabase
    return cachedKnowledgeChunk + "\n\n" + chunks;

}


async function ChunkifyText(): Promise<string[]> {
    console.log(process.env.CONTEXT_KNOWLEDGE_BASE_FILE);
    const extractedText = await ExtractTextFromFile(process.env.CONTEXT_KNOWLEDGE_BASE_FILE || "");
    return extractedText.split(/\[CHUNK\]/).map(chunk => chunk.trim()).filter(chunk => chunk);
}

async function StoreKnowledgeBase(): Promise<void> {
    const chunks = await ChunkifyText();
    const documents: KnowledgeBaseEntryI[] = [];
    
    for (let i = 0; i < chunks.length; i++) {
        const embedding = await generateEmbedding(chunks[i]);
        documents.push({ id: `kb${i}`, document: chunks[i], embedding, type: "knowledge_base" });
    }
    
    const { error } = await supabase.from("knowledge_base").insert(documents);
    if (error) console.error("Error storing knowledge base:", error);
    else console.log("Knowledge base stored successfully");
}

async function DeleteStorage(): Promise<void> {
    const { error } = await supabase.from("knowledge_base").delete().neq("id", "");
    if (error) console.error("Error deleting storage:", error);
    else console.log("Storage deleted successfully");
}


// =================== STORING METRICS ===================


export async function RetrieveConvo(id: string): Promise<void> {
    const { data, error } = await supabase
      .from('conversations')
      .select('user_inputs, bot_outputs')
      .eq('id', id);
  
    if (error) {
      console.error('Error retrieving conversation:', error);
    } else {
      console.log('Conversation retrieved:', data);
    }
}
  
export async function StoreOrUpdateConvo(chatID: string, userInput: MessageI[], botOutput: MessageI[], msgMetrics: MessageMetricsI[]): Promise<any> {
    const { data, error } = await supabase
      .from('conversations')
      .upsert([
        {
          id: chatID,
          user_inputs: userInput,
          bot_outputs: botOutput,
          msg_metrics: msgMetrics,
        }
      ], { onConflict: 'id' });
  
    if (error) {
      console.error("Error storing conversation:", error);
    } else {
      console.log("Stored")
      return data; // Return stored conversation
    }
  }
  
