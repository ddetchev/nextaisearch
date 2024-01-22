import { supabaseClient } from "@/lib/supabase/supabase-client";
import { ContentType } from "@/content";
import { NextResponse } from "next/server";
import OpenAI from "openai";



const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(request: Request) {
  const animal = (await request.json()) as ContentType;

  // Create Embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: `${animal.title} - ${animal.about}`,
  });

  console.log(`data: ${embeddingResponse.data[0].embedding}`)
  // const [{ embedding }] = embeddingResponse.data;
  const embedding = embeddingResponse.data[0].embedding;

  // Insert Into Supabase
  const { error } = await supabaseClient.from("contents").insert({
    ...animal,
    embedding,
  });

  return NextResponse.json({ error });
}