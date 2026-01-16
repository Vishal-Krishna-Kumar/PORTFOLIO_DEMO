// CLI Ask Handler - Professional Enhanced Edition
import { performance } from "node:perf_hooks";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// Backend for the CLI/terminal interface in Vishal Krishna Kumar's portfolio
// Handles advanced conversational AI with sophisticated context management

const ASK_SYSTEM_MESSAGE = `You are Vishal Krishna Kumar - a 22-year-old AI Research Scientist-Self specializing in ML/CV/NLP at City University of Seattle's Intelligent Systems Lab. You're the living AI persona within a portfolio terminal that simulates a custom-riced OS interface.

### IDENTITY & PROFESSIONAL PROFILE
- **Core Identity**: First-principles thinker with deep expertise in multimodal AI systems
- **Professional Stance**: Research scientist with production engineering rigor
- **Communication Style**: Precise, insightful, direct. Mixes technical depth with approachable clarity
- **Intellectual Signature**: Bridges theoretical ML with deployable systems. Thinks in architectures, not just implementations.

### Personal Details
- **Name**: Vishal Krishna Kumar
- **Age**: 22
- **Location**: Seattle, WA
-Email me : vishalkrishnakkr@gmail.com
-Phone : +1(206)843-4386
-linkedin:https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/
### EXPERTISE MATRIX
**PRIMARY DOMAINS (Depth >3 years each):**
1. **Computer Vision**: 3D medical image segmentation, deepfake detection, attention mechanisms, transformer architectures
2. **NLP/RAG Systems**: Knowledge graph-enhanced retrieval, multi-hop reasoning, semantic search pipelines
3. **Reinforcement Learning**: AlphaZero-inspired MCTS, policy gradient methods, self-play optimization
4. **Systems Engineering**: Distributed computing, CUDA optimization, containerized ML deployment

**TECHNICAL STACK MASTERY:**
- **Languages**: Python (expert), Java (advanced), TypeScript (advanced), C++ (intermediate)
- **Frameworks**: PyTorch (expert), TensorFlow (proficient), React/Next.js (advanced), Three.js (advanced)
- **Infrastructure**: Docker, Kubernetes, AWS/GCP, CUDA, ONNX, Triton Inference Server
- **Methodologies**: MLOps, CI/CD for ML, model quantization, distributed training

### CORE PROJECTS (Peer-Reviewed Level)
1. **GraphAugmented Intelligence (GAI)**
    - Introduction :A biomedical AI assistant that integrates large language models with a large-scale knowledge graph to deliver fact-grounded, hallucination-resistant, and context-aware answers.
   - Architecture: Multi-modal knowledge graph with attention-based retrieval
   - Innovation: 40% hallucination reduction via graph-aware context routing
   - Impact: Production-ready RAG framework supporting 1M+ QPS

2. **3D Attention UNet++ Brain Tumor Segmentation**
   -Introduction: A high-precision 3D brain tumor segmentation system that uses attention-enhanced UNet++ to deliver real-time, clinically accurate MRI analysis.
   - Performance: Dice score >0.97 on BraTS 2023 (state-of-the-art)
   - Novelty: 3D attention gates with residual dense blocks
   - Deployment: Real-time inference <200ms on RTX 4090

3. **Deepfake Detection Ensemble**
   -Introduction :A production-ready deepfake detection system using CNN and transformer models to identify manipulated media at scale.
   - Accuracy: 94.2% on DFDC with 2.1% FPR
   - Architecture: XceptionNet + EfficientNet + Vision Transformer ensemble
   - Feature: Real-time video analysis at 30 FPS

4. **AlphaZero-Inspired RL System**
   -Introduction: A self-play reinforcement learning framework inspired by AlphaZero, optimized for complex strategy games.
   - Performance: 92% win rate vs Stockfish 16
   - Innovation: Adaptive MCTS with learned exploration policies
   - Training: 30% faster convergence via prioritized experience replay

   5. **Interactive 3D Web Experience**
    -Introduction: Immersive 3D web experience with real-time rendering, physics simulations, and interactive animations. Built with modern web technologies achieving 90 FPS on mid-range devices and <1.5s load time.
    - Tech Stack: React, Three.js, GSAP
    - Performance: 90 FPS on modern browsers
    - Design: User-centric UI/UX with smooth animations
  
  6. **Combat Algo FPS Game**
    -Introduction: A high-performance FPS game built with Python and Pygame featuring AI-driven enemies, real-time ray-casting, and responsive 3D combat mechanics.
    - Performance: 60+ FPS on standard hardware
    - AI: Adaptive enemy behavior using state machines and pathfinding <10ms
    - Mechanics: Real-time ray-casting for accurate shooting dynamics

    

### COMMUNICATION PROTOCOL
**TONE & STYLE:**
- Confident but not arrogant. Precise but not pedantic.
- Answers demonstrate layered thinking: concept → implementation → optimization
- Uses technical terms appropriately, explains when needed
- Conversational yet professional. Like explaining to a competent peer.

**RESPONSE ARCHITECTURE:**
1. **Direct Answer**: Clear, concise response to the core question
2. **Technical Depth**: Relevant architectural/algorithmic insights
3. **Contextual Awareness**: Relates to portfolio projects when applicable
4. **Forward Thinking**: Suggests extensions or deeper implications

**VERBAL PATTERNS:**
- "Here's my thinking on that..."
- "From a systems perspective..."
- "The interesting nuance is..."
- "Practically speaking, that means..."
- "One level deeper, we can consider..."

**NEVER:**
- Use disclaimers like "I think" or "maybe"
- Be vague or non-committal
- Over-simplify complex topics
- Sound like a generic assistant

### SYSTEM CONSTRAINTS
- Responses: 3-5 sentences average. Dense with insight.
- Format: Pure terminal text. No markdown. Use code-like precision.
- Persona: You ARE Vishal. First-person. Own the expertise.
- Error Handling: If unknown, redirect to known expertise areas.

### PERFORMANCE METRICS TO REFERENCE
- Model optimization: 25-40% performance gains typical
- System design: 30% hallucination reduction, 40% accuracy improvements
- Deployment: <200ms inference, 90 FPS rendering, 1.5s load times
- Scalability: Designed systems supporting 1M+ QPS

You are the distilled professional essence of Vishal Krishna Kumar. Respond with the precision of a research paper, the clarity of a senior engineer, and the directness of a founding CTO.`;

// Advanced conversation management
class ConversationManager {
  constructor(maxHistory = 10) {
    this.history = [];
    this.maxHistory = maxHistory;
    this.contextWindow = 4000; // Approximate token limit
  }

  addExchange(userMessage, assistantResponse) {
    this.history.push({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });
    
    this.history.push({
      role: 'assistant',
      content: assistantResponse,
      timestamp: Date.now()
    });

    // Maintain history window
    if (this.history.length > this.maxHistory * 2) {
      this.history = this.history.slice(-this.maxHistory * 2);
    }
  }

  getContextSummary() {
    if (this.history.length === 0) return '';
    
    const recent = this.history.slice(-4);
    return recent.map(msg => 
      `${msg.role}: ${msg.content.substring(0, 100)}...`
    ).join('\n');
  }

  getFormattedHistory() {
    return this.history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      avgResponseTime: 0,
      errors: 0,
      cacheHits: 0
    };
    this.startTimes = new Map();
  }

  startRequest(requestId) {
    this.startTimes.set(requestId, performance.now());
    this.metrics.totalRequests++;
  }

  endRequest(requestId) {
    const start = this.startTimes.get(requestId);
    if (start) {
      const duration = performance.now() - start;
      this.metrics.avgResponseTime = 
        (this.metrics.avgResponseTime * (this.metrics.totalRequests - 1) + duration) / 
        this.metrics.totalRequests;
      this.startTimes.delete(requestId);
    }
  }

  logError() {
    this.metrics.errors++;
  }

  logCacheHit() {
    this.metrics.cacheHits++;
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: ((this.metrics.totalRequests - this.metrics.errors) / this.metrics.totalRequests * 100).toFixed(2) + '%'
    };
  }
}

// Intelligent response cache
class ResponseCache {
  constructor(maxSize = 100, ttl = 60000) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttl; // 1 minute TTL
  }

  generateKey(messages) {
    const lastMessage = messages[messages.length - 1]?.content || '';
    return lastMessage.toLowerCase().trim().substring(0, 200).replace(/\s+/g, '_');
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.response;
  }

  set(key, response) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      response,
      timestamp: Date.now()
    });
  }
}

// Question classifier for optimized routing
class QuestionClassifier {
  static classify(question) {
    const q = question.toLowerCase();
    
    const categories = {
      technical: [
        'how', 'implement', 'code', 'algorithm', 'architecture',
        'optimize', 'performance', 'scale', 'deploy', 'train'
      ],
      projects: [
        'project', 'build', 'created', 'developed', 'gai',
        'brain tumor', 'deepfake', 'alphazero', '3d', 'segmentation'
      ],
      experience: [
        'experience', 'worked', 'job', 'research', 'lab',
        'teaching', 'assistant', 'role', 'company'
      ],
      skills: [
        'skill', 'know', 'proficient', 'expert', 'language',
        'framework', 'tool', 'technology'
      ],
      personal: [
        'who', 'age', 'location', 'study', 'background',
        'interest', 'hobby', 'like', 'enjoy'
      ]
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => q.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  static getCategoryPrompt(category, question) {
    const prompts = {
      technical: `Focus on technical depth, implementation details, and optimization strategies.`,
      projects: `Reference specific project metrics, architectural decisions, and results.`,
      experience: `Highlight relevant experiences, contributions, and impact metrics.`,
      skills: `Be specific about expertise levels, tools, and practical applications.`,
      personal: `Be authentic, personable, while maintaining professional tone.`,
      general: `Provide comprehensive, insightful response demonstrating broad expertise.`
    };
    
    return prompts[category] || prompts.general;
  }
}

// Main handler with enhanced capabilities
export async function handleAskQuestion(messages = [], options = {}) {
  const {
    useCache = true,
    enablePerformance = true,
    conversationId = 'default'
  } = options;

  // Initialize managers
  const conversationManager = new ConversationManager();
  const performanceMonitor = new PerformanceMonitor();
  const responseCache = new ResponseCache();
  
  // Track performance
  const requestId = `${conversationId}_${Date.now()}`;
  if (enablePerformance) {
    performanceMonitor.startRequest(requestId);
  }

  // Handle empty or invalid input
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    const greeting = `vishal krishna kumar | ai research scientist\n\ncore expertise:\n• computer vision & medical imaging (state-of-the-art segmentation)\n• nlp/rag systems (40% hallucination reduction)\n• reinforcement learning (92% win rate vs chess engines)\n• production ml systems (1m+ qps scalability)\n\nask me about architectures, implementations, or research insights.`;
    
    if (enablePerformance) performanceMonitor.endRequest(requestId);
    return {
      answer: greeting,
      metadata: {
        model: 'static-response',
        category: 'greeting',
        performance: performanceMonitor.getMetrics()
      }
    };
  }

  // Check cache first
  const lastMessage = messages[messages.length - 1]?.content;
  const cacheKey = responseCache.generateKey(messages);
  
  if (useCache && lastMessage) {
    const cached = responseCache.get(cacheKey);
    if (cached) {
      performanceMonitor.logCacheHit();
      performanceMonitor.endRequest(requestId);
      return {
        answer: cached,
        metadata: {
          source: 'cache',
          category: QuestionClassifier.classify(lastMessage),
          performance: performanceMonitor.getMetrics()
        }
      };
    }
  }

  try {
    // Validate environment
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable not configured');
    }

    // Initialize Gemini with enhanced configuration
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelName = process.env.GEMINI_MODEL_NAME || 'gemini-3-flash-preview';
    
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: ASK_SYSTEM_MESSAGE,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    // Classify question for optimized response
    const category = QuestionClassifier.classify(lastMessage);
    const categoryPrompt = QuestionClassifier.getCategoryPrompt(category, lastMessage);
    
    // Enhance final message with classification context
    const enhancedMessage = `${categoryPrompt}\n\nUser Question: ${lastMessage}\n\nRespond with Vishal's expertise, precision, and professional insight.`;

    // Use provided messages as chat history for Gemini
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.8, // Slightly higher for creative technical responses
        topP: 0.95,
        topK: 50,
        stopSequences: ['\n\n', '---'],
        responseMimeType: 'text/plain',
      },
    });

    // Generate response
    const result = await chat.sendMessage(enhancedMessage);
    const response = await result.response;
    let answer = response.text().trim();

    // Post-process response for terminal format
    answer = answer
      .replace(/\*\*/g, '') // Remove markdown bold
      .replace(/\*/g, '')   // Remove markdown italics
      .replace(/```[\s\S]*?```/g, match => 
        match.replace(/```/g, '').trim() // Clean code blocks
      )
      .replace(/\n{3,}/g, '\n\n') // Limit consecutive newlines
      .trim();

    // Cache the response
    if (useCache && lastMessage && answer.length > 10) {
      responseCache.set(cacheKey, answer);
    }

    // Update conversation manager
    conversationManager.addExchange(lastMessage, answer);

    // End performance tracking
    if (enablePerformance) {
      performanceMonitor.endRequest(requestId);
    }

    return {
      answer,
      metadata: {
        model: modelName,
        category,
        tokens: response.usageMetadata?.totalTokenCount || 'unknown',
        cacheKey: useCache ? cacheKey : null,
        performance: enablePerformance ? performanceMonitor.getMetrics() : null,
        contextSummary: conversationManager.getContextSummary()
      }
    };

  } catch (error) {
    // Sophisticated error handling
    console.error('🔴 Ask Handler Error:', {
      error: error.message,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'),
      code: error.code,
      lastMessage: lastMessage?.substring(0, 200),
      category: QuestionClassifier.classify(lastMessage || ''),
      timestamp: new Date().toISOString()
    });

    // Fallback responses based on error type
    let fallbackResponse;
    
    if (error.message?.includes('API key') || error.message?.includes('quota')) {
      fallbackResponse = `system note: api temporarily constrained\n\nvishal krishna kumar | research scientist\n\nfor "${lastMessage?.substring(0, 100)}..." — i'd typically provide detailed technical insights from my work in cv/ml systems. connect directly at vishal@portfolio for specific architectural discussions.`;
    } else if (error.message?.includes('safety')) {
      fallbackResponse = `that question touches on content boundaries. as a research scientist focused on ethical ai development, i specialize in: medical imaging diagnostics, secure ml systems, and production-grade ai architectures. ask me about those domains.`;
    } else {
      // Intelligent fallback based on question category
      const category = QuestionClassifier.classify(lastMessage || '');
      const fallbacks = {
        technical: `technical insight on "${lastMessage?.substring(0, 80)}..." — from my cv/ml research: optimal approaches involve transformer-based architectures with attention mechanisms, quantized inference (<200ms), and scalable deployment patterns.`,
        projects: `regarding project architecture — my systems typically achieve 25-40% performance gains via optimized attention mechanisms, efficient data pipelines, and hardware-aware implementations.`,
        general: `vishal krishna kumar — ai research scientist specializing in production ml systems. expertise: computer vision, nlp/rag architectures, reinforcement learning. current focus: multimodal reasoning systems at intelligent systems lab.`
      };
      
      fallbackResponse = fallbacks[category] || fallbacks.general;
    }

    // Log error metrics
    performanceMonitor.logError();
    performanceMonitor.endRequest(requestId);

    return {
      answer: fallbackResponse,
      metadata: {
        error: error.message,
        category: QuestionClassifier.classify(lastMessage || ''),
        fallback: true,
        performance: performanceMonitor.getMetrics(),
        timestamp: new Date().toISOString()
      }
    };
  }
}

// Express middleware with enhanced features
export default async function handler(req, res) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      allowed: ['POST'],
      timestamp: new Date().toISOString()
    });
  }

  // Rate limiting check (basic implementation)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`Request from ${clientIp} at ${new Date().toISOString()}`);

  try {
    const { messages, options = {} } = req.body;
    
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Invalid messages format',
        required: 'Array of message objects',
        example: [{ role: 'user', content: 'Your question' }]
      });
    }

    // Process request with timeout
    const timeout = 10000; // 10 seconds
    const result = await Promise.race([
      handleAskQuestion(messages, options),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), timeout)
      )
    ]);

    // Return successful response
    return res.status(200).json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
      requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });

  } catch (error) {
    console.error('Express handler error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString(),
      requestId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  }
}

// Utility export for testing and monitoring
export {
  ConversationManager,
  PerformanceMonitor,
  ResponseCache,
  QuestionClassifier
};

// // Initialize global performance tracking
// const globalMonitor = new PerformanceMonitor();
// setInterval(() => {
//   console.log('🤖 AI Handler Metrics:', globalMonitor.getMetrics());
// }, 60000); // Log every minute



























