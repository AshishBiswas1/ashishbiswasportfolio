import type { Qualification, Project, Internship } from "@/context/ScrollContext";

// API Base URL - adjust based on your environment
const API_BASE_URL =
 (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000/api/v1"
 ).replace(/\/$/, "");

/**
 * Type-safe API responses
 */
interface ApiResponse<T> {
 status: string;
 data?: T;
 message?: string;
}

type UnknownApiResponse = ApiResponse<unknown>;

/**
 * Fetch with error handling and support for backend responses shaped like:
 * { status: 'success', data: ... }
 */
async function fetchAPI<T>(
 endpoint: string,
 options: RequestInit = {},
): Promise<T> {
 const url = `${API_BASE_URL}${endpoint}`;

 try {
  const response = await fetch(url, {
   cache: "no-cache",
   ...options,
   headers: {
    "Content-Type": "application/json",
    ...options.headers,
   },
  });

  if (!response.ok) {
   throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json: ApiResponse<T> = await response.json();

  // Most of your controllers return { status, data: ... }
  return (json.data ?? json) as T;
 } catch (error) {
  console.error(`Failed to fetch ${endpoint}:`, error);
  throw error;
 }
}

export async function fetchProjects() {
 try {
  const data = await fetchAPI<{ projects?: unknown[] }>(
   "/projects/?sort=-mlScore&limit=3",
  );

  if (data && typeof data === "object") {
   const projectsArray = (data as { projects?: unknown }).projects;

   if (Array.isArray(projectsArray)) {
    return projectsArray;
   }
  }

  return [];
 } catch (error) {
  console.error("Error fetching projects:", error);
  return [];
 }
}

export async function fetchUser() {
 try {
  const data = await fetchAPI<unknown>("/user");

  if (Array.isArray(data)) {
   return data[0] ?? null;
  }

  if (data && typeof data === "object") {
   const obj = data as Record<string, unknown>;
   const maybeUsers = obj.user;

   if (Array.isArray(maybeUsers)) {
    return maybeUsers[0] ?? null;
   }
  }

  return null;
 } catch (error) {
  console.error("Error fetching user:", error);
  return null;
 }
}

export async function fetchObjective() {
 try {
  const data = await fetchAPI("/objective");
  return Array.isArray(data) ? data[0] : data;
 } catch (error) {
  console.error("Error fetching objective:", error);
  return null;
 }
}

export async function fetchSkills() {
 try {
  const data = await fetchAPI<unknown>("/skill");
  if (
   data &&
   typeof data === "object" &&
   "skills" in (data as Record<string, unknown>)
  ) {
   const obj = data as Record<string, unknown>;
   const skills = obj.skills;
   return Array.isArray(skills) ? skills : [];
  }
  return [];
 } catch (error) {
  console.error("Error fetching skills:", error);
  return [];
 }
}

export async function fetchInternships() {
 try {
  const data = await fetchAPI<unknown>("/internship");
  if (
   data &&
   typeof data === "object" &&
   "internships" in (data as Record<string, unknown>)
  ) {
   const obj = data as Record<string, unknown>;
   const internships = obj.internships;
   return Array.isArray(internships) ? internships : [];
  }
  return [];
 } catch (error) {
  console.error("Error fetching internships:", error);
  return [];
 }
}

export async function fetchQualifications() {
 try {
  const data = await fetchAPI<{ qualifications: Qualification[] }>(
   "/qualification/",
  );
  if (data && typeof data === "object" && "qualifications" in data) {
   return Array.isArray(data.qualifications) ? data.qualifications : [];
  }
  return [];
 } catch (error) {
  console.error("Error fetching qualifications:", error);
  return [];
 }
}

export async function fetchResume() {
 try {
  const data = await fetchAPI<{ resume?: unknown[] | unknown }>(
   "/resume/",
  );
  if (data && typeof data === "object") {
   const resumeCandidate = "resume" in data ? (data as { resume: unknown }).resume : data;
   return Array.isArray(resumeCandidate) ? (resumeCandidate[0] ?? null) : (resumeCandidate ?? null);
  }
  return null;
 } catch (error) {
  console.error("Error fetching resume:", error);
  return null;
 }
}

export async function submitContact(contactData: {
 name: string;
 email: string;
 subject: string;
 message: string;
}) {
 try {
  return await fetchAPI("/constact", {
   method: "POST",
   body: JSON.stringify(contactData),
  });
 } catch (error) {
  console.error("Error submitting contact:", error);
  throw error;
 }
}

export async function fetchAllData() {
 try {
  const [
   user,
   projects,
   objective,
   skills,
   internships,
   qualifications,
   resume,
  ] = await Promise.all([
   fetchUser(),
   fetchProjects(),
   fetchObjective(),
   fetchSkills(),
   fetchInternships(),
   fetchQualifications(),
   fetchResume(),
  ]);

  return {
   user,
   projects,
   objective,
   skills,
   internships,
   qualifications,
   resume,
  };
 } catch (error) {
  console.error("Error fetching all data:", error);
  return {
   user: null,
   projects: [],
   objective: null,
   skills: [],
   internships: [],
   qualifications: [],
   resume: null,
  };
 }
}

export async function fetchProjectById(id: string) {
 try {
  const data = await fetchAPI<{ project?: Project }>(`/projects/${id}`);
  if (data && typeof data === "object") {
   const obj = data as { project?: Project };
   return obj.project || null;
  }
  return null;
 } catch (error) {
  console.error(`Error fetching project ${id}:`, error);
  return null;
 }
}

export async function fetchInternshipById(id: string) {
 try {
  const data = await fetchAPI<{ internship?: Internship }>(`/internship/${id}`);
  if (data && typeof data === "object") {
   const obj = data as { internship?: Internship };
   return obj.internship || null;
  }
  return null;
 } catch (error) {
  console.error(`Error fetching internship ${id}:`, error);
  return null;
 }
}
