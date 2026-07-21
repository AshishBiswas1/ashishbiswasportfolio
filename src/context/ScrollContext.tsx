"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Project {
 _id: string;
 title: string;
 shortdescription: string;
 description: string;
 technologies: string[];
 gitlink?: string[];
 deployedlink?: string;
 duration?: Array<{ month: string; year: number }>;
 image?: string[];
 video?: string;
 mlScore?: number;
 mlConfidence?: number;
 mlLastAnalyzed?: string;
}

export interface Objective {
 _id: string;
 headline: string;
 description: string;
 focusAreas?: Array<{
  title: string;
  proficiency: "Familiar" | "Proficient" | "Expert";
 }>;
 isActive?: boolean;
}

export interface Skill {
 _id: string;
 name: string;
 category: string;
 proficiency?: number;
 impactScore?: number;
}

export interface Internship {
 _id: string;
 role: string;
 company: string;
 workType?: string;
 location?: string;
 techStack?: string[];
 impactScore?: number;
 description?: string[];
 certificate?: string;
 offerLetter?: string;
 recommendationLetter?: string;
 duration?: {
  startDate: string;
  endDate: string;
 };
}

export interface Qualification {
 _id: string;
 educationLevel: string;
 institution: string;
 degree: string;
 fieldOfStudy?: string;
 score?: string;
 duration?: {
  startYear: string;
  endYear: string;
 };
 description?: string;
}

export interface UserProfile {
 _id: string;
 name: string;
 email?: string;
 designation?: string[];
 photo?: string;
 address?: string;
 number?: number;
 githubLink?: string;
 linkedinLink?: string;
 role?: string;
}

export interface Resume {
 _id: string;
 fullName?: string;
 professionalTitle?: string[];
 contact?: {
  email?: string;
  phone?: string;
  location?: string;
 };
 socialLinks?: {
  github?: string;
  linkedin?: string;
 };
 resumePdf?: string;
 defaultSummary?: string;
 targetedSummaries?: Array<{
  audience: "Frontend" | "Backend" | "FullStack" | "DataScience" | "DevOps" | "General";
  text: string;
  _id: string;
 }>;
 isActive?: boolean;
}

interface ScrollContextType {
 activeSection: string;
 setActiveSection: (section: string) => void;
 isLoading: boolean;
 setIsLoading: (loading: boolean) => void;

 // Individual section loading states
 isLoadingUser: boolean;
 setIsLoadingUser: (loading: boolean) => void;
 isLoadingObjective: boolean;
 setIsLoadingObjective: (loading: boolean) => void;
 isLoadingSkills: boolean;
 setIsLoadingSkills: (loading: boolean) => void;
 isLoadingInternships: boolean;
 setIsLoadingInternships: (loading: boolean) => void;
 isLoadingQualifications: boolean;
 setIsLoadingQualifications: (loading: boolean) => void;
 isLoadingProjects: boolean;
 setIsLoadingProjects: (loading: boolean) => void;
 isLoadingResume: boolean;
 setIsLoadingResume: (loading: boolean) => void;

 user: UserProfile | null;
 setUser: (user: UserProfile | null) => void;

 projects: Project[];
 setProjects: (projects: Project[]) => void;

 objective: Objective | null;
 setObjective: (objective: Objective | null) => void;

 skills: Skill[];
 setSkills: (skills: Skill[]) => void;

 internships: Internship[];
 setInternships: (internships: Internship[]) => void;

 qualifications: Qualification[];
 setQualifications: (qualifications: Qualification[]) => void;

 resume: Resume | null;
 setResume: (resume: Resume | null) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: ReactNode }) {
 const [activeSection, setActiveSection] = useState("hero");
 const [isLoading, setIsLoading] = useState(true);

 // Individual section loading states
 const [isLoadingUser, setIsLoadingUser] = useState(true);
 const [isLoadingObjective, setIsLoadingObjective] = useState(true);
 const [isLoadingSkills, setIsLoadingSkills] = useState(true);
 const [isLoadingInternships, setIsLoadingInternships] = useState(true);
 const [isLoadingQualifications, setIsLoadingQualifications] = useState(true);
 const [isLoadingProjects, setIsLoadingProjects] = useState(true);
 const [isLoadingResume, setIsLoadingResume] = useState(true);

 const [user, setUser] = useState<UserProfile | null>(null);
 const [projects, setProjects] = useState<Project[]>([]);
 const [objective, setObjective] = useState<Objective | null>(null);
 const [skills, setSkills] = useState<Skill[]>([]);
 const [internships, setInternships] = useState<Internship[]>([]);
 const [qualifications, setQualifications] = useState<Qualification[]>([]);
 const [resume, setResume] = useState<Resume | null>(null);

 const value: ScrollContextType = {
  activeSection,
  setActiveSection,
  isLoading,
  setIsLoading,

  isLoadingUser,
  setIsLoadingUser,
  isLoadingObjective,
  setIsLoadingObjective,
  isLoadingSkills,
  setIsLoadingSkills,
  isLoadingInternships,
  setIsLoadingInternships,
  isLoadingQualifications,
  setIsLoadingQualifications,
  isLoadingProjects,
  setIsLoadingProjects,
  isLoadingResume,
  setIsLoadingResume,

  user,
  setUser,

  projects,
  setProjects,
  objective,
  setObjective,
  skills,
  setSkills,
  internships,
  setInternships,
  qualifications,
  setQualifications,
  resume,
  setResume,
 };

 return (
  <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
 );
}

export function useScrollState() {
 const context = useContext(ScrollContext);

 if (context === undefined) {
  throw new Error("useScrollState must be used within a ScrollProvider");
 }

 return context;
}
