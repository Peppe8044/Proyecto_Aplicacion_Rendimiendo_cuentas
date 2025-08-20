
"use client";
import { Receipt, TrendingUp, PieChart as PieIcon, BarChart3, Download, Filter } from "lucide-react";
import { Chart } from '@/components/ui/chart';
import { useState } from "react";
import Sidebar from '@/components/gastoagil/sidebar';
export default function AnalyticsPage() {
  const statsData = {
    total: 1250.75,
    monthly: [
      { month: 'Enero', amount: 200 },
      { month: 'Febrero', amount: 180 },
      { month: 'Marzo', amount: 220 },
      { month: 'Abril', amount: 150 },
      { month: 'Mayo', amount: 250 },
      { month: 'Junio', amount: 250.75 },
    ],
    categories: [
      { name: 'Alimentación', amount: 400 },
      { name: 'Transporte', amount: 300 },
      { name: 'Servicios', amount: 200 },
      { name: 'Otros', amount: 350.75 },
    ],
    recent: [
      { id: 1, description: "Almuerzo cliente", amount: "$25.990", category: "Alimentación", date: "Hoy", status: "pending", merchant: "Café Central" },
      { id: 2, description: "Taxi aeropuerto", amount: "$18.500", category: "Transporte", date: "Ayer", status: "approved", merchant: "Uber" },
      { id: 3, description: "Material oficina", amount: "$45.200", category: "Oficina", date: "2 días", status: "pending", merchant: "OfficeMax" },
      { id: 4, description: "Hospedaje Santiago", amount: "$89.000", category: "Alojamiento", date: "3 días", status: "approved", merchant: "Hotel Plaza" },
    ],
  };

  const periods = ["Mes", "Trimestre", "Año"];
  const categories = ["Todas", ...statsData.categories.map(c => c.name)];
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  // Exportar CSV simulado
  const handleExport = () => {
    const rows = [
      ["Descripción", "Monto", "Categoría", "Fecha", "Estado", "Comercio"],
      ...statsData.recent.map(e => [e.description, e.amount, e.category, e.date, e.status, e.merchant]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gastos.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Contenido principal */}
      <main className="flex-1 px-8 py-8 space-y-8">
        {/* Filtros y exportación */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Filter className="w-5 h-5 text-blue-600" />
          <select
            className="border rounded-lg px-3 py-2 text-sm dark:bg-[#0F0F12] dark:text-white"
            value={selectedPeriod}
            onChange={e => setSelectedPeriod(e.target.value)}
          >
            {periods.map(p => <option key={p}>{p}</option>)}
          </select>
          <select
            className="border rounded-lg px-3 py-2 text-sm dark:bg-[#0F0F12] dark:text-white"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          <Download className="w-4 h-4" /> Exportar CSV
        </button>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6 flex flex-col items-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold">${statsData.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}</div>
          <div className="text-sm text-gray-500">Total Gastos</div>
        </div>
        <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6 flex flex-col items-center">
          <PieIcon className="w-8 h-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold">{statsData.categories.length}</div>
          <div className="text-sm text-gray-500">Categorías</div>
        </div>
        <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6 flex flex-col items-center">
          <Receipt className="w-8 h-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold">{statsData.recent.length}</div>
          <div className="text-sm text-gray-500">Gastos recientes</div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6">
          <div className="font-semibold mb-2">Gastos por mes</div>
          <Chart type="bar" data={statsData.monthly} xKey="month" yKey="amount" labelKey="month" valueKey="amount" title="Gastos por mes" />
        </div>
        <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6">
          <div className="font-semibold mb-2">Distribución por categoría</div>
          <Chart type="pie" data={statsData.categories} xKey="name" yKey="amount" labelKey="name" valueKey="amount" title="Distribución por categoría" />
        </div>
      </div>

      {/* Lista de gastos recientes */}
      <div className="bg-white dark:bg-[#18181B] rounded-lg shadow p-6 mt-6">
        <div className="font-semibold mb-4">Gastos recientes</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#23232A]">
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-left">Monto</th>
                <th className="px-4 py-2 text-left">Categoría</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Comercio</th>
              </tr>
            </thead>
            <tbody>
              {statsData.recent
                .filter(e => selectedCategory === "Todas" || e.category === selectedCategory)
                .map(e => (
                  <tr key={e.id} className="border-b last:border-none">
                    <td className="px-4 py-2">{e.description}</td>
                    <td className="px-4 py-2">{e.amount}</td>
                    <td className="px-4 py-2">{e.category}</td>
                    <td className="px-4 py-2">{e.date}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${e.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {e.status === "approved" ? "Aprobado" : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-4 py-2">{e.merchant}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
    </div>
  );
}
