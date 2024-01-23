import { supabaseClient } from "@/lib/supabase/supabase-client";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
  });


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "No query provided" });
  }

  // Create Embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });

  const embedding = embeddingResponse.data[0].embedding;

  // Search Supabase
  const { data, error } = await supabaseClient.rpc("search_contents", {
    query_embedding: embedding,
    similarity_threshold: 0.75,
    match_count: 2,
  });

  if (data) {
    return NextResponse.json({ data });
  }

  return NextResponse.json({ error });
}