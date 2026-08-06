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
        title: "Home & subjects",
        description:
          "Students pick a subject and jump straight into AR labs, recent lessons, and tutor chats.",
        image:
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "AR lab session",
        description:
          "Textbooks open into interactive 3D models — rotate, label, and explore concepts in place.",
        image:
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "AI tutor",
        description:
          "A 24/7 tutor answers questions with step-by-step explanations tied to the current lab.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Study path",
        description:
          "Personalized paths adapt to progress so each learner gets the next best lesson.",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "crop",
    title: "Crop Recommendation",
    subtitle: "Machine Learning",
    description:
      "Recommends suitable crops from soil and climate data — nutrients, rainfall, temperature, and pH.",
    tags: ["Python", "ML", "Streamlit"],
    kind: "web",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
    year: "2025",
    // Replace with your live Streamlit / app URL to enable in-page browsing
    liveUrl: "",
    featured: true,
    hotspot: { x: 68, y: 36 },
  },
  {
    id: "kgc",
    title: "KGC Connect",
    subtitle: "Learning Platform",
    description:
      "Connects students, teachers, and admins with lessons, quizzes, attendance, and announcements.",
    tags: ["Fullstack", "Mobile"],
    kind: "mobile",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1600&q=80",
    year: "2024",
    liveUrl: "#",
    featured: true,
    hotspot: { x: 30, y: 42 },
    screens: [
      {
        title: "Dashboard",
        description:
          "One hub for classes, announcements, and what’s due — for students and teachers alike.",
        image:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Lessons & quizzes",
        description:
          "Browse lessons, take quizzes, and track scores without leaving the app.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Attendance",
        description:
          "Teachers mark attendance quickly; students see their record in real time.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Announcements",
        description:
          "School-wide and class updates land in one clear feed so nothing gets missed.",
        image:
          "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "refooture",
    title: "REFOOTURE",
    subtitle: "Sustainability",
    description:
      "Platform for regenerative food systems in Ethiopia — coffee waste to sustainable agriculture impact.",
    tags: ["Web", "Impact"],
    kind: "web",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1600&q=80",
    year: "2024",
    liveUrl: "https://refooturee.onrender.com",
    featured: true,
    hotspot: { x: 78, y: 62 },
  },
];

/** Full-bleed scene behind project hotspots (Era-style amenity view) */
export const projectsMapImage =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80";
