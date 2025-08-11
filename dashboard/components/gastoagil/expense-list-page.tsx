"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, Download, Eye, MoreHorizontal, Receipt, Plus } from "lucide-react"
import Link from "next/link"

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
  status: "pending" | "approved" | "rejected" | "draft"
  merchant: string
  hasReceipt: boolean
  receiptUrl?: string
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Almuerzo con cliente potencial",
    amount: 25990,
    category: "Alimentación",
    date: "2024-01-15",
    status: "pending",
    merchant: "Café Central",
    hasReceipt: true,
  },
  {
    id: "2",
    description: "Taxi al aeropuerto",
    amount: 18500,
    category: "Transporte",
    date: "2024-01-14",
    status: "approved",
    merchant: "Uber",
    hasReceipt: true,
  },
  {
    id: "3",
    description: "Material de oficina",
    amount: 45200,
    category: "Oficina",
    date: "2024-01-13",
    status: "pending",
    merchant: "OfficeMax",
    hasReceipt: false,
  },
  {
    id: "4",
    description: "Hospedaje en Santiago",
    amount: 89000,
    category: "Alojamiento",
    date: "2024-01-12",
    status: "approved",
    merchant: "Hotel Plaza",
    hasReceipt: true,
  },
  {
    id: "5",
    description: "Combustible vehículo empresa",
    amount: 35000,
    category: "Combustible",
    date: "2024-01-11",
    status: "rejected",
    merchant: "Copec",
    hasReceipt: true,
  },
]

export default function ExpenseListPage() {
  const [expenses] = useState<Expense[]>(mockExpenses)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rechazado</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Borrador</Badge>
      default:
        return <Badge>Desconocido</Badge>
    }
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || expense.status === statusFilter
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mis Gastos</h1>
          <p className="text-gray-600 dark:text-gray-400">Gestiona y revisa todos tus gastos</p>
        </div>
        <Link href="/expenses/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Gasto
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount.toLocaleString()}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Filtrado</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredExpenses.filter((e) => e.status === "pending").length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {filteredExpenses.filter((e) => e.status === "approved").length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Aprobados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {filteredExpenses.filter((e) => e.status === "rejected").length}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rechazados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar gastos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="approved">Aprobado</SelectItem>
                <SelectItem value="rejected">Rechazado</SelectItem>
                <SelectItem value="draft">Borrador</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Alimentación">Alimentación</SelectItem>
                <SelectItem value="Transporte">Transporte</SelectItem>
                <SelectItem value="Alojamiento">Alojamiento</SelectItem>
                <SelectItem value="Oficina">Oficina</SelectItem>
                <SelectItem value="Combustible">Combustible</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${expense.hasReceipt ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"}`}
                  >
                    <Receipt
                      className={`w-4 h-4 ${expense.hasReceipt ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{expense.merchant}</span>
                      <span>•</span>
                      <span>{expense.category}</span>
                      <span>•</span>
                      <span>{new Date(expense.date).toLocaleDateString("es-CL")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ${expense.amount.toLocaleString()}
                    </div>
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
        </CardContent>
      </Card>
    </div>
  )
}
