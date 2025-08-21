"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabaseClient"

// Declarar la función global de logout
declare global {
  interface Window {
    gastoagilLogout?: () => void
  }
}

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  company?: string
  plan: "free" | "entrepreneur" | "pyme"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: any) => Promise<boolean>
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar sesión real de Supabase al cargar
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true)
      // Intentar obtener usuario actual
      const { data: { user }, error } = await supabase.auth.getUser()
      if (user) {
        setUser({
          id: user.id,
          name: user.user_metadata?.name || user.email,
          email: user.email,
          role: "user",
          plan: "pyme"
        })
        setIsLoading(false)
        return
      }
      // Si no hay sesión, hacer login automático con las credenciales proporcionadas
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: "jlguajardo.l@gmail.com",
        password: "Pepeasd.1231"
      })
      if (loginData.user) {
        setUser({
          id: loginData.user.id,
          name: loginData.user.user_metadata?.name || loginData.user.email,
          email: loginData.user.email,
          role: "user",
          plan: "pyme"
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error || !data.user) {
      setUser(null)
      setIsLoading(false)
      return false
    }
    setUser({
      id: data.user.id,
      name: data.user.user_metadata?.name || data.user.email,
      email: data.user.email,
      role: "user",
      plan: "pyme"
    })
    setIsLoading(false)
    return true
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: `${userData.firstName} ${userData.lastName}`,
          company: userData.company,
          plan: userData.plan
        }
      }
    })
    if (error || !data.user) {
      setUser(null)
      setIsLoading(false)
      return false
    }
    setUser({
      id: data.user.id,
      name: data.user.user_metadata?.name || data.user.email,
      email: data.user.email,
      role: "user",
      plan: "pyme"
    })
    setIsLoading(false)
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    register,
    isLoading,
    isAuthenticated: !!user,
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
