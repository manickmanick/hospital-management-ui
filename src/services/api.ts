import axios, { AxiosError } from "axios";

export const AUTH_TOKEN_KEY = "hospital_access_token";
export const AUTH_USER_KEY = "hospital_user";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);

      if (!window.location.pathname.startsWith("/login")) {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  },
);

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
) {
  if (axios.isAxiosError<{ message?: string; error?: string }>(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      fallback
    );
  }

  return error instanceof Error ? error.message : fallback;
}
