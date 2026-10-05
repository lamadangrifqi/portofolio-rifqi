export type ServiceCategory = "all" | "web" | "media" | "design";

export interface ServiceItem {
  id: string;
  category: "web" | "media" | "design";
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  recommendedFor: string;
  popular?: boolean;
  defaultInquiryText: string;
}

export interface PillarService {
  id: string;
  category: "web" | "media" | "design";
  categoryLabel: string;
  pillarNumber: string;
  title: string;
  tagline: string;
  description: string;
  subServices: {
    name: string;
    description: string;
  }[];
  techChips: string[];
  deliverables: string[];
  popular?: boolean;
  defaultInquiryText: string;
}

export interface TechItem {
  name: string;
  category: "Web Tech" | "Creative Suite";
  badge: string;
  desc: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface CareerTimelineItem {
  period: string;
  role: string;
  companyOrContext: string;
  category: "Web Tech" | "Creative Media" | "Hybrid Lead";
  description: string;
  achievements: string[];
}
