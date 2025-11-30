import axios from "axios";
import React, { createContext, useContext, useState } from "react";

// Create axios instance with base URL
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Expose base URL (useful in components if needed)
export const BASE_URL = axiosInstance.defaults.baseURL;

// Create a context for authentication
const AuthContext = createContext(null);

// Provider component that will wrap your App
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // logged in user info
  const [role, setRole] = useState(null); // "USER" or "OFFICER", etc.

  const value = {
    user,
    setUser,
    role,
    setRole,
    axios: axiosInstance, // so you can get axios from useAuth()
    BASE_URL,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Keep default export as axiosInstance (if you use it elsewhere)
export default axiosInstance;
