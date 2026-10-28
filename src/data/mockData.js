export const INITIAL_STUDENTS = [
  {
    id: "std-101",
    rollNo: "21BCE1042",
    name: "Rudra Nagar",
    email: "rudra.nagar@campus.edu",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    branch: "Computer Science & Engineering",
    semester: 8,
    cgpa: 8.92,
    tenthMarks: 94.5,
    twelfthMarks: 92.8,
    backlogs: 0,
    skills: ["React", "Node.js", "Java", "Python", "System Design", "AWS", "Docker", "PostgreSQL"],
    certifications: [
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: 2024 },
      { name: "Meta Full-Stack Developer", issuer: "Coursera", year: 2023 }
    ],
    projects: [
      { title: "Distributed Task Queue", tech: "Go, Redis, Docker", desc: "Built a high-throughput async task queue handling 5k req/sec." },
      { title: "Placement Portal", tech: "React, Tailwind, Express", desc: "Campus recruitment management tool with real-time updates." }
    ],
    internships: [
      { role: "Software Engineering Intern", company: "Zomato", period: "May 2025 - Jul 2025", desc: "Optimized restaurant search latency by 28% using Redis caching." }
    ],
    achievements: [
      "Ranked Top 2% in LeetCode Weekly Contest (Rating 2140)",
      "1st Prize in Smart India Hackathon (College Level)"
    ],
    linkedin: "https://linkedin.com/in/rudranagar-demo",
    github: "https://github.com/rudranagar-dev",
    resumeUrl: "#",
    verified: true,
    placed: true,
    blocked: false
  },
  {
    id: "std-102",
    rollNo: "21BCE1189",
    name: "Priya Patel",
    email: "priya.patel@campus.edu",
    phone: "+91 98123 45678",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    branch: "Information Technology",
    semester: 8,
    cgpa: 9.35,
    tenthMarks: 96.0,
    twelfthMarks: 95.2,
    backlogs: 0,
    skills: ["Python", "TensorFlow", "PyTorch", "SQL", "Data Analytics", "C++", "FastAPI"],
    certifications: [
      { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: 2024 }
    ],
    projects: [
      { title: "Medical Image Segmentation", tech: "PyTorch, UNet", desc: "Achieved 94% Dice score on pulmonary CT scans." }
    ],
    internships: [
      { role: "AI Research Intern", company: "Indian Institute of Science", period: "Jun 2025 - Aug 2025", desc: "Co-authored paper on lightweight vision transformers." }
    ],
    achievements: [
      "Google Women Techmakers Scholar 2024",
      "College Academic Gold Medalist (Sem 5 & 6)"
    ],
    linkedin: "https://linkedin.com/in/priyapatel-demo",
    github: "https://github.com/priyapatel-ml",
    resumeUrl: "#",
    verified: true,
    placed: true,
    blocked: false
  },
  {
    id: "std-103",
    rollNo: "21BEC1015",
    name: "Aarav Mehta",
    email: "aarav.mehta@campus.edu",
    phone: "+91 97654 32109",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    branch: "Electronics & Communication",
    semester: 8,
    cgpa: 7.85,
    tenthMarks: 88.0,
    twelfthMarks: 85.5,
    backlogs: 0,
    skills: ["Embedded C", "IoT", "Verilog", "Python", "Linux Kernel", "Arduino", "PCB Design"],
    certifications: [
      { name: "Embedded Systems with ARM", issuer: "edX", year: 2023 }
    ],
    projects: [
      { title: "Autonomous Drone Flight Controller", tech: "STM32, C++", desc: "Custom PID stabilization and GPS wayfinding drone." }
    ],
    internships: [],
    achievements: ["Winner of Robocon Zonal Championship 2024"],
    linkedin: "https://linkedin.com/in/aaravmehta",
    github: "https://github.com/aarav-embedded",
    resumeUrl: "#",
    verified: true,
    placed: false,
    blocked: false
  },
  {
    id: "std-104",
    rollNo: "21BME1004",
    name: "Ananya Iyer",
    email: "ananya.iyer@campus.edu",
    phone: "+91 99887 76655",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    branch: "Mechanical Engineering",
    semester: 8,
    cgpa: 8.45,
    tenthMarks: 91.2,
    twelfthMarks: 89.0,
    backlogs: 0,
    skills: ["SolidWorks", "ANSYS", "Python", "Data Analysis", "MATLAB", "Supply Chain"],
    certifications: [
      { name: "Certified SolidWorks Professional", issuer: "Dassault", year: 2024 }
    ],
    projects: [
      { title: "CFD Analysis of Formula Student Car", tech: "ANSYS Fluent", desc: "Reduced front wing drag by 14%." }
    ],
    internships: [
      { role: "Design Trainee", company: "Tata Motors", period: "Jun 2025 - Jul 2025", desc: "Chassis structural testing analysis." }
    ],
    achievements: ["Captain - Formula Student Racing Team"],
    linkedin: "https://linkedin.com/in/ananyaiyer",
    github: "https://github.com/ananya-cad",
    resumeUrl: "#",
    verified: true,
    placed: false,
    blocked: false
  },
  {
    id: "std-105",
    rollNo: "21BEE1088",
    name: "Vikram Sengupta",
    email: "vikram.sengupta@campus.edu",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    branch: "Electrical Engineering",
    semester: 8,
    cgpa: 7.15,
    tenthMarks: 82.0,
    twelfthMarks: 79.5,
    backlogs: 1,
    skills: ["Power Systems", "PLC/SCADA", "C++", "MATLAB", "Circuit Simulation"],
    certifications: [],
    projects: [
      { title: "Smart Grid Power Metering", tech: "ESP32, MQTT", desc: "Real-time energy consumption telemetry." }
    ],
    internships: [],
    achievements: [],
    linkedin: "https://linkedin.com/in/vikramsengupta",
    github: "https://github.com/vikram-ee",
    resumeUrl: "#",
    verified: false,
    placed: false,
    blocked: false
  }
];

export const INITIAL_COMPANIES = [
  {
    id: "comp-1",
    name: "Google",
    logo: "https://www.google.com/favicon.ico",
    website: "https://careers.google.com",
    industry: "Information Technology & Cloud",
    description: "Google's mission is to organize the world's information and make it universally accessible and useful. We hire top university talent for high-impact software engineering and cloud roles.",
    location: "Bengaluru / Hyderabad, India",
    hrContact: "priya.nair@google.com",
    approved: true,
    tier: "Tier 1 (Dream)",
    rating: 4.8,
    totalHired: 18
  },
  {
    id: "comp-2",
    name: "Microsoft",
    logo: "https://www.microsoft.com/favicon.ico",
    website: "https://careers.microsoft.com",
    industry: "Enterprise Software & AI",
    description: "At Microsoft, we empower every person and every organization on the planet to achieve more. Explore roles across Azure, Office 365, Copilot, and Security teams.",
    location: "Hyderabad / Noida / Bengaluru",
    hrContact: "campus.india@microsoft.com",
    approved: true,
    tier: "Tier 1 (Dream)",
    rating: 4.7,
    totalHired: 24
  },
  {
    id: "comp-3",
    name: "Amazon",
    logo: "https://www.amazon.in/favicon.ico",
    website: "https://amazon.jobs",
    industry: "E-Commerce & AWS Cloud",
    description: "Earth's most customer-centric company. Looking for passionate builders for Software Development Engineer (SDE 1) and Data Engineer roles.",
    location: "Bengaluru / Hyderabad / Chennai",
    hrContact: "recruiting-india@amazon.com",
    approved: true,
    tier: "Tier 1 (Dream)",
    rating: 4.5,
    totalHired: 32
  },
  {
    id: "comp-4",
    name: "Goldman Sachs",
    logo: "https://www.goldmansachs.com/favicon.ico",
    website: "https://goldmansachs.com/careers",
    industry: "Investment Banking & FinTech",
    description: "Global financial services leader driving engineering innovations in high-frequency trading platforms, risk analytics, and quantitative modeling.",
    location: "Bengaluru / Hyderabad",
    hrContact: "campus-recruitment@gs.com",
    approved: true,
    tier: "Tier 1 (Dream)",
    rating: 4.6,
    totalHired: 12
  },
  {
    id: "comp-5",
    name: "Qualcomm",
    logo: "https://www.qualcomm.com/favicon.ico",
    website: "https://qualcomm.com/careers",
    industry: "Semiconductor & Telecomm",
    description: "Innovator in wireless telecommunications, 5G chipsets, Snapdragon processors, and automotive intelligence systems.",
    location: "Hyderabad / Bengaluru / Chennai",
    hrContact: "india-campus@qualcomm.com",
    approved: true,
    tier: "Tier 1 (Super Dream)",
    rating: 4.6,
    totalHired: 15
  },
  {
    id: "comp-6",
    name: "Deloitte",
    logo: "https://www2.deloitte.com/favicon.ico",
    website: "https://deloitte.com/careers",
    industry: "Consulting & Technology Advisory",
    description: "Global leader in technology transformation, cloud advisory, cybersecurity, and enterprise systems implementation.",
    location: "Mumbai / Gurugram / Bengaluru / Hyderabad",
    hrContact: "campuscareers@deloitte.com",
    approved: true,
    tier: "Tier 2",
    rating: 4.3,
    totalHired: 45
  },
  {
    id: "comp-7",
    name: "TCS Digital",
    logo: "https://www.tcs.com/favicon.ico",
    website: "https://tcs.com/careers",
    industry: "IT Services & Solutions",
    description: "Tata Consultancy Services Digital hiring stream for specialized product engineering, AI labs, and modern full-stack development.",
    location: "Pan-India",
    hrContact: "campus.tcs@tcs.com",
    approved: true,
    tier: "Tier 2",
    rating: 4.2,
    totalHired: 92
  },
  {
    id: "comp-8",
    name: "Stripe India",
    logo: "https://stripe.com/favicon.ico",
    website: "https://stripe.com/jobs",
    industry: "Global Financial Infrastructure",
    description: "Building modern economic infrastructure for the internet. Highly collaborative engineering team solving global payment scale.",
    location: "Bengaluru (Hybrid)",
    hrContact: "india-hiring@stripe.com",
    approved: false, // Pending approval demo
    tier: "Tier 1 (Super Dream)",
    rating: 4.9,
    totalHired: 0
  }
];

export const INITIAL_DRIVES = [
  {
    id: "drv-1001",
    companyId: "comp-1",
    companyName: "Google",
    role: "Software Engineer (University Graduate)",
    packageLPA: 42.0,
    baseSalary: "₹24,00,000",
    joiningBonus: "₹5,00,000",
    esops: "₹13,00,000 (over 4 years)",
    location: "Bengaluru / Hyderabad",
    jobType: "Full-Time",
    deadline: "2026-11-15",
    openings: 12,
    status: "Active", // Active | Closed | Reviewing
    eligibility: {
      minCgpa: 8.0,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
      maxBacklogs: 0,
      tenthMin: 85,
      twelfthMin: 85
    },
    skillsRequired: ["Data Structures & Algorithms", "C++ / Java / Python", "System Design", "Operating Systems"],
    description: "Join Google as a university software engineer to build systems that scale to billions of daily active users. You'll work closely with senior mentors on search, cloud, AI systems, or Android OS.",
    selectionRounds: [
      { roundNumber: 1, name: "Online Coding Challenge", desc: "2 algorithmic problems on HackerEarth (90 mins)" },
      { roundNumber: 2, name: "Technical Interview 1", desc: "Data structures, problem solving & complexity analysis (45 mins)" },
      { roundNumber: 3, name: "Technical Interview 2", desc: "System design basics, concurrency & real-world coding (45 mins)" },
      { roundNumber: 4, name: "Googliness & Leadership", desc: "Behavioral and cross-functional team alignment (30 mins)" }
    ],
    postedAt: "2026-10-20"
  },
  {
    id: "drv-1002",
    companyId: "comp-2",
    companyName: "Microsoft",
    role: "Software Development Engineer - Azure & Copilot",
    packageLPA: 44.5,
    baseSalary: "₹25,50,000",
    joiningBonus: "₹6,00,000",
    esops: "₹13,00,000",
    location: "Hyderabad / Noida",
    jobType: "Full-Time",
    deadline: "2026-11-12",
    openings: 16,
    status: "Active",
    eligibility: {
      minCgpa: 7.5,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering"],
      maxBacklogs: 0,
      tenthMin: 80,
      twelfthMin: 80
    },
    skillsRequired: ["C# / C++ / Python", "Algorithms", "Object-Oriented Design", "Cloud Architecture"],
    description: "Build next-generation enterprise solutions and cloud infrastructures for Microsoft Azure and Microsoft 365 AI Copilots.",
    selectionRounds: [
      { roundNumber: 1, name: "Codility Assessment", desc: "3 algorithmic coding tasks (75 mins)" },
      { roundNumber: 2, name: "Virtual Technical Round 1", desc: "Problem solving, Trees/Graphs & memory management" },
      { roundNumber: 3, name: "Virtual Technical Round 2", desc: "Distributed concepts & low-level design" },
      { roundNumber: 4, name: "Director / HR Fit", desc: "Culture, leadership principles and scenario discussion" }
    ],
    postedAt: "2026-10-22"
  },
  {
    id: "drv-1003",
    companyId: "comp-3",
    companyName: "Amazon",
    role: "Software Development Engineer (SDE 1)",
    packageLPA: 38.0,
    baseSalary: "₹22,00,000",
    joiningBonus: "₹7,00,000 (year 1 & 2)",
    esops: "₹9,00,000",
    location: "Bengaluru / Hyderabad / Chennai",
    jobType: "Full-Time",
    deadline: "2026-11-08",
    openings: 25,
    status: "Active",
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering"],
      maxBacklogs: 0,
      tenthMin: 75,
      twelfthMin: 75
    },
    skillsRequired: ["Java / C++", "Data Structures", "OOP", "Amazon Leadership Principles"],
    description: "Tackle large-scale challenges across Amazon Web Services (AWS), Prime Video, or retail e-commerce pipelines.",
    selectionRounds: [
      { roundNumber: 1, name: "Online OA (Debugging + DSA + Work Styles)", desc: "105 mins on HackerRank" },
      { roundNumber: 2, name: "Technical Interview Round 1", desc: "Coding & Amazon Leadership Principle questions" },
      { roundNumber: 3, name: "Technical Interview Round 2", desc: "System architecture, edge cases, DSA" },
      { roundNumber: 4, name: "Bar Raiser Interview", desc: "Deep technical dive & cultural benchmark" }
    ],
    postedAt: "2026-10-18"
  },
  {
    id: "drv-1004",
    companyId: "comp-4",
    companyName: "Goldman Sachs",
    role: "Analyst - Engineering & Quantitative Strategy",
    packageLPA: 32.0,
    baseSalary: "₹20,00,000",
    joiningBonus: "₹4,00,000",
    esops: "₹8,00,000",
    location: "Bengaluru",
    jobType: "Full-Time",
    deadline: "2026-11-20",
    openings: 10,
    status: "Active",
    eligibility: {
      minCgpa: 8.0,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"],
      maxBacklogs: 0,
      tenthMin: 85,
      twelfthMin: 85
    },
    skillsRequired: ["C++ / Java", "Probability & Statistics", "Algorithms", "Financial Systems Basics"],
    description: "Design low latency algorithmic execution engines, risk models, and quantitative platforms for global financial markets.",
    selectionRounds: [
      { roundNumber: 1, name: "Aptitude & DSA Assessment", desc: "Math, probability, and 2 DSA questions (90 mins)" },
      { roundNumber: 2, name: "Technical Video Round 1", desc: "Core algorithms, trees, dynamic programming" },
      { roundNumber: 3, name: "Technical Video Round 2", desc: "Math puzzles, OS, concurrency" },
      { roundNumber: 4, name: "Partner Round", desc: "Business problem solving & fitment" }
    ],
    postedAt: "2026-10-24"
  },
  {
    id: "drv-1005",
    companyId: "comp-5",
    companyName: "Qualcomm",
    role: "Associate Engineer - Hardware & Embedded Software",
    packageLPA: 26.5,
    baseSalary: "₹18,00,000",
    joiningBonus: "₹3,50,000",
    esops: "₹5,00,000",
    location: "Hyderabad / Bengaluru",
    jobType: "Full-Time",
    deadline: "2026-11-25",
    openings: 15,
    status: "Active",
    eligibility: {
      minCgpa: 7.5,
      allowedBranches: ["Electronics & Communication", "Electrical Engineering", "Computer Science & Engineering"],
      maxBacklogs: 0,
      tenthMin: 75,
      twelfthMin: 75
    },
    skillsRequired: ["C / C++", "Microcontrollers", "RTOS", "Verilog / VHDL", "Device Drivers"],
    description: "Work on modem software, camera ISP tuning, Snapdragon DSP firmware, and 5G baseband wireless stacks.",
    selectionRounds: [
      { roundNumber: 1, name: "Online Technical Test", desc: "C programming, digital electronics, hardware concepts (90 mins)" },
      { roundNumber: 2, name: "Technical Round 1", desc: "Embedded C, memory pointers, interrupts" },
      { roundNumber: 3, name: "Technical Round 2", desc: "Microcontroller architecture and project deep-dive" },
      { roundNumber: 4, name: "HR Round", desc: "HR and relocation discussion" }
    ],
    postedAt: "2026-10-25"
  },
  {
    id: "drv-1006",
    companyId: "comp-6",
    companyName: "Deloitte",
    role: "Analyst - Technology Consulting & Cloud",
    packageLPA: 12.0,
    baseSalary: "₹9,50,000",
    joiningBonus: "₹1,50,000",
    esops: "₹1,00,000",
    location: "Mumbai / Gurugram / Bengaluru",
    jobType: "Full-Time",
    deadline: "2026-11-30",
    openings: 50,
    status: "Active",
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering"],
      maxBacklogs: 0,
      tenthMin: 65,
      twelfthMin: 65
    },
    skillsRequired: ["SQL", "Python", "Cloud Fundamentals (AWS/Azure)", "Problem Solving"],
    description: "Provide enterprise consulting, business process automation, data transformation, and cloud migration for Fortune 500 clients.",
    selectionRounds: [
      { roundNumber: 1, name: "Aptitude & Verbal Ability", desc: "Logical, analytical and coding questions" },
      { roundNumber: 2, name: "Group Discussion / Case Study", desc: "Business problem solving in groups of 8" },
      { roundNumber: 3, name: "Technical & Behavioral Interview", desc: "Technical competencies, resume projects, consulting mindset" }
    ],
    postedAt: "2026-10-26"
  },
  {
    id: "drv-1007",
    companyId: "comp-7",
    companyName: "TCS Digital",
    role: "Digital Systems Engineer",
    packageLPA: 9.0,
    baseSalary: "₹8,00,000",
    joiningBonus: "₹1,00,000",
    esops: "None",
    location: "Pan-India",
    jobType: "Full-Time",
    deadline: "2026-12-05",
    openings: 100,
    status: "Active",
    eligibility: {
      minCgpa: 6.0,
      allowedBranches: ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering"],
      maxBacklogs: 1,
      tenthMin: 60,
      twelfthMin: 60
    },
    skillsRequired: ["Java / Python", "Data Structures", "RDBMS", "Web Development"],
    description: "High-growth engineering cohort in TCS focusing on cloud native microservices, generative AI accelerators, and modern full-stack web platforms.",
    selectionRounds: [
      { roundNumber: 1, name: "TCS NQT Digital Test", desc: "Advanced quantitative, verbal, and 2 hands-on coding tests" },
      { roundNumber: 2, name: "Technical Interview", desc: "Core subjects, project walkthrough, live code debugging" },
      { roundNumber: 3, name: "Management / HR Round", desc: "Location preference, shift readiness, background verification" }
    ],
    postedAt: "2026-10-27"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-501",
    driveId: "drv-1001",
    studentId: "std-101",
    appliedAt: "2026-10-21",
    status: "Offered", // Applied | Shortlisted | Test Scheduled | Interview Scheduled | Offered | Rejected
    currentRound: 4,
    totalRounds: 4,
    notes: "Outstanding algorithmic and system design performance. Recommended for Senior Director's special offer.",
    history: [
      { stage: "Applied", date: "2026-10-21", status: "completed" },
      { stage: "Online Assessment (98/100)", date: "2026-10-23", status: "completed" },
      { stage: "Technical Interview 1", date: "2026-10-25", status: "completed" },
      { stage: "Technical Interview 2 & Leadership", date: "2026-10-27", status: "completed" },
      { stage: "Offer Released", date: "2026-10-28", status: "completed" }
    ]
  },
  {
    id: "app-502",
    driveId: "drv-1002",
    studentId: "std-101",
    appliedAt: "2026-10-22",
    status: "Interview Scheduled",
    currentRound: 3,
    totalRounds: 4,
    notes: "Cleared Codility test with 100%. Virtual round 2 scheduled.",
    history: [
      { stage: "Applied", date: "2026-10-22", status: "completed" },
      { stage: "Codility Assessment", date: "2026-10-24", status: "completed" },
      { stage: "Virtual Technical Round 1", date: "2026-10-26", status: "completed" },
      { stage: "Virtual Technical Round 2", date: "2026-10-30", status: "active" }
    ]
  },
  {
    id: "app-503",
    driveId: "drv-1002",
    studentId: "std-102",
    appliedAt: "2026-10-22",
    status: "Offered",
    currentRound: 4,
    totalRounds: 4,
    notes: "Exceptional AI/ML research background and sharp coding scores. Offer rolled out for Azure Cognitive team.",
    history: [
      { stage: "Applied", date: "2026-10-22", status: "completed" },
      { stage: "Codility Assessment", date: "2026-10-24", status: "completed" },
      { stage: "Technical Round 1", date: "2026-10-26", status: "completed" },
      { stage: "Technical Round 2 & Fitment", date: "2026-10-27", status: "completed" },
      { stage: "Offer Letter Released", date: "2026-10-28", status: "completed" }
    ]
  },
  {
    id: "app-504",
    driveId: "drv-1005",
    studentId: "std-103",
    appliedAt: "2026-10-25",
    status: "Test Scheduled",
    currentRound: 1,
    totalRounds: 4,
    notes: "Awaiting HackerEarth test on 2nd Nov.",
    history: [
      { stage: "Applied", date: "2026-10-25", status: "completed" },
      { stage: "Online Technical Test", date: "2026-11-02", status: "active" }
    ]
  },
  {
    id: "app-505",
    driveId: "drv-1006",
    studentId: "std-104",
    appliedAt: "2026-10-26",
    status: "Shortlisted",
    currentRound: 1,
    totalRounds: 3,
    notes: "Profile verified and shortlisted for round 1 aptitude.",
    history: [
      { stage: "Applied", date: "2026-10-26", status: "completed" },
      { stage: "Shortlisted for Round 1", date: "2026-10-27", status: "active" }
    ]
  }
];

export const INITIAL_INTERVIEWS = [
  {
    id: "int-801",
    driveId: "drv-1002",
    companyName: "Microsoft",
    studentId: "std-101",
    studentName: "Rudra Nagar",
    roundName: "Virtual Technical Round 2",
    date: "2026-10-30",
    time: "14:30 - 15:30 IST",
    mode: "Online (Microsoft Teams)",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/demo-ascend-msft",
    panel: "Karthik Subramanian (Principal SDE, Azure Compute)",
    status: "Upcoming"
  },
  {
    id: "int-802",
    driveId: "drv-1004",
    companyName: "Goldman Sachs",
    studentId: "std-102",
    studentName: "Priya Patel",
    roundName: "Technical Video Round 1",
    date: "2026-11-04",
    time: "11:00 - 12:00 IST",
    mode: "Online (Zoom)",
    meetingLink: "https://goldmansachs.zoom.us/j/demo-ascend-gs",
    panel: "Neha Rastogi (VP Quantitative Engineering)",
    status: "Upcoming"
  },
  {
    id: "int-803",
    driveId: "drv-1005",
    companyName: "Qualcomm",
    studentId: "std-103",
    studentName: "Aarav Mehta",
    roundName: "Technical Round 1",
    date: "2026-11-06",
    time: "15:00 - 16:00 IST",
    mode: "Campus Boardroom 2 (Offline)",
    meetingLink: "Campus T&P Block, Interview Room 204",
    panel: "Dr. Sandeep Rao (Hardware Lead)",
    status: "Upcoming"
  }
];

export const INITIAL_OFFERS = [
  {
    id: "ofr-901",
    studentId: "std-101",
    studentName: "Rudra Nagar",
    driveId: "drv-1001",
    companyId: "comp-1",
    companyName: "Google",
    role: "Software Engineer (University Graduate)",
    packageLPA: 42.0,
    baseSalary: "₹24,00,000 per annum",
    joiningBonus: "₹5,00,000 (one-time on joining)",
    esops: "₹13,00,000 (GSU grants over 4 years)",
    location: "Bengaluru, India",
    offeredOn: "2026-10-28",
    expiryDate: "2026-11-10",
    status: "Pending", // Pending | Accepted | Declined
    letterRef: "GOOG/IN/2026/UR-40291",
    pdfContent: "We are pleased to extend this offer of employment as Software Engineer with Google India Pvt Ltd..."
  },
  {
    id: "ofr-902",
    studentId: "std-102",
    studentName: "Priya Patel",
    driveId: "drv-1002",
    companyId: "comp-2",
    companyName: "Microsoft",
    role: "Software Development Engineer - Azure & Copilot",
    packageLPA: 44.5,
    baseSalary: "₹25,50,000 per annum",
    joiningBonus: "₹6,00,000",
    esops: "₹13,00,000",
    location: "Hyderabad, India",
    offeredOn: "2026-10-28",
    expiryDate: "2026-11-12",
    status: "Accepted",
    letterRef: "MSFT/IDC/2026/SDE-88219",
    pdfContent: "Microsoft India Development Center is delighted to offer you the position of Software Development Engineer..."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    recipientRole: "student",
    recipientId: "std-101",
    title: "🎉 Congratulations! Offer Letter Released",
    message: "Google has released an offer letter for the Software Engineer role (42.0 LPA). Please review and accept before Nov 10.",
    type: "offer",
    time: "2 hours ago",
    unread: true
  },
  {
    id: "notif-2",
    recipientRole: "student",
    recipientId: "std-101",
    title: "Interview Scheduled: Microsoft Azure",
    message: "Virtual Technical Round 2 has been scheduled for Oct 30 at 14:30 IST via Microsoft Teams.",
    type: "interview",
    time: "5 hours ago",
    unread: true
  },
  {
    id: "notif-3",
    recipientRole: "all",
    recipientId: "all",
    title: "Deloitte Campus Drive Live",
    message: "Registration for Deloitte Technology Consulting drive (12.0 LPA) is open until Nov 30.",
    type: "drive",
    time: "1 day ago",
    unread: false
  },
  {
    id: "notif-4",
    recipientRole: "admin",
    recipientId: "admin",
    title: "New Company Partner Registration",
    message: "Stripe India has submitted credentials for campus recruitment partnership.",
    type: "approval",
    time: "3 hours ago",
    unread: true
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "Mandatory Resume & Portfolio Verification Window",
    content: "All final year (2026 batch) students must get their CGPA, backlog records, and identity documents verified by their branch placement coordinator before November 5, 2026. Unverified profiles will not be permitted to register for Tier-1 Super Dream drives.",
    category: "Important Notice",
    priority: "High",
    target: "All 2026 Batch",
    author: "Dr. K. S. Verma (Head, Training & Placement)",
    date: "2026-10-27"
  },
  {
    id: "ann-2",
    title: "Pre-Placement Talk: Amazon & AWS Engineering Culture",
    content: "Amazon leadership team will conduct an interactive PPT and Q&A session in the Main Auditorium on 3rd November at 4:30 PM. Attendance is compulsory for registered applicants.",
    category: "Campus Drive Alert",
    priority: "Medium",
    target: "CSE, IT, ECE",
    author: "T&P Student Council",
    date: "2026-10-25"
  },
  {
    id: "ann-3",
    title: "Weekend Mock Interview Marathon with FAANG Alumni",
    content: "Book a 45-minute 1-on-1 technical and behavioral mock interview with our alumni working at Google, Meta, and Microsoft. Slots will open in the Placement Prep Hub this Friday.",
    category: "Skill Workshop",
    priority: "Normal",
    target: "All Unplaced Students",
    author: "Career Development Cell",
    date: "2026-10-22"
  }
];

export const PREP_QUESTIONS = [
  {
    id: "q-1",
    company: "Google",
    topic: "Data Structures & Algorithms",
    difficulty: "Hard",
    title: "Serialize and Deserialize Binary Tree with O(1) Auxiliary Space",
    description: "Design an algorithm to serialize and deserialize a binary tree efficiently without redundant string allocations.",
    sampleInput: "[1,2,3,null,null,4,5]",
    solutionApproach: "Use preorder DFS with delimiter or Morris traversal for zero extra stack space.",
    askedCount: "34 times in 2025-26"
  },
  {
    id: "q-2",
    company: "Amazon",
    topic: "System Design",
    difficulty: "Medium",
    title: "Design a Distributed Flash Sale Inventory Rate-Limiter",
    description: "During Prime Day, millions of requests hit limited stock items simultaneously. Design an ACID-compliant, low latency checkout reservation mechanism.",
    solutionApproach: "Use Redis Lua scripts with token bucket, optimistic locking in DynamoDB, and asynchronous queue confirmation via Kafka/SQS.",
    askedCount: "48 times"
  },
  {
    id: "q-3",
    company: "Microsoft",
    topic: "Operating Systems & Concurrency",
    difficulty: "Medium",
    title: "Producer-Consumer with Multi-threaded Lock-Free Ring Buffer",
    description: "Implement a bounded queue where multiple worker threads can push and pop without mutex deadlocks.",
    solutionApproach: "Use atomic compare-and-swap (CAS) instructions with memory barriers and cache line padding to prevent false sharing.",
    askedCount: "29 times"
  },
  {
    id: "q-4",
    company: "Goldman Sachs",
    topic: "Mathematics & Probability",
    difficulty: "Hard",
    title: "Gambler's Ruin and Random Walk on a Directed Graph",
    description: "Find the probability of hitting state N before state 0 starting from state K with transition matrix P.",
    solutionApproach: "Formulate second-order difference equations and solve boundary conditions using characteristic roots.",
    askedCount: "19 times"
  }
];

export const APTITUDE_MOCK_TEST = [
  {
    id: 1,
    question: "A train running at 72 km/hr crosses a platform 250 m long in 26 seconds. What is the length of the train?",
    options: ["270 meters", "240 meters", "260 meters", "300 meters"],
    correct: 0,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Total distance in 26 sec = 20 * 26 = 520 m. Length of train = 520 - 250 = 270 meters."
  },
  {
    id: 2,
    question: "In how many different ways can the letters of the word 'CAMPUS' be arranged so that the vowels always come together?",
    options: ["120", "240", "360", "720"],
    correct: 1,
    explanation: "Vowels in CAMPUS are A, U (2 vowels). Group them as one entity: (AU), C, M, P, S. Number of items = 5. Arrangements = 5! * 2! = 120 * 2 = 240."
  },
  {
    id: 3,
    question: "A, B, and C can complete a piece of software project in 12, 15, and 20 days respectively. If all three work together, how many days will they take?",
    options: ["4 days", "5 days", "6 days", "8 days"],
    correct: 1,
    explanation: "Total work = LCM(12, 15, 20) = 60 units. Rate of A = 5, B = 4, C = 3. Combined rate = 12 units/day. Days required = 60 / 12 = 5 days."
  },
  {
    id: 4,
    question: "What is the next number in the series: 7, 14, 28, 56, 112, ...?",
    options: ["168", "214", "224", "248"],
    correct: 2,
    explanation: "Each number is multiplied by 2. 112 * 2 = 224."
  }
];

export const INTERVIEW_EXPERIENCES = [
  {
    id: "exp-1",
    studentName: "Aditya Verma (Batch 2025)",
    company: "Google",
    role: "Software Engineer",
    verdict: "Selected",
    package: "42 LPA",
    tips: "Focus deeply on communicating your thought process during coding rounds. Don't jump straight into code—clarify edge cases first and explain time/space trade-offs. LeetCode Medium/Hard graphs and DP were key.",
    date: "August 2025"
  },
  {
    id: "exp-2",
    studentName: "Sneha Mukherjee (Batch 2025)",
    company: "Microsoft",
    role: "SDE 1",
    verdict: "Selected",
    package: "44.5 LPA",
    tips: "Microsoft loves clean modular object-oriented code. Be ready to write test cases for your own functions and explain how you would handle race conditions in multi-threaded environments.",
    date: "September 2025"
  },
  {
    id: "exp-3",
    studentName: "Manish Chawla (Batch 2025)",
    company: "Goldman Sachs",
    role: "Engineering Analyst",
    verdict: "Selected",
    package: "32 LPA",
    tips: "Strong mathematics and tree traversal fundamentals are tested. They will ask you to optimize space complexity repeatedly. Also review SQL joins, indexing, and OS deadlocks.",
    date: "October 2025"
  }
];

export const AUDIT_LOGS = [
  { id: "log-1", actor: "Dr. K. S. Verma (Admin)", action: "Approved campus drive for Google (42.0 LPA)", timestamp: "2026-10-20 10:15 IST", category: "Drives" },
  { id: "log-2", actor: "Google HR", action: "Released offer letter for Rudra Nagar", timestamp: "2026-10-28 09:30 IST", category: "Offers" },
  { id: "log-3", actor: "Priya Patel", action: "Accepted offer from Microsoft Azure (44.5 LPA)", timestamp: "2026-10-28 11:20 IST", category: "Offers" },
  { id: "log-4", actor: "Dr. K. S. Verma (Admin)", action: "Verified academic documents for Rudra Nagar", timestamp: "2026-10-15 14:00 IST", category: "Verification" },
  { id: "log-5", actor: "System", action: "Automated eligibility validation executed for 420 students", timestamp: "2026-10-22 08:00 IST", category: "System" }
];
