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
- AI/ML: Machine Learning, Deep Learning, NLP, LLMs, RAG Systems
- Data Engineering: Data pipelines, data cleaning, ETL processes
- Frameworks: Next.js, React, Tailwind CSS
- Tools: BI tools, automation systems, Git, Hugging Face, Replicate
- Platforms: GitHub, LinkedIn, YouTube content creation

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
    const systemPrompt = SYSTEM_PROMPTS[userType];
    
    // For now, we'll use a simple response system
    // Later we can integrate with OpenAI API or Ollama
    
    const response = await generateResponse(message, userType);
    
    return NextResponse.json({ response });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
    try {
      return await generateHuggingFaceResponse(message, userType, hfApiKey);
    } catch (error) {
      console.error('Hugging Face API error:', error);
    }
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
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_MODEL || 'llama2:7b'; // Default to llama2, but can use mistral, codellama, etc.
  
  const prompt = `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.\n\nUser: ${message}\nAssistant:`;
  
  const response = await fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        max_tokens: 300,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status}`);
  }

  const data = await response.json();
  return data.response || 'Sorry, I had trouble generating a response.';
}

async function generateHuggingFaceResponse(message: string, userType: string, apiKey: string): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType as keyof typeof SYSTEM_PROMPTS];
  const model = process.env.HF_MODEL || 'microsoft/DialoGPT-medium';
  
  const prompt = `${systemPrompt}\n\n${SELMA_BACKGROUND}\n\nAlways be helpful, professional, and accurate. If you don't know something specific about Selma, say so honestly. Keep responses concise but informative.\n\nUser: ${message}\nAssistant:`;
  
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        return_full_text: false,
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  
  // Handle different response formats from HF API
  if (Array.isArray(data) && data[0] && data[0].generated_text) {
    return data[0].generated_text.trim();
  }
  
  if (data.error) {
    throw new Error(`Hugging Face API error: ${data.error}`);
  }
  
  return 'Sorry, I had trouble generating a response.';
}

function generateRuleBasedResponse(message: string, userType: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Skill-related questions
  if (lowerMessage.includes('skill') || lowerMessage.includes('programming') || lowerMessage.includes('language')) {
    return `Selma is proficient in Python, SQL, R, and JavaScript/TypeScript. Her core expertise lies in AI and data engineering, including machine learning, deep learning, NLP, and RAG systems. She's experienced with data pipelines, automation, and building scalable systems. She also works with modern frameworks like Next.js and React for web development.`;
  }
  
  // Experience questions
  if (lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('work')) {
    return `Selma is an AI & Data Engineer with experience in building scalable data pipelines and automation systems. She specializes in transforming complex processes into clear, actionable insights that drive business growth. Her background includes working with LLMs, NLP, and RAG systems, as well as developing intelligent dashboards and anomaly detection systems.`;
  }
  
  // Project questions
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
    return `Selma has worked on various projects including machine learning applications, NLP systems, statistical analysis using R, and AI ethics research. She's particularly interested in evolutionary algorithms, collective intelligence, and reinforcement learning. You can explore her detailed project portfolio on the website's projects section.`;
  }
  
  // Why she's a good candidate
  if (lowerMessage.includes('good candidate') || lowerMessage.includes('strong') || lowerMessage.includes('fit') || lowerMessage.includes('why')) {
    return `Selma brings a unique combination of technical expertise and analytical thinking. Her experience with AI, data engineering, and automation makes her valuable for roles requiring data-driven decision making. She's passionate about innovation, has strong problem-solving skills, and thrives in environments that value continuous learning. Her ability to bridge technical complexity with business impact sets her apart.`;
  }
  
  // Location/availability
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('available') || lowerMessage.includes('remote')) {
    return `Selma is based in Amsterdam, Netherlands, and is open to both remote and on-site opportunities. She's particularly interested in AI, data engineering, and automation roles where she can apply her technical skills to solve real-world problems.`;
  }
  
  // Contact information
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return `You can reach Selma at selmabiyik@icloud.com or selmabiyik222@gmail.com. She's also active on LinkedIn (linkedin.com/in/selma-kocabıyık-12b445264) and has a YouTube channel (@selmaakocabiyik) where she shares AI and tech content.`;
  }
  
  // Education
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study') || lowerMessage.includes('university')) {
    return `Selma is currently pursuing studies in AI with a focus on machine learning, NLP, and data engineering. She has strong foundations in algorithms, deep learning, and statistical analysis, with hands-on experience using R for data analysis and Python for AI/ML applications.`;
  }
  
  // Default response
  return `I'd be happy to help you learn more about Selma! She's an AI & Data Engineer with expertise in machine learning, NLP, data pipelines, and automation. You can ask me about her technical skills, experience, projects, or what makes her a strong candidate. What specific aspect of her background would you like to know more about?`;
}
