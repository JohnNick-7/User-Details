import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const DEFAULT_BASE_URL = "https://dummyjson.com/auth";

// Helper function to create axios instance with baseURL and auth
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // Add request interceptor for authentication
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

const restService = {
  get: <T = any>(
    url: string, 
    baseURL?: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const apiClient = createAxiosInstance(baseURL || DEFAULT_BASE_URL);
    return apiClient.get<T>(url, config);
  },

  post: <T = any>(
    url: string, 
    data?: any, 
    baseURL?: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const apiClient = createAxiosInstance(baseURL || DEFAULT_BASE_URL);
    return apiClient.post<T>(url, data, config);
  },

  put: <T = any>(
    url: string, 
    data?: any, 
    baseURL?: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const apiClient = createAxiosInstance(baseURL || DEFAULT_BASE_URL);
    return apiClient.put<T>(url, data, config);
  },

  delete: <T = any>(
    url: string, 
    baseURL?: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    const apiClient = createAxiosInstance(baseURL || DEFAULT_BASE_URL);
    return apiClient.delete<T>(url, config);
  },
};

export default restService;
