export const DATA = {
  name: "Aditya Singh",
  firstName: "Aditya",
  headline: "Build high-perf systems. Ship agentic AI.",
  pill: "Final year @ IIIT Ranchi",
  bio: "Final year @ IIIT Ranchi. Building high-perf web apps, backend architecture & cloud infrastructure. Currently deep in Devops & Agentic AI.",
  experience: [
    {
      company: "Tutedude",
      role: "Software Engineer Intern",
      date: "Aug 2026 - Present",
      logo: "/tutedude.svg",
      href: "https://tutedude.com",
    },
    {
      company: "Draviya",
      role: "Founding Engineer (Full Stack)",
      date: "Dec 2025 - Present",
      logo: "/draviya.png",
      href: "https://draviya.com",
    },
    {
      company: "House of Geeks, IIIT Ranchi",
      role: "Software Dev Wing Lead & Coordinator",
      date: "Mar 2025 - Sep 2026",
      logo: "/hog.png",
      href: "https://houseofgeeks.netlify.app/",
    },
    {
      company: "Hello Hospital",
      role: "Software Engineer Intern",
      date: "Jun 2026 - Jul 2026",
      logo: "/hellohospital.svg",
      href: "https://hellohospital.in",
    },
  ],
  education: [
    {
      institution: "IIIT Ranchi",
      degree: "Bachelor of Technology in Electronics and Communication",
      date: "2023 - 2027",
      logo: "/iiit-ranchi.png",
    },
  ],
  skills: [
    "Rust", "C++", "TypeScript", "JavaScript", "SQL", "Python",
    "React.js", "Next.js", "Express.js", "TailwindCSS", "FastAPI", "Hono",
    "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "Prometheus", "Grafana", "BullMQ",
    "Langchain", "Langgraph", "Langsmith",
  ],
  projects: [
    {
      title: "InkLink",
      date: "2025",
      description: "Real-time collaborative workspace with Excalidraw-like features. Draw, plan, and brainstorm together using shared TypeScript interfaces.",
      tech: ["Next.js", "Express", "WebSockets", "BullMQ"],
      link: "https://github.com/iaadi4/inklink",
      image: "/projects/inklink.png",
      diagram: "circles" as const,
    },
    {
      title: "Ora",
      date: "2025",
      description: "Voice journaling app with AI transcription and emotion analysis. Features secure authentication via BetterAuth, cloud storage on AWS S3.",
      tech: ["Next.js", "FastAPI", "OpenAI Whisper"],
      link: "https://github.com/iaadi4/ora",
      image: "/projects/ora.png",
      diagram: "pyramid" as const,
    },
    {
      title: "SEO Boost",
      date: "2025",
      description: "Instant technical SEO audit tool. Run a professional audit in seconds and get a beautiful, actionable report.",
      tech: ["Next.js", "TypeScript", "SEO", "Analytics"],
      link: "https://github.com/iaadi4/SeoBoost",
      image: "/projects/seoboost.png",
      diagram: "venn" as const,
    },
    {
      title: "FocusOS",
      date: "2025",
      description: "Master your digital life. Combines powerful site blocking, browsing analytics, and flow-state tools into one beautiful Firefox extension dashboard.",
      tech: ["TypeScript", "WebExtension", "Firefox"],
      link: "https://github.com/iaadi4/FocusOS",
      image: "/projects/focusos.png",
      diagram: "hex" as const,
    },
  ],
  blog: {
    title: "Stop Querying Your Database for Usernames: The Bouncer Pattern",
    date: "Jan 2026",
    link: "https://medium.com/@adityasingh40675/stop-querying-your-database-for-usernames-the-bouncer-pattern-b06afcd1fe82",
    tags: ["Backend", "PostgreSQL", "Optimization"],
  },
};

export const NAV_SECTIONS = [
  { id: "intro", index: "01", label: "Intro" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "education", index: "03", label: "Education" },
  { id: "skills", index: "04", label: "Skills" },
  { id: "projects", index: "05", label: "Projects" },
  { id: "writing", index: "06", label: "Writing" },
  { id: "work", index: "07", label: "Work" },
  { id: "contact", index: "08", label: "Contact" },
];

export const PAGES = [
  { href: "#intro", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#writing", label: "Writing" },
  { href: "#contact", label: "Contact" },
];

export const SOCIALS = [
  { href: "https://github.com/iaadi4", label: "GitHub", id: "github" },
  { href: "https://www.linkedin.com/in/adityasingh40675/", label: "LinkedIn", id: "linkedin" },
  { href: "https://x.com/iaadi8", label: "X", id: "twitter" },
  { href: "https://leetcode.com/u/iaadi4/", label: "LeetCode", id: "leetcode" },
  { href: "https://www.codechef.com/users/iaadi7", label: "CodeChef", id: "codechef" },
  { href: "https://codeforces.com/profile/chineseremaindertheoram", label: "Codeforces", id: "codeforces" },
  { href: "mailto:adityasingh40675@gmail.com", label: "Email", id: "email" },
];

export const CAPABILITIES = [
  {
    index: "01",
    title: "Full Stack",
    items: ["Next.js", "React.js", "TypeScript", "Express.js", "FastAPI", "Hono"],
  },
  {
    index: "02",
    title: "Infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Prometheus"],
  },
  {
    index: "03",
    title: "Agentic AI",
    items: ["Langchain", "Langgraph", "Langsmith"],
  },
];

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["Rust", "C++", "TypeScript", "JavaScript", "SQL", "Python"],
  },
  {
    title: "Frameworks",
    items: ["React.js", "Next.js", "Express.js", "TailwindCSS", "FastAPI", "Hono"],
  },
  {
    title: "Infrastructure",
    items: ["AWS", "Docker", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "Prometheus", "Grafana", "BullMQ"],
  },
  {
    title: "AI",
    items: ["Langchain", "Langgraph", "Langsmith"],
  },
];

export const EMAIL = "mailto:adityasingh40675@gmail.com";
