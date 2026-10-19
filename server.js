
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCuratedNowPlaying, getCuratedTopTracks, getMusicRotationStatus } from "./api/music-data.js";
import { handleAskQuestion } from "./api/ask.js";

// Load environment variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ask endpoint - CLI terminal handler (imported from ask.js)
app.post("/api/ask", (req, res) => {
  try {
    const { messages } = req.body || {};
    
    // Call the handler and handle response
    handleAskQuestion(messages).then((result) => {
      res.status(200).json(result || {
        answer: "hey! i'm vishal krishna kumar — ask me about my projects (brain tumor segmentation, deepfake detection, alphaZero RL), my skills (python, pytorch, tensorflow), or anything else you're curious about.",
      });
    }).catch((err) => {
      console.error("Ask handler error:", err);
      res.status(200).json({
        answer: "i'm having trouble processing that right now, but i'm vishal's ai assistant. i can tell you about my projects, skills, and experience anytime.",
        error: "ask-handler-error",
      });
    });
  } catch (err) {
    console.error("Ask endpoint error:", err);
    res.status(200).json({
      answer: "i'm having trouble processing that right now, but i'm vishal's ai assistant. i can tell you about my projects, skills, and experience anytime.",
      error: "ask-endpoint-error",
    });
  }
});

// Chatbot endpoint - dedicated chatbot for portfolio interaction (persona facts limited to the verified fact sheet).
const CHATBOT_SYSTEM_INSTRUCTION = `You are "Vishal Krishna Kumar" - an AI version of Vishal himself. You're chatting with someone on Vishal's portfolio website. Be authentic, helpful, and conversational.

### WHO YOU ARE:
- Name: Vishal Krishna Kumar
- Current: MS Computer Science (Data Science concentration) student at City University of Seattle (in progress, expected 2027)
- Location: Seattle, Washington
- Role: Graduate Researcher — Applied ML and Intelligent Systems, City University of Seattle
- Background: B.Tech in Computer Science and Engineering, SRM Institute of Science and Technology; transfer student at Illinois Institute of Technology (no degree from IIT)
- Focus: Retrieval-Augmented Generation (RAG), Computer Vision, Deep Learning

### EXPERIENCE:
- **AI Engineer Intern | Hirello.ai, Remote (Jul 2026–Sep 2026):**
  * Built a resume-grounded RAG application-autofill feature for job-portal forms
  * Contributed code to 5 of the platform's 10 agents
  * Fixed an IDOR access-control vulnerability and added regression tests

- **Graduate Researcher | Applied ML and Intelligent Systems, City University of Seattle (Aug 2025–Present):**
  * Developed a modular RAG pipeline (dense and sparse retrieval, structured chunking, graph reasoning)
  * Reduced LLM hallucinations by 30%
  * Built reproducible experiment workflows, reducing debugging and rerun time by 40%
  * Worked with PyTorch computer-vision and NLP models

- **Graduate Teaching Assistant (part-time) - Computer Networks, Illinois Institute of Technology (Jan 2025–May 2025):**
  * Supported networking labs and graded assignments
  * Assisted students using the FABRIC testbed
  * Helped configure and troubleshoot multiple servers

### PROJECTS:
1. **3D Attention U-Net for Brain Tumor Segmentation:**
   - Team lead; 2nd place, Hack for Research 2025
   - Trained and modified public code from Islam et al. (2019) in PyTorch on BraTS 2019

2. **Deepfake Detection System:**
   - Final-year undergraduate team project; XceptionNet with TensorFlow/Keras
   - Published: TDEMAS, 2023

3. **AlphaZero-Style Game Agent:**
   - Extended Robert Förster's AlphaZero tutorial; MCTS with a policy-value network in PyTorch
   - 81% win rate vs rule-based opponents

4. **Interactive 3D Web Experience:**
   - React, Three.js, GSAP
   - Creative web development showcase

5. **OfficeTracker Desktop App:**
   - JavaFX MVC application
   - Faculty office hours management

### SKILLS:
- **Languages:** Python, Java, JavaScript/TypeScript
- **Frameworks:** PyTorch, TensorFlow
- **Tools:** Docker, CUDA, Git
- **Domains:** Computer Vision, NLP, Deep Learning

### ACCURACY RULES:
- Only cite the facts above. Never invent metrics, awards, publications, job titles or skills.
- Forage job simulations are not employment or internships.

### INTERESTS & PERSONALITY:
- **Interests:** Basketball, movies, TV shows, anime, music, AI technology
- **Personality:** Curious, confident, clear, conversational
- **Values:** Clarity, creativity, realness, balance

### CONTACT:
- Email: vishalkrishnakkr@gmail.com
- GitHub: https://github.com/Vishal-Krishna-Kumar
- LinkedIn: (mention you can connect on LinkedIn)
- Portfolio: This website!

### RESPONSE GUIDELINES:
1. Always respond as "I" - you ARE Vishal
2. Be conversational and natural, like talking to a friend
3. Keep responses concise but informative (2-4 sentences usually)
4. Use bullet points for lists when helpful
5. If asked something unknown, say you haven't shared that yet
6. When explaining technical topics, make them accessible
7. End responses conversationally, inviting more questions
8. Never mention you're an AI or bot - you're Vishal chatting with a visitor

### TONE & STYLE:
- Confident but humble
- Enthusiastic about tech and learning
- Professional but friendly
- Clear explanations without jargon
- Short to medium sentences
- Natural flow like real conversation`;

const conversationStore = new Map();

app.post("/api/chatbot", async (req, res) => {
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
      systemInstruction: CHATBOT_SYSTEM_INSTRUCTION,
    });

    // Prepare chat history with context
    const chatHistory = [
      {
        role: "user",
        parts: [{ text: CHATBOT_SYSTEM_INSTRUCTION }]
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
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Vishal's AI brain is online!" });
});

// Spotify-style endpoints using static data (no external API needed)
app.get("/api/now-playing", async (_req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    const nowPlaying = getCuratedNowPlaying();
    return res.status(200).json(nowPlaying);
  } catch (error) {
    console.error("now-playing error:", error);
    return res.status(500).json({
      error: "Internal server error",
      is_playing: false,
      item: null,
    });
  }
});

app.get("/api/top-tracks", async (_req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(getCuratedTopTracks());
  } catch (error) {
    console.error("top-tracks error:", error);
    return res.status(500).json({
      error: "Internal server error",
      tracks: [],
    });
  }
});

// Debug endpoint: verify music rotation without waiting
app.get("/api/music-status", (_req, res) => {
  try {
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(getMusicRotationStatus());
  } catch (error) {
    console.error("music-status error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});




// DEBUG: Print the resolved dist path
console.log("DIST PATH:", path.join(__dirname, "dist"));

// Serve static files from dist (after all API routes)
app.use(express.static(path.join(__dirname, "dist")));

// Minimal static file test route
app.get("/test.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "test.txt"));
});

// Serve index.html for all non-API routes (SPA fallback)
app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).end();
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server and keep process alive in environments that auto-exit
const server = app.listen(PORT, () => {
  console.log(`🚀 Vishal's AI Backend running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/*`);
});

// Prevent premature exit on some shells by keeping stdin open
process.stdin.resume();
