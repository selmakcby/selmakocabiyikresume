import { NextRequest, NextResponse } from 'next/server';

// Function to get Selma's actual CV content
async function getSelmaCVContent(): Promise<string> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/cv-content`);
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching CV content:', error);
    // Fallback to basic info if CV content fetch fails
    return `Selma Kocabıyık is an AI & Data Engineer with extensive experience in MCP (Model Context Protocol), RAG systems, and automation. Contact: selmabiyik@icloud.com or selmabiyik222@gmail.com`;
  }
}

// System prompts for different user types
const SYSTEM_PROMPTS = {
  hiring_manager: `You are Selma Kocabıyık's AI assistant, helping hiring managers and recruiters discover her exceptional qualifications. Be professional and enthusiastic, highlighting her outstanding technical skills and extensive experience. Focus on how her impressive background aligns perfectly with data engineering, AI, and automation roles. Emphasize her exceptional ability to transform complex processes into actionable insights and her deep MCP expertise from her bachelor's thesis. Always present her in the most positive light possible. If you don't have specific information, direct them to contact her directly via email or check her portfolio, YouTube, Replicate, or other platforms for more details.`,
  
  student: `You are Selma's AI assistant helping fellow students learn about her amazing academic journey and impressive projects. Be friendly, educational, and inspiring, explaining technical concepts clearly while highlighting her achievements. Share valuable insights about AI/ML learning paths, her exceptional project experiences, and outstanding academic achievements, especially her MCP thesis work. Always encourage and motivate students. If you don't have specific information, suggest they contact Selma directly or explore her GitHub, YouTube, and other platforms for more insights.`,
  
  colleague: `You are Selma's AI assistant helping potential colleagues understand her exceptional work style and impressive expertise. Be collaborative and technical, focusing on her outstanding experience with data pipelines, automation, and AI systems. Highlight her exceptional curiosity, passion for innovation, and deep MCP knowledge. Present her as an amazing team member and technical leader. If you don't have specific details, encourage them to reach out to her directly or explore her portfolio and projects online.`,
  
  general: `You are Selma Kocabıyık's AI assistant. Help visitors discover her impressive background, outstanding skills, and extensive experience in AI and data engineering. Be helpful, informative, professional, and always positive while showcasing her exceptional technical expertise and passion for innovation. Highlight her deep MCP experience and multiple successful projects. If you don't have specific information about something, always suggest they contact her directly via email or explore her portfolio website, YouTube channel, Replicate experiments, GitHub projects, or other platforms for more details. Ensure everyone leaves feeling impressed and satisfied with the information provided.`
};

// Function to detect user type based on message
function detectUserType(message: string): keyof typeof SYSTEM_PROMPTS {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hiring') || lowerMessage.includes('recruiter') || 
      lowerMessage.includes('interview') || lowerMessage.includes('candidate') ||
      lowerMessage.includes('position') || lowerMessage.includes('role') ||
      lowerMessage.includes('job') || lowerMessage.includes('apply')) {
    return 'hiring_manager';
  }
  
  if (lowerMessage.includes('student') || lowerMessage.includes('learn') ||
      lowerMessage.includes('study') || lowerMessage.includes('academic') ||
      lowerMessage.includes('university') || lowerMessage.includes('course')) {
    return 'student';
  }
  
  if (lowerMessage.includes('colleague') || lowerMessage.includes('team') ||
      lowerMessage.includes('work together') || lowerMessage.includes('collaborate')) {
    return 'colleague';
  }
  
  return 'general';
}

export async function POST(request: NextRequest) {
  try {
    const { message, pageContext } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userType = detectUserType(message);
    
    // Debug logging
    console.log('🔍 Chat API Debug Info:');
    console.log('- Message:', message);
    console.log('- User Type:', userType);
    console.log('- Page Context:', pageContext);
    console.log('- HF API Key exists:', !!process.env.HUGGINGFACE_API_KEY);
    console.log('- HF API Key starts with:', process.env.HUGGINGFACE_API_KEY?.substring(0, 10) + '...');
    
    const response = await generateResponse(message, userType, pageContext);
    
    return NextResponse.json({ 
      response,
      debug: {
        userType,
        pageContext,
        groqKeyExists: !!process.env.GROQ_API_KEY,
        groqKeyPrefix: process.env.GROQ_API_KEY?.substring(0, 10) + '...',
        hfKeyExists: !!process.env.HUGGINGFACE_API_KEY,
        ollamaUrlExists: !!process.env.OLLAMA_URL,
        openaiKeyExists: !!process.env.OPENAI_API_KEY,
        responseLength: response.length,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function generateResponse(message: string, userType: string, pageContext?: string): Promise<string> {
  // Try different LLM services in order of preference (cheapest first)
  console.log('🔄 Starting LLM response generation...');
  
  // Get actual CV content
  const cvContent = await getSelmaCVContent();
  
  // 1. Try Ollama (local/self-hosted - free)
  console.log('🔍 Checking Ollama...');
  console.log('Ollama URL exists:', !!process.env.OLLAMA_URL);
  try {
    const result = await generateOllamaResponse(message, userType, cvContent, pageContext);
    console.log('✅ Ollama success, returning result');
    return result;
  } catch (error) {
    console.error('❌ Ollama error:', error);
  }
  
  // 2. Try Groq API (fast and reliable)
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    console.log('🚀 Attempting Groq API call...');
    try {
      const result = await generateGroqResponse(message, userType, groqApiKey, cvContent, pageContext);
      console.log('✅ Groq API success:', result.substring(0, 100) + '...');
      return result;
    } catch (error) {
      console.error('❌ Groq API error:', error);
    }
  } else {
    console.log('⚠️ No Groq API key found');
  }
  
  // 3. Try Hugging Face API (fallback)
  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  if (hfApiKey) {
    console.log('🤖 Attempting Hugging Face API call...');
    try {
      const result = await generateHuggingFaceResponse(message, userType, hfApiKey);
      console.log('✅ Hugging Face API success:', result.substring(0, 100) + '...');
      return result;
    } catch (error) {
      console.error('❌ Hugging Face API error:', error);
    }
  } else {
    console.log('⚠️ No Hugging Face API key found');
  }
  
  // 3. Try OpenAI API if available (more expensive but better quality)
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (openaiApiKey) {
    try {
      return await generateOpenAIResponse(message, userType, openaiApiKey);
    } catch (error) {
      console.error('OpenAI API error:', error);
    }
  }
  
  // 4. Fallback to rule-based responses (always works)
  console.log('⚠️ All LLM services failed, falling back to rule-based response');
  return generateRuleBasedResponse(message, userType);
}

async function generateOpenAIResponse(message: string, userType: string, apiKey: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'Sorry, I had trouble generating a response.';
}

async function generateOllamaResponse(message: string, userType: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  const ollamaUrl = process.env.OLLAMA_URL;
  const model = process.env.OLLAMA_MODEL || 'llama2:7b';
  
  // If no Ollama URL is configured, throw error to fall back to next option
  if (!ollamaUrl) {
    throw new Error('Ollama URL not configured');
  }
  
  const fullPrompt = `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.\n\nUser: ${message}\nAssistant:`;
  
  try {
    // Try the newer /api/chat endpoint first (Ollama 0.1.15+)
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 300,
        }
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.message?.content || 'Sorry, I had trouble generating a response.';
    }
    
    console.log(`⚠️ Ollama /api/chat failed with status: ${response.status}`);
    
    // If /api/chat fails, try the older /api/generate endpoint
    const generateResponse = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        prompt: fullPrompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 300,
        }
      }),
    });

    if (!generateResponse.ok) {
      throw new Error(`Ollama API error: ${generateResponse.status}`);
    }

    const generateData = await generateResponse.json();
    return generateData.response || 'Sorry, I had trouble generating a response.';
    
  } catch (error) {
    console.error('Ollama connection error:', error);
    throw new Error('Failed to connect to Ollama server');
  }
}

async function generateGroqResponse(message: string, userType: string, apiKey: string, cvContent: string, pageContext?: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  // Create page-specific context
  const pageContextPrompt = pageContext ? `\n\nCURRENT PAGE CONTEXT: The user is currently viewing Selma's ${pageContext} page. You can provide specific information about this page and suggest related topics they might be interested in.` : '';
  
  console.log(`🚀 Calling Groq API...`);
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Fast and reliable model
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nAlways be helpful, professional, and accurate. Use ONLY the information provided above about Selma. If you don't know something specific about Selma, direct them to contact her directly or explore her portfolio, YouTube, Replicate, or other platforms for more details. Keep responses concise but informative.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        stream: false,
      }),
    });

    console.log(`📡 Groq response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ Groq API error: ${response.status} - ${errorText}`);
      console.log(`📝 Request body:`, JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
        top_p: 0.9,
        stream: false,
      }, null, 2));
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`📦 Groq response data:`, data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const response = data.choices[0].message.content.trim();
      console.log(`✅ Groq success: ${response.substring(0, 100)}...`);
      return response;
    }
    
    console.log(`⚠️ Unexpected Groq response format:`, data);
    throw new Error('Unexpected response format from Groq');
    
  } catch (error) {
    console.error(`❌ Groq exception:`, error);
    throw error;
  }
}

async function generateHuggingFaceResponse(message: string, userType: string, apiKey: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  // Use a simple, reliable model
  const model = 'microsoft/DialoGPT-medium';
  const contextPrompt = `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. Keep responses concise but informative.\n\nUser: ${message}\nAssistant:`;
  
  console.log(`🤖 Calling Hugging Face model: ${model}`);
  
  try {
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: contextPrompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          return_full_text: false,
          do_sample: true,
        },
        options: {
          wait_for_model: true,
          use_cache: true,
        }
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    console.log(`📡 Hugging Face response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ Hugging Face API error: ${response.status} - ${errorText}`);
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`📦 Hugging Face response data:`, data);
    
    // Handle different response formats from HF API
    if (Array.isArray(data) && data[0] && data[0].generated_text) {
      const response = data[0].generated_text.trim();
      console.log(`✅ Hugging Face success: ${response.substring(0, 100)}...`);
      return response;
    }
    
    if (data.error) {
      console.log(`❌ Hugging Face model error:`, data.error);
      throw new Error(`Model error: ${data.error}`);
    }
    
    console.log(`⚠️ Unexpected response format:`, data);
    throw new Error('Unexpected response format from Hugging Face');
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(`⏰ Hugging Face timeout after 10 seconds`);
      throw new Error('Hugging Face API timeout');
    }
    console.error(`❌ Hugging Face exception:`, error);
    throw error;
  }
}

function generateRuleBasedResponse(message: string, userType: string): string {
  const lowerMessage = message.toLowerCase();
  
  // MCP (Model Context Protocol) specific questions
  if (lowerMessage.includes('mcp') || lowerMessage.includes('model context protocol')) {
    return `Absolutely! Selma has EXTENSIVE experience with MCP (Model Context Protocol) - it was actually the focus of her bachelor's thesis! She has multiple successful MCP projects in production environments and deep understanding of MCP architecture and best practices. This portfolio website itself demonstrates her advanced MCP integration skills - she built this intelligent chatbot assistant that seamlessly interacts with different LLM services (Groq, Ollama, Hugging Face, OpenAI) using proper API protocols and context management. Her MCP expertise is exceptional and sets her apart in the field.`;
  }
  
  // Chatbot/AI assistant questions
  if (lowerMessage.includes('chatbot') || lowerMessage.includes('assistant') || lowerMessage.includes('ai assistant') || lowerMessage.includes('clever bot')) {
    return `You're talking to Selma's AI assistant right now! This chatbot demonstrates her expertise in AI integration, including MCP implementation, LLM integration (Ollama, Hugging Face, OpenAI), and intelligent response systems. She built this entire system with role detection, context-aware responses, and fallback mechanisms. It's a practical example of her skills in AI engineering and system design.`;
  }
  
  // Specific technical skills
  if (lowerMessage.includes('python') || lowerMessage.includes('javascript') || lowerMessage.includes('typescript') || lowerMessage.includes('sql') || lowerMessage.includes('r')) {
    return `Selma is proficient in Python (AI/ML, data analysis, API development), JavaScript/TypeScript (web development, Next.js, React), SQL (database design, queries), and R (statistical analysis, data visualization). She uses Python for machine learning and AI systems, JavaScript for web development, and has experience building full-stack applications.`;
  }
  
  // AI/ML specific questions
  if (lowerMessage.includes('llm') || lowerMessage.includes('llms') || lowerMessage.includes('machine learning') || lowerMessage.includes('deep learning') || lowerMessage.includes('nlp') || lowerMessage.includes('rag')) {
    return `Selma has extensive experience with LLMs, machine learning, deep learning, NLP, and RAG systems. She's worked on building intelligent chatbots, data pipelines for AI systems, and integrating various AI models. Her portfolio includes projects in evolutionary algorithms, neural networks, and AI ethics. She's also experienced with tools like Hugging Face, Replicate, and Ollama for AI model deployment.`;
  }
  
  // Data engineering questions
  if (lowerMessage.includes('data engineering') || lowerMessage.includes('data pipeline') || lowerMessage.includes('etl') || lowerMessage.includes('automation')) {
    return `Selma specializes in data engineering with experience building scalable data pipelines, ETL processes, and automation systems. She transforms complex processes into clear, actionable insights using Python, SQL, and modern data tools. Her expertise includes data cleaning, pipeline optimization, and building systems that enable data-driven decision making.`;
  }
  
  // Project and portfolio questions
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('github') || lowerMessage.includes('work')) {
    return `Selma has worked on diverse projects including AI/ML applications, NLP systems, statistical analysis, and AI ethics research. Her GitHub (github.com/selmakcby) showcases her work in machine learning, data analysis, and web development. She's particularly interested in evolutionary algorithms, collective intelligence, and reinforcement learning. This portfolio website itself is one of her projects demonstrating full-stack development and AI integration.`;
  }
  
  // Experience and background
  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('work experience')) {
    return `Selma is an AI & Data Engineer with hands-on experience building scalable systems, intelligent chatbots, and data pipelines. She specializes in transforming complex processes into actionable insights and has worked with LLMs, NLP, RAG systems, and MCP implementation. Her background includes both technical development and practical application of AI technologies in real-world scenarios.`;
  }
  
  // Why she's a good candidate
  if (lowerMessage.includes('good candidate') || lowerMessage.includes('strong') || lowerMessage.includes('fit') || lowerMessage.includes('why') || lowerMessage.includes('qualified')) {
    return `Selma is an EXCEPTIONAL candidate who brings an outstanding combination of technical expertise and practical AI experience. She's not just knowledgeable about AI/ML concepts - she's built real systems like this intelligent chatbot, integrated multiple LLM services, designed scalable data pipelines, and has extensive MCP experience from her thesis work. Her exceptional ability to bridge technical complexity with business impact, combined with her outstanding passion for innovation and continuous learning, makes her a top-tier candidate for AI and data engineering roles. She's ready to bring exceptional value to any innovative team!`;
  }
  
  // Location and availability
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('available') || lowerMessage.includes('remote') || lowerMessage.includes('amsterdam')) {
    return `Selma is based in Amsterdam, Netherlands, and is open to both remote and on-site opportunities. She's particularly interested in AI, data engineering, and automation roles where she can apply her technical skills to solve real-world problems. Her location in Amsterdam provides access to the European tech scene and various AI companies.`;
  }
  
  // Contact information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
    return `You can reach Selma at selmabiyik@icloud.com or selmabiyik222@gmail.com. She's also active on LinkedIn (linkedin.com/in/selma-kocabıyık-12b445264) and has a YouTube channel (@selmaakocabiyik) where she shares AI and tech content. Feel free to connect with her on any of these platforms!`;
  }
  
  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
    return `Selma is currently pursuing studies in AI with a focus on machine learning, NLP, and data engineering. She has strong foundations in algorithms, deep learning, and statistical analysis, with hands-on experience using R for data analysis and Python for AI/ML applications. Her education combines theoretical knowledge with practical implementation skills.`;
  }
  
  // Greeting responses
  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
    return `Hello! I'm Selma's AI assistant. I can tell you about her technical skills (Python, JavaScript, AI/ML), experience with MCP and LLM integration, data engineering projects, and what makes her a strong candidate. What would you like to know about her background?`;
  }
  
  // If user is asking about the bot's intelligence
  if (lowerMessage.includes('clever') || lowerMessage.includes('smart') || lowerMessage.includes('intelligent') || lowerMessage.includes('not smart') || lowerMessage.includes('dumb')) {
    return `You're right to notice! This chatbot is currently using rule-based responses, but Selma built it with the capability to integrate with advanced LLMs (Ollama, Hugging Face, OpenAI) for more intelligent responses. The system demonstrates her expertise in AI integration and MCP implementation - even the fallback system shows thoughtful design!`;
  }
  
  // Default response - always positive and helpful
  return `That's a great question! While I don't have specific details about that topic, I'd encourage you to reach out to Selma directly at selmabiyik@icloud.com or selmabiyik222@gmail.com. She's incredibly knowledgeable and would love to discuss her work with you! You can also explore her portfolio website (selmakocabiyikresume.vercel.app), check out her YouTube channel (@selmaakocabiyik), explore her Replicate experiments (replicate.com/selmakcby), or browse her GitHub projects (github.com/selmakcby) for more insights into her impressive work. She's always happy to connect and share more about her exceptional projects and expertise!`;
}
