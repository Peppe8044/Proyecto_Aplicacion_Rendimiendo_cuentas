import { Camera, Upload, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QuickActions() {
  return (
    <div className="space-y-3">
      <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
        <Camera className="w-4 h-4 mr-2" />
        Escanear Recibo
      </Button>

      <Button variant="outline" className="w-full justify-start bg-transparent">
        <Upload className="w-4 h-4 mr-2" />
        Subir Archivo
      </Button>

      <Button variant="outline" className="w-full justify-start bg-transparent">
        <Plus className="w-4 h-4 mr-2" />
        Gasto Manual
      </Button>

      <Button variant="outline" className="w-full justify-start bg-transparent">
        <FileText className="w-4 h-4 mr-2" />
        Generar Reporte
      </Button>
    </div>
  )
}
