"use client"

import { useAuth } from "@/components/auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/kokonutui/dashboard"

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirigir según el rol del usuario
      if (user?.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F12] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">GA</span>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si no está autenticado, mostrar el dashboard público
  return <Dashboard />
}
