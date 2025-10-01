# LLM Assistant Setup Guide

This guide explains how to set up different LLM options for the chatbot assistant, from free to paid solutions.

## 🆓 Free Options (Recommended)

### 1. Ollama (Local LLM - Completely Free)

**Best for:** Maximum privacy, no API costs, offline capability

**Setup:**
1. Install Ollama: https://ollama.ai/
2. Pull a model (choose one):
   ```bash
   # Lightweight options (faster, less memory)
   ollama pull llama2:7b
   ollama pull mistral:7b
   
   # Better quality options (slower, more memory)
   ollama pull codellama:7b
   ollama pull llama2:13b
   ```

3. Set environment variables in Vercel:
   ```
   OLLAMA_URL=http://your-server:11434
   OLLAMA_MODEL=llama2:7b
   ```

**Pros:** Free, private, no API limits
**Cons:** Requires your own server/hosting

### 2. Hugging Face Inference API (Free tier)

**Setup:**
1. Get API key from: https://huggingface.co/settings/tokens
2. Set environment variable:
   ```
   HUGGINGFACE_API_KEY=your_token_here
   ```

**Pros:** Free tier available, good models
**Cons:** Rate limits, requires API key

## 💰 Paid Options

### 1. OpenAI API (Best Quality)

**Setup:**
1. Get API key from: https://platform.openai.com/api-keys
2. Set environment variable:
   ```
   OPENAI_API_KEY=your_key_here
   ```

**Cost:** ~$0.002 per 1K tokens
**Pros:** Best quality, reliable
**Cons:** Most expensive

### 2. Anthropic Claude API

**Setup:**
1. Get API key from: https://console.anthropic.com/
2. Set environment variable:
   ```
   ANTHROPIC_API_KEY=your_key_here
   ```

**Cost:** Similar to OpenAI
**Pros:** High quality, good for coding
**Cons:** Expensive

## 🚀 Quick Start (No Setup Required)

The chatbot works immediately with **rule-based responses** - no API keys needed! It provides intelligent responses based on Selma's information without any external services.

## 🔧 Current Configuration

The system tries LLM services in this order:
1. **Ollama** (if configured) - Free
2. **OpenAI** (if API key provided) - Paid
3. **Rule-based responses** - Always works

## 📊 Model Recommendations

### For Development/Testing:
- `mistral:7b` - Fast, good quality
- `llama2:7b` - Reliable, well-tested

### For Production:
- `llama2:13b` - Better quality
- `codellama:7b` - Great for technical questions
- `mistral:7b` - Good balance

### For Maximum Quality:
- OpenAI GPT-3.5-turbo
- OpenAI GPT-4
- Anthropic Claude

## 🛠️ Deployment Options

### Option 1: Vercel + Ollama Server
- Deploy website to Vercel
- Run Ollama on your own server
- Point `OLLAMA_URL` to your server

### Option 2: Vercel + API Keys
- Deploy to Vercel
- Add API keys in Vercel dashboard
- Uses cloud LLM services

### Option 3: Rule-based Only
- No setup required
- Works immediately
- Good quality responses

## 💡 Tips

1. **Start with rule-based** - It works great out of the box
2. **Try Ollama locally** - Free and private
3. **Use API keys for production** - Better quality
4. **Monitor costs** - Set usage limits on paid APIs

## 🔒 Privacy Notes

- **Ollama**: Completely private, data stays local
- **API services**: Data sent to third parties
- **Rule-based**: No external data sharing

Choose the option that best fits your needs for cost, quality, and privacy!
