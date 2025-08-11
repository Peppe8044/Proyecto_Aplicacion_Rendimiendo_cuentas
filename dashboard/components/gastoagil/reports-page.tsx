"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, TrendingUp, PieChart, BarChart3, FileSpreadsheet, FileImage } from "lucide-react"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("expense-summary")
  const [dateRange, setDateRange] = useState("this-month")
  const [format, setFormat] = useState("pdf")

  const reportTypes = [
    { value: "expense-summary", label: "Resumen de Gastos", icon: PieChart },
    { value: "category-breakdown", label: "Desglose por Categoría", icon: BarChart3 },
    { value: "monthly-trends", label: "Tendencias Mensuales", icon: TrendingUp },
    { value: "tax-report", label: "Reporte Tributario (SII)", icon: FileText },
    { value: "reimbursement", label: "Reporte de Reembolsos", icon: FileSpreadsheet },
  ]

  const dateRanges = [
    { value: "this-week", label: "Esta Semana" },
    { value: "this-month", label: "Este Mes" },
    { value: "last-month", label: "Mes Anterior" },
    { value: "this-quarter", label: "Este Trimestre" },
    { value: "this-year", label: "Este Año" },
    { value: "custom", label: "Rango Personalizado" },
  ]

  const formats = [
    { value: "pdf", label: "PDF", icon: FileImage },
    { value: "excel", label: "Excel", icon: FileSpreadsheet },
    { value: "csv", label: "CSV", icon: FileText },
  ]

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log("Generating report:", { reportType, dateRange, format })
    // Here you would typically call your API to generate the report
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reportes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Genera reportes detallados de tus gastos para análisis y cumplimiento tributario
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">$245.680</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Este Mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">156</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gastos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">8</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categorías</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">$89.450</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">IVA Recuperable</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Generar Reporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="report-type">Tipo de Reporte</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-range">Período</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="format">Formato</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((fmt) => (
                    <SelectItem key={fmt.value} value={fmt.value}>
                      <div className="flex items-center gap-2">
                        <fmt.icon className="w-4 h-4" />
                        {fmt.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {dateRange === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Fecha Inicio</Label>
                <Input type="date" id="start-date" />
              </div>
              <div>
                <Label htmlFor="end-date">Fecha Fin</Label>
                <Input type="date" id="end-date" />
              </div>
            </div>
          )}

          <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Resumen Mensual - Enero 2024",
                type: "Resumen de Gastos",
                date: "15 Ene 2024",
                format: "PDF",
                status: "Completado",
              },
              {
                name: "Reporte Tributario Q4 2023",
                type: "Reporte Tributario (SII)",
                date: "10 Ene 2024",
                format: "Excel",
                status: "Completado",
              },
              {
                name: "Desglose por Categoría - Diciembre",
                type: "Desglose por Categoría",
                date: "05 Ene 2024",
                format: "PDF",
                status: "Procesando",
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{report.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span>{report.format}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      report.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {report.status}
                  </Badge>
                  {report.status === "Completado" && (
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
