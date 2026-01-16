import type { Experience, Project } from "../types/indexs";

export const experiencesData: Experience[] = [

  {
    title: "[1] Walmart Advanced Software Engineering Virtual Experience ",
    window: "Experience Program",
    date: "January 2026",
    description:
      "Completed advanced software engineering simulations across multiple Walmart teams. Implemented a novel heap data structure in Java for shipping workflows, demonstrating strong algorithmic problem-solving. Produced a UML class diagram for a data processor supporting multiple operating modes and database connections, and designed an ER diagram for a new accounting database based on business requirements.",
    image: "/walmart-1.png",
    role: "Advanced Software Engineering Simulation Participant",
    technologies: ["Java", "Data Structures", "UML", "ER Modeling", "System Design"],
    achievements: [
      "Implemented a custom heap data structure in Java for shipping use-cases",
      "Designed a UML class diagram for a multi-mode data processor",
      "Created an ER diagram for a requirements-driven accounting database"
    ],
  },


  {
  title: "[2] BCG Data Science Job Simulation",
  window: "Experience Program",
  date: "January 2026",
  description:
    "Completed a data science simulation focused on customer churn analysis, identifying key behavioral and transactional drivers. Applied structured analytical thinking to clean, analyze, and model client data, delivering actionable insights aligned with business objectives.",
  image: "/BCG.png",
  role: "Data Science Simulation Participant",
  technologies: ["Python", "Pandas", "NumPy", "Machine Learning", "Random Forest", "Data Analysis"],
  achievements: [
    "Performed customer churn analysis using Python with Pandas and NumPy",
    "Built and optimized a Random Forest model achieving a 50% recall rate",
    "Translated analytical findings into an executive-level summary with strategic recommendations"
  ],
},





  
  {
    title: "[3] Research Assistant | Applied Machine Learning & Intelligent Systems",
    window: "Intelligent Systems Lab",
    date: "August 2025 – Present",
    description:
      "Leading research in Retrieval-Augmented Generation (RAG) and graph-based reasoning systems. Developed modular RAG pipelines with semantic chunking and hybrid retrieval, reducing hallucinations by ~35%. Implemented computer vision models using PyTorch, achieving ~25% performance gains through architecture optimization.Contributed to open-source AI frameworks.",
    image: "/lab_rag.png",
    role: "Lead Researcher",
    technologies: ["PyTorch", "Transformers", "Neo4j", "AWS", "Docker", "FastAPI"],
    achievements: [
      "Reduced hallucinated responses by 35% through optimized RAG pipelines",
      "Achieved 25% performance improvement in CV models",
      "Mentored 3 junior researchers in ML methodologies"
    ],
    links: [
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/RAG-Pipeline"
      },
      
    ],
    
  },
  {
    title: "[4] Graduate Teaching Assistant — Computer Networks (Fabric Testbed)",
    window: "Illinois Institute of Technology",
    date: "January 2025 – May 2025",
    description:
      "Designed and configured a multi-node, geographically distributed Fabric network testbed, improving experimental reliability by ~40%. Optimized communication workflows achieving 26% performance improvement. Mentored 90+ graduate students in distributed systems, network protocols, and performance evaluation. Developed automated testing frameworks reducing setup time by 35%.",
    image: "/graduate-assistant.jpg",
    role: "Teaching Assistant",
    technologies: ["Fabric", "Python", "Docker", "Kubernetes", "Network Protocols"],
    achievements: [
      "Improved experimental reliability by 40%",
      "Reduced setup and execution time by 35%",
      "Mentored 90+ graduate students",
      "Developed comprehensive lab materials"
    ],
    metrics: [
      { label: "Performance Improvement", value: "26%", color: "blue" },
      { label: "Reliability Gain", value: "40%", color: "green" },
      { label: "Time Reduction", value: "35%", color: "purple" }
    ]
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
    id: "gai-001",
    title: "[1] GraphAugmented Intelligence (GAI)",
    window: "Prompt-Aware Knowledge Graph–Driven Retrieval-Augmented Intelligence",
    date: "September 2025",
    description: "Designed and implemented GraphAugmented Intelligence (GAI), a prompt-aware, knowledge graph–driven retrieval-augmented generation framework that enhances factual grounding and reduces hallucinations in LLMs by 40%. The system integrates semantic graph embeddings with multi-hop reasoning paths to improve answer accuracy across complex, multi-domain queries.",
    category: "AI/ML",
    status: "Active",
    featured: true,
    // Main schematic video for top section
    VideoDemo: "/KGRAG-1.mov",
    // Demo videos for bottom section
    demoVideos: [
      { 
        title: "Query Processing Without KG-RAG", 
        url: "/KGRAGDEMO-1.mp4",
        description: "Baseline query processing showing limitations in multi-hop reasoning",
        duration: "2:30"
      },
      { 
        title: "Query Processing With KG-RAG", 
        url: "/KGRAGDEMO-2.mp4",
        description: "Enhanced reasoning with knowledge graph augmentation",
        duration: "3:15"
      },
      { 
        title: "GPT-4 Integration on AWS p3.8xlarge", 
        url: "/GPT_DEMO-1.mp4",
        description: "Real-time inference with KG-RAG v0.3.0 on cloud infrastructure",
        duration: "4:20"
      },
      { 
        title: "Llama-2 Integration on AWS p3.8xlarge", 
        url: "/LLAMA_DEMO-1.mp4",
        description: "Open-source LLM integration with KG-RAG framework",
        duration: "3:45"
      }
    ],
    metrics: [
      { label: "Hallucination Reduction", value: "40%", color: "green", icon: "brain" },
      { label: "Multi-hop Accuracy", value: "35%↑", color: "blue", icon: "trending-up" },
      { label: "Response Latency", value: "< 2s", color: "purple", icon: "zap" },
      { label: "Knowledge Recall", value: "92%", color: "orange", icon: "target" }
    ],
    techStack: ["PyTorch", "Neo4j", "AWS EC2", "FastAPI", "React", "Docker", "Kubernetes", "GraphQL"],
    architecture: [
      "Semantic Graph Embeddings with Node2Vec",
      "Multi-hop Reasoning Engine with Path Ranking",
      "Hybrid Retrieval (Dense + Sparse + Keyword)",
      "Real-time Inference Pipeline with Caching",
      "Vector Database Integration (Pinecone)",
      "WebSocket-based Streaming Responses"
    ],
    features: [
      "Real-time knowledge graph updates",
      "Multi-modal query support",
      "Explainable AI with reasoning paths",
      "Scalable microservices architecture",
      "Automated knowledge extraction",
      "Interactive visualization dashboard"
    ],
    links: [
      { name: "GitHub Repository", url: "https://github.com/Vishal-Krishna-Kumar/GraphAugmented-Intelligence_GAI" }
    ],
    images: [
      "/gai-architecture.png",
      "/gai-dashboard.png",
      "/gai-knowledge-graph.png",
      "/gai-performance.png"
    ],
    teamSize: 3,
    impact: "Revolutionizes enterprise search and knowledge management systems",
    challenges: [
      "Real-time knowledge graph synchronization",
      "Multi-modal data integration",
      "Scalability to billion-scale graphs"
    ],
    futureWork: [
      "Multi-modal KG integration",
      "Federated learning support",
      "Real-time collaborative editing"
    ]
  },





  {
    id: "medical-ai-002",
    title: "[2] 3D Attention UNet++ Brain Tumor Segmentation",
    window: "Medical AI & Volumetric Segmentation",
    date: "June 2025",
    description:
      "Advanced 3D Attention UNet++ model for multimodal MRI brain tumor segmentation with state-of-the-art performance. Achieved Dice scores > 0.97 across all tumor sub-regions on BraTS 2023 dataset. Model incorporates attention gates, residual connections, and deep supervision for superior boundary delineation.",
    category: "Healthcare AI",
    status: "Completed",
    featured: true,
    VideoDemo: "/3DUnet-2.mp4",
    images: [
      "/3DUnet.png",
      "/3DUnet-3.png", 
      "/3DUnet-4.png",
    ],
    metrics: [
      { label: "Dice Score", value: "0.97", color: "green", icon: "target" },
      { label: "Accuracy", value: "98.2%", color: "blue", icon: "bar-chart-3" },
      { label: "Sensitivity", value: "96.5%", color: "purple", icon: "activity" },
      { label: "Inference Time", value: "0.8s", color: "orange", icon: "zap" }
    ],
    techStack: ["PyTorch", "3D CNNs", "BraTS Dataset", "MONAI", "NumPy", "Matplotlib", "ITK"],
    links: [
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/BRaTS-attention-Tumor-Segmentation-UNet-",
        // icon: "github"
      },
      {
        name: "Blog",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11929897/",
        // icon: "file-text"
      },
      
    ],
    teamSize: 2,
    impact: "Potential to reduce surgical planning time by 60%",
    recognition: [
      "Featured in Medical Image Analysis journal",
      "Presented at MICCAI 2024"
    ]
  },




  
  
  {
    id: "deepfake-003",
    title: "[3] Deepfake Detection System",
    window: "AI & Media Forensics",
    date: "April 2024",
    description:
      "Advanced deepfake detection framework using ensemble of XceptionNet, EfficientNet, and Vision Transformers. Achieved state-of-the-art 94.2% accuracy on DFDC dataset with 2.1% false positive rate. System includes real-time video analysis and explainable AI visualizations.",
    category: "Computer Vision",
    status: "Completed",
    featured: true,
    images: ["/DeepFake.gif", "/DeepFake-2.png", "/DeepFake-3.png", ],
    metrics: [
      { label: "Detection Accuracy", value: "94.2%", color: "green", icon: "target" },
      { label: "Performance Improvement", value: "35%", color: "blue", icon: "trending-up" },
      { label: "False Positive Rate", value: "2.1%", color: "red", icon: "alert-circle" },
      { label: "Real-time FPS", value: "30", color: "purple", icon: "zap" }
    ],
    techStack: ["TensorFlow", "XceptionNet", "OpenCV", "FFmpeg", "Flask", "React", "Docker"],
    features: [
      "Real-time video analysis pipeline",
      "Multi-modal detection (image/video/audio)",
      "Transfer learning with domain adaptation",
      "Explainable AI with saliency maps",
      "Batch processing support"
    ],
    links: [
      {
        name: "GitHub Repository",
        url: "https://github.com/Vishal-Krishna-Kumar/DeepFake-Detection-System",
        // icon: "github"
      },
      {
        name: "Research Documentation",
        url: "https://deep-fake-detection-paper.tiiny.site",
        // icon: "website"
      },
      
    ],
    teamSize: 3,
    impact: "Contributes to fight against misinformation",
    recognition: "Published in TDEMAS journal"
  },








  {
    id: "rl-004",
    title: "[4] AlphaZero-Inspired Reinforcement Learning System",
    window: "Deep Reinforcement Learning & Game AI",
    date: "December 2024",
    description:
      "AlphaZero-inspired self-play reinforcement learning system with advanced Monte Carlo Tree Search (MCTS) and neural policy-value networks. Achieved 92% win rate against professional chess engines and 30% faster convergence through optimized exploration strategies.",
    category: "Reinforcement Learning",
    status: "Completed",
    images: ["/AlphaZero-6.jpg", "/AlphaZero-2.png", "/AlphaZero-4.png", "/AlphaZero-5.png"],
    metrics: [
      { label: "Win Rate", value: "92%", color: "green", icon: "trophy" },
      { label: "Convergence Speed", value: "30%↑", color: "blue", icon: "zap" },
      { label: "Training Games", value: "10K+", color: "purple", icon: "activity" },
      { label: "Elo Rating", value: "2800", color: "orange", icon: "trending-up" }
    ],
    techStack: ["PyTorch", "TensorFlow", "MCTS", "OpenAI Gym", "Ray", "Docker", "CUDA"],
    features: [
      "Real-time move analysis",
      "Opening book integration",
      "Endgame tablebase",
      "Distributed training",
      "Interactive web interface"
    ],
    links: [
      {
        name: "AlphaZero Chess",
        url: "https://github.com/Vishal-Krishna-Kumar/AlphaZero-Chess",
        // icon: "github"
      },
      {
        name: "Chess AI Driven by AlphaZero",
        url: "https://github.com/Vishal-Krishna-Kumar/ChessAI",
        // icon: "github"
      },
      {
        name: "Research Documentation",
        url: "https://alpha-zero-paper.tiiny.site/",
        // icon: "website"
      },
    ],
    teamSize: 3,
    complexity: "High",
    impact: "Advances research in self-play RL algorithms"
  },




  
  {
    id: "nlp-005",
    title: "[5] Multilingual POS Tagging & Context-Aware Spell Correction",
    window: "NLP Sequence Labeling & Linguistics",
    date: "September 2024",
    description:
      "State-of-the-art multilingual POS tagging and context-aware spell correction system supporting 5+ languages. Achieved 96.8% accuracy on Universal Dependencies dataset with transformer-based architecture and transfer learning.",
    category: "Natural Language Processing",
    status: "Active",
    images: ["/NLP-1.png", "/NLP-2.png", "/NLP-3.png", "/NLP-4.png"],
    metrics: [
      { label: "POS Tagging Accuracy", value: "96.8%", color: "green", icon: "target" },
      { label: "Spell Correction F1", value: "92.3%", color: "blue", icon: "check-circle" },
      { label: "Languages Supported", value: "5+", color: "purple", icon: "globe" },
      { label: "Inference Speed", value: "1000/s", color: "orange", icon: "zap" }
    ],
    techStack: ["spaCy", "Transformers", "NLTK", "Scikit-learn", "PyTorch", "FastAPI"],
    features: [
      "Real-time spell correction",
      "Multi-language support",
      "Context-aware suggestions",
      "Grammar error detection",
      "API endpoint for integration"
    ],
    links: [
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
    teamSize: 1,
    datasets: ["Universal Dependencies", "Wikipedia", "Common Crawl"],
    impact: "Improves NLP pipeline accuracy for downstream tasks"
  },



  
  {
    id: "web-3d-006",
    title: "[6] Interactive 3D Web Gaming Site",
    window: "Frontend Engineering & 3D Graphics",
    date: "January 2026",
    description:
      "Immersive 3D web experience with real-time rendering, physics simulations, and interactive animations. Built with modern web technologies achieving 90 FPS on mid-range devices and <1.5s load time.",
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
    techStack: ["React", "Three.js", "GSAP", "WebGL", "Vite", "TypeScript", "Tailwind CSS"],
    features: [
      "Scroll-triggered 3D animations",
      "Cinematic camera transitions with Bézier curves",
      "Real-time particle systems with physics",
      "Mobile-responsive design with touch gestures",
      "WebGL optimization with instanced rendering",
      "Progressive Web App capabilities"
    ],
    links: [
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
  title: "[7] Combat Algo FPS Game",
  window: "Game Development & AI Systems",
  date: "November 2023",
  description:
    "A high-performance Combat-style first-person shooter built with Python and Pygame, featuring AI-controlled enemies using shortest-path algorithms, intelligent spawn balancing, and real-time ray-casting for immersive 3D gameplay. Supports mouse-based camera control, WASD movement, and space-bar shooting with responsive combat mechanics.",

  category: "Game Development",
  status: "Completed",

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
    "A* Pathfinding",
    "OOP",
    "Vector Math",
    "AI Behavior Trees"
  ],

  features: [
    "Mouse-controlled camera and keyboard-based movement (W, A, S, D)",
    "Space-bar shooting with weapon recoil and hit detection",
    "AI enemies using shortest-path (A*) algorithms to chase the player",
    "Dynamic enemy spawning to prevent overcrowding and unfair combat",
    "Real-time ray-casting engine for 3D world rendering",
    "Mini-map with live enemy and player tracking",
    "Health, ammo, and pickup systems",
    "Optimized collision detection and physics"
  ],

  links: [
    {
      name: "GitHub Repository",
      url: "https://github.com/Vishal-Krishna-Kumar/Combat-Algo-Game",
      // icon: "github"
    },
    {
      name: "Gameplay Demo",
      url: "/3D-DEMO.mov",
      // icon: "play"
    },
  ],

  teamSize: 1,
  architecture: "Modular game engine with Combat Algo, rendering, physics, and input systems",
  testing: "Manual gameplay testing with Combat Algorithm behavior validation and FPS profiling",
  impact: "Demonstrates real-time AI decision-making, optimized rendering, and professional-grade game architecture"
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
    degree: "Master of Science in Computer Science Specialized in Data Science",
    date: "Expected May 2027",
    gpa: "4.0",
    courses: ["Advanced Algorithms", "Machine Learning", "Distributed Systems", "Cloud Computing"],
    awards: ["Graduate Academic Award", "Schlarship for Excellence"],
  },
  {
    institution: "SRM University Chennai",
    degree: "Bachelor of Science in Computer Science Specialization in AI & ML",
    date: "May 2024",
    gpa: "3.61",
    courses: ["Data Structures", "Database Management Systems", "Operating Systems", "Computer Networks"],
    awards: ["Dean's List", "Prime Minsiter Scholarship"],
  }
];
