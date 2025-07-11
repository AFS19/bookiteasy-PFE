"use client"

// Authentication context and utilities
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "user" | "admin"
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock user data for demo
const DEMO_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "JD",
    role: "user" as const,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@bookiteasy.com",
    avatar: "AU",
    role: "admin" as const,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

// Auth utilities
export const authUtils = {
  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null

    try {
      const userData = localStorage.getItem("auth_user")
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  },

  // Set current user in localStorage
  setCurrentUser: (user: User | null) => {
    if (typeof window === "undefined") return

    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user))
      localStorage.setItem("auth_token", `demo_token_${user.id}`)
    } else {
      localStorage.removeItem("auth_user")
      localStorage.removeItem("auth_token")
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false

    const token = localStorage.getItem("auth_token")
    const user = authUtils.getCurrentUser()
    return !!(token && user)
  },

  // Mock login function
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo: any email/password combination works
    // In production, this would make an API call to Laravel backend
    const user = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
      id: Date.now().toString(),
      name: email
        .split("@")[0]
        .replace(/[^a-zA-Z]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email: email.toLowerCase(),
      avatar: email.substring(0, 2).toUpperCase(),
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    authUtils.setCurrentUser(user)

    return { success: true, user }
  },

  // Mock register function
  register: async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo: any registration works
    // In production, this would make an API call to Laravel backend
    const user: User = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase(),
      avatar: name.substring(0, 2).toUpperCase(),
      role: "user",
      createdAt: new Date().toISOString(),
    }

    authUtils.setCurrentUser(user)

    return { success: true, user }
  },

  // Logout function
  logout: () => {
    authUtils.setCurrentUser(null)
    // Clear any appointment data
    localStorage.removeItem("appointments")
    localStorage.removeItem("bookingSuccess")
  },

  // Mock password reset
  resetPassword: async (email: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo: always succeeds
    // In production, this would make an API call to Laravel backend
    return { success: true }
  },
}

// Auth hook for React components
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Initialize auth state
    const user = authUtils.getCurrentUser()
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    })
  }, [])

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const result = await authUtils.login(email, password)

      if (result.success && result.user) {
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        })
      }

      return result
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: "Login failed" }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      const result = await authUtils.register(name, email, password)

      if (result.success && result.user) {
        setAuthState({
          user: result.user,
          isAuthenticated: true,
          isLoading: false,
        })
      }

      return result
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = () => {
    authUtils.logout()
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  return {
    ...authState,
    login,
    register,
    logout,
  }
}

// Import useState and useEffect
import { useState, useEffect } from "react"
