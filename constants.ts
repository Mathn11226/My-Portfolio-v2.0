import { ExperienceItem, Project, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "Mathankumar",
  role: "Multi-Class Tech Specialist",
  contact: {
    email: "anbinarasan11226@gmail.com",
    phone: "+91 93607 41606",
    linkedin: "LinkedIn"
  },
  summary: "An AI Powered versatile technologist combining the analytical precision of Business Analysis, the rigorous standards of Software Testing, and the creative empathy of UI/UX Design. I bridge the gap between abstract requirements, functional reliability, and user delight."
};

export const SKILLS: SkillCategory[] = [
  {
    category: "Business Analysis",
    title: "The Architect of Order",
    description: "Translating complex stakeholder visions into clear, actionable technical requirements. I map the journey before the first line of code is written.",
    skills: ["Requirement Elicitation", "Workflow Automation", "Stakeholder Mgmt", "Agile & Scrum", "User Stories", "Gap Analysis", "Jira/Confluence"]
  },
  {
    category: "Software Testing",
    title: "The Shield of Quality",
    description: "Ensuring stability and performance through rigorous validation. I guard the user experience against bugs and regressions.",
    skills: ["Selenium Automation", "Manual Testing", "Regression Testing", "API Testing (Postman)", "Bug Lifecycle", "Test Strategy", "Java"]
  },
  {
    category: "UI/UX Design",
    title: "The Weaver of Visions",
    description: "Crafting intuitive and accessible interfaces. I visualize the solution to ensure it resonates emotionally and functionally with users.",
    skills: ["Figma Prototyping", "Wireframing", "User Journey Mapping", "Interaction Design", "Miro/FigJam", "Accessibility (WCAG)"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Business Analyst",
    company: "Graspear Solutions Private Limited",
    period: "June 2022 - Present",
    description: [
      "Elicited and documented requirements for Machinery Maintenance & Expiry Tracking, improving development clarity by 30%.",
      "Proposed process optimizations reducing project delivery time by 20%.",
      "Facilitated Agile ceremonies improving team productivity by 15%.",
      "Contributed to a 25% increase in user adoption for a sports analytics platform via competitive analysis.",
      "Created wireframes in Figma reducing design iteration time by 50 hours monthly."
    ]
  },
  {
    id: "exp-2",
    role: "Software Test Engineer",
    company: "Graspear Solutions Private Limited",
    period: "Jan 2021 - Jun 2022",
    description: [
      "Achieved 80% test coverage using Selenium with Java.",
      "Reduced regression testing time by 40% through data-driven frameworks.",
      "Identified usability gaps contributing to a 15% improvement in user satisfaction.",
      "Validated BIM tool functionality ensuring seamless integration with AutoCAD."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Machinery Maint. & Tracking",
    description: "A platform for machinery lifecycle management and preventive maintenance scheduling.",
    tags: ["BA", "Maintenance", "IoT"],
    metrics: ["18% less rework", "20% faster tasks", "25% more proactive"]
  },
  {
    id: "proj-2",
    title: "Sports Performance System",
    description: "Analytics platform for coaches and athletes to track performance metrics.",
    tags: ["UI/UX", "Analytics", "Sports"],
    metrics: ["20% higher adoption", "15% fewer errors"]
  },
  {
    id: "proj-3",
    title: "BIM Visualisation Tools",
    description: "3D visualization components for civil engineering needs integrated with AutoCAD/Revit.",
    tags: ["QA", "3D", "BIM"],
    metrics: ["20% better accuracy", "10% fewer render errors"]
  },
  {
    id: "proj-4",
    title: "Loan Management Software",
    description: "Streamlined loan processing workflows ensuring financial regulation compliance.",
    tags: ["BA", "FinTech", "Process Flow"],
    metrics: ["15% fewer errors", "12% faster onboarding"]
  },
  {
    id: "proj-5",
    title: "Inventory & Automation",
    description: "Business process documentation for inventory workflows to reduce stock discrepancies.",
    tags: ["BA", "Automation", "Inventory"],
    metrics: ["30% less discrepancy", "15% higher efficiency"]
  }
];