import type { Project } from "@/types";

/** Featured portfolio work */
export const projects: Project[] = [
  {
    id: "edutwin",
    title: "EduTwin",
    subtitle: "AI & AR Learning",
    description:
      "Turns STEM textbooks into interactive 3D AR labs with a 24/7 AI tutor and personalized study paths.",
    tags: ["AI", "AR", "Mobile"],
    kind: "mobile",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    liveUrl: "#",
    featured: true,
    hotspot: { x: 42, y: 58 },
    screens: [
      {
        title: "Books & subjects",
        description:
          "Browse STEM textbooks and subjects, then jump into labs, lessons, and tutor support.",
        image: "/images/books_screen_edutwin.jpg",
      },
      {
        title: "AR lab session",
        description:
          "Open the page in AR. Place, rotate, and explore interactive learning scenes in space.",
        image: "/images/AR_screen_edutwin.jpg",
      },
      {
        title: "3D models",
        description:
          "Inspect detailed 3D models from the curriculum with labels, layers, and hands on exploration.",
        image: "/images/3D_models_screen_edutwin.jpg",
      },
      {
        title: "AI tutor chat",
        description:
          "Ask questions anytime. Step by step answers tied to the lesson you’re studying.",
        image: "/images/chat_screen_edutwin.jpg",
      },
    ],
  },
  {
    id: "decx",
    title: "DECx",
    subtitle: "Influencer Marketing",
    description:
      "Connects brands and influencers for campaigns, chat, stories, and wallet payouts in one app.",
    tags: ["Flutter", "Supabase", "Mobile"],
    kind: "mobile",
    image:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    liveUrl: "#",
    featured: true,
    hotspot: { x: 30, y: 42 },
    screens: [
      {
        title: "Sign in",
        description:
          "Sign in with email, Google, or Facebook to start as member, influencer, or brand.",
        image: "/images/login_screen_decx.jpg",
      },
      {
        title: "Home",
        description:
          "See balance, deals, and earnings, then jump to campaigns, wallet, or messages.",
        image: "/images/home_screen_decx.jpg",
      },
      {
        title: "Wallet",
        description:
          "Track ETB balances, withdraw funds, and review campaign payouts.",
        image: "/images/wallet_screen_decx.jpg",
      },
      {
        title: "Menu",
        description:
          "Open discover, messages, wallet, reviews, and settings from one place.",
        image: "/images/sidebar_screen_decx.jpg",
      },
    ],
  },
  {
    id: "expoiq",
    title: "ExportIQ",
    subtitle: "Export Intelligence",
    description:
      "AI copilot for Ethiopian exporters: buyer discovery, market research, and export CRM in one platform.",
    tags: ["Web", "AI", "CRM"],
    kind: "web",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    liveUrl: "https://expoiq.onrender.com/",
    featured: true,
    hotspot: { x: 78, y: 62 },
  },
  {
    id: "kidanetesfu",
    title: "Kidanetesfu",
    subtitle: "Import · Export · Logistics",
    description:
      "Company site for Kidanemaryam Tesfu Import Export covering Ethiopian trade, warehousing, and freight.",
    tags: ["Web", "Business"],
    kind: "web",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    liveUrl: "https://kidanetesfu-company.onrender.com/",
    featured: true,
    hotspot: { x: 55, y: 48 },
  },
];

/** Full bleed scene behind project hotspots (Era style amenity view) */
export const projectsMapImage =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80";
