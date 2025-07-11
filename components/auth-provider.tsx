"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, type AuthState, authUtils } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  })

  useEffect(() => {
    // Initialize auth state from localStorage
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
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
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
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }))
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

  const updateUser = (user: User) => {
    authUtils.setCurrentUser(user)
    setAuthState((prev) => ({
      ...prev,
      user,
    }))
  }

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
