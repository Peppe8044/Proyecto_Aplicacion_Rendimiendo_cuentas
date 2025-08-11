import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MoreHorizontal, Receipt } from "lucide-react"

interface ExpenseItem {
  id: string
  description: string
  amount: string
  category: string
  date: string
  status: "pending" | "approved" | "rejected"
  merchant: string
  hasReceipt: boolean
}

interface ExpenseListProps {
  expenses?: ExpenseItem[]
  className?: string
}

const EXPENSES: ExpenseItem[] = [
  {
    id: "1",
    description: "Almuerzo con cliente potencial",
    amount: "$25.990",
    category: "Alimentación",
    date: "Hoy, 14:30",
    status: "pending",
    merchant: "Café Central",
    hasReceipt: true,
  },
  {
    id: "2",
    description: "Taxi al aeropuerto",
    amount: "$18.500",
    category: "Transporte",
    date: "Ayer, 08:15",
    status: "approved",
    merchant: "Uber",
    hasReceipt: true,
  },
  {
    id: "3",
    description: "Material de oficina",
    amount: "$45.200",
    category: "Oficina",
    date: "2 días, 16:45",
    status: "pending",
    merchant: "OfficeMax",
    hasReceipt: false,
  },
]

export default function ExpenseList({ expenses = EXPENSES, className }: ExpenseListProps) {
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
    <div className={cn("w-full space-y-4", className)}>
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className={cn(
            "flex items-center justify-between",
            "p-4 rounded-lg border",
            "bg-white dark:bg-zinc-900/70",
            "border-zinc-100 dark:border-zinc-800",
            "hover:border-zinc-200 dark:hover:border-zinc-700",
            "transition-all duration-200",
            "shadow-sm backdrop-blur-xl",
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "p-2 rounded-lg",
                expense.hasReceipt ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800",
              )}
            >
              <Receipt
                className={cn("w-4 h-4", expense.hasReceipt ? "text-green-600 dark:text-green-400" : "text-gray-400")}
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{expense.description}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span>{expense.merchant}</span>
                <span>•</span>
                <span>{expense.category}</span>
                <span>•</span>
                <span>{expense.date}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">{expense.amount}</div>
              <div className="mt-1">{getStatusBadge(expense.status)}</div>
            </div>

            <div className="flex gap-1">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
