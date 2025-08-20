
"use client"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Home, Camera, Receipt, FileText, BarChart3, Users, Clock, Building2, TrendingUp, CreditCard, Shield, Settings, Menu, MessageCircle } from "lucide-react"

interface SidebarProps {
  isAdmin?: boolean
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors font-semibold text-base ${
          isActive
            ? "bg-blue-600 text-white shadow border-l-4 border-blue-600"
            : "text-gray-300 hover:text-white hover:bg-blue-600/80"
        }`}
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: isActive ? 600 : 500 }}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    );
  }

  const userNavItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/expenses/new", icon: Camera, label: "Escanear Gasto" },
    { href: "/expenses", icon: Receipt, label: "Mis Gastos" },
    { href: "/reports", icon: FileText, label: "Reportes" },
    { href: "/analytics", icon: BarChart3, label: "Análisis" },
  ];

  const adminNavItems = [
    { href: "/admin", icon: Home, label: "Panel Admin" },
    { href: "/admin/users", icon: Users, label: "Usuarios" },
    { href: "/admin/expenses", icon: Receipt, label: "Todos los Gastos" },
    { href: "/admin/approvals", icon: Clock, label: "Aprobaciones" },
    { href: "/admin/companies", icon: Building2, label: "Empresas" },
    { href: "/admin/analytics", icon: TrendingUp, label: "Análisis Global" },
    { href: "/admin/billing", icon: CreditCard, label: "Facturación" },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems


  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-white dark:bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200 dark:border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <Link
            href={isAdmin ? "/admin" : "/dashboard"}
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GA</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">GastoÁgil</span>
            </div>
          </Link>
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {isAdmin ? "Administración" : "Gastos"}
                </div>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavItem key={item.href} href={item.href} icon={item.icon}>
                      {item.label}
                    </NavItem>
                  ))}
                </div>
              </div>
              {isAdmin && (
                <div>
                  <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Sistema
                  </div>
                  <div className="space-y-1">
                    <NavItem href="/admin/permissions" icon={Shield}>
                      Permisos
                    </NavItem>
                    <NavItem href="/admin/settings" icon={Settings}>
                      Configuración
                    </NavItem>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="/settings" icon={Settings}>
                Configuración
              </NavItem>
            </div>
          </div>
        </div>
      </nav>
      {/* Botón flotante de ayuda en la esquina inferior derecha, fuera del sidebar */}
      <a
        href="/help"
        className="fixed bottom-6 right-6 z-[100] bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
        aria-label="Ayuda"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
