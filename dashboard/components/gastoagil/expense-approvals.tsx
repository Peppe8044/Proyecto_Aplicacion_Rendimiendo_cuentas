import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, Eye } from "lucide-react"

interface PendingExpense {
  id: string
  user: string
  description: string
  amount: string
  category: string
  date: string
  receipt: boolean
}

const pendingExpenses: PendingExpense[] = [
  {
    id: "1",
    user: "María González",
    description: "Cena con cliente",
    amount: "$45.990",
    category: "Alimentación",
    date: "Hoy",
    receipt: true,
  },
  {
    id: "2",
    user: "Carlos Ruiz",
    description: "Combustible",
    amount: "$35.000",
    category: "Transporte",
    date: "Ayer",
    receipt: true,
  },
  {
    id: "3",
    user: "Ana Silva",
    description: "Material oficina",
    amount: "$28.500",
    category: "Oficina",
    date: "2 días",
    receipt: false,
  },
]

export default function ExpenseApprovals() {
  return (
    <div className="space-y-4">
      {pendingExpenses.map((expense) => (
        <div key={expense.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">por {expense.user}</p>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">{expense.amount}</span>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <span>{expense.category}</span>
            <span>•</span>
            <span>{expense.date}</span>
            <span>•</span>
            {expense.receipt ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Con recibo
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Sin recibo
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-1" />
              Aprobar
            </Button>
            <Button size="sm" variant="destructive">
              <X className="w-4 h-4 mr-1" />
              Rechazar
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-1" />
              Ver
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="w-full bg-transparent">
        Ver Todas las Aprobaciones
      </Button>
    </div>
  )
}
