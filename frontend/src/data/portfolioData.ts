export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  badge?: string;
  rating?: string;
  duration?: string;
  year: string;
  matchScore: number;
  description: string;
  techStack: string[];
  problemSolved: string;
  keyFeatures: string[];
  architecture?: string[];
  impact?: string;
  githubUrl: string;
  liveDemoUrl?: string;
  bannerImage: string;
  featured?: boolean;
}

export interface ExploreRailItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
  technologies: string[];
  accentColor: string;
}

export interface AIUniverseCapability {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  color: string;
  keyConcepts: string[];
  technologies: string[];
  relatedProjectId: string;
  codeSnippet: string;
}

export interface TechItem {
  name: string;
  category: 'languages' | 'ai_ml' | 'frontend' | 'backend' | 'tools';
  categoryLabel: string;
  badge?: string;
  level: string;
  highlight?: boolean;
  description: string;
  icon: string;
}

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  roleType: 'Education' | 'Startup Experience' | 'Milestone' | 'Engineering';
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  badgeColor: string;
}

export interface ResumeTrack {
  id: string;
  title: string;
  focus: string;
  pdfFile: string;
  description: string;
  summary: string;
  coreHighlights: string[];
}

export const PORTFOLIO_DATA = {
  personalInfo: {
    name: "Tarun S",
    logoText: "TARUN S",
    eyebrow: "COMPUTER SCIENCE • AI/ML • SOFTWARE",
    heroHeadline: "TARUN S",
    heroSubhead: "Building intelligent products at the intersection of AI, software engineering and human-centered design.",
    heroDescription: "Computer Science undergraduate at Amrita Vishwa Vidyapeetham specializing in AI/ML applications, autonomous agents, RAG pipelines, and high-performance software systems.",
    email: "tarun.s19906@gmail.com",
    phone: "+91 6380644305",
    location: "Chennai, India",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Amrita Vishwa Vidyapeetham",
    yearInfo: "3rd Year | Expected 2028",
    linkedin: "https://linkedin.com/in/taruns",
    github: "https://github.com/tarun-s",
  },

  exploreRails: [
    {
      id: "ai-ml",
      number: "01",
      title: "AI / ML Engineering",
      subtitle: "Models • Supervised Learning • Analytics",
      category: "Machine Learning",
      tagline: "High-precision model training & statistical analysis",
      description: "Building predictive algorithms, data preprocessing pipelines with NumPy & Pandas, and supervised learning models evaluated on quantitative metrics.",
      icon: "Cpu",
      gradient: "from-blue-600/30 via-cyan-500/10 to-transparent",
      technologies: ["Scikit-learn", "NumPy", "Pandas", "EDA", "Model Evaluation"],
      accentColor: "#00f0ff"
    },
    {
      id: "generative-ai",
      number: "02",
      title: "Generative AI & LLMs",
      subtitle: "Contextual RAG • OpenAI APIs • Prompt Engineering",
      category: "Generative AI",
      tagline: "Architecting context-rich LLM applications",
      description: "Developing intelligent generative workflows, multi-stage context injection, and conversational reasoning engines powered by state-of-the-art foundation models.",
      icon: "Sparkles",
      gradient: "from-purple-600/30 via-indigo-500/10 to-transparent",
      technologies: ["OpenAI APIs", "Prompt Engineering", "Whisper", "LLM Pipelines"],
      accentColor: "#a855f7"
    },
    {
      id: "software-engineering",
      number: "03",
      title: "Software Engineering",
      subtitle: "FastAPI • Django • PostgreSQL • REST",
      category: "Architecture",
      tagline: "Scalable backend services & reliable architectures",
      description: "Designing robust RESTful microservices, normalized relational schemas, and asynchronous background queues built for high reliability and throughput.",
      icon: "Code2",
      gradient: "from-emerald-600/30 via-teal-500/10 to-transparent",
      technologies: ["FastAPI", "Django", "PostgreSQL", "REST APIs", "Docker"],
      accentColor: "#10b981"
    },
    {
      id: "rag-nlp",
      number: "04",
      title: "RAG & NLP Systems",
      subtitle: "ChromaDB • Embeddings • Semantic Search",
      category: "Information Retrieval",
      tagline: "Dense vector search & document intelligence",
      description: "Engineering dense retrieval pipelines with vector databases, custom text chunking algorithms, TF-IDF scoring, and sub-200ms semantic similarity queries.",
      icon: "Database",
      gradient: "from-amber-600/30 via-orange-500/10 to-transparent",
      technologies: ["ChromaDB", "Vector Embeddings", "Semantic Search", "NLP Chunking"],
      accentColor: "#f59e0b"
    },
    {
      id: "automation",
      number: "05",
      title: "Intelligent Automation",
      subtitle: "Autonomous Agents • n8n • Voice Workflows",
      category: "Workflow Automation",
      tagline: "Zero-latency autonomous business agents",
      description: "Creating autonomous agents for inbox intelligence, email prioritization, workflow trigger routing, and voice-enabled interactive systems.",
      icon: "Bot",
      gradient: "from-rose-600/30 via-red-500/10 to-transparent",
      technologies: ["n8n", "Voice Agents", "Gmail API", "Task Automation"],
      accentColor: "#f43f5e"
    },
    {
      id: "product-dev",
      number: "06",
      title: "Product Development",
      subtitle: "Agile Sprints • Feature Iterations • UX",
      category: "Product Engineering",
      tagline: "Translating complex tech into intuitive user experiences",
      description: "Translating customer pain points into agile product requirements, building responsive React frontends, and accelerating sprint delivery cycles.",
      icon: "Layers",
      gradient: "from-sky-600/30 via-blue-500/10 to-transparent",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Agile Planning"],
      accentColor: "#38bdf8"
    }
  ] as ExploreRailItem[],

  projects: [
    {
      id: "spectrum-ai",
      name: "Spectrum AI",
      tagline: "AI-Powered RAG & Document Intelligence Platform",
      category: "AI / ML & RAG",
      badge: "FEATURED SPOTLIGHT",
      rating: "98% Match",
      duration: "Flagship Project",
      year: "2024",
      matchScore: 98,
      description: "Engineered an intelligent learning platform utilizing OpenAI Whisper for speech-to-text audio transcription and multi-stage text chunking. Implemented an end-to-end RAG pipeline using ChromaDB vector database and semantic embeddings for context-aware Q&A, dynamic knowledge graphs, and automated study notes.",
      techStack: ["Python", "FastAPI", "ChromaDB", "OpenAI Whisper", "Vector Embeddings", "RAG Pipeline", "React"],
      problemSolved: "Overcomes context fragmentation in multimedia lectures and technical documents by transcribing audio streams, indexing chunked text into dense vector spaces, and synthesizing structured notes with sub-second semantic retrieval.",
      keyFeatures: [
        "OpenAI Whisper audio transcription pipeline with automated multi-stage chunking and timestamp synchronization.",
        "Retrieval-Augmented Generation (RAG) using ChromaDB and text-embedding-3-small for contextual question answering.",
        "Automated generation of structured study notes, interactive quizzes, and dynamic knowledge graph visualizations.",
        "FastAPI asynchronous backend endpoints with optimized vector query execution under 180ms."
      ],
      architecture: [
        "Audio / Document Ingestion -> Whisper STT & Chunking Engine",
        "Vector Embedding Generation (text-embedding-3-small)",
        "ChromaDB Vector Indexing & Cosine Distance Filtering",
        "Context Augmented LLM Prompt Synthesis -> Structured Output & Knowledge Graph"
      ],
      impact: "Eliminates 80% of manual transcription effort and delivers pinpoint semantic search across hours of technical coursework.",
      githubUrl: "https://github.com/tarun-s",
      liveDemoUrl: "#spotlight",
      bannerImage: "/images/spectrum-ai-banner.webp",
      featured: true
    },
    {
      id: "email-agent",
      name: "Autonomous Email Management Agent",
      tagline: "NLP & Text Analytics Engine for Operational Inbox Automation",
      category: "Automation & NLP",
      badge: "AUTONOMOUS SYSTEM",
      rating: "95% Match",
      duration: "Production Agent",
      year: "2024",
      matchScore: 95,
      description: "Designed an automated rule & text analysis engine processing email payloads to calculate priority scores and classify incoming message categories. Applied natural language text analytics using keyword density scoring and regex matching to detect spam, parse attachments, and automate responses.",
      techStack: ["Python", "JavaScript", "n8n", "Gmail API", "Regex Parsing", "Text Analytics", "NLP Scoring"],
      problemSolved: "Removes operational bottlenecks by autonomously prioritizing urgent correspondence, eliminating spam with keyword density thresholds, and triggering automated action workflows.",
      keyFeatures: [
        "Real-time email payload ingestion and header metadata parsing.",
        "Priority scoring algorithm combining sender importance, urgency indicators, and keyword density.",
        "Automated attachment validation, receipt routing, and custom canned draft generation via n8n nodes.",
        "Zero-drop async queue handling rapid bursts of incoming messages."
      ],
      architecture: [
        "Gmail Webhook Ingestion -> Payload Sanitizer",
        "Regex Rule Evaluator + Keyword Density Scoring",
        "Priority Classifier -> Categorization & Urgency Rank",
        "n8n Workflow Execution -> Automated Draft & Alerting"
      ],
      impact: "Reduced routine email triage time by over 70% with accurate priority classification.",
      githubUrl: "https://github.com/tarun-s",
      bannerImage: "/images/email-agent-banner.webp",
      featured: false
    },
    {
      id: "hypertrade-ai",
      name: "HyperTrade AI",
      tagline: "Predictive Market Analytics & Quantitative Decision Engine",
      category: "Fintech & Data",
      badge: "QUANTITATIVE ENGINE",
      rating: "94% Match",
      duration: "Algorithmic System",
      year: "2024",
      matchScore: 94,
      description: "Engineered a Python quantitative analytics engine computing technical indicators including RSI, 5/20-day Moving Averages (SMA), and price volatility metrics. Applied NumPy and Pandas for time-series cleaning, real-time market data evaluation, and multi-factor algorithmic scoring.",
      techStack: ["Python", "NumPy", "Pandas", "Technical Indicators (RSI, SMA)", "REST APIs", "Data Preprocessing"],
      problemSolved: "Mitigates emotional bias and calculation lag by computing mathematical momentum metrics and delivering structured, objective Buy/Hold/Sell signals with risk evaluation.",
      keyFeatures: [
        "Time-series data cleaning, rolling window calculations, and anomaly imputation using NumPy & Pandas.",
        "Algorithmic computation of Relative Strength Index (RSI), Simple Moving Averages, and volatility bands.",
        "Multi-factor scoring algorithm synthesizing momentum, trend alignment, and risk bands into actionable signals.",
        "REST API endpoints delivering real-time metric streams for frontend charting dashboards."
      ],
      architecture: [
        "Live Market Data Feeds -> Pandas DataFrame Time-Series Preprocessing",
        "Technical Indicator Calculators (RSI, 5/20 SMA, Volatility)",
        "Multi-factor Scoring Engine -> Signal Synthesizer",
        "REST API Distribution -> Client Visualization"
      ],
      impact: "Provides backtested algorithmic clarity with sub-second signal calculation across multi-asset tickers.",
      githubUrl: "https://github.com/tarun-s",
      bannerImage: "/images/hypertrade-banner.webp",
      featured: false
    },
    {
      id: "meeting-platform",
      name: "AI Collaboration & Meeting Platform",
      tagline: "High-Concurrency Backend Services & Session Management",
      category: "Full Stack & Backend",
      badge: "DISTRIBUTED BACKEND",
      rating: "91% Match",
      duration: "Full Stack Service",
      year: "2024",
      matchScore: 91,
      description: "Built backend RESTful services and relational database schemas in PostgreSQL for real-time collaboration and session management. Optimized database query performance and API endpoints to ensure seamless data transmission and high application reliability.",
      techStack: ["Python", "Django", "PostgreSQL", "REST APIs", "Relational Database Design", "Session Management"],
      problemSolved: "Solves session concurrency synchronization and relational data overhead for distributed team meeting environments.",
      keyFeatures: [
        "Normalized relational PostgreSQL schemas designed for complex role permissions and session telemetry.",
        "High-performance Django REST Framework endpoints optimized with select_related / prefetch_related queries.",
        "Session authentication, token validation, and multi-tenant meeting isolation.",
        "Reliable state recovery mechanisms to handle network intermittency."
      ],
      architecture: [
        "Client Connection -> Django REST Framework Gateway",
        "Session Auth & Permission Guard",
        "PostgreSQL Relational Storage with Indexed Query Optimization",
        "Real-time Session State Broadcasting"
      ],
      impact: "Delivered low query response times and stable multi-user collaborative session synchronization.",
      githubUrl: "https://github.com/tarun-s",
      bannerImage: "/images/meeting-platform-banner.webp",
      featured: false
    },
    {
      id: "vocal-bridge",
      name: "Vocal Bridge Voice Automation",
      tagline: "Early-Stage Voice-Agent & Business Process Automation Engine",
      category: "Automation & NLP",
      badge: "VOICE AI",
      rating: "92% Match",
      duration: "Startup Integration",
      year: "2024",
      matchScore: 92,
      description: "Worked with an early-stage AI automation startup developing automated voice interactions and business process workflows. Integrated real-time speech synthesis and conversational state machines with backend webhooks.",
      techStack: ["Python", "Voice APIs", "FastAPI", "Webhooks", "Conversational State Machines", "Process Automation"],
      problemSolved: "Automates repetitive customer discovery and inbound qualification calls through responsive, conversational voice pipelines.",
      keyFeatures: [
        "Low-latency speech-to-text and text-to-speech audio streaming bridges.",
        "Stateful conversation flow management handling edge-case customer queries and intents.",
        "Automated CRM webhook integration capturing customer data in real time.",
        "Telephony fallback and error recovery pipelines."
      ],
      architecture: [
        "Voice Stream Ingestion -> STT Audio Transcriber",
        "Intent State Machine -> Dialog Policy Evaluator",
        "TTS Speech Synthesizer -> Low Latency Audio Output",
        "Event Webhook -> Business Process Queue"
      ],
      impact: "Accelerated inbound call qualification speed with 24/7 automated agent availability.",
      githubUrl: "https://github.com/tarun-s",
      bannerImage: "/images/vocal-bridge-banner.webp",
      featured: false
    },
    {
      id: "quantum-ai-interface",
      name: "Quantum AI & Electronics Lab Dashboard",
      tagline: "Interactive Frontend & Telemetry Interface for AI Labs",
      category: "Full Stack & Backend",
      badge: "UI / UX LABS",
      rating: "90% Match",
      duration: "Internship Project",
      year: "2023",
      matchScore: 90,
      description: "Frontend developer intern at Quantum AI and electronics labs. Developed interactive data visualization interfaces and real-time sensor dashboards connecting frontend clients with lab testing apparatus.",
      techStack: ["React", "JavaScript", "HTML5", "CSS3", "REST APIs", "Chart Visualizations"],
      problemSolved: "Provided researchers and lab engineers with an intuitive, real-time control interface to monitor experimental runs and model metrics.",
      keyFeatures: [
        "High-performance telemetry charts rendering continuous data feeds without interface jitter.",
        "Modular dashboard component architecture enabling flexible widget arrangements.",
        "Responsive cross-device interface tested for lab workstation tablets and displays.",
        "Clean REST API client integration with error boundary fallbacks."
      ],
      architecture: [
        "Hardware Sensor / Model Output -> REST API Gateway",
        "React Component State Dispatcher",
        "Canvas / SVG Data Visualizer -> Real-time Metric Graphs"
      ],
      impact: "Streamlined laboratory observation workflows and reduced setup diagnosis time.",
      githubUrl: "https://github.com/tarun-s",
      bannerImage: "/images/quantum-ai-banner.webp",
      featured: false
    }
  ] as Project[],

  aiUniverse: [
    {
      id: "rag",
      title: "Retrieval-Augmented Generation (RAG)",
      category: "Information Retrieval",
      shortDesc: "Grounded semantic retrieval combining dense vector embeddings with LLM generation.",
      fullDesc: "RAG solves LLM hallucination and domain knowledge gaps by indexing documents into dense vector spaces (ChromaDB), executing cosine similarity queries against user prompts, and injecting top-k context windows into generative models.",
      icon: "Database",
      color: "#00f0ff",
      keyConcepts: ["Dense Vector Retrieval", "Top-K Similarity Filtering", "Chunk Overlapping", "Context Window Injection"],
      technologies: ["ChromaDB", "text-embedding-3-small", "OpenAI APIs", "FastAPI"],
      relatedProjectId: "spectrum-ai",
      codeSnippet: `# Python Vector Retrieval Pipeline
def query_knowledge_base(query: str, top_k: int = 4):
    query_vector = get_embedding(query, model="text-embedding-3-small")
    results = chroma_collection.query(
        query_embeddings=[query_vector],
        n_results=top_k,
        include=["documents", "metadatas", "distances"]
    )
    context = "\\n---\\n".join(results["documents"][0])
    return synthesize_rag_response(query, context)`
    },
    {
      id: "nlp",
      title: "Natural Language Processing (NLP)",
      category: "Text Analytics",
      shortDesc: "Text classification, TF-IDF feature extraction, and multi-stage token parsing.",
      fullDesc: "Utilizing statistical NLP, regular expression parsing, and Scikit-learn tokenizers to process unstructured text streams, compute keyword density metrics, and extract actionable metadata from email and document payloads.",
      icon: "FileText",
      color: "#a855f7",
      keyConcepts: ["TF-IDF Vectorization", "Token Normalization", "Regex Rule Matching", "Keyword Density"],
      technologies: ["Scikit-learn", "Python", "Regex", "Text Analytics"],
      relatedProjectId: "email-agent",
      codeSnippet: `# Scikit-Learn TF-IDF Text Classification
tfidf = TfidfVectorizer(ngram_range=(1, 2), max_features=5000)
X_features = tfidf.fit_transform(corpus_cleaned)
classifier = LogisticRegression(C=1.0)
classifier.fit(X_features, labels)
confidence = classifier.predict_proba(new_doc_features)`
    },
    {
      id: "embeddings",
      title: "Vector Embeddings & Semantic Search",
      category: "Vector Computing",
      shortDesc: "High-dimensional geometric representations capturing semantic nuance and meaning.",
      fullDesc: "Transforming natural language queries and documents into 1536-dimensional vector spaces where semantic intent is preserved geometrically, enabling sub-second search beyond exact keyword matching.",
      icon: "Network",
      color: "#38bdf8",
      keyConcepts: ["Cosine Distance", "Vector Indexing", "Dimensionality Reduction", "Semantic Clustering"],
      technologies: ["ChromaDB", "OpenAI Embeddings", "NumPy", "Vector Databases"],
      relatedProjectId: "spectrum-ai",
      codeSnippet: `# High-Dimensional Cosine Similarity Metric
def cosine_sim(a: np.ndarray, b: np.ndarray) -> float:
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))`
    },
    {
      id: "machine-learning",
      title: "Supervised Learning & Predictive Analytics",
      category: "Statistical Modeling",
      shortDesc: "Algorithmic decision systems, technical indicator modeling, and feature preprocessing.",
      fullDesc: "Designing robust predictive pipelines using NumPy, Pandas, and Scikit-learn. Applying time-series windowing, feature scaling, and multi-factor evaluation models for algorithmic decision making.",
      icon: "Cpu",
      color: "#10b981",
      keyConcepts: ["Time-Series Preprocessing", "Feature Engineering", "Multi-Factor Scoring", "Precision/Recall Tuning"],
      technologies: ["Scikit-learn", "NumPy", "Pandas", "Python", "EDA"],
      relatedProjectId: "hypertrade-ai",
      codeSnippet: `# Quantitative Momentum & Indicator Formulation
delta = df['close'].diff()
gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
rs = gain / loss
df['rsi'] = 100 - (100 / (1 + rs))`
    },
    {
      id: "audio-intelligence",
      title: "Speech-to-Text & Audio Processing",
      category: "Audio AI",
      shortDesc: "Automated speech transcription with temporal alignment and chunk synchronization.",
      fullDesc: "Integrating OpenAI Whisper speech models with asynchronous audio streaming pipelines, transforming spoken technical lectures and conversations into clean, time-stamped text chunks ready for vector indexing.",
      icon: "Mic",
      color: "#f59e0b",
      keyConcepts: ["Whisper STT", "Acoustic Chunking", "Timestamp Mapping", "Audio Normalization"],
      technologies: ["OpenAI Whisper", "Python", "FastAPI", "Audio Pipelines"],
      relatedProjectId: "spectrum-ai",
      codeSnippet: `# Whisper Audio Processing
def transcribe_audio_stream(file_path: str):
    with open(file_path, "rb") as audio:
        transcript = openai.audio.transcriptions.create(
            model="whisper-1",
            file=audio,
            response_format="verbose_json",
            timestamp_granularities=["segment"]
        )
    return chunk_by_timestamp(transcript.segments)`
    },
    {
      id: "autonomous-agents",
      title: "Autonomous Agents & Workflow Systems",
      category: "AI Automation",
      shortDesc: "Goal-driven agentic loops with multi-step tool execution and error handling.",
      fullDesc: "Building autonomous systems that listen to operational webhooks, reason over unstructured payloads, trigger API actions, and manage multi-step business automation workflows.",
      icon: "Bot",
      color: "#f43f5e",
      keyConcepts: ["Agentic Routing", "Webhook Ingestion", "n8n Automation", "Stateful Recovery"],
      technologies: ["n8n", "Python", "FastAPI", "Gmail API"],
      relatedProjectId: "email-agent",
      codeSnippet: `# Autonomous Workflow Trigger Pipeline
async def process_incoming_event(event_payload: dict):
    analysis = await analyze_intent(event_payload)
    if analysis.priority_score > 0.8:
        await route_immediate_notification(analysis)
    return await execute_workflow_actions(analysis.actions)`
    }
  ] as AIUniverseCapability[],

  techStack: [
    // Languages
    { name: "Python", category: "languages", categoryLabel: "Languages", badge: "Primary", level: "Strong Fundamental & Applied", highlight: true, description: "Core language for AI/ML, FastAPI backends, quantitative modeling, and RAG pipelines.", icon: "python" },
    { name: "Java", category: "languages", categoryLabel: "Languages", level: "Core Academic & OOP", highlight: false, description: "Object-oriented design, data structures, and system design foundations.", icon: "coffee" },
    { name: "JavaScript", category: "languages", categoryLabel: "Languages", level: "Intermediate", highlight: false, description: "Modern ES6+ frontend interactivity, DOM manipulation, and n8n script nodes.", icon: "code" },
    { name: "TypeScript", category: "languages", categoryLabel: "Languages", level: "Applied", highlight: true, description: "Type-safe frontend development, React state interfaces, and API contracts.", icon: "code" },
    { name: "C++", category: "languages", categoryLabel: "Languages", level: "Algorithms & Systems", highlight: false, description: "Low-level memory awareness, pointer logic, and computational problem solving.", icon: "cpu" },
    { name: "SQL", category: "languages", categoryLabel: "Languages", level: "Relational Queries", highlight: true, description: "Relational queries, index optimization, PostgreSQL schemas, and normalization.", icon: "database" },

    // AI / ML
    { name: "Retrieval-Augmented Gen (RAG)", category: "ai_ml", categoryLabel: "AI / ML & NLP", badge: "Specialty", level: "Applied Architecture", highlight: true, description: "Designing dense vector search, context augmentation, and ChromaDB integrations.", icon: "sparkles" },
    { name: "NLP & Text Analytics", category: "ai_ml", categoryLabel: "AI / ML & NLP", level: "Hands-on", highlight: true, description: "TF-IDF classification, regex payload parsing, and sentiment/priority scoring.", icon: "file-text" },
    { name: "Vector Embeddings & ChromaDB", category: "ai_ml", categoryLabel: "AI / ML & NLP", badge: "Core", level: "Applied Storage", highlight: true, description: "Vector indexing, cosine similarity querying, and dimensional embeddings.", icon: "database" },
    { name: "OpenAI APIs (Whisper, Embeddings)", category: "ai_ml", categoryLabel: "AI / ML & NLP", level: "Production APIs", highlight: true, description: "Speech transcription, text-embedding-3-small, and structured prompt engineering.", icon: "zap" },
    { name: "Supervised Learning & Scikit-learn", category: "ai_ml", categoryLabel: "AI / ML & NLP", level: "Algorithms", highlight: true, description: "Classification, regression, cross-validation, and model evaluation metrics.", icon: "cpu" },
    { name: "NumPy & Pandas", category: "ai_ml", categoryLabel: "AI / ML & NLP", level: "Data Wrangling", highlight: true, description: "Time-series processing, matrix computation, and exploratory data analysis (EDA).", icon: "table" },
    { name: "PyTorch & TensorFlow", category: "ai_ml", categoryLabel: "AI / ML & NLP", level: "Foundational", highlight: false, description: "Understanding deep learning architectures, tensors, and neural network graphs.", icon: "layers" },

    // Frontend
    { name: "React", category: "frontend", categoryLabel: "Frontend", badge: "Modern UI", level: "Component Architecture", highlight: true, description: "Component-based architecture, hooks, state machines, and responsive layouts.", icon: "layout" },
    { name: "Tailwind CSS", category: "frontend", categoryLabel: "Frontend", level: "Design System", highlight: true, description: "Utility-first modern styling, responsive breakpoints, and cinematic dark themes.", icon: "palette" },
    { name: "HTML5 & Semantic Web", category: "frontend", categoryLabel: "Frontend", level: "Semantic Markup", highlight: false, description: "Accessible DOM structure, canvas rendering, and media elements.", icon: "globe" },
    { name: "CSS3 & Modern Animations", category: "frontend", categoryLabel: "Frontend", level: "Transitions & Keyframes", highlight: false, description: "Flexbox, grid, keyframes, GPU transforms, and responsive design systems.", icon: "sliders" },

    // Backend & Data
    { name: "FastAPI", category: "backend", categoryLabel: "Backend & Data", badge: "High Speed", level: "Async Web Services", highlight: true, description: "High-performance Python async REST APIs, Pydantic schemas, and OpenAPI.", icon: "server" },
    { name: "Django & Django REST", category: "backend", categoryLabel: "Backend & Data", level: "Full Framework", highlight: true, description: "ORM data modeling, session authentication, and scalable backend services.", icon: "layers" },
    { name: "PostgreSQL", category: "backend", categoryLabel: "Backend & Data", level: "Relational DB", highlight: true, description: "Structured relational databases, foreign keys, indexes, and connection pooling.", icon: "database" },
    { name: "REST APIs & Webhooks", category: "backend", categoryLabel: "Backend & Data", level: "API Contracts", highlight: true, description: "HTTP endpoints, payload serialization, webhook listeners, and CORS management.", icon: "network" },
    { name: "SQLite", category: "backend", categoryLabel: "Backend & Data", level: "Embedded Storage", highlight: false, description: "Lightweight transactional local databases for development and prototyping.", icon: "database" },
    { name: "Node.js", category: "backend", categoryLabel: "Backend & Data", level: "Runtime Services", highlight: false, description: "JavaScript backend execution, tooling scripts, and automation nodes.", icon: "terminal" },

    // Tools & DevOps
    { name: "Git & GitHub", category: "tools", categoryLabel: "Tools & DevOps", level: "Version Control", highlight: true, description: "Branching strategies, pull requests, collaborative version control, and CI/CD.", icon: "git-branch" },
    { name: "Docker", category: "tools", categoryLabel: "Tools & DevOps", level: "Containerization", highlight: true, description: "Dockerfile creation, environment isolation, and multi-service deployment containers.", icon: "box" },
    { name: "n8n Workflow Automation", category: "tools", categoryLabel: "Tools & DevOps", level: "Visual Automation", highlight: true, description: "Building complex autonomous workflow trees, webhook triggers, and API nodes.", icon: "workflow" },
    { name: "VS Code & Dev Tools", category: "tools", categoryLabel: "Tools & DevOps", level: "IDE Mastery", highlight: false, description: "Debugging, terminal mastery, linting, and profiling tools.", icon: "monitor" },
    { name: "Agile Development", category: "tools", categoryLabel: "Tools & DevOps", level: "Methodology", highlight: false, description: "Sprint planning, rapid prototyping, feature backlog management, and retrospectives.", icon: "users" }
  ] as TechItem[],

  journey: [
    {
      id: "amrita-cs",
      period: "2024 — 2028 (Expected)",
      title: "B.Tech in Computer Science and Engineering",
      organization: "Amrita Vishwa Vidyapeetham",
      roleType: "Education",
      location: "Chennai, India",
      description: "Currently in 3rd Year pursuing core Computer Science with rigorous foundations in Machine Learning, Algorithms, and System Architecture.",
      highlights: [
        "Specialized Coursework: Machine Learning Foundations, Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, Operating Systems.",
        "Hands-on laboratory research in AI/ML pipeline design, relational database optimization, and software development methodologies."
      ],
      technologies: ["Python", "Machine Learning", "DSA", "DBMS", "C++", "Java", "SQL"],
      badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-950/40"
    },
    {
      id: "clabroom",
      period: "Startup Experience",
      title: "Product & Support Lead",
      organization: "Early Stage Tech Startup (CLABROOM)",
      roleType: "Startup Experience",
      location: "Chennai, India",
      description: "Managed technical feature iterations, cross-functional sprint planning, and user feedback synthesis to accelerate product delivery cycles.",
      highlights: [
        "Managed technical feature iterations and customer issue resolution, bridging user feedback with backend engineering tasks.",
        "Collaborated with cross-functional development teams in agile sprint planning to accelerate deployment cycles.",
        "Worked on early-stage AI automation, voice-agent integrations, and business process automation."
      ],
      technologies: ["Agile Development", "Product Iteration", "Feature Specifications", "Issue Triage"],
      badgeColor: "border-purple-500/30 text-purple-400 bg-purple-950/40"
    },
    {
      id: "vocal-bridge-role",
      period: "Startup Innovation",
      title: "AI Automation & Voice Agent Developer",
      organization: "Vocal Bridge",
      roleType: "Engineering",
      location: "Chennai, India",
      description: "Developed solutions for automated voice interactions and end-to-end business process automation for early-stage customer communication.",
      highlights: [
        "Integrated real-time speech streaming and intent detection state machines.",
        "Architected webhook connections that seamlessly routed validated customer intent to backend operational databases."
      ],
      technologies: ["Python", "Voice APIs", "FastAPI", "Webhooks", "Automation"],
      badgeColor: "border-rose-500/30 text-rose-400 bg-rose-950/40"
    },
    {
      id: "quantum-ai-labs",
      period: "Engineering Internship",
      title: "Frontend Developer Intern",
      organization: "Quantum AI and Electronics Labs",
      roleType: "Startup Experience",
      location: "Chennai, India",
      description: "Developed user-facing dashboards and telemetry visualizers connecting experimental sensor setups with real-time UI clients.",
      highlights: [
        "Created responsive React and JavaScript interfaces displaying real-time metrics and laboratory testing parameters.",
        "Ensured zero-lag data rendering across multi-device laboratory environments."
      ],
      technologies: ["React", "JavaScript", "HTML5/CSS3", "REST APIs", "Data Visualization"],
      badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-950/40"
    },
    {
      id: "spectrum-milestone",
      period: "Flagship Engineering Milestone",
      title: "Architected Spectrum AI & HyperTrade AI",
      organization: "Independent AI Engineering",
      roleType: "Milestone",
      location: "Chennai, India",
      description: "Engineered high-performance RAG and quantitative decision engines, demonstrating mastery in vector databases, speech-to-text pipelines, and time-series algorithmic modeling.",
      highlights: [
        "Integrated OpenAI Whisper audio transcription with ChromaDB vector search and dynamic knowledge graph generation.",
        "Engineered quantitative multi-factor market scoring calculating RSI and moving averages with NumPy and Pandas."
      ],
      technologies: ["ChromaDB", "RAG", "FastAPI", "OpenAI Whisper", "NumPy", "Pandas", "Scikit-learn"],
      badgeColor: "border-amber-500/30 text-amber-400 bg-amber-950/40"
    }
  ] as JourneyMilestone[],

  aboutDetails: {
    title: "Behind the Builder",
    quote: "I believe the most transformative software lives at the convergence of deep technical intelligence and seamless human experience.",
    narrative: [
      "I am Tarun S, a 3rd-year Computer Science undergraduate at Amrita Vishwa Vidyapeetham in Chennai, India. My passion lies in engineering intelligent software systems — from context-aware RAG pipelines and autonomous workflow agents to robust backend APIs and quantitative decision engines.",
      "My journey combines academic rigor in algorithms, database design, and machine learning foundations with real-world startup execution at CLABROOM, Vocal Bridge, and Quantum AI Labs. I enjoy taking complex mathematical and algorithmic concepts — vector embeddings, speech transcription, time-series metrics — and turning them into dependable, clean, and intuitive digital products.",
      "Whether I'm optimizing a ChromaDB vector index, fine-tuning an asynchronous FastAPI microservice, or crafting a responsive UI, my goal remains constant: build software that solves real problems with clarity, speed, and precision."
    ],
    philosophies: [
      { title: "Grounding over Hype", desc: "AI systems must be verified with solid data pipelines, vector grounding (RAG), and measurable evaluation metrics." },
      { title: "Systems Thinking", desc: "Great software isn't just code; it's clean API contracts, efficient database indexing, and fault-tolerant architecture." },
      { title: "Continuous Exploration", desc: "Every project is a laboratory to experiment with emerging paradigms, refine engineering craft, and master modern tools." }
    ],
    stats: [
      { label: "Academic Focus", value: "Computer Science" },
      { label: "Institution", value: "Amrita University" },
      { label: "Core Foundation", value: "Python & AI/ML" },
      { label: "Expected Grad", value: "2028 (3rd Year)" }
    ]
  },

  resumeTracks: [
    {
      id: "ai-ml",
      title: "AI / ML & Document Intelligence",
      focus: "RAG • NLP • Vector DB • Python",
      pdfFile: "/resumes/Tarun_S_AI_ML_Intern_SampleTech.pdf",
      description: "Tailored for AI/ML engineering, document intelligence platforms, vector search architectures, and statistical NLP applications.",
      summary: "Computer Science undergraduate at Amrita Vishwa Vidyapeetham with strong Python fundamentals and hands-on experience building AI/ML applications, RAG pipelines, and document intelligence engines. Skilled in Supervised Learning, NLP, vector embeddings (ChromaDB), and Scikit-learn with practical speech-to-text and text analytics implementations.",
      coreHighlights: [
        "Engineered Spectrum AI RAG pipeline using ChromaDB, OpenAI Whisper, and semantic embeddings.",
        "Developed Autonomous Email Management Agent using keyword density NLP scoring and regex parsing.",
        "Built HyperTrade AI quantitative analytics engine calculating RSI and SMA momentum indicators with NumPy & Pandas."
      ]
    },
    {
      id: "generative-ai",
      title: "Generative AI & LLM Systems",
      focus: "LLM APIs • ChromaDB • Prompt Engineering",
      pdfFile: "/resumes/Tarun_S_Generative_AI_Intern_SampleTech.pdf",
      description: "Tailored for Generative AI development, context augmentation, autonomous agents, and multi-modal audio/text pipelines.",
      summary: "Computer Science student specializing in Generative AI systems, context-aware RAG pipelines, autonomous AI agents, and semantic search architectures. Hands-on experience integrating LLM APIs, ChromaDB vector stores, OpenAI Whisper audio processing, and prompt-driven document intelligence workflows.",
      coreHighlights: [
        "Implemented multi-stage chunking and Whisper speech-to-text transcript generation.",
        "Engineered context-aware Q&A with dynamic knowledge graph visualizations.",
        "Designed autonomous agentic workflow loops for operational process automation."
      ]
    },
    {
      id: "python-dev",
      title: "Python & Backend Developer",
      focus: "FastAPI • Django • PostgreSQL • REST",
      pdfFile: "/resumes/Tarun_S_Python_Developer_Intern_SampleTech.pdf",
      description: "Tailored for backend engineering, high-throughput asynchronous services, relational schema design, and microservices.",
      summary: "Strong Python developer experienced with FastAPI, Django REST Framework, PostgreSQL database optimization, and asynchronous service design. Proven track record building data pipelines, API integrations, and robust backend systems.",
      coreHighlights: [
        "Built asynchronous FastAPI microservice endpoints with sub-200ms vector search response times.",
        "Designed PostgreSQL relational schemas and query optimizations in Django for collaborative platforms.",
        "Engineered time-series data pipelines and analytics routines using NumPy and Pandas."
      ]
    },
    {
      id: "product-dev",
      title: "Product & Software Developer",
      focus: "Full Stack • Agile Sprints • Feature Iteration",
      pdfFile: "/resumes/Tarun_S_Product_Developer_Intern_SampleTech.pdf",
      description: "Tailored for product engineering roles requiring cross-functional collaboration, frontend/backend integration, and agile delivery.",
      summary: "Proactive engineering student with cross-functional experience spanning product engineering, backend API development, and agile feature delivery. Hands-on background translating user feedback into scalable technical specifications and building full-stack platforms.",
      coreHighlights: [
        "Product & Support Lead experience at early-stage startup (CLABROOM), accelerating sprint delivery cycles.",
        "Frontend Developer Intern at Quantum AI and Electronics Labs developing telemetry dashboards in React.",
        "End-to-end full stack execution combining React, TypeScript, Tailwind CSS, and Python backends."
      ]
    }
  ] as ResumeTrack[],

  githubActivity: {
    profileUrl: "https://github.com/tarun-s",
    username: "tarun-s",
    statusText: "Building RAG pipelines & intelligent software systems",
    topLanguages: [
      { name: "Python", percentage: 68, color: "#3572A5" },
      { name: "TypeScript / React", percentage: 18, color: "#3178c6" },
      { name: "SQL & Schema", percentage: 8, color: "#e38c00" },
      { name: "C++ & Java", percentage: 6, color: "#f34b7d" }
    ],
    repositories: [
      {
        name: "spectrum-ai",
        description: "AI-Powered RAG & Document Intelligence Platform with OpenAI Whisper & ChromaDB.",
        stars: 24,
        forks: 7,
        language: "Python",
        langColor: "#3572A5",
        updated: "Recently updated",
        url: "https://github.com/tarun-s"
      },
      {
        name: "hypertrade-ai",
        description: "Predictive Market Analytics Engine computing RSI, Moving Averages, and quantitative signals.",
        stars: 18,
        forks: 4,
        language: "Python",
        langColor: "#3572A5",
        updated: "Active development",
        url: "https://github.com/tarun-s"
      },
      {
        name: "autonomous-email-agent",
        description: "NLP & Text Analytics Engine for automated inbox triage, priority scoring, and routing.",
        stars: 15,
        forks: 3,
        language: "Python",
        langColor: "#3572A5",
        updated: "Maintained",
        url: "https://github.com/tarun-s"
      },
      {
        name: "ai-collaboration-platform",
        description: "Distributed collaboration backend with Django REST Framework and PostgreSQL.",
        stars: 12,
        forks: 2,
        language: "Python",
        langColor: "#3572A5",
        updated: "Maintained",
        url: "https://github.com/tarun-s"
      }
    ]
  }
};
