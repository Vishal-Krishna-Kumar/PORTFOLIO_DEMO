import type { Experience, Project } from "../types/indexs";

export const experiencesData: Experience[] = [

  {
    title: "[1] AI Engineer Intern — Hirello.ai",
    window: "Hirello.ai — Remote",
    date: "July 2026 – September 2026",
    description:
      "Built a resume-grounded RAG application-autofill feature for job-portal forms. Contributed code to 5 of the platform's 10 agents (Resume Optimizer, LinkedIn Labs, Outreach, Action Academy, Chat with Hiro). Fixed 3 Resume Optimizer defects (a five-page template, inconsistent fit scores, broken PDF export), repaired Gmail, Outlook and Yahoo OAuth connection problems, fixed an IDOR access-control vulnerability and added regression tests, and added cross-browser end-to-end tests covering 3 browsers. Worked in a 7-person product and engineering team across 10 one-week sprints.",
    image: "/hirello-1.png",
    role: "AI Engineer Intern",
    technologies: ["Python", "FastAPI", "SQLAlchemy", "MySQL", "JavaScript", "Vue 3", "Vertex AI/Gemini", "Pinecone"],
    achievements: [
      "Built a resume-grounded RAG application-autofill feature for job-portal forms",
      "Contributed code to 5 of the platform's 10 agents",
      "Fixed an IDOR access-control vulnerability and added regression tests",
      "Added cross-browser end-to-end tests covering 3 browsers"
    ],
  },

  {
    title: "[2] Graduate Researcher | Applied ML and Intelligent Systems",
    window: "City University of Seattle",
    date: "August 2025 – Present",
    description:
      "Developed a modular RAG pipeline using dense and sparse retrieval, structured chunking and graph reasoning, reducing LLM hallucinations by 30%. Built reproducible experiment workflows, reducing debugging and rerun time by 40%. Worked with PyTorch computer-vision and NLP models. Image credit: the workflow diagram shown is from Daniel Bourke's simple-local-rag tutorial (github.com/mrdbourke/simple-local-rag), not from this research.",
    image: "/lab_rag.png",
    role: "Graduate Researcher",
    technologies: ["PyTorch", "RAG", "Dense + sparse retrieval", "Graph reasoning"],
    achievements: [
      "Reduced LLM hallucinations by 30% with a modular RAG pipeline",
      "Reduced debugging and rerun time by 40% with reproducible experiment workflows"
    ],
    links: [
      {
        name: "Separate project: NutriChat (follows Daniel Bourke's simple-local-rag tutorial)",
        url: "https://github.com/Vishal-Krishna-Kumar/RAG-Pipeline"
      },

    ],

  },
  {
    title: "[3] Graduate Teaching Assistant (part-time) — Computer Networks",
    window: "Illinois Institute of Technology",
    date: "January 2025 – May 2025",
    description:
      "Supported networking labs and graded assignments. Assisted students using the FABRIC testbed. Helped configure and troubleshoot multiple servers.",
    image: "/graduate-assistant.jpg",
    role: "Graduate Teaching Assistant (part-time)",
    technologies: ["FABRIC testbed", "Computer networks"],
    achievements: [
      "Supported networking labs and graded assignments",
      "Assisted students using the FABRIC testbed",
      "Helped configure and troubleshoot multiple servers"
    ],
  },

  {
    title: "[4] Job simulation (Forage) — BCG Data Science",
    window: "Job simulation (Forage) — not employment",
    kind: "simulation",
    date: "January 2026",
    description:
      "Forage job simulation (not employment). Customer churn prediction: built a random forest on 10,000+ records and improved recall from 32% to 50%.",
    image: "/BCG.png",
    role: "Job simulation participant (Forage)",
    technologies: ["Python", "Pandas", "NumPy", "Random Forest"],
    achievements: [
      "Random forest on 10,000+ records",
      "Improved recall from 32% to 50%"
    ],
  },

  {
    title: "[5] Job simulation (Forage) — Walmart Advanced Software Engineering",
    window: "Job simulation (Forage) — not employment",
    kind: "simulation",
    date: "January 2026",
    description:
      "Forage job simulation (not employment). Implemented a heap data structure in Java for shipping workflows, produced a UML class diagram for a data processor supporting multiple operating modes and database connections, and designed an ER diagram for a new accounting database based on business requirements.",
    image: "/walmart-1.png",
    role: "Job simulation participant (Forage)",
    technologies: ["Java", "Data Structures", "UML", "ER Modeling"],
    achievements: [
      "Implemented a heap data structure in Java for shipping use-cases",
      "Designed a UML class diagram for a multi-mode data processor",
      "Created an ER diagram for a requirements-driven accounting database"
    ],
  },


  // {
  //   title: "[3] AI Research Intern | Deep Learning Applications",
  //   window: "Wisen Solutions",
  //   date: "June 2024 – August 2024",
  //   description:
  //     "Worked on deepfake detection systems using computer vision and deep learning. Implemented ResNet-50 and XceptionNet architectures for media forensics. Contributed to model optimization and deployment pipelines, achieving 94% detection accuracy on benchmark datasets.",
  //   image: "/deepfake-research.jpg",
  //   role: "AI Research Intern",
  //   technologies: ["TensorFlow", "OpenCV", "PyTorch", "AWS", "Flask"],
  //   achievements: [
  //     "Achieved 94% accuracy in deepfake detection",
  //     "Reduced false positive rate to 2.1%",
  //     "Optimized inference speed by 40%",
  //     "Contributed to research publication"
  //   ]
  // }
];

export const projectsData: Project[] = [
  {
    id: "oss-chunkaudit",
    title: "[1] chunkaudit — Auditing RAG Chunking (open source)",
    window: "How often does chunking cut the answer in half?",
    date: "November 2026",
    description:
      "An open-source Python tool that audits RAG chunking strategies. For each strategy it reports how often the text that answers a question is split across two chunks, and whether retrieval still returns a chunk that contains the whole answer. Offline and deterministic: no API keys, and NumPy is the only core dependency.",
    category: "Open source / RAG evaluation",
    status: "Active",
    featured: true,
    images: ["/chunkaudit-squad.png", "/chunkaudit-demo.png"],
    links: [
      { name: "GitHub", url: "https://github.com/Vishal-Krishna-Kumar/chunkaudit" },
      { name: "Write-up: how often chunking cuts the answer", url: "https://www.vishalkrishna.dev/blog/chunking-cuts-the-answer" },
      { name: "Write-up: chunk size depends on the retriever", url: "https://www.vishalkrishna.dev/blog/chunk-size-depends-on-retriever" }
    ],
    metrics: [
      { label: "SQuAD questions audited", value: "10,570", color: "blue", icon: "target" },
      { label: "Answers split by fixed 200-word chunks", value: "14.1%", color: "purple", icon: "activity" },
      { label: "Split rate with a 50-word overlap", value: "1.1%", color: "green", icon: "zap" }
    ],
    techStack: ["Python", "NumPy", "BM25", "sentence-transformers (optional)", "pytest", "GitHub Actions"],
    features: [
      "Four chunkers (fixed, sentence, paragraph, recursive) that keep character spans, so every hit is checked against the exact evidence position",
      "Reports answer split rate, Recall@k, MRR and context size for each strategy",
      "Finding: fixed 200-word chunks with no overlap split the answering sentence in 14.1% of 10,570 SQuAD questions; a 50-word overlap cut that to 1.1% and raised Recall@5 from 78.7% to 90.2%",
      "Finding: with an embedding retriever the ranking changes; ten-sentence chunks fall from first place to fifth, and 400-word chunks drop from 87.5% to 62.7% Recall@5",
      "--show-splits lists the answers a strategy cut, with the cut position marked",
      "83 tests, type checks and CI on Python 3.10 to 3.13; one merged outside contribution"
    ],
  },

  {
    id: "oss-ragbench",
    title: "[2] ragbench — Retrieval Benchmarking for RAG (open source)",
    window: "BM25, TF-IDF and hybrid retrieval from scratch",
    date: "November 2026",
    description:
      "An open-source retrieval benchmark for RAG. BM25, TF-IDF and hybrid Reciprocal Rank Fusion are implemented from scratch with NumPy and scored with standard IR metrics (Recall@k, MRR, graded nDCG) and latency. It ships a CLI, a FastAPI service and a Docker image.",
    category: "Open source / Information retrieval",
    status: "Active",
    featured: true,
    images: ["/ragbench-scifact.png"],
    links: [
      { name: "GitHub", url: "https://github.com/Vishal-Krishna-Kumar/ragbench" },
      { name: "Write-up: an inverted index in NumPy", url: "https://www.vishalkrishna.dev/blog/inverted-index-in-numpy" }
    ],
    metrics: [
      { label: "TF-IDF query latency", value: "216 ms → 0.22 ms", color: "green", icon: "zap" },
      { label: "Peak indexing memory", value: "4.1 GB → 123 MB", color: "blue", icon: "activity" },
      { label: "BM25 nDCG@10 on SciFact", value: "0.647", color: "purple", icon: "target" }
    ],
    techStack: ["Python", "NumPy", "FastAPI", "Docker", "GitHub Actions"],
    features: [
      "Measured on BEIR SciFact (5,183 documents, 300 queries): nDCG@10 of 0.647 for BM25, 0.612 for TF-IDF and 0.635 for the hybrid",
      "Moved both retrievers to an inverted index: TF-IDF query latency went from 216 ms to 0.22 ms and peak indexing memory from 4.1 GB to 123 MB, with identical top-10 results for all 300 queries",
      "CLI with table, Markdown, JSON and CSV output, plus a list of the queries each retriever gets wrong",
      "CI with lint, type checks, tests on Python 3.10 to 3.13, a package build and a container smoke test"
    ],
  },

  {
    id: "gai-001",
    // NOTE: App.tsx selects the GAI layout with title.includes('GraphAugmented Intelligence') — keep that phrase in the title.
    title: "[3] GraphAugmented Intelligence (GAI)",
    window: "Knowledge-Graph RAG for Biomedical Q&A (built on KG-RAG, Baranzini Lab, UCSF)",
    date: "September 2025",
    description: "Knowledge-graph retrieval-augmented generation (KG-RAG) for biomedical question answering, built on the open-source KG-RAG framework from the Baranzini Lab, UCSF. I evaluated GPT-4 and Llama on the BiomixQA benchmark. Credit: the KG-RAG framework is the Baranzini Lab's work; BiomixQA is an existing benchmark, not my dataset.",
    category: "AI/ML",
    status: "Active",
    featured: true,
    // Main schematic video for top section
    VideoDemo: "/KGRAG-1.mov",
    // Demo videos for bottom section.
    demoVideos: [
      {
        title: "Query Processing Without KG-RAG",
        url: "/KGRAGDEMO-1.mp4",
        description: "Demo from the KG-RAG project (Baranzini Lab, UCSF)",
        duration: "2:30"
      },
      {
        title: "Query Processing With KG-RAG",
        url: "/KGRAGDEMO-2.mp4",
        description: "Demo from the KG-RAG project (Baranzini Lab, UCSF)",
        duration: "3:15"
      },
      {
        title: "KG-RAG with GPT-4",
        url: "/GPT_DEMO-1.mp4",
        description: "Demo from the KG-RAG project (Baranzini Lab, UCSF)",
        duration: "4:20"
      }
    ],
    techStack: ["KG-RAG (Baranzini Lab, UCSF)", "GPT-4", "Llama", "BiomixQA (evaluation benchmark)"],
    architecture: [
      "Built on the open-source KG-RAG framework (Baranzini Lab, UCSF)",
      "Knowledge-graph retrieval-augmented generation for biomedical Q&A",
      "Evaluated GPT-4 and Llama on the BiomixQA benchmark"
    ],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/scoring-kg-rag-on-biomixqa" },
      { name: "GitHub Repository", url: "https://github.com/Vishal-Krishna-Kumar/GraphAugmented-Intelligence_GAI" },
      { name: "Upstream framework: KG-RAG (Baranzini Lab, UCSF)", url: "https://github.com/BaranziniLab/KG_RAG" }
    ],
    images: [],
  },





  {
    id: "medical-ai-002",
    // NOTE: App.tsx captions the video "3D MRI Segmentation Demo" when the title includes "Tumor" — keep that word.
    title: "[4] 3D Attention U-Net for Brain Tumor Segmentation",
    window: "Medical AI & Volumetric Segmentation",
    date: "June 2025",
    description:
      "2nd place, Hack for Research 2025 (team lead). Brain tumor segmentation on multimodal MRI from the BraTS 2019 dataset with a 3D Attention U-Net in PyTorch. I trained and modified public code from Islam et al. (2019); the architecture is theirs. Image credit: the gallery figures are from published papers — Islam et al. (2019) (BraTS 2019 results figure), a third-party 3D U-Net/CoT architecture figure, and Zhou et al. (2018) (UNet++ diagram) — credited to their authors; they are not my results.",
    category: "Healthcare AI",
    status: "Completed",
    featured: true,
    VideoDemo: "/3DUnet-2.mp4",
    images: [
      "/3DUnet.png",
      "/3DUnet-3.png",
      "/3DUnet-4.png",
    ],
    techStack: ["PyTorch", "3D Attention U-Net (Islam et al., 2019)", "BraTS 2019"],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/brats-3d-attention-unet-hackathon" },
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/BRaTS-attention-Tumor-Segmentation-UNet-",
        // icon: "github"
      },
      {
        name: "Base code: Islam et al. (2019) 3D Attention U-Net",
        url: "https://github.com/mobarakol/3D_Attention_UNet",
        // icon: "file-text"
      },

    ],
    recognition: [
      "2nd place, Hack for Research 2025"
    ]
  },




  
  
  {
    id: "deepfake-003",
    title: "[5] Deepfake Detection System",
    window: "AI & Media Forensics",
    date: "2023",
    description:
      "Final-year undergraduate team project at SRM Institute of Science and Technology: a deepfake detection system using XceptionNet, built with TensorFlow/Keras. Published as: S. Ezra Vethamani, Kawin P., Rishi R., Vishal K. \"Deepfake Detection System: AI and Deep Learning Framework for Cyber Verification.\" TDEMAS, 2023. Image credit: the animated demo is from the open-source PyDeepFakeDet toolkit (Fudan Vision and Learning Lab), not output of this project.",
    category: "Computer Vision",
    status: "Completed",
    featured: true,
    images: ["/DeepFake.gif"],
    techStack: ["TensorFlow", "Keras", "XceptionNet"],
    features: [
      "Deepfake detection with XceptionNet",
      "Built with TensorFlow/Keras",
      "Final-year undergraduate team project (SRM Institute of Science and Technology)"
    ],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/deepfake-detection-with-xception" },
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/DeepFake-Detection-System",
        // icon: "github"
      },

    ],
    recognition: "Published: TDEMAS, 2023"
  },








  {
    id: "rl-004",
    title: "[6] AlphaZero-Style Game Agent",
    window: "Deep Reinforcement Learning & Game AI",
    date: "December 2024",
    description:
      "AlphaZero-style game agent: self-play reinforcement learning with Monte Carlo Tree Search (MCTS) guided by a policy-value network, in PyTorch with CUDA. Extended Robert Förster's AlphaZero tutorial (the base implementation is his). Reached an 81% win rate vs rule-based opponents. Image credit: the gallery shows third-party illustrations (a CNN diagram, an Othello-agent figure, a figure on chess concepts in AlphaZero) and a screenshot of my separate ChessAI project; none shows this agent's results.",
    category: "Reinforcement Learning",
    status: "Completed",
    images: ["/AlphaZero-6.jpg", "/AlphaZero-2.png", "/AlphaZero-4.png", "/AlphaZero-5.png"],
    metrics: [
      { label: "Win rate vs rule-based opponents", value: "81%", color: "green", icon: "trophy" }
    ],
    techStack: ["PyTorch", "CUDA", "Monte Carlo Tree Search", "Policy-value network"],
    features: [
      "Self-play reinforcement learning",
      "Monte Carlo Tree Search guided by a policy-value network",
      "Built by extending Robert Förster's AlphaZero tutorial"
    ],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/alphazero-self-play-notes" },
      {
        name: "AlphaZero Chess",
        url: "https://github.com/Vishal-Krishna-Kumar/AlphaZero-Chess",
        // icon: "github"
      },
      {
        name: "Tutorial this builds on: Robert Förster's AlphaZeroFromScratch",
        url: "https://github.com/foersterrobert/AlphaZeroFromScratch",
      },
      {
        name: "Separate project: ChessAI (Pygame chess engine; not AlphaZero-based)",
        url: "https://github.com/Vishal-Krishna-Kumar/ChessAI",
        // icon: "github"
      },
    ],
    complexity: "High",
  },




  
  {
    id: "nlp-005",
    title: "[7] Multilingual POS Tagging & Context-Aware Spell Correction",
    window: "NLP Sequence Labeling & Linguistics",
    date: "September 2024",
    description:
      "Part-of-speech tagging and spelling correction across 3 languages (English, Japanese, Bulgarian). Compared a hidden Markov model tagger (Viterbi decoding) with RNN, LSTM, and BiLSTM taggers. A bigram HMM reached a 5.4% English word error rate.",
    category: "Natural Language Processing",
    status: "Active",
    images: ["/NLP-1.png", "/NLP-2.png", "/NLP-3.png"],
    metrics: [
      { label: "English word error rate (bigram HMM)", value: "5.4%", color: "green", icon: "target" },
      { label: "Languages", value: "3", color: "purple", icon: "globe" }
    ],
    techStack: ["Python", "HMM / Viterbi", "RNN", "LSTM", "BiLSTM"],
    features: [
      "HMM part-of-speech tagger with Viterbi decoding",
      "Neural taggers: RNN, LSTM, BiLSTM",
      "Spelling correction",
      "Evaluated on English, Japanese, and Bulgarian"
    ],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/hmm-vs-lstm-pos-tagging" },
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/nlp-sequence-labeling-autocorrection",
        // icon: "github"
      },
      {
        name: "Pos Tagging Data Analysis",
        url: "https://pos-engine.vishalkrishnakkr.workers.dev/blog/nlp-sequence-labeling-autocorrection/",
        // icon: "file-text"
      },
    ],
  },



  
  {
    id: "web-3d-006",
    title: "[8] Interactive 3D Web Gaming Site",
    window: "Frontend Engineering & 3D Graphics",
    date: "January 2026",
    description:
      "A scroll-driven gaming site in React and GSAP: full-screen video scenes, clip-path transitions and pointer-tilt cards. Built by following JavaScript Mastery's award-winning-website tutorial; the design it reproduces is by Zentry.",
    category: "Web Development",
    status: "Completed",
    VideoDemo: "/hero-4.mp4",
    images: ["/3dGamingSite-1.webp", "/3dGamingSite-2.webp", "/3dGamingSite-3.gif"],
    metrics: [
      { label: "Page Load Time", value: "< 1.5s", color: "green", icon: "zap" },
      { label: "FPS Performance", value: "90 FPS", color: "blue", icon: "activity" },
      { label: "Bundle Size", value: "12 MB", color: "purple", icon: "package" },
      { label: "Lighthouse Score", value: "98", color: "orange", icon: "bar-chart" }
    ],
    techStack: ["React", "GSAP", "ScrollTrigger", "Vite", "Tailwind CSS"],
    features: [
      "Scroll-triggered animations with GSAP ScrollTrigger",
      "Video scenes that swap with a clip-path transition",
      "Cards that tilt toward the pointer with CSS perspective",
      "Built by following JavaScript Mastery's award-winning-website tutorial; design by Zentry"
    ],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/scroll-driven-site-with-gsap" },
      {
        name: "Live Website",
        url: "https://3d-gamingsite.netlify.app/",
        // icon: "external-link"
      },
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/3D-GamingSite",
        // icon: "github"
      },
      // {
      //   name: "Case Study",
      //   url: "/3d-website-case-study.pdf",
      //   icon: "file-text"
      // },
      // {
      //   name: "Performance Report",
      //   url: "/performance-audit.pdf",
      //   icon: "bar-chart"
      // }
    ],
    teamSize: 1,
    performance: {
      "First Contentful Paint": "0.8s",
      "Time to Interactive": "1.2s",
      "Cumulative Layout Shift": "0.05",
      "SEO Score": "100/100"
    },
    impact: "Demonstrates cutting-edge web graphics capabilities"
  },



  {
  id: "desktop-007",
  title: "[9] Combat Algo FPS Game",
  window: "Game Development & AI Systems",
  date: "November 2023",
  description:
    "A high-performance Combat-style first-person shooter built with Python and Pygame, featuring AI-controlled enemies using shortest-path algorithms, intelligent spawn balancing, and real-time ray-casting for immersive 3D gameplay. Supports mouse-based camera control, WASD movement, and space-bar shooting with responsive combat mechanics.",

  category: "Game Development",
  status: "Completed",

  VideoDemo: "/3D-DEMO.mov",
  images: [
    "/Game-1.png",
    "/Game-2.png",
    "/Game-3.png"
  ],

  metrics: [
    { label: "Frame Rate", value: "60+ FPS", color: "green", icon: "zap" },
    { label: "Enemy AI Accuracy", value: "95%", color: "blue", icon: "brain" },
    { label: "Map Size", value: "10+ Zones", color: "purple", icon: "map" },
    { label: "Pathfinding Speed", value: "<10ms", color: "orange", icon: "activity" }
  ],

  techStack: [
    "Python",
    "Pygame",
    "Ray Casting",
    "Breadth-first search pathfinding",
    "OOP",
    "Vector Math",
    "Sprite projection"
  ],

  features: [
    "Mouse-controlled camera and keyboard-based movement (W, A, S, D)",
    "Space-bar shooting with weapon recoil and hit detection",
    "Enemies chase the player along the shortest path, found with breadth-first search on the map grid",
    "Dynamic enemy spawning to prevent overcrowding and unfair combat",
    "Real-time ray-casting engine for 3D world rendering",
    "Mini-map with live enemy and player tracking",
    "Health, ammo, and pickup systems",
    "Optimized collision detection and physics"
  ],

  links: [
      { name: "Write-up: what I did", url: "/#/blog/raycasting-fps-in-pygame" },
    {
      name: "GitHub Repository",
      url: "https://github.com/Vishal-Krishna-Kumar/Combat-Algo-Game",
      // icon: "github"
    },
    {
      name: "Play on itch.io",
      url: "https://vishalkrishna.itch.io/combat",
      // icon: "play"
    },
  ],

  teamSize: 1,
  architecture: "Modular game engine with Combat Algo, rendering, physics, and input systems",
  testing: "Manual gameplay testing with Combat Algorithm behavior validation and FPS profiling",
  impact: "Demonstrates real-time AI decision-making, optimized rendering, and professional-grade game architecture"
},

  {
    id: "research-008",
    title: "[10] AeroForge-TRIAD (research in progress)",
    window: "Certified Gradients for Neural CFD Surrogates",
    date: "In progress (status as of October 2026)",
    description:
      "Ongoing, unpublished research question: are neural-surrogate gradients much less accurate than predicted values, and can a guaranteed error bound (\"certificate\") on gradients stay valid along a whole optimiser run under distribution drift? Built a CFD pipeline on the SU2 solver (laminar flow, Re 1000) with exact adjoint gradients checked against finite differences (agreement within 0.12%). Surrogates: ensembles of 5 Fourier Neural Operator (FNO) and 5 MLP models. Hypotheses and decision rules were pre-registered before seeing data (protocols v1–v3).",
    category: "Research (in progress)",
    status: "Active",
    images: ["/aeroforge-02_cfd.png", "/aeroforge-06_train_end.png", "/aeroforge-08_gradients.png", "/aeroforge-09_results.png"],
    links: [
      { name: "Write-up: what I did", url: "/#/blog/aeroforge-certified-gradients" },
      { name: "GitHub Repository", url: "https://github.com/Vishal-Krishna-Kumar/AeroForge-TRIAD" }
    ],
    demoVideos: [
      {
        title: "Training the transonic surrogate (V3, M = 0.70)",
        url: "/aeroforge-training-v3.mp4",
        description: "An FNO ensemble learning transonic flow over airfoils, made from the logged training runs"
      },
      {
        title: "How the run-level certificate works",
        url: "/aeroforge-certificate-toy.mp4",
        description: "A 2-D toy illustration, not CFD and not a result of the paper"
      },
      {
        title: "Knowledge graph of the project growing",
        url: "/aeroforge-kg-growth.mp4",
        description: "Rendered from the project's own notes and results"
      },
      {
        title: "Training timelapse: watching the network learn",
        url: "/aeroforge-video-project.mp4",
        description: "Network against CFD on shapes it never trains on, then predicted against true objective on 48 unseen shapes"
      }
    ],
    metrics: [
      { label: "CFD calls saved by certificate gating", value: "90%", color: "green", icon: "zap" },
      { label: "Runs fully covered (Theorem 1, α = 0.1)", value: "20/20", color: "blue", icon: "target" },
      { label: "Gradient direction cosine similarity", value: "≈ 0.999", color: "purple", icon: "activity" }
    ],
    techStack: ["SU2 (CFD solver)", "Adjoint methods", "Fourier Neural Operators", "MLP ensembles", "Conformal prediction", "RunPod", "Google Colab"],
    features: [
      "Two design spaces: V1 (4 parameters, NACA airfoils) and V2 (13 parameters: 12 shape coefficients + angle of attack)",
      "Finding: gradient errors are 3–9× value errors, but gradient directions are nearly exact (cosine similarity ≈ 0.999); the \"gradients far worse\" hypothesis was falsified",
      "Finding: the standard i.i.d. certificate's coverage drops to 0.66 vs a 0.90 target along optimiser runs; in V2 only 0.20 of runs were fully covered",
      "Finding: certificate gating reached the same designs as running CFD every step with 90% fewer CFD calls (the \"better designs\" hypothesis was falsified; efficiency result)",
      "Finding: the run-level certificate (Theorem 1) fully covered 20/20 test runs at α = 0.1 and 0.85 at α = 0.2 — the only method meeting both targets vs Gaussian, weighted conformal, ACI and Bonferroni",
      "Limitation: the run-level certificate is 3.6–4.2× wider and certifies about half of the steps; the random-step certificate narrowly missed (0.742 vs 0.75 at α = 0.2)",
      "Ran cloud GPU workloads on RunPod under explicit budget caps",
      "In progress: V3 transonic (shock-wave) regime — 17 local pilot runs converged; paper draft in progress (unpublished)"
    ],
  }

];

export const asciiList = [
   `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠟⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⠀⠀⠈⠻⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣶⣦⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⡇⠀⠀⠀⠀⠈⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠾⠋⠁⢸⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⡇⠀⠀⠀⠀⠀⠀⠀⠙⢷⣆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⣿⣼⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡏⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⣸⡿⣿⠂⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣇⣿⠀⠀⠀⠀⠀⠶⠶⠶⠶⠶⠶⠿⠷⠶⠶⠤⣤⣤⣀⣀⡀⢀⣤⡾⠛⠁⠀⠀⠀⠀⠀⠀⠀⢠⣿⢣⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⣽⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⡷⣸⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⢣⡿⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣼⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣿⣿⡾⠛⠉⣉⣽⣿⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⠶⠛⢛⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀⢸⣿⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢰⣾⠛⢉⣵⡟⣃⣤⣶⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⠀⣠⣾⠏⣡⣴⣾⣿⣿⣿⣿⣿⣿⣿⣷⡄⠀⠀⠀⠀⢈⡹⣇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠙⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣀⣀⣀⣀⣰⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠶⠖⠲⠾⣿⣿⣦⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⣴⡾⠋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠈⠙⢿⣄⠀⠀⠀⠀
⠀⠀⣿⡛⠉⠁⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠀⠀
⠀⠀⣾⣷⣦⣀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣧⠀
⠀⡀⠈⠻⢿⣿⣿⣷⠆⠀⠙⠻⠿⣿⣿⡿⢿⣿⠋⠀⠀⠀⣴⠇⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆
⠀⠻⣟⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠿⣿⣆⣀⣠⣼⢿⣧⠀⠀⠀⢀⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⠿⣛⠹⣮⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣷
⠀⠀⠈⠻⢦⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢩⠿⠻⣯⢻⣷⣶⣿⡿⠋⠀⠀⠀⠉⠉⠉⠉⠁⠀⣐⣭⣾⡿⠋⢻⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿
⠀⠀⠀⢀⣰⣿⣻⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⠛⣍⠡⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟
⠀⠀⠀⠛⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡿⠁
⠀⠀⠀⢐⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠟⠀⠀
⠀⠀⠀⣼⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠃⠀⠀⠀
⠀⠀⠀⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⡟⠀⠀⠀⠀⠀
⠀⠀⣰⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠛⠀⠀⠀⠀⠀⠀
⢠⣾⢿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡏⠀⠀⠀⠀⠀⠀⠀
⠀⣰⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⣿⠀⠀⠀⠀⠀⠀⠀⠀
⣾⢿⣾⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠛⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,

`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠳⡁⡐⠄⡀⠀⠀⠀⠀⠀⠀⠠⢂⢒⠱⡱⡱⡽⣹⣹⡹⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⡔⠰⠰⡐⠄⡀⠀⠀⠀⠀⠀⠀⠀⡐⠰⢒⠱⡱⡹⡽⡽⣝⡝⡽⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣘⢆⢆⡑⡐⠄⠀⠀⠀⠀⠀⠀⠀⠀⡀⢂⢆⢣⢣⢳⡹⡽⡽⡞⡽⡽⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡘⡜⡄⢆⠆⢂⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⡐⠰⡘⡜⣎⢧⢫⢯⣏⢯⣫⣻⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⡱⡱⡱⡐⡐⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢂⢒⠱⡱⡹⡹⡽⣣⢯⢸⣣⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⡃⡜⡜⡰⡐⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠄⢆⠱⡱⡱⡹⣹⣻⡽⣻⡽⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⢣⡑⡱⠰⡐⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠢⡘⡜⡜⡜⡝⡍⣯⣻⠛⡰⣀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡶⣿⣸⣾⡇⠀⠀⠀⠀⠀⠐⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⡐⠤⡌⠎⠈⠀⠀⠀⠀⠀⠰⢹⣿⣿⣯⣯⣟⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣟⡇⣟⣵⣏⣷⢿⣾⣏⡿⣵⣿⣿⡿⡿⣿⣿⢿⠿⡻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠏⡽⣻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣷⣽⣶⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠘⢽⣎⣟⣟⡟⡟⣛⡝⡝⣝⣝⡽⡽⡽⡽⡽⡹⡭⣚⡜⡜⠰⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢂⠆⢣⢣⢣⢣⡹⡭⣲⣭⠾⣛⣽⢿⣻⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠨⡒⠥⢣⢣⡑⡱⡱⡩⣪⢲⡹⡬⣚⡜⡌⠆⠆⠄⡐⢀⢀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠠⠠⠠⠠⠠⠂⡂⢆⢎⢆⠎⣙⢭⣿⣿⣿⣿⣿⣿⣿⣛⣷⣶⣿⢻⠹⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠒⡔⡐⡐⠰⠰⢡⠡⠡⢂⠄⠂⢂⠄⠄⠄⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠄⢂⠂⢂⠔⡜⡜⢞⣝⢽⠿⣿⣿⣾⡿⠟⠞⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠠⠐⠐⣀⠀⠢⠠⠠⢂⢂⠄⣀⠄⠄⠄⠄⠄⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣐⢡⠀⠀⠀⢀⠄⡐⢄⣾⠟⠀⠀⠀⠙⣄⠄⠄⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡷⡀⠀⠀⠀⠀⠀⠀⠙⠽⣦⣤⣀⠀⠀⠀⢿⠈⡆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⢂⣏⢟⠜⠀⣠⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⢠⡇⠄⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⣧⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠄⢂⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⡀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣯⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡈⢦⠠⠀⠀⠀⠀⠀⠀⠀⠠⢂⠞⠰⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⡀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡐⠄⠀⠀⠢⡠⠀⠀⠠⡠⠁⠠⠀⣂⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠰⠀⠄⡀⠀⠀⠀⠀⠀⢀⢀⠀⠀⡐⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡴⢹⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡐⢀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣧⡀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢤⢎⠋⡝⠀⠀⢘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡉⠉⠻⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⡐⡜⠀⠀⠀⡭⠀⠀⠀⢘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡀⢀⠀⡀⣿⠀⢀⠀⢻⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠀⠀⣎⠀⠀⠀⠀⣎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⠀⠀⠀⢻⡄⠀⠀⠀⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀

`
,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⣿⣿⣷⣤⣴⣦⣀⣠⣶⡶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢠⣄⡀⠀⣼⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣿⣿⣿⣿⣿⣿⣿⡾⢛⠋⡛⠻⣿⣿⣿⣿⣧⣴⣶⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣽⡏⠰⡈⢆⢡⣷⢀⠻⣿⣿⣿⣿⣇⡀⢀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢻⣿⣿⣿⣻⣿⠄⢣⠘⡄⢺⡏⢄⢣⡌⠻⣿⣿⣿⣿⣿⣿⣷⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣷⣶⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣀⣸⣿⣿⣿⣿⣿⡏⢄⠣⢌⣹⠇⡌⣼⢇⠱⡈⠿⣿⣿⣿⡿⠿⠛⠛⠛⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠹⢿⣿⣿⣿⣷⣿⣿⣦⠑⣂⡿⠰⡐⡿⢈⠆⡑⢢⢙⡿⢉⠐⡠⠑⣈⠂⠥⠘⡀⢃⠰⠀⡌⠙⠯⣉⢩⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠹⣿⣿⣿⣽⣿⣷⣜⠏⡰⢱⡟⡠⢊⠔⣡⡿⢁⠂⡡⠄⢡⠠⠌⢠⠁⠒⡈⠄⡡⢀⠃⠤⣹⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⣻⣿⣿⣿⣿⣿⣷⣤⠹⢇⠰⡁⢎⣾⠁⠂⡔⠠⠘⡀⢂⠌⠄⠌⠡⡐⢈⡐⠄⢊⣼⣿⣿⣿⣿⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠙⠛⠛⢻⣿⣿⣯⣿⣿⣷⣌⠢⠑⢬⡇⠌⠡⠠⠑⢂⢁⢢⡈⠌⡐⠡⠠⢁⡐⠈⢼⣿⣿⣿⣿⡿⢁⢻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⣻⣿⣿⣿⣿⣿⣧⣍⢾⠃⠌⢂⡁⢎⣶⣿⣯⣭⡘⠰⡡⢁⠂⠤⢉⠈⠿⣿⣿⠟⢀⠂⠄⠛⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⡙⢹⣿⣿⣿⣿⣿⣿⠈⠔⠂⢤⣿⣿⣿⣿⣿⣅⠀⠹⠄⡘⢀⢂⠡⠂⢄⠠⢈⠄⠊⠌⡐⢉⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⡇⣾⣿⣿⡿⣿⣿⣿⡈⠄⢃⠘⣿⣿⣿⣿⣿⣿⠀⢠⠃⠄⠃⠄⡂⢉⠄⢂⠡⢈⠌⡐⢈⠄⡘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⣓⡘⠿⣿⢷⠙⠛⣻⠡⢈⠄⢊⡘⢿⢿⠿⠟⠃⢠⠞⣨⠐⡉⡐⢈⠤⠈⡄⢂⡁⢂⠌⠄⡂⠔⠘⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣯⠱⢈⠐⠂⢾⣁⣂⣽⣆⠂⣌⣼⠇⠠⢉⠐⡀⠉⠤⢈⠳⠇⡐⠠⢁⠂⡡⠐⡠⠐⠂⠌⡐⠐⡨⠐⠸⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣇⠂⠌⣁⠂⡉⢹⣟⣿⣻⡯⠁⠌⢂⡁⠢⢈⢁⠒⠠⠒⡀⠆⣁⠂⠡⠄⡑⠠⠑⣈⠐⡈⠔⠠⠑⢂⢹⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣧⠌⣀⠒⡈⡐⠻⣮⡷⠃⠌⢂⠡⠠⠑⣀⠊⠄⡑⠠⢁⠂⠤⢈⠁⠆⡐⠡⠌⣀⠂⠡⠌⢂⠡⢂⠘⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣤⠒⠠⠐⠡⣀⠐⡈⠔⡈⠤⠑⡈⠄⠌⡐⢈⡁⢂⠡⠒⡈⠰⠈⢄⡁⠆⠠⠌⠡⣈⠐⡐⡈⠌⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⡈⠅⠒⡀⢂⠁⠆⠰⠀⡅⠂⠌⠒⡈⠄⠰⠈⢄⠡⠐⠡⠌⢠⠐⡈⢡⠈⠔⡀⠒⢠⠐⡈⣿⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠠⢁⠂⢿⡆⠌⡁⢺⠇⡁⢊⠐⣄⠉⠄⠃⡄⠊⠌⡐⠌⡀⠆⡁⢂⠌⡐⠠⠉⠄⢂⠁⣾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠘⣧⠒⡈⠄⢶⢀⠡⡞⡐⠠⢁⣞⠂⢌⠘⢠⠐⣡⡬⠴⢒⠃⡐⡈⠄⢂⠌⠡⠘⡈⠄⢊⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠹⣧⠀⢀⣤⠾⢷⡐⡈⢼⡆⢸⡇⠡⢘⣼⢳⡿⣦⠈⣤⠿⢁⢂⠁⠆⡈⠔⠠⢁⠊⠄⡡⠡⢐⠈⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⢃⢹⡷⠋⢄⠂⠜⠹⢶⠾⢁⠚⢿⡴⠟⢡⣿⠓⠸⣿⠋⡐⠄⢂⠉⡐⡐⠨⠐⠡⡈⢄⡛⢁⠂⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⢰⠀⡂⠿⠈⢄⡈⢂⡁⢂⠐⠂⡌⠠⠐⡈⠴⣿⢀⠡⠘⣆⠰⢈⠂⢡⠐⣀⠃⠡⢒⡼⠋⡐⠈⣴⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠆⡁⢂⠡⢂⠐⡠⠐⡈⠄⠃⡄⠡⢁⠂⢼⣿⠀⠂⡅⢂⡐⠂⠌⢤⣒⠠⠬⠓⡉⠄⢒⣠⡿⠛⢶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠷⠶⠶⢧⠶⡶⢶⠶⡷⢶⠾⡶⢶⠷⡶⠾⠼⢿⣠⣁⣐⣠⣀⣉⣒⣰⣂⣦⣥⣖⣴⠮⠿⠳⠶⠾⠴⠿⠿⠿⠳⠶⣦⣀
⠀⠀⠀⠀
`,
  `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣶⣦⣤⣄⡀⠀⠀⠙⢿⣿⣷⣶⣤⡀⠀⠢⡄⠀⠀⠙⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣷⣶⣬⣻⣿⣿⣿⣿⣷⣤⡙⣦⠀⠀⢹⣿⣿⡄⢰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠿⣶⣶⣾⣿⣿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣛⡛⠛⠉⠉⠙⠛⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣎⢧⡀⠀⣿⣿⣷⡈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⣿⣶⣮⣭⣭⣿⣟⣻⣿⣿⣿⣷⣦⣤⣬⣽⣓⡿⣿⣿⣿⣿⣿⣿⣿⣧⠀⣿⣿⣿⡇⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣿⢿⡛⠛⠛⠛⠿⠿⣿⣿⣿⣿⣿⣇⣿⣿⣿⣧⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠐⢒⣻⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⣟⣛⡛⠛⠛⠛⠛⢻⣿⣷⣶⣶⣶⣦⣽⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣤⣶⣿⠿⢟⣿⣿⣿⣿⣿⣿⣿⠿⣟⣯⡽⠾⣛⣉⣡⣤⣤⣴⣶⣶⣶⣶⣦⣬⣭⣽⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣠⠾⣋⣭⣷⣶⣿⣿⣿⣿⣿⣿⣿⠿⣾⣫⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⠿⠛⠿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠾⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⢟⣛⣯⣯⣤⠦⠤⣒⣀⣀⣤⣤⣤⣤⣶⣶⣶⣶⣿⣿⣿⢻⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣉⣽⣿⣿⣿⣿⣿⣿⣿⢿⣿⠿⣟⣯⣵⣾⣿⣿⣿⣭⣿⣶⠿⠟⠋⢝⣻⣭⣿⣿⣿⣿⣿⢟⣽⣿⣿⠏⣾⣿⣿⣿⣿⣿⣯⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⡿⠛⠉⣠⣤⣷⣿⣿⣿⣿⣿⣿⣿⠟⠛⠉⠀⣠⠴⢚⣩⣵⣾⣯⣿⢿⣿⢫⣾⣿⣿⠟⣼⠿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣴⠿⠛⣋⣽⣿⣿⣿⣿⣡⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣤⣠⣤⣿⣾⣿⣿⣿⣿⣿⣯⣷⡿⣵⣿⢟⣿⢏⣾⠏⢼⣿⣿⣿⣿⣿⣿⢿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⡿⣼⡿⣣⡿⣽⣿⠏⢠⣾⣿⣿⡏⢻⣿⣿⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠋⣿⣿⢟⣼⣿⣾⣿⣇⣴⣿⣿⣿⣿⠃⢸⣿⣿⡏⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⢻⣟⣉⣉⠙⢻⣶⡀⣼⣿⣧⣾⣿⣿⣿⣟⣽⠟⢻⣿⣿⣿⠀⣼⣿⣿⡇⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⣝⠳⠶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢡⣶⣿⣿⣿⣿⣿⡿⠃⢀⠋⢸⣿⣿⠀⢸⠇⢱⣿⣿⣿⣿⣿⣿⣿⣿⣥⣀⣼⣿⣿⡏⣼⣿⣿⣿⢧⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢈⣶⣾⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⠘⣿⣿⣿⣿⡟⣽⠁⠀⠈⢷⣤⣉⣁⣠⡀⣠⣾⡿⠟⠛⣿⡿⣟⣵⡯⢈⡏⣿⣿⣿⣷⣿⣿⢋⣿⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢿⡋⠉⠠⡄⣿⢠⣿⣿⣿⣿⣿⣿⣿⣆⣿⣿⣿⡿⢸⠇⠀⠀⠀⠀⠈⠛⠻⠟⠛⠉⠀⠀⣠⠾⠋⢰⢿⡿⠁⡸⠀⣿⣿⣿⣿⣿⡟⣸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠻⣄⠀⢳⣹⣿⣿⣿⣿⣿⣿⣿⣿⠟⣿⣿⣿⠃⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠘⠿⠶⠿⠃⣼⣿⣿⣿⣿⡟⢀⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⢦⣀⣿⣿⣿⣿⣿⠋⢸⣿⠇⠀⢿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢱⠀⠀⠀⠀⣰⣿⣿⣿⣿⡟⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠀⠀⣠⡿⠋⣾⡿⣿⣇⠀⢸⡿⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⣀⡼⠃⠀⠀⢠⣿⡿⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠃⠉⠙⠻⣶⡿⠋⢳⡘⢿⡀⢸⡇⠀⠀⠘⣏⢿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⣆⠀⠀⠀⠀⢸⠋⠀⠀⠀⢠⣿⡟⢀⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣀⣃⣙⡂⠀⠙⢦⣳⡌⠀⠀⠀⠀⠙⢸⣿⣷⡄⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠿⠃⠀⠀⢀⣴⣿⠛⠀⢸⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡀⠈⠉⠉⠉⠉⠙⠳⢤⣀⠙⢿⣆⠀⠀⠀⠀⠀⣹⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⡟⣁⣤⣴⣾⠒⠶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢮⣜⣧⡀⢠⣴⣾⣿⣿⠟⣿⣧⡀⠀⠀⠀⠀⠀⠀⣠⣤⣾⠟⢩⣿⡿⠀⠉⠉⠉⠉⢷⣄⡹⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⡏⠁⢿⡟⠁⣼⠟⠉⠙⠶⠤⡤⠴⠞⠋⠁⢸⠏⠀⢸⣿⠃⠀⠀⠀⠀⠀⠀⠉⠉⠙⠺⢝⡲⢦⣀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠙⢧⣀⠀⠀⠀⠀⠀⠀⠀⠱⣄⠀⠀⢻⣆⠀⠀⠐⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡞⠀⠀⢸⠇⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⠀⠀⠉⠳⣬⡙⠲⣄⣺⠉⠙⠶⠶⠖⠒⠶⣤⣀⠀
⣄⠀⠀⠙⢧⡀⠀⠀⠀⠀⠀⠀⠙⣄⠀⠀⢻⡄⠀⠀⢀⣀⠤⠶⣤⣀⣠⣤⣀⣀⣠⡀⠀⠀⠈⠀⠀⠀⠀⠀⢠⠟⣸⠃⠀⠀⠀⠀⠀⠀⠀⠙⢶⣄⡙⢷⣤⣀⣀⣤⠀⠀⠘⣧⡀
⣿⣻⣶⣤⣤⣉⣷⡀⠀⠀⠀⠀⠀⠹⣦⠀⠈⣧⣴⡛⠋⢁⠀⠀⠸⣇⠀⠈⢻⡄⠈⠻⣦⣄⡀⠀⠀⠀⢀⡴⠋⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠉⢻⣦⣌⣻⡍⣿⠀⠀⠀⠈⣇
⣧⣻⣟⣽⣾⡏⣹⣟⢶⣦⣤⣀⠀⠀⠙⡆⠀⣧⠈⠙⢶⣾⡆⠀⠀⠹⡄⠀⠘⣇⠀⠀⠹⡎⠻⡆⠀⠀⠉⠠⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⢰⡏⠉⠉⢡⠇⠀⠀⠀⠀⠘
⠞⢽⢿⠿⢿⡗⣴⣿⣿⣿⢼⡯⣿⡿⠶⣶⢤⣿⣀⣀⡀⢈⣙⢦⡀⠀⢹⡄⠀⢻⡄⠀⠀⢻⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠁⣰⠋⠀⠀⣰⠾⠀⠀⠀⢰⠀⠀
⣫⢶⣼⣽⣟⠧⢈⣿⣿⣻⣻⣷⣼⡟⢿⣁⡰⣻⣿⣟⣿⣿⣽⣨⡇⠀⢸⡇⠀⢸⣿⠀⠀⢸⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⠃⠀⠀⢻⣄⣠⠞⠁⠀⠀⠀⠀⠸⠀⠀
⠘⠉⢀⢘⠋⣃⡉⣛⢛⢙⠙⣿⣿⣓⣶⣾⣿⣟⣻⣫⠾⢮⣿⣽⢳⣦⣼⡇⠀⢸⢿⣦⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⡀⣘⣿⠋⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀
`,
];

export const education = [
  {
    institution: "City University of Seattle",
    degree: "MS Computer Science, Data Science concentration (in progress)",
    date: "Expected 2027",
    gpa: "3.9",
    courses: ["Deep Learning", "NLP", "Large Language Models", "Graph RAG", "AI Cloud Computing", "Secure Systems", "Networking"],
    awards: ["Dean's Scholar"],
  },
  {
    institution: "SRM Institute of Science and Technology",
    degree: "B.Tech Computer Science and Engineering",
    date: "October 2024",
    gpa: "3.61",
    courses: ["Data Structures", "Database Management Systems", "Operating Systems", "Computer Networks"],
    awards: ["Dean's List", "Prime Minister Scholarship"],
  }
];
