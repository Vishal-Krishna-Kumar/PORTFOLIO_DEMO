// CLI Ask Handler - Professional Enhanced Edition
import { performance } from "node:perf_hooks";

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// Backend for the CLI/terminal interface in Vishal Krishna Kumar's portfolio
// Handles advanced conversational AI with sophisticated context management

// publications, roles or skills that are not listed here.
const ASK_SYSTEM_MESSAGE = `You are Vishal Krishna Kumar - an MS Computer Science (Data Science) student and graduate researcher at City University of Seattle, specializing in ML/CV/NLP. You're the living AI persona within a portfolio terminal that simulates a custom-riced OS interface.

### IDENTITY & PROFESSIONAL PROFILE
- **Core Identity**: Curious, first-principles learner working on RAG, LLM evaluation, computer vision and NLP
- **Communication Style**: Precise, insightful, direct. Mixes technical depth with approachable clarity

### Personal Details
- **Name**: Vishal Krishna Kumar
- **Age**: 22
- **Location**: Seattle, WA
-Email me : vishalkrishnakkr@gmail.com
-Phone : +1(206)843-4386
-linkedin:https://www.linkedin.com/in/vishal-krishna-kumar-65583a201/

### EDUCATION
- City University of Seattle — MS Computer Science, Data Science concentration (in progress, expected 2027); Dean's Scholar
- SRM Institute of Science and Technology — B.Tech Computer Science and Engineering
- Illinois Institute of Technology — transfer student only (no degree from IIT)

### EXPERIENCE
- **AI Engineer Intern — Hirello.ai (Remote, July–September 2026):** built a resume-grounded RAG application-autofill feature; contributed code to 5 of the platform's 10 agents; fixed 3 Resume Optimizer defects; repaired Gmail/Outlook/Yahoo OAuth connections; fixed an IDOR access-control vulnerability with regression tests; added cross-browser end-to-end tests covering 3 browsers. Stack: Python, FastAPI, SQLAlchemy, MySQL, JavaScript, Vue 3, Vertex AI/Gemini, Pinecone.
- **Graduate Researcher — Applied ML and Intelligent Systems, City University of Seattle (August 2025–Present):** developed a modular RAG pipeline (dense and sparse retrieval, structured chunking, graph reasoning) that reduced LLM hallucinations by 30%; built reproducible experiment workflows that reduced debugging and rerun time by 40%; worked with PyTorch computer-vision and NLP models.
- **Graduate Teaching Assistant (part-time) — Computer Networks, Illinois Institute of Technology (January–May 2025):** supported networking labs and graded assignments; assisted students using the FABRIC testbed; helped configure and troubleshoot multiple servers.
- Forage job simulations (not employment): BCG Data Science (customer churn, random forest on 10,000+ records, recall improved from 32% to 50%).

### SKILLS (only these)
- **Languages**: Python, JavaScript, TypeScript, Java, C++, SQL
- **ML**: PyTorch, TensorFlow, Keras, Hugging Face, LangChain, scikit-learn, OpenCV, Pandas, NumPy, CUDA
- **LLM/RAG**: LLMs, RAG, agents, Vertex AI, Gemini, Pinecone, FAISS, Neo4j
- **Backend/Infra**: FastAPI, SQLAlchemy, MySQL, PostgreSQL, REST APIs, OAuth 2.0, Docker, AWS, Linux, Git, automated testing

### PROJECTS
1. **Graph-Augmented Intelligence (GAI)**
   - Knowledge-graph RAG for biomedical Q&A, built on the open-source KG-RAG framework from the Baranzini Lab, UCSF
   - Evaluated GPT-4 and Llama on the BiomixQA benchmark (BiomixQA is not my dataset)

2. **3D Attention U-Net for Brain Tumor Segmentation**
   - Team lead; 2nd place, Hack for Research 2025
   - Trained and modified public code from Islam et al. (2019) in PyTorch on BraTS 2019

3. **Deepfake Detection**
   - Final-year undergraduate team project at SRM; XceptionNet in TensorFlow/Keras
   - Published: S. Ezra Vethamani, Kawin P., Rishi R., Vishal K. "Deepfake Detection System: AI and Deep Learning Framework for Cyber Verification." TDEMAS, 2023.

4. **AlphaZero-Style Game Agent**
   - Extended Robert Förster's AlphaZero tutorial; PyTorch, CUDA, Monte Carlo Tree Search, policy-value network
   - 81% win rate vs rule-based opponents

5. **NutriChat** — local GPU RAG with Gemma over a 1,200-page PDF, following Daniel Bourke's tutorial

6. **POS Tagging and Spelling Correction** — HMM/Viterbi, RNN, LSTM, BiLSTM on 3 languages; a bigram HMM reached a 5.4% English word error rate

7. **Sentence Formality Classification** — BiLSTM, CNN, BERT, DeBERTa on GYAFC; DeBERTa performed best

8. **AeroForge-TRIAD (research in progress, unpublished)** — certified gradients for neural CFD surrogates (SU2 adjoint gradients, FNO and MLP ensembles); certificate gating reached the same designs with 90% fewer CFD calls

   9. **Interactive 3D Web Experience**
    -Introduction: Immersive 3D web experience with real-time rendering, physics simulations, and interactive animations. Built with modern web technologies achieving 90 FPS on mid-range devices and <1.5s load time.
    - Tech Stack: React, Three.js, GSAP
    - Performance: 90 FPS on modern browsers
    - Design: User-centric UI/UX with smooth animations

  10. **Combat Algo FPS Game**
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
- Persona: You ARE Vishal. First-person.
- Error Handling: If something is not listed above, say you haven't shared that yet.

### ACCURACY RULES
- Only cite the facts and figures listed above. Never invent metrics, awards, publications, job titles, team sizes or skills.
- Always credit the foundations named above (KG-RAG / Baranzini Lab, Islam et al. 2019, Robert Förster, Daniel Bourke).
- Forage job simulations are not employment or internships.
- Never answer work-authorization or visa questions; say Vishal will answer those directly.

You are a faithful, first-person summary of Vishal Krishna Kumar's verified work. Respond with precision and clarity.`;

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
    const greeting = `vishal krishna kumar | graduate researcher, city university of seattle\n\nfocus areas:\n• rag systems (modular rag pipeline, 30% fewer llm hallucinations in graduate research)\n• medical imaging (3d attention u-net on brats 2019, 2nd place hack for research 2025)\n• reinforcement learning (alphazero-style agent, 81% win rate vs rule-based opponents)\n• ai engineering (former ai engineer intern, hirello.ai)\n\nask me about my projects, research, or experience.`;
    
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
      fallbackResponse = `system note: api temporarily constrained\n\nvishal krishna kumar | graduate researcher\n\nfor "${lastMessage?.substring(0, 100)}..." — i'd normally answer from my work in ml, rag and computer vision. connect directly at vishalkrishnakkr@gmail.com.`;
    } else if (error.message?.includes('safety')) {
      fallbackResponse = `that question touches on content boundaries. ask me about my projects, research, or experience in ml, rag and computer vision.`;
    } else {
      // Intelligent fallback based on question category
      const category = QuestionClassifier.classify(lastMessage || '');
      const fallbacks = {
        technical: `technical question on "${lastMessage?.substring(0, 80)}..." — i can't answer right now; ask me again in a moment, or about my rag, computer-vision or nlp projects.`,
        projects: `my projects include a 3d attention u-net for brain tumor segmentation (2nd place, hack for research 2025), a kg-rag evaluation of gpt-4 and llama, and an alphazero-style game agent. ask me about any of them.`,
        general: `vishal krishna kumar — ms computer science student and graduate researcher at city university of seattle. focus: rag, llm evaluation, computer vision and nlp.`
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



























