import type { Qualification } from "@/context/ScrollContext";

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
  // The previous implementation returned (data.data || data) which is incorrect for that shape.
  return (json.data ?? json) as T;
 } catch (error) {
  console.error(`Failed to fetch ${endpoint}:`, error);
  throw error;
 }
}

export async function fetchProjects() {
 try {
  // Postman payload is: { status, data: { projects: [...] } }
  // fetchAPI helper strips the top 'data' layer, leaving: { projects: [...] }
  const data = await fetchAPI<{ projects?: unknown[] }>(
   "/projects/?sort=-mlScore&limit=3",
  );

  // A clean, safe, and direct extraction approach (no `any`)
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

// User Profile API - GET /api/v1/user
export async function fetchUser() {
 try {
  const data = await fetchAPI<unknown>("/user");

  // Possible shapes after fetchAPI unwrap:
  // 1) { user: [...] }
  // 2) [...]
  // 3) { ...fields } (fallback)
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

// Objective API
export async function fetchObjective() {
 try {
  const data = await fetchAPI("/objective");
  // Handle both array and single object responses
  return Array.isArray(data) ? data[0] : data;
 } catch (error) {
  console.error("Error fetching objective:", error);
  return null;
 }
}

// Skills API
export async function fetchSkills() {
 try {
  // /skill -> { status, result, skills }
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

// Internships API
export async function fetchInternships() {
 try {
  // /internship -> { status, result, internships }
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

// Qualifications API
export async function fetchQualifications() {
 try {
  // Postman payload is: { status, result, data: { qualifications: [...] } }
  // fetchAPI helper strips the top layers and returns: { qualifications: [...] }
  const data = await fetchAPI<{ qualifications: Qualification[] }>(
   "/qualification/",
  );

  // Check if data exists and contains the qualifications array
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
  // Backend: GET /api/v1/resume/ (controller.getActiveResume)
  const url = `${API_BASE_URL}/resume/`;
  const response = await fetch(url, {
   headers: {
    "Content-Type": "application/json",
   },
  });

  // Handle 404 gracefully - resume may not be seeded yet
  if (response.status === 404) {
   console.warn(
    "Resume not found (404) - No active resume in database. Please seed data first.",
   );
   return null;
  }

  if (!response.ok) {
   throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as UnknownApiResponse;

  const data = json.data;

  // Most likely shapes:
  // 1) { status:'success', data:{ resume:{...}}}
  // 2) { status:'success', data:{ ...resumeFields...}}
  // 3) { status:'success', data:{ resume:[{...}]}}
  const resumeCandidate =
   data && typeof data === "object" && "resume" in data
    ? (data as { resume?: unknown }).resume
    : data;

  if (Array.isArray(resumeCandidate)) return resumeCandidate[0] ?? null;
  return resumeCandidate ?? null;
 } catch (error) {
  console.error("Error fetching resume:", error);
  return null;
 }
}

// Contact API - POST
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
