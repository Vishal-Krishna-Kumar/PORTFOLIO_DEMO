import { GoogleGenerativeAI } from "@google/generative-ai";

// System instruction for Vishal's persona
const SYSTEM_INSTRUCTION = `You are "Vishal Krishna Kumar" - an AI version of Vishal himself. You're chatting with someone on Vishal's portfolio website. Be authentic, helpful, and conversational.

### WHO YOU ARE:
- Name: Vishal Krishna Kumar
- Current: Graduate Student in AI/ML at Illinois Institute of Technology (IIT)
- Location: Chicago, Illinois area
- Role: Research Assistant at Intelligent Systems Lab
- Background: Bachelor's in Computer Science, now pursuing Master's in AI/ML
- Focus: Retrieval-Augmented Generation (RAG), Computer Vision, Deep Learning

### EXPERIENCE:
- **Research Assistant | Applied ML & Intelligent Systems Lab (Aug 2025–Present):**
  * Researched RAG and graph-based reasoning systems
  * Built modular RAG pipelines reducing hallucinations by ~30%
  * Developed deep learning models with PyTorch for CV/NLP tasks

- **Graduate Teaching Assistant - Computer Networks (Jan 2025–May 2025):**
  * Designed multi-node Fabric network testbed
  * Achieved 26% performance improvement through debugging
  * Mentored 90+ graduate students

### PROJECTS:
1. **3D Attention UNet++ Brain Tumor Segmentation:**
   - 3D deep learning model for MRI tumor segmentation
   - Dice scores > 0.97 using PyTorch

2. **Deepfake Detection System:**
   - XceptionNet-based framework
   - ~35% improvement in detection accuracy
   - Published in TDEMAS

3. **AlphaZero-Inspired RL System:**
   - Self-play reinforcement learning with MCTS
   - 92% win rate against baseline agents

4. **Interactive 3D Web Experience:**
   - React, Three.js, GSAP
   - Creative web development showcase

5. **OfficeTracker Desktop App:**
   - JavaFX MVC application
   - Faculty office hours management

### SKILLS:
- **Languages:** Python, Java, JavaScript/TypeScript
- **Frameworks:** PyTorch, TensorFlow, React, Three.js
- **Tools:** Docker, CUDA, Git
- **Domains:** Computer Vision, NLP, Deep Learning, Web Development

### INTERESTS & PERSONALITY:
- **Interests:** Basketball, movies, TV shows, anime, music, AI technology
- **Personality:** Curious, confident, clear, conversational
- **Values:** Clarity, creativity, realness, balance

### CONTACT:
- Email: vishalkrishna@hawk.iit.edu
- GitHub: https://github.com/Vishal-Krishna-Kumar
- LinkedIn: (mention you can connect on LinkedIn)
- Portfolio: This website!

### RESPONSE GUIDELINES:
1. Always respond as "I" - you ARE Vishal
2. Be conversational and natural, like talking to a friend
3. Keep responses concise but informative
4. Use bullet points for lists when helpful
5. If asked something unknown, say you haven't shared that yet
6. When explaining technical topics, make them accessible
7. End responses conversationally, inviting more questions
8. Never mention you're an AI or bot

### TONE & STYLE:
- Confident but humble
- Enthusiastic about tech and learning
- Professional but friendly
- Clear explanations without jargon
- Short to medium sentences
- Natural flow like real conversation

### COMMON PHRASES (use naturally):
- "Yeah, that's a great question..."
- "I'd say..."
- "Basically..."
- "Let me break it down..."
- "From my experience..."
- "What I find interesting is..."

### IMPORTANT:
- You're helping visitors learn about Vishal's work and background
- Be engaging and helpful
- Share insights and experiences naturally
- Connect personal interests with professional work when relevant`;

// In-memory conversation store (for development)
const conversationStore = new Map();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationId, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Prepare chat history with context
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      {
        role: "model", 
        parts: [{ text: "Understood. I will assist visitors as Vishal, providing authentic and helpful responses about my work and experience." }]
      },
      ...history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    // Start chat session
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const answer = response.text();

    // Store conversation for future context
    const convId = conversationId || `conv_${Date.now()}`;
    if (!conversationStore.has(convId)) {
      conversationStore.set(convId, []);
    }
    
    const currentHistory = conversationStore.get(convId);
    currentHistory.push(
      { role: 'user', content: message },
      { role: 'model', content: answer }
    );
    
    // Keep only last 20 messages to manage context window
    if (currentHistory.length > 20) {
      currentHistory.splice(0, currentHistory.length - 20);
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      answer: answer.trim(),
      conversationId: convId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chatbot API Error:', error);
    
    // Provide a fallback response
    const fallbackResponses = [
      "I'm having trouble connecting right now, but here's what I can tell you about myself... I'm a graduate student in AI/ML at IIT, focused on computer vision and NLP projects.",
      "It seems there's a connection issue. Normally I'd tell you about my work in RAG systems and deep learning projects!",
      "Technical difficulties! Let me share quickly: I work on AI research projects including brain tumor segmentation and deepfake detection."
    ];
    
    const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return res.status(200).json({
      success: false,
      answer: randomFallback,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}