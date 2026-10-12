/* ============================================================================
   SITE DATA — edit everything from this one file.
   No build step. Change a value, refresh the page.

   HOW TO UPDATE
   ─────────────
   • Personal links / availability ....... SITE below
   • Contact form delivery ................ SITE.formEndpoint (see README)
   • Social profiles ...................... SOCIALS below (empty url = hidden)
   • Skills ............................... SKILLS below
   • "Learning next" goals ................ LEARNING below
   • Projects (add / edit / remove) ....... PROJECTS below
   • Education timeline ................... EDUCATION below
   • Languages ............................ LANGUAGES below
   • Interests ............................ INTERESTS below
   ========================================================================== */

const SITE = {
  name: "Mohamed Madi",
  role: "Digital Development Student · Aspiring Web Developer",

  /* Availability pill in the hero.
     Set enabled:false to hide it entirely. */
  availability: {
    enabled: true,
    text: "Open to internship opportunities"
  },

  /* Contact form delivery.
     Leave as "" to use the built-in mailto fallback (honest: it opens the
     visitor's email client — no fake "message sent" state).
     To send for real, paste a form provider endpoint, e.g. Formspree:
        formEndpoint: "https://formspree.io/f/xxxxxxxx"
     The form then POSTs the JSON and reports the provider's real response. */
  formEndpoint: "",

  /* Canonical URL of the deployed site (used in metadata, not required). */
  website: "https://example.com/"
};

/* ---------------------------------------------------------------------------
   SOCIAL LINKS
   Add a url to show the icon; leave url:"" to hide it.
   Only add profiles that genuinely belong to Mohamed Madi.
   --------------------------------------------------------------------------- */
const SOCIALS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/mohamed-madi-18999824a/",
    icon: "linkedin"
  },
  {
    id: "github",
    label: "GitHub",
    /* No GitHub profile confirmed yet — add the URL to reveal the icon. */
    url: "",
    icon: "github"
  },
  {
    id: "email",
    label: "Email",
    url: "mihamedmadi@gmail.com",
    icon: "mail"
  },
   {
    id: "github",
    label: "github",
    url: "https://github.com/mohamedmadi05",
    icon: "github"
  }
  ,
   {
    id: "facebook",
    label: "facebook",
    url: "https://www.facebook.com/mohamed.madi.7311352/?locale=fr_FR",
    icon: "facebook"
  }
  ,
   {
    id: "whatsapp",
    label: "whatsapp",
    url: "https://wa.me/212694708512",
    icon: "whatsapp"
  }
];

/* ---------------------------------------------------------------------------
   SKILLS — categories rendered as premium cards.
   `mark`  : short monogram shown in the tile
   `color` : brand colour used for the tile + dot
   `note`  : honest description of the current level (no percentages!)
   --------------------------------------------------------------------------- */
const SKILLS = [
  {
    group: "Frontend Development",
    icon: "code",
    blurb: "Building responsive, semantic interfaces for the web.",
    items: [
      { name: "HTML5",      mark: "H5",  color: "#E34F26" },
      { name: "CSS3",       mark: "C3",  color: "#1572B6" },
      { name: "JavaScript", mark: "JS",  color: "#F7DF1E" },
      { name: "Bootstrap",  mark: "B",   color: "#7952B3" },
      { name: "Tailwind CSS", mark: "TW", color: "#06B6D4" },
      { name: "React", mark: "RE", color: "#06B6D4" }
    ]
  },
  {
    group: "Programming",
    icon: "braces",
    blurb: "Core languages I use to practise logic and solve problems.",
    items: [
      { name: "Python", mark: "Py",  color: "#3776AB" },
      { name: "PHP",    mark: "php", color: "#777BB4" }
    ]
  },
  {
    group: "Database",
    icon: "database",
    blurb: "Storing and querying structured data.",
    items: [
      { name: "MySQL", mark: "My", color: "#4479A1" }
    ]
  },
  {
    group: "Backend Development",
    icon: "server",
    blurb: "Foundational server-side development with PHP and Python.",
    items: [
      { name: "PHP (server-side)",    mark: "php", color: "#777BB4" },
      { name: "Python (server-side)", mark: "Py",  color: "#3776AB" }
    ]
  }
];

/* Goals only — deliberately separated from current skills. */
const LEARNING = ["React", "Git & GitHub", "REST APIs", "Node.js"];

/* ---------------------------------------------------------------------------
   PROJECTS
   Each project needs: id, name, tagline, description, tech[], image,
   status ("practice" | "confirmed"), and optional links.
   A link with url:"" is hidden automatically (no dead buttons).
   --------------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "tamount-store",
    name: "Tamount Store",
    tagline: "E-Commerce Website",
    description:
      "A web development project focused on creating an online store experience, with product presentation, account management, and administrative functionality.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap"],
    features: [
      "Product catalog",
      "User authentication",
      "Shopping cart",
      "Admin product management",
      "Order management",
      "User preferences using cookies"
    ],
    image: "assets/img/project-tamount.svg",
    status: "practice",
    links: { live: "", code: "" }
  },
  {
    id: "counter-calculator",
    name: "Interactive Counter & Calculator",
    tagline: "Component-Based Interfaces",
    description:
      "A collection of interactive programming exercises exploring component-based interfaces, user interactions, state management, and basic calculations.",
    tech: ["React", "JavaScript"],
    features: [
      "Reusable components",
      "Interactive state handling",
      "Basic arithmetic operations"
    ],
    image: "assets/img/project-interactive.svg",
    status: "practice",
    links: { live: "", code: "" }
  },
  {
    id: "portfolio",
    name: "Personal Portfolio Website",
    tagline: "This Website",
    description:
      "A personal website designed to present my technical skills, learning journey, projects, and professional goals.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Responsive, accessible layout",
      "Dark and light themes",
      "Editable, data-driven content"
    ],
    image: "assets/img/project-portfolio.svg",
    status: "practice",
    links: { live: "", code: "" }
  }
];

/* ---------------------------------------------------------------------------
   EDUCATION — vertical timeline.
   --------------------------------------------------------------------------- */
const EDUCATION = [
  {
    date: "2025 — Present",
    title: "Digital Development — First Year",
    org: "Cité des Métiers et des Compétences (CMC), Agadir",
    note: "Currently studying digital development.",
    current: true
  },
  {
    date: "2024 — 2025",
    title: "Licence — Mathematics and Computer Science",
    org: "Semesters 1 and 2 · Academic year 2024–2025",
    note: "University foundation in mathematics and computer science.",
    current: false
  },
  {
    date: "2024",
    title: "Baccalaureate — Mathematical Sciences, Option A",
    org: "Secondary education",
    note: "Scientific baccalaureate with a focus on mathematics.",
    current: false
  }
];

/* ---------------------------------------------------------------------------
   LANGUAGES — levels exactly as stated, not upgraded.
   `dots` is a plain 1–5 visual indicator derived from the stated level
   (Native 5, Advanced 4, B2 3, B1 2). It is a presentation choice, not a
   claim of a CEFR score beyond the level shown.
   --------------------------------------------------------------------------- */
const LANGUAGES = [
  { symbol: "ⵣ",  name: "Tamazight", level: "Native",   detail: "",              dots: 5 },
  { symbol: "ع",  name: "Arabic",    level: "Advanced", detail: "",              dots: 4 },
  { symbol: "EN", name: "English",   level: "B2",       detail: "Rosetta Stone", dots: 3 },
  { symbol: "FR", name: "French",    level: "B1",       detail: "Rosetta Stone", dots: 2 }
];

/* ---------------------------------------------------------------------------
   INTERESTS — icons: code | spark | ball
   --------------------------------------------------------------------------- */
const INTERESTS = [
  { icon: "code",  text: "Web development and personal computing projects" },
  { icon: "spark", text: "Technology news and learning new programming languages" },
  { icon: "ball",  text: "Sport — football, basketball, tennis" }
];
