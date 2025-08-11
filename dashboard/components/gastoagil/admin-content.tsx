import { Users, Receipt, TrendingUp, Building2, DollarSign, AlertTriangle } from "lucide-react"
import AdminStats from "./admin-stats"
import UserManagement from "./user-management"
import ExpenseApprovals from "./expense-approvals"

export default function AdminContent() {
  return (
    <div className="space-y-6">
      {/* Admin Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Usuarios Activos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12.5% vs mes anterior</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gastos Pendientes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Requieren aprobación</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos MRR</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">$2.8M</p>
              <p className="text-xs text-green-600 dark:text-green-400">+8.3% crecimiento</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Empresas Activas</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">+5 este mes</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Admin Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Approvals */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            Aprobaciones Urgentes
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">3</span>
          </h2>
          <ExpenseApprovals />
        </div>

        {/* User Management */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Usuarios Recientes
          </h2>
          <UserManagement />
        </div>
      </div>

      {/* Additional Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            Estado del Sistema
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">API Response Time</span>
              <span className="text-sm font-medium text-green-600">120ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">OCR Success Rate</span>
              <span className="text-sm font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Ingresos por Plan</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Plan PYME</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">$1.2M</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Plan Emprendedor</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">$890K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Servicios Premium</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">$710K</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-900 dark:text-white">Nueva empresa registrada</p>
              <p className="text-gray-600 dark:text-gray-400">Hace 2 horas</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 dark:text-white">Actualización de sistema</p>
              <p className="text-gray-600 dark:text-gray-400">Hace 4 horas</p>
            </div>
            <div className="text-sm">
              <p className="text-gray-900 dark:text-white">Reporte de seguridad</p>
              <p className="text-gray-600 dark:text-gray-400">Hace 1 día</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Analytics */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          Análisis Global de la Plataforma
        </h2>
        <AdminStats />
      </div>
    </div>
  )
}
