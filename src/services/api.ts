// API Base URL - adjust based on your environment
const API_BASE_URL =
 process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Type-safe API responses
interface ApiResponse<T> {
 status: string;
 data?: T;
 message?: string;
}

// Fetch with error handling
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

  const data: ApiResponse<T> = await response.json();
  return (data.data || data) as T;
 } catch (error) {
  console.error(`Failed to fetch ${endpoint}:`, error);
  throw error;
 }
}

// Projects API
export async function fetchProjects() {
 try {
  return await fetchAPI("/projects");
 } catch (error) {
  console.error("Error fetching projects:", error);
  return [];
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
  return await fetchAPI("/skill");
 } catch (error) {
  console.error("Error fetching skills:", error);
  return [];
 }
}

// Internships API
export async function fetchInternships() {
 try {
  return await fetchAPI("/internship");
 } catch (error) {
  console.error("Error fetching internships:", error);
  return [];
 }
}

// Qualifications API
export async function fetchQualifications() {
 try {
  return await fetchAPI("/qualification");
 } catch (error) {
  console.error("Error fetching qualifications:", error);
  return [];
 }
}

// Resume API
export async function fetchResume() {
 try {
  const url = `${API_BASE_URL}/resume`;
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

  const apiResponse: ApiResponse<any> = await response.json();
  const data = apiResponse.data || apiResponse;
  return Array.isArray(data) ? data[0] : data;
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

// Fetch all data in parallel for better performance
export async function fetchAllData() {
 try {
  const [projects, objective, skills, internships, qualifications, resume] =
   await Promise.all([
    fetchProjects(),
    fetchObjective(),
    fetchSkills(),
    fetchInternships(),
    fetchQualifications(),
    fetchResume(),
   ]);

  return {
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
   projects: [],
   objective: null,
   skills: [],
   internships: [],
   qualifications: [],
   resume: null,
  };
 }
}
