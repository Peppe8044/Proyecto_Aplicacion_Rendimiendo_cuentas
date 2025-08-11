"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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

  // Simular verificación de autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("gastoagil_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          localStorage.removeItem("gastoagil_user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simular usuarios de prueba
    const mockUsers: User[] = [
      {
        id: "1",
        name: "María González",
        email: "maria@empresa.cl",
        role: "user",
        company: "Mi Empresa SpA",
        plan: "pyme",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
      },
      {
        id: "2",
        name: "Admin GastoÁgil",
        email: "admin@gastoagil.cl",
        role: "admin",
        company: "GastoÁgil",
        plan: "pyme",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
      },
    ]

    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "123456") {
      setUser(foundUser)
      localStorage.setItem("gastoagil_user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true)

    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newUser: User = {
      id: Date.now().toString(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: "user",
      company: userData.company,
      plan: userData.plan,
      avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
    }

    setUser(newUser)
    localStorage.setItem("gastoagil_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gastoagil_user")
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
