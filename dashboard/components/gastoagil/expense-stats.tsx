"use client"

import { useState } from "react"

export default function ExpenseStats() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const categories = [
    { name: "Alimentación", amount: 89450, percentage: 36, color: "bg-blue-500" },
    { name: "Transporte", amount: 65200, percentage: 27, color: "bg-green-500" },
    { name: "Alojamiento", amount: 45800, percentage: 19, color: "bg-yellow-500" },
    { name: "Oficina", amount: 32100, percentage: 13, color: "bg-purple-500" },
    { name: "Otros", amount: 12130, percentage: 5, color: "bg-gray-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex gap-2">
        {["week", "month", "quarter"].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {period === "week" ? "Semana" : period === "month" ? "Mes" : "Trimestre"}
          </button>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Gastos por Categoría</h3>
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${category.amount.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{category.percentage}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`h-2 rounded-full ${category.color}`} style={{ width: `${category.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700 dark:text-gray-300">Total del Mes</span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">$244.680</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Promedio diario</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">$8.156</span>
        </div>
      </div>
    </div>
  )
}
