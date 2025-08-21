"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { saveExpense } from "@/helpers/uploadAndProcess"
import { uploadAndProcess } from "@/helpers/uploadAndProcess"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle, X } from "lucide-react"

interface OCRResult {
  total_amount: number | string
  merchant: string
  date: string
  text: string
  confidence: number
}

export default function NewExpenseForm() {
  const router = useRouter()
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    total_amount: 0,
    merchant: "",
    category: "",
    text: "",
    date: new Date().toISOString().split("T")[0],
  })

  // Sincroniza los datos extraídos por OCR con el formulario
  useEffect(() => {
    if (ocrResult) {
      setFormData((prev) => ({
        ...prev,
        total_amount: ocrResult.total_amount ? Number(ocrResult.total_amount) : prev.total_amount,
        merchant: ocrResult.merchant || prev.merchant,
        date: ocrResult.date || prev.date,
        text: ocrResult.text || prev.text,
      }))
    }
  }, [ocrResult])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    "Alimentación",
    "Transporte",
    "Alojamiento",
    "Oficina",
    "Combustible",
    "Entretenimiento",
    "Salud",
    "Otros",
  ]

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Procesar imagen con OCR real
    try {
      const result = await uploadAndProcess(file)
      if (result.success && result.boleta) {
        setOcrResult({
          total_amount: result.boleta.total_amount ?? 0,
          merchant: result.boleta.merchant ?? "",
          date: result.boleta.date ?? new Date().toISOString().split("T")[0],
          text: result.boleta.text ?? "",
          confidence: result.boleta.confidence ?? 0,
        })
        toast.success("¡Recibo escaneado exitosamente!")
      } else {
        setOcrResult(null)
        toast.error(result.error || "No se pudo extraer información de la boleta. Verifica la conexión con el backend OCR.")
      }
    } catch (err) {
      setOcrResult(null)
      toast.error("Error al procesar la imagen. No se pudo conectar con el backend OCR.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await saveExpense({
        ...formData,
        total_amount: Number(formData.total_amount),
      })
      toast.success("Gasto guardado exitosamente")
      setFormData({
        total_amount: 0,
        merchant: "",
        category: "",
        text: "",
        date: new Date().toISOString().split("T")[0],
      })
      setSelectedImage(null)
      setOcrResult(null)
      // Redirigir a la lista de gastos
      setTimeout(() => {
        router.push("/expenses")
      }, 1200)
    } catch (error) {
      toast.error("Error al guardar el gasto")
    }
  }

  return (
    <div className="space-y-6">
      {/* OCR Scanner Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-600" />
            Escanear Recibo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Recibo escaneado"
                  className="max-w-full h-48 object-contain mx-auto rounded-lg"
                />
                {/* El estado de escaneo se maneja en el scanner profesional */}
                {/* Los datos extraídos se autocompletan en el formulario, no se muestran aquí */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedImage(null)
                    setOcrResult(null)
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cambiar imagen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">Sube una foto de tu recibo</p>
                  <p className="text-gray-600 dark:text-gray-400">Nuestro OCR extraerá automáticamente los datos</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imagen
                  </Button>
                </div>
              </div>
            )}
          </div>
      {/* El input de imagen y el upload se manejan desde el scanner profesional */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </CardContent>
      </Card>

      {/* Manual Form */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Gasto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="total_amount">Monto *</Label>
                <Input
                  id="total_amount"
                  type="number"
                  placeholder="25990"
                  value={formData.total_amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, total_amount: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Fecha *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="merchant">Comercio/Proveedor *</Label>
              <Input
                id="merchant"
                placeholder="Café Central"
                value={formData.merchant}
                onChange={(e) => setFormData((prev) => ({ ...prev, merchant: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Categoría *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Almuerzo con cliente potencial..."
                value={formData.text}
                onChange={(e) => setFormData((prev) => ({ ...prev, text: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Guardar Gasto
              </Button>
              <Button type="button" variant="outline">
                Guardar y Enviar para Aprobación
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
