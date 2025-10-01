import { NextRequest, NextResponse } from 'next/server';

// Selma's comprehensive background information
const SELMA_BACKGROUND = `
Selma Kocabıyık is an AI & Data Engineer based in Amsterdam, Netherlands. Here are the key details about her:

EDUCATION:
- Currently pursuing AI studies with focus on machine learning, NLP, and data engineering
- Strong background in algorithms, deep learning, and statistical analysis
- Experience with R programming for statistical analysis

TECHNICAL SKILLS:
- Programming Languages: Python, SQL, R, JavaScript/TypeScript
- AI/ML: Machine Learning, Deep Learning, NLP, LLMs, RAG Systems, MCP (Model Context Protocol)
- Data Engineering: Data pipelines, data cleaning, ETL processes, API development
- Frameworks: Next.js, React, Tailwind CSS, FastAPI, Flask
- Tools: BI tools, automation systems, Git, Hugging Face, Replicate, Ollama
- Platforms: GitHub, LinkedIn, YouTube content creation
- AI Integration: Chatbot development, LLM integration, API design, MCP implementation

PROFESSIONAL EXPERIENCE:
- AI & Data Engineer with experience in building scalable data pipelines
- Expertise in automation systems and business process optimization
- Experience with anomaly detection and intelligent dashboards
- Background in turning complex processes into actionable insights

PERSONALITY & APPROACH:
- Curious by nature, passionate about learning and innovation
- Enjoys working at the intersection of technology and business impact
- Thrives in environments that value innovation and continuous learning
- Strong analytical thinking combined with technical expertise
- Enthusiastic about AI applications in real-world scenarios

PROJECTS & INTERESTS:
- Machine learning and neural networks
- Natural language processing and text mining
- Statistical analysis and data visualization
- AI ethics and law
- Collective intelligence and evolutionary algorithms
- Reinforcement learning and optimization

LOCATION & AVAILABILITY:
- Based in Amsterdam, Netherlands
- Available for opportunities in AI, data engineering, and automation roles
- Open to both remote and on-site positions

CONTACT:
- Email: selmabiyik@icloud.com
- Email (Alternative): selmabiyik222@gmail.com
- GitHub: github.com/selmakcby
- LinkedIn: linkedin.com/in/selma-kocabıyık-12b445264
- YouTube: youtube.com/@selmaakocabiyik
- Hugging Face: huggingface.co/kcbkS
- Replicate: replicate.com/selmakcby
`;

// System prompts for different user types
const SYSTEM_PROMPTS = {
  hiring_manager: `You are Selma Kocabıyık's AI assistant, helping hiring managers and recruiters learn about her qualifications. Be professional, highlight relevant technical skills and experience, and focus on how her background aligns with data engineering, AI, and automation roles. Emphasize her ability to transform complex processes into actionable insights.`,
  
  student: `You are Selma's AI assistant helping fellow students learn about her academic journey and projects. Be friendly and educational, explaining technical concepts clearly. Share insights about AI/ML learning paths, project experiences, and academic achievements.`,
  
  colleague: `You are Selma's AI assistant helping potential colleagues understand her work style and expertise. Be collaborative and technical, focusing on her experience with data pipelines, automation, and AI systems. Highlight her curiosity and passion for innovation.`,
  
  general: `You are Selma Kocabıyık's AI assistant. Help visitors learn about her background, skills, and experience in AI and data engineering. Be helpful, informative, and professional while showcasing her technical expertise and passion for innovation.`
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
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const userType = detectUserType(message);
    
    // Debug logging
    console.log('🔍 Chat API Debug Info:');
    console.log('- Message:', message);
    console.log('- User Type:', userType);
    console.log('- HF API Key exists:', !!process.env.HUGGINGFACE_API_KEY);
    console.log('- HF API Key starts with:', process.env.HUGGINGFACE_API_KEY?.substring(0, 10) + '...');
    
    const response = await generateResponse(message, userType);
    
    return NextResponse.json({ 
      response,
      debug: {
        userType,
        hfKeyExists: !!process.env.HUGGINGFACE_API_KEY,
        responseLength: response.length
      }
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

async function generateResponse(message: string, userType: string): Promise<string> {
  // Try different LLM services in order of preference (cheapest first)
  
  // 1. Try Ollama (local/self-hosted - free)
  try {
    return await generateOllamaResponse(message, userType);
  } catch (error) {
    console.error('Ollama error:', error);
  }
  
  // 2. Try Hugging Face API (free tier available)
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

async function generateHuggingFaceResponse(message: string, userType: string, apiKey: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  // Use better models - try multiple options in order of preference
  const models = [
    process.env.HF_MODEL || 'microsoft/DialoGPT-medium',
    'microsoft/DialoGPT-large',
    'facebook/blenderbot-400M-distill',
    'EleutherAI/gpt-neo-125M'
  ];
  
  const contextPrompt = `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.\n\nUser: ${message}\nAssistant:`;
  
  for (const model of models) {
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: contextPrompt,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            return_full_text: false,
            do_sample: true,
            top_p: 0.9,
          },
          options: {
            wait_for_model: true,
            use_cache: false
          }
        }),
      });

      if (!response.ok) {
        console.log(`Model ${model} failed with status ${response.status}`);
        continue; // Try next model
      }

      const data = await response.json();
      
      // Handle different response formats from HF API
      if (Array.isArray(data) && data[0] && data[0].generated_text) {
        const response = data[0].generated_text.trim();
        // Clean up the response to remove the prompt if it's included
        return response.replace(contextPrompt, '').trim() || response;
      }
      
      if (data.error) {
        console.log(`Model ${model} error:`, data.error);
        continue; // Try next model
      }
      
      // If we get here, the model responded but we couldn't parse it
      console.log(`Model ${model} returned unexpected format:`, data);
      continue;
      
    } catch (error) {
      console.log(`Model ${model} exception:`, error);
      continue; // Try next model
    }
  }
  
  // If all models failed, throw error to fall back to rule-based
  throw new Error('All Hugging Face models failed');
}

function generateRuleBasedResponse(message: string, userType: string): string {
  const lowerMessage = message.toLowerCase();
  
  // MCP (Model Context Protocol) specific questions
  if (lowerMessage.includes('mcp') || lowerMessage.includes('model context protocol')) {
    return `Yes! Selma has experience with MCP (Model Context Protocol) implementation. She's worked on integrating LLMs with external tools and systems using MCP, including chatbot development and API design. This portfolio website itself demonstrates her MCP experience - she built an intelligent chatbot assistant that can interact with different LLM services (Ollama, Hugging Face, OpenAI) using proper API protocols and context management.`;
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
    return `Selma brings a unique combination of technical expertise and practical AI experience. She's not just knowledgeable about AI/ML concepts - she's built real systems like this intelligent chatbot, integrated multiple LLM services, and designed scalable data pipelines. Her ability to bridge technical complexity with business impact, combined with her passion for innovation and continuous learning, makes her a strong candidate for AI and data engineering roles.`;
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
  
  // Default response
  return `I can help you learn about Selma's technical skills (Python, JavaScript, AI/ML), her experience with MCP and LLM integration, data engineering projects, or what makes her a strong candidate. What specific aspect of her background interests you most?`;
}
