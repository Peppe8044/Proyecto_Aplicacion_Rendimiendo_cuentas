import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  plan: string
  status: "active" | "inactive" | "pending"
  joinDate: string
  expenses: number
}

const users: User[] = [
  {
    id: "1",
    name: "María González",
    email: "maria@empresa.cl",
    plan: "PYME",
    status: "active",
    joinDate: "Hace 2 días",
    expenses: 23,
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    email: "carlos@freelance.cl",
    plan: "Emprendedor",
    status: "active",
    joinDate: "Hace 1 semana",
    expenses: 15,
  },
  {
    id: "3",
    name: "Ana Silva",
    email: "ana@startup.cl",
    plan: "Gratuito",
    status: "pending",
    joinDate: "Hace 3 días",
    expenses: 3,
  },
]

export default function UserManagement() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Activo
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Inactivo
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "PYME":
        return <Badge className="bg-blue-600">PYME</Badge>
      case "Emprendedor":
        return <Badge className="bg-purple-600">Emprendedor</Badge>
      case "Gratuito":
        return <Badge variant="outline">Gratuito</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {getPlanBadge(user.plan)}
            {getStatusBadge(user.status)}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{user.joinDate}</span>
            <span>{user.expenses} gastos</span>
          </div>

          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="outline">
              <Mail className="w-4 h-4 mr-1" />
              Contactar
            </Button>
            <Button size="sm" variant="outline">
              <Shield className="w-4 h-4 mr-1" />
              Permisos
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full bg-transparent">
        Ver Todos los Usuarios
      </Button>
    </div>
  )
}
