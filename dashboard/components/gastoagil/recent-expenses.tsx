import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal } from "lucide-react"

interface Expense {
  id: string
  description: string
  amount: string
  category: string
  date: string
  status: "pending" | "approved" | "rejected"
  merchant: string
}

const expenses: Expense[] = [
  {
    id: "1",
    description: "Almuerzo cliente",
    amount: "$25.990",
    category: "Alimentación",
    date: "Hoy",
    status: "pending",
    merchant: "Café Central",
  },
  {
    id: "2",
    description: "Taxi al aeropuerto",
    amount: "$18.500",
    category: "Transporte",
    date: "Ayer",
    status: "approved",
    merchant: "Uber",
  },
  {
    id: "3",
    description: "Material oficina",
    amount: "$45.200",
    category: "Oficina",
    date: "2 días",
    status: "pending",
    merchant: "OfficeMax",
  },
  {
    id: "4",
    description: "Hospedaje Santiago",
    amount: "$89.000",
    category: "Alojamiento",
    date: "3 días",
    status: "approved",
    merchant: "Hotel Plaza",
  },
]

export default function RecentExpenses() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pendiente
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Aprobado
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Rechazado
          </Badge>
        )
      default:
        return <Badge variant="secondary">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
              <span className="font-semibold text-gray-900 dark:text-white">{expense.amount}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{expense.merchant}</span>
              <span>•</span>
              <span>{expense.category}</span>
              <span>•</span>
              <span>{expense.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {getStatusBadge(expense.status)}
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full bg-transparent">
        Ver Todos los Gastos
      </Button>
    </div>
  )
}
