"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, Building, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    plan: "free",
    acceptTerms: false,
  })
  const [error, setError] = useState("")

  const { register, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!formData.acceptTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    const success = await register(formData)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Error al crear la cuenta. Inténtalo de nuevo.")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Crear Cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nombre</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="firstName"
                  placeholder="María"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Apellido</Label>
              <Input
                id="lastName"
                placeholder="González"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="maria@empresa.cl"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Empresa (Opcional)</Label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="company"
                placeholder="Mi Empresa SpA"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="plan">Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, plan: value }))}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Gratuito - $0/mes</SelectItem>
                <SelectItem value="entrepreneur">Emprendedor - $4.990/mes</SelectItem>
                <SelectItem value="pyme">PYME - $19.990/mes</SelectItem>
              </SelectContent>
            </Select>
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

          <div>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData((prev) => ({ ...prev, acceptTerms: e.target.checked }))}
              className="mr-2"
              required
              disabled={isLoading}
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-400">
              Acepto los{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
                política de privacidad
              </Link>
            </label>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creando cuenta...
              </>
            ) : (
              "Crear Cuenta"
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
                Inicia sesión aquí
              </Link>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
