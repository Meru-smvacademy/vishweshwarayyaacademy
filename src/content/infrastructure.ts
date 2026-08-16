export type InfrastructureAreaSize = "large" | "medium" | "wide";

export type InfrastructureArea = {
  num: string;
  title: string;
  description: string;
  size: InfrastructureAreaSize;
};

export const INFRASTRUCTURE_AREAS: InfrastructureArea[] = [
  {
    num: "01",
    title: "Campus",
    description: "A focused academic setting designed around student learning.",
    size: "large",
  },
  {
    num: "02",
    title: "Smart Classrooms",
    description: "Structured classroom spaces supporting focused teaching and learning.",
    size: "medium",
  },
  {
    num: "03",
    title: "Science Laboratories",
    description: "Dedicated spaces for practical and scientific learning.",
    size: "medium",
  },
  {
    num: "04",
    title: "Digital Learning",
    description: "Technology-supported learning for modern academic preparation.",
    size: "wide",
  },
  {
    num: "05",
    title: "Library",
    description: "A quiet academic space for reading, revision and self-study.",
    size: "medium",
  },
  {
    num: "06",
    title: "Study Environment",
    description: "Spaces designed to support concentration and consistent preparation.",
    size: "large",
  },
];
