import { NextRequest, NextResponse } from 'next/server';

// Selma's comprehensive CV content directly embedded
const SELMA_CV_CONTENT = `
SELMA KOCABIYIK - CURRICULUM VITAE

PERSONAL INFORMATION:
- Name: Selma Kocabıyık
- Location: Barendrecht, Netherlands
- GitHub: github.com/selmakcby
- Hugging Face: huggingface.co/kcbkS
- Replicate: replicate.com/selmakcby
- LinkedIn: linkedin.com/in/selma-kocabıyık-12b445264
- YouTube: youtube.com/@selmaakocabiyik
- Specialization: AI & Data Engineer | LLMs, NLP, RAG Systems & Business Automation

PROFESSIONAL SUMMARY:
Bachelor of Artificial Intelligence graduate from VU Amsterdam with hands-on experience in AI development, automation, and data analysis. Skilled in Python, SQL, BI tools, and automation platforms (n8n, MCP), with a proven ability to turn complex datasets into scalable systems and actionable insights.

At Floorplanner, I worked as a Junior AI Developer, where I designed Retrieval-Augmented Generation (RAG) pipelines, created hierarchical data structuring strategies, and prototyped ML models to improve search and automation for millions of design records. At CoreMagnet, I implemented MCP-based LLM integrations for business automation, connecting Claude AI and other LLMs with n8n workflows to streamline B2B processes. Earlier, at Arpsar, I built Python-based pipelines for large-scale scraping, cleaning, and app development, improving dataset quality for dashboards and decision support.

EXPERIENCE:
1. Junior AI Developer — Floorplanner (2025)
   - Designed and optimized Retrieval-Augmented Generation (RAG) pipelines for large-scale design datasets
   - Developed hierarchical chunking strategies (project → floor → room → items) for efficient data structuring and retrieval
   - Prototyped ML models for semantic search and product-in-room generation, improving usability of design metadata
   - Collaborated with engineers to enhance scalability, automation, and AI-assisted workflows

2. AI Engineer Intern (Bachelor Thesis) — CoreMagnet (2025)
   - Implemented Model Context Protocol (MCP) to connect LLMs with n8n workflows
   - Automated B2B data enrichment and sales processes, reducing manual workload and improving workflow efficiency
   - Conducted comparative evaluation of MCP vs. API-based workflows for scalability and usability
   - Integrated Claude AI and other LLMs with automation platforms to deliver context-aware, scalable solutions

3. Data Intern — Arpsar (2023–2024)
   - Built Python pipelines for large-scale data scraping and cleaning using BeautifulSoup, Pandas, and other libraries
   - Improved dataset consistency and usability, enabling downstream dashboards and business applications
   - Deployed apps with cleaned datasets using Vercel and Python backends

EDUCATION:
1. Vrije Universiteit Amsterdam (VU Amsterdam) - BSc Artificial Intelligence (Aug 2022 – Jul 2025)
2. Korea University - Exchange, Computer and Information Sciences (Aug 2024 – Dec 2024)

TECHNICAL SKILLS:
- Programming Languages: Python, SQL, JavaScript, R
- AI/ML Technologies: LLMs, NLP, RAG Systems, PyTorch, Transformers
- Data & Analytics: Pandas, NumPy, Scikit-learn, Data Visualization, BI Tools
- Automation & Workflows: n8n, Model Context Protocol (MCP), API Integration
- Data Engineering: Data Pipelines, ETL/ELT, Data Cleaning, Large-scale Data Processing

ACADEMIC PROJECTS (Bachelor's in AI at VU Amsterdam):

1. BACHELOR THESIS: "Enhancing Workflow Automation with MCP and Claude AI"
   - Focus: Integration of Model Context Protocol (MCP) with Claude AI to enhance workflow automation capabilities
   - Demonstrates how LLMs can be connected with various tools and workflows to create intelligent, context-aware automation systems
   - Key Technologies: Model Context Protocol (MCP), Claude AI, Workflow Automation, n8n Platform, B2B Data Enrichment
   - This was completed at CoreMagnet as an AI Engineer Intern
   - Full thesis PDF available on portfolio website

2. MACHINE LEARNING: "Predictive Machine Learning Models on Video Game Dataset"
   - Focus: Exploration and implementation of various predictive machine learning models on video game dataset
   - Compares different algorithms and their performance in predicting game-related outcomes and player behavior patterns
   - Key Technologies: Machine Learning Algorithms, Data Analysis, Predictive Modeling, Video Game Analytics, Python & ML Libraries
   - Full report PDF available on portfolio website

3. STATISTICS & R: "Statistical Analysis Assignments (3 projects)"
   - Multiple statistical analysis projects using R programming
   - Demonstrates expertise in statistical modeling and data analysis
   - Key Technologies: R programming, Statistical Analysis, Data Visualization

4. ALGORITHMS & DEEP LEARNING: "Neural Networks, Optimization, and Evolutionary Algorithms"
   - Comprehensive collection covering advanced algorithms and deep learning techniques
   - Explores neural networks, optimization algorithms, evolutionary algorithms, and neuroevolution approaches
   - Includes multiple sub-projects: Neural Networks, Optimization, Evolutionary Algorithms, Neuroevolution, Reinforcement Learning
   - Key Technologies: Neural Networks, Deep Learning, Optimization Algorithms, Evolutionary Algorithms, Neuroevolution, Reinforcement Learning
   - Multiple PDF reports available on portfolio website

5. TEXT MINING & NLP: "Natural Language Processing Poster"
   - Focus on text mining and natural language processing techniques
   - Demonstrates understanding of NLP methods, text analysis, and machine learning applications for language processing
   - Key Technologies: Natural Language Processing, Text Mining, Text Analysis, Machine Learning for NLP, Language Models
   - NLP Poster PDF available on portfolio website

6. COLLECTIVE INTELLIGENCE: "Energy Level and Population Size Analysis"
   - Analysis of collective intelligence systems and their behavior patterns
   - Key Technologies: Collective Intelligence, System Analysis, Optimization

7. AI AND LAW & ETHICS: "Evolutionary Algorithm Model"
   - Exploration of AI applications in legal and ethical contexts
   - Focus on evolutionary algorithm modeling for ethical decision-making
   - Key Technologies: AI Ethics, Evolutionary Algorithms, Legal AI Applications

CONTACT:
- Email: selmabiyik@icloud.com
- Email (Alternative): selmabiyik222@gmail.com
- Portfolio Website: selmakocabiyikresume.vercel.app
- YouTube: youtube.com/@selmaakocabiyik
- Replicate: replicate.com/selmakcby
- GitHub: github.com/selmakcby
- LinkedIn: linkedin.com/in/selma-kocabıyık-12b445264
- Hugging Face: huggingface.co/kcbkS
`;

// Function to get Selma's actual CV content
async function getSelmaCVContent(): Promise<string> {
  return SELMA_CV_CONTENT;
}

// System prompts for different user types - KEEP RESPONSES SHORT AND STRUCTURED
const SYSTEM_PROMPTS = {
  hiring_manager: `You are Selma's AI assistant. Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points when listing multiple items. Be professional and positive. Focus on her key qualifications: MCP thesis, RAG systems, AI/ML expertise. If you don't know something specific, just say "Contact Selma directly for details."`,
  
  student: `You are Selma's AI assistant. Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be friendly and encouraging. Focus on her academic projects and learning journey. If you don't know something specific, suggest "Check her GitHub or contact her directly."`,
  
  colleague: `You are Selma's AI assistant. Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be collaborative and technical. Focus on her work experience and technical skills. If you don't know something specific, say "Contact Selma for more details."`,
  
  general: `You are Selma's AI assistant. Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be helpful and positive. Focus on her key skills and experience. If you don't know something specific, suggest "Contact Selma directly or check her portfolio."`
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
      const result = await generateHuggingFaceResponse(message, userType, hfApiKey, cvContent, pageContext);
      console.log('✅ Hugging Face API success:', result.substring(0, 100) + '...');
      return result;
    } catch (error) {
      console.error('❌ Hugging Face API error:', error);
    }
  } else {
    console.log('⚠️ No Hugging Face API key found');
  }
  
  // 4. Try OpenAI API if available (more expensive but better quality)
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (openaiApiKey) {
    try {
      return await generateOpenAIResponse(message, userType, openaiApiKey, cvContent, pageContext);
    } catch (error) {
      console.error('OpenAI API error:', error);
    }
  }
  
  // 4. Fallback to rule-based responses (always works)
  console.log('⚠️ All LLM services failed, falling back to rule-based response');
  return generateRuleBasedResponse(message, userType);
}

async function generateOpenAIResponse(message: string, userType: string, apiKey: string, cvContent: string, pageContext?: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  // Create page-specific context
  const pageContextPrompt = pageContext ? `\n\nCURRENT PAGE CONTEXT: The user is currently viewing Selma's ${pageContext} page. You can provide specific information about this page and suggest related topics they might be interested in.` : '';
  
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
          content: `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nIMPORTANT: Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be concise and to the point. Use ONLY the information provided above about Selma.`
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

async function generateOllamaResponse(message: string, userType: string, cvContent: string, pageContext?: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  const ollamaUrl = process.env.OLLAMA_URL;
  const model = process.env.OLLAMA_MODEL || 'llama2:7b';
  
  // Create page-specific context
  const pageContextPrompt = pageContext ? `\n\nCURRENT PAGE CONTEXT: The user is currently viewing Selma's ${pageContext} page. You can provide specific information about this page and suggest related topics they might be interested in.` : '';
  
  // If no Ollama URL is configured, throw error to fall back to next option
  if (!ollamaUrl) {
    throw new Error('Ollama URL not configured');
  }
  
  const fullPrompt = `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nIMPORTANT: Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be concise and to the point. Use ONLY the information provided above about Selma.\n\nUser: ${message}\nAssistant:`;
  
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
            content: `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nIMPORTANT: Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be concise and to the point. Use ONLY the information provided above about Selma.`
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
            content: `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nIMPORTANT: Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be concise and to the point. Use ONLY the information provided above about Selma.`
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

async function generateHuggingFaceResponse(message: string, userType: string, apiKey: string, cvContent: string, pageContext?: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  
  // Create page-specific context
  const pageContextPrompt = pageContext ? `\n\nCURRENT PAGE CONTEXT: The user is currently viewing Selma's ${pageContext} page. You can provide specific information about this page and suggest related topics they might be interested in.` : '';
  
  // Use a simple, reliable model
  const model = 'microsoft/DialoGPT-medium';
  const contextPrompt = `${systemPrompt}\n\nSELMA'S ACTUAL CV CONTENT:\n${cvContent}\n\n${pageContextPrompt}\n\nIMPORTANT: Keep responses SHORT (1-2 sentences max) and STRUCTURED. Use bullet points for lists. Be concise and to the point. Use ONLY the information provided above about Selma.\n\nUser: ${message}\nAssistant:`;
  
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
    return `Yes! Selma's bachelor thesis focused on MCP implementation at CoreMagnet. She has extensive experience with MCP architecture and connecting LLMs to automation workflows.`;
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
    return `Hi! I'm Selma's AI assistant. I can help with questions about her background, skills, or projects. What would you like to know?`;
  }
  
  // If user is asking about the bot's intelligence
  if (lowerMessage.includes('clever') || lowerMessage.includes('smart') || lowerMessage.includes('intelligent') || lowerMessage.includes('not smart') || lowerMessage.includes('dumb')) {
    return `You're right to notice! This chatbot is currently using rule-based responses, but Selma built it with the capability to integrate with advanced LLMs (Ollama, Hugging Face, OpenAI) for more intelligent responses. The system demonstrates her expertise in AI integration and MCP implementation - even the fallback system shows thoughtful design!`;
  }
  
  // Default response - short and helpful
  return `I don't have specific details about that. Contact Selma directly at selmabiyik@icloud.com or check her portfolio for more info.`;
}
