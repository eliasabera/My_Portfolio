import type { Project } from "@/types";

/** Featured portfolio work */
export const projects: Project[] = [
  {
    id: "edutwin",
    title: "EduTwin",
    subtitle: "AI & AR Learning",
    description:
      "Turns STEM textbooks into interactive 3D AR labs with a 24/7 AI tutor and personalized study paths.",
    highlights: [
      "Curriculum-aligned tutor for Physics, Mathematics, Biology, and Chemistry.",
      "Retrieval-augmented answers grounded in the student’s textbooks.",
      "3D AR labs that turn static concepts into visual demonstrations.",
      "Quizzes and progress tracking for personalized recommendations.",
    ],
    tags: ["AI", "RAG", "AR"],
    kind: "web",
    image: "/images/edutwin.png",
    year: "2025",
    liveUrl: "https://edutwin-website.onrender.com/",
    featured: true,
  },
  {
    id: "expoiq",
    title: "ExportIQ",
    subtitle: "Export Intelligence",
    description:
      "AI copilot for Ethiopian exporters: buyer discovery, market research, and export CRM in one platform.",
    highlights: [
      "Natural-language buyer discovery by product and target market.",
      "Market summaries, demand insights, and pricing context.",
      "Outreach drafts for email and WhatsApp.",
      "Buyer, supplier, and deal pipeline in one CRM.",
    ],
    tags: ["Web", "AI", "CRM"],
    kind: "web",
    image: "/images/exportIQ.png",
    year: "2025",
    liveUrl: "https://expoiq.onrender.com/",
    featured: true,
  },
  {
    id: "metroads",
    title: "MetroAds",
    subtitle: "Advertising Operations",
    description:
      "Web platform for advertising projects, workflows, users, and day-to-day business operations.",
    highlights: [
      "Campaign and project workflows across the product.",
      "Authentication and role-based access for each team.",
      "Dashboards for users, projects, and operations.",
    ],
    tags: ["Web", "React", "NestJS"],
    kind: "web",
    image: "/images/metroads.png",
    year: "2025",
    liveUrl: "https://metroads.80.65.211.25.sslip.io/",
    featured: true,
  },
  {
    id: "greenaxis",
    title: "GreenAxis",
    subtitle: "Agriculture Counseling",
    description:
      "Counseling site for coffee and agriculture, connecting farmers with advice, training, and impact stories.",
    highlights: [
      "Consultation booking for coffee and agriculture.",
      "Services aimed at better yields and stronger cooperatives.",
      "Impact stories across youth training and income growth.",
    ],
    tags: ["Web", "Agriculture"],
    kind: "web",
    image: "/images/GreenAxis.png",
    year: "2025",
    liveUrl: "https://agricounsel.onrender.com/",
    featured: true,
  },
  {
    id: "jimmiti",
    title: "Jimmiti",
    subtitle: "Food Delivery",
    description:
      "Food delivery for Jimma. Search local restaurants, order a meal, and get it to the door.",
    highlights: [
      "Restaurant search for Jimma.",
      "Ordering flow from craving to delivery.",
      "Installable app for repeat orders.",
    ],
    tags: ["Mobile", "Delivery"],
    kind: "web",
    image: "/images/Jimmiti.png",
    year: "2025",
    featured: true,
  },
  {
    id: "import-export",
    title: "Import & Export",
    subtitle: "Trade & Logistics",
    description:
      "Company site for Ethiopian import, export, and freight, covering trade, warehousing, and logistics.",
    highlights: [
      "Export, import, and integrated freight in one place.",
      "Product, news, and contact paths for trade partners.",
      "Assistant for questions about shipments and logistics.",
    ],
    tags: ["Web", "Business"],
    kind: "web",
    image: "/images/import%20and%20export.png",
    year: "2025",
    liveUrl: "https://kidanetesfu-company.onrender.com/",
    featured: true,
  },
];
