import axios from "axios";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: "https://api.sprtverse.com",
  timeout: 15000, // Increased timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 5, // Allow some redirects but limit them
  validateStatus: function (status) {
    // Consider 2xx and 3xx as success to handle redirects better
    return status >= 200 && status < 400;
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    console.log("API Request Data:", config.data);

    // Add auth token from storage if available
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors and normalizing responses
apiClient.interceptors.response.use(
  (response) => {
    // Normalize API responses to match generated interface expectations
    const data = response.data;
    // If the response has the structure { status: "success", data: {...} }
    // Convert it to { success: true, data: {...} } to match generated interfaces
    if (data && typeof data === "object" && "status" in data) {
      if (data.status === "success") {
        response.data = {
          success: true,
          data: data.data,
          message: data.message,
          ...data, // preserve other fields
        };
      } else {
        response.data = {
          success: false,
          data: data.data,
          message: data.message,
          errors: data.errors,
          ...data, // preserve other fields
        };
      }
    }

    return response;
  },
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.statusText
    );
    console.error("API Error URL:", error.config?.url);
    console.error("API Error Data:", error.response?.data);

    // Handle 302 redirects
    if (error.response?.status === 302) {
      console.error(
        "302 Redirect detected:",
        error.response?.headers?.location
      );
      // You might want to follow the redirect manually or handle it differently
    }

    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized - you might want to redirect to login
      console.log("Unauthorized access - redirecting to login");
      // clearAuthToken();
      // redirect to login screen
    }

    if (error.response?.status === 429) {
      // Handle rate limiting
      console.log("Rate limit exceeded");
    }

    return Promise.reject(error);
  }
);

// Helper function to get auth token
async function getAuthToken(): Promise<string | null> {
  try {
    // Import SecureStore dynamically to avoid issues
    const SecureStore = await import("expo-secure-store");
    return await SecureStore.getItemAsync("auth_token");
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

export default apiClient;
