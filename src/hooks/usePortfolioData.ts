import { useEffect } from "react";
import { useScrollState } from "@/context/ScrollContext";
import { fetchAllData } from "@/services/api";

/**
 * Hook to load all portfolio data from backend on component mount
 * Handles loading state and data population
 */
export function usePortfolioData() {
 const {
  setIsLoading,
  setProjects,
  setObjective,
  setSkills,
  setInternships,
  setQualifications,
  setResume,
 } = useScrollState();

 useEffect(() => {
  const loadData = async () => {
   setIsLoading(true);
   try {
    const data = await fetchAllData();

    // Populate context with fetched data
    if (data.projects.length > 0) {
     setProjects(data.projects);
    }
    if (data.objective) {
     setObjective(data.objective);
    }
    if (data.skills.length > 0) {
     setSkills(data.skills);
    }
    if (data.internships.length > 0) {
     setInternships(data.internships);
    }
    if (data.qualifications.length > 0) {
     setQualifications(data.qualifications);
    }
    if (data.resume) {
     setResume(data.resume);
    }
   } catch (error) {
    console.error("Failed to load portfolio data:", error);
   } finally {
    setIsLoading(false);
   }
  };

  loadData();
 }, [
  setIsLoading,
  setProjects,
  setObjective,
  setSkills,
  setInternships,
  setQualifications,
  setResume,
 ]);
}
