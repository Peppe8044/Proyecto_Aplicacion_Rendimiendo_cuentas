"use client"

import { useState } from "react"

export default function AdminStats() {
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  const metrics = {
    revenue: {
      title: "Ingresos Mensuales",
      data: [
        { month: "Ene", value: 1200000 },
        { month: "Feb", value: 1450000 },
        { month: "Mar", value: 1680000 },
        { month: "Abr", value: 1890000 },
        { month: "May", value: 2100000 },
        { month: "Jun", value: 2350000 },
      ],
    },
    users: {
      title: "Usuarios Activos",
      data: [
        { month: "Ene", value: 450 },
        { month: "Feb", value: 580 },
        { month: "Mar", value: 720 },
        { month: "Abr", value: 890 },
        { month: "May", value: 1050 },
        { month: "Jun", value: 1247 },
      ],
    },
    expenses: {
      title: "Gastos Procesados",
      data: [
        { month: "Ene", value: 2300 },
        { month: "Feb", value: 3100 },
        { month: "Mar", value: 3800 },
        { month: "Abr", value: 4500 },
        { month: "May", value: 5200 },
        { month: "Jun", value: 6100 },
      ],
    },
  }

  const currentData = metrics[selectedMetric as keyof typeof metrics]
  const maxValue = Math.max(...currentData.data.map((d) => d.value))

  return (
    <div className="space-y-6">
      {/* Metric Selector */}
      <div className="flex gap-2">
        {Object.entries(metrics).map(([key, metric]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === key
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {metric.title}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">{currentData.title}</h3>
        <div className="space-y-3">
          {currentData.data.map((item) => (
            <div key={item.month} className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">{item.month}</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white w-20 text-right">
                {selectedMetric === "revenue" ? `$${(item.value / 1000000).toFixed(1)}M` : item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Crecimiento MoM</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">+12.5%</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Retención</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">89.2%</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">CAC</p>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400">$12.5</p>
        </div>
      </div>
    </div>
  )
}
