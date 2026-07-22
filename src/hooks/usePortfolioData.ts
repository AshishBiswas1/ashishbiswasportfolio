import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useScrollState } from "@/context/ScrollContext";
import {
 fetchUser,
 fetchProjects,
 fetchObjective,
 fetchSkills,
 fetchInternships,
 fetchQualifications,
 fetchResume,
} from "@/services/api";

/**
 * Hook to load portfolio data dynamically.
 * - On the homepage (/), it lazy-loads each section as the user reaches it.
 * - On subpages, it immediately loads the data required for that subpage.
 * - Uses a ref to ensure each section's data is only requested once.
 */
export function usePortfolioData() {
 const pathname = usePathname();
 const {
  activeSection,
  setIsLoadingUser,
  setIsLoadingObjective,
  setIsLoadingSkills,
  setIsLoadingInternships,
  setIsLoadingQualifications,
  setIsLoadingProjects,
  setIsLoadingResume,
  setUser,
  setProjects,
  setObjective,
  setSkills,
  setInternships,
  setQualifications,
  setResume,
 } = useScrollState();

 // Track fetched resources to prevent redundant API calls
 const fetchedRef = useRef<Record<string, boolean>>({
  user: false,
  objective: false,
  qualifications: false,
  internships: false,
  projects: false,
  skills: false,
  resume: false,
 });

 useEffect(() => {
  const isHome = pathname === "/";

  const loadUserData = async () => {
   if (fetchedRef.current.user) return;
   fetchedRef.current.user = true;
   setIsLoadingUser(true);
   try {
    const data = await fetchUser();
    if (data) setUser(data);
   } catch (error) {
    console.error("Failed to load user:", error);
    fetchedRef.current.user = false;
   } finally {
    setIsLoadingUser(false);
   }
  };

  const loadObjectiveData = async () => {
   if (fetchedRef.current.objective) return;
   fetchedRef.current.objective = true;
   setIsLoadingObjective(true);
   try {
    const data = await fetchObjective();
    if (data) setObjective(data);
   } catch (error) {
    console.error("Failed to load objective:", error);
    fetchedRef.current.objective = false;
   } finally {
    setIsLoadingObjective(false);
   }
  };

  const loadQualificationsData = async () => {
   if (fetchedRef.current.qualifications) return;
   fetchedRef.current.qualifications = true;
   setIsLoadingQualifications(true);
   try {
    const data = await fetchQualifications();
    if (Array.isArray(data) && data.length > 0) setQualifications(data);
   } catch (error) {
    console.error("Failed to load qualifications:", error);
    fetchedRef.current.qualifications = false;
   } finally {
    setIsLoadingQualifications(false);
   }
  };

  const loadInternshipsData = async () => {
   if (fetchedRef.current.internships) return;
   fetchedRef.current.internships = true;
   setIsLoadingInternships(true);
   try {
    const data = await fetchInternships();
    if (Array.isArray(data) && data.length > 0) setInternships(data);
   } catch (error) {
    console.error("Failed to load internships:", error);
    fetchedRef.current.internships = false;
   } finally {
    setIsLoadingInternships(false);
   }
  };

  const loadProjectsData = async () => {
   if (fetchedRef.current.projects) return;
   fetchedRef.current.projects = true;
   setIsLoadingProjects(true);
   try {
    const data = await fetchProjects();
    if (Array.isArray(data) && data.length > 0) setProjects(data);
   } catch (error) {
    console.error("Failed to load projects:", error);
    fetchedRef.current.projects = false;
   } finally {
    setIsLoadingProjects(false);
   }
  };

  const loadSkillsData = async () => {
   if (fetchedRef.current.skills) return;
   fetchedRef.current.skills = true;
   setIsLoadingSkills(true);
   try {
    const data = await fetchSkills();
    if (Array.isArray(data) && data.length > 0) setSkills(data);
   } catch (error) {
    console.error("Failed to load skills:", error);
    fetchedRef.current.skills = false;
   } finally {
    setIsLoadingSkills(false);
   }
  };

  const loadResumeData = async () => {
   if (fetchedRef.current.resume) return;
   fetchedRef.current.resume = true;
   setIsLoadingResume(true);
   try {
    const data = await fetchResume();
    if (data) setResume(data);
   } catch (error) {
    console.error("Failed to load resume:", error);
    fetchedRef.current.resume = false;
   } finally {
    setIsLoadingResume(false);
   }
  };

  // Route-Specific / Lazy-Load logic
  if (isHome) {
   const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
   
   if (isMobile) {
    // On mobile, native vertical scrolling is used and scroll-jacking is disabled, 
    // so activeSection doesn't update based on 600vh progress. Eagerly load all sections.
    loadUserData();
    loadObjectiveData();
    loadQualificationsData();
    loadInternshipsData();
    loadProjectsData();
    loadSkillsData();
   } else {
    // Homepage (Desktop): lazy load sequentially by activeSection
    if (activeSection === "hero") {
     loadUserData();
    } else if (activeSection === "objective") {
     loadObjectiveData();
    } else if (activeSection === "academics") {
     loadQualificationsData();
    } else if (activeSection === "internships") {
     loadInternshipsData();
    } else if (activeSection === "projects") {
     loadProjectsData();
    } else if (activeSection === "skills") {
     loadSkillsData();
    }
   }
  } else {
   // Standalone Subpages: immediately fetch what is required
   if (pathname === "/about") {
    loadUserData();
    loadObjectiveData();
    loadSkillsData();
    loadQualificationsData();
   } else if (pathname === "/objective") {
    loadObjectiveData();
   } else if (pathname === "/education") {
    loadQualificationsData();
   } else if (pathname === "/internships") {
    loadInternshipsData();
   } else if (pathname === "/projects") {
    loadProjectsData();
   } else if (pathname === "/skills") {
    loadSkillsData();
   } else if (pathname === "/resume") {
    loadUserData();
    loadResumeData();
    loadQualificationsData();
    loadInternshipsData();
    loadObjectiveData();
    loadSkillsData();
   }
  }
 }, [
  pathname,
  activeSection,
  setUser,
  setObjective,
  setQualifications,
  setInternships,
  setProjects,
  setSkills,
  setResume,
  setIsLoadingUser,
  setIsLoadingObjective,
  setIsLoadingQualifications,
  setIsLoadingInternships,
  setIsLoadingProjects,
  setIsLoadingSkills,
  setIsLoadingResume,
 ]);
}
