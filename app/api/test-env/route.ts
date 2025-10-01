import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    groqKeyExists: !!process.env.GROQ_API_KEY,
    groqKeyPrefix: process.env.GROQ_API_KEY?.substring(0, 10) + '...',
    hfKeyExists: !!process.env.HUGGINGFACE_API_KEY,
    hfKeyPrefix: process.env.HUGGINGFACE_API_KEY?.substring(0, 10) + '...',
    ollamaUrlExists: !!process.env.OLLAMA_URL,
    openaiKeyExists: !!process.env.OPENAI_API_KEY,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}
