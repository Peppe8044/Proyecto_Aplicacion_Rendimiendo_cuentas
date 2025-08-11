"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [error, setError] = useState("")

  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(formData.email, formData.password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Credenciales incorrectas. Usa: maria@empresa.cl / 123456 o admin@gastoagil.cl / 123456")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Iniciar Sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Usuarios de prueba:</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">• Usuario: maria@empresa.cl / 123456</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">• Admin: admin@gastoagil.cl / 123456</p>
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))}
                className="mr-2"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Recordarme</span>
            </label>
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                Regístrate aquí
              </Link>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
