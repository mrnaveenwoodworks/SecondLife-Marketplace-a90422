import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate("/");
  }, [navigate]);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        // In a real app, validate token with backend
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Auth status check failed:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  // Check for existing auth token on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API call - replace with actual API in production
      if (email === "demo@example.com" && password === "password123") {
        const mockUser = {
          id: "user123",
          email: email,
          name: "Demo User",
          avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHx1c2VyJTJCYXZhdGFyfGVufDB8fHx8MTc0NzU0OTk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
          joinDate: "2023-01-01",
          listings: [],
          ratings: {
            average: 4.5,
            count: 12
          }
        };

        // Store auth data
        localStorage.setItem("authToken", "mock-jwt-token");
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API call - replace with actual API in production
      const mockUser = {
        id: "user" + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: userData.name,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHNlYXJjaHwxfHxkZWZhdWx0JTJCdXNlciUyQmF2YXRhcnxlbnwwfHx8fDE3NDc1MDgwODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        joinDate: new Date().toISOString(),
        listings: [],
        ratings: {
          average: 0,
          count: 0
        }
      };

      // Store auth data
      localStorage.setItem("authToken", "mock-jwt-token");
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      setCurrentUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API call - replace with actual API in production
      const updatedUser = {
        ...currentUser,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock API call - replace with actual API in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { 
        success: true, 
        message: "Password reset instructions sent to your email" 
      };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API call - replace with actual API in production
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...currentUser,
        emailVerified: true
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    resetPassword,
    verifyEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;