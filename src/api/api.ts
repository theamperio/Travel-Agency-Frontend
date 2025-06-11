import axios from "axios";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

/**
 * Universal API function that supports multiple HTTP methods
 * @param url - The API endpoint to call (without base URL)
 * @param options - Request options including method, data, params, and headers
 * @returns Promise with the response data
 */
export async function api(url: string, options: ApiOptions = {}) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const { method = "GET", data = {}, params = {}, headers = {} } = options;
  
  try {
    const response = await axios({
      method,
      url: `${baseUrl}/api/${url}`,
      data: method !== "GET" ? data : undefined,
      params: method === "GET" ? { ...params } : undefined,
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        ...headers
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`API ${method} request failed:`, error);
    throw error;
  }
}

/**
 * Convenience function for GET requests
 * @param url - The API endpoint to call
 * @param params - Query parameters
 * @param headers - Custom headers
 * @returns Promise with the response data
 */
export async function getApi(url: string, params = {}, headers = {}) {
  return api(url, { method: "GET", params, headers });
}

/**
 * Convenience function for POST requests
 * @param url - The API endpoint to call
 * @param data - Request body data
 * @param headers - Custom headers
 * @returns Promise with the response data
 */
export async function postApi(url: string, data = {}, headers = {}) {
  return api(url, { method: "POST", data, headers });
}