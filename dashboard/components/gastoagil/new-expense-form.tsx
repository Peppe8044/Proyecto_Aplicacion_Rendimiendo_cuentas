"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle, X } from "lucide-react"

interface OCRResult {
  amount: string
  merchant: string
  date: string
  items: string[]
  confidence: number
}

export default function NewExpenseForm() {
  const [isScanning, setIsScanning] = useState(false)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    amount: "",
    merchant: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })
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

    // Simulate OCR processing
    setIsScanning(true)

    // Simulate API call delay
    setTimeout(() => {
      const mockOCRResult: OCRResult = {
        amount: "25990",
        merchant: "CAFÉ CENTRAL",
        date: "2024-01-15",
        items: ["2x Café Americano", "1x Croissant"],
        confidence: 0.92,
      }

      setOcrResult(mockOCRResult)
      setFormData((prev) => ({
        ...prev,
        amount: mockOCRResult.amount,
        merchant: mockOCRResult.merchant,
        date: mockOCRResult.date,
        description: mockOCRResult.items.join(", "),
      }))
      setIsScanning(false)
    }, 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Submitting expense:", formData)
    // Here you would typically send to your API
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
                {isScanning && (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Procesando recibo con OCR...</span>
                  </div>
                )}
                {ocrResult && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-400">
                        Datos extraídos exitosamente
                      </span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {Math.round(ocrResult.confidence * 100)}% confianza
                      </Badge>
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      Monto: ${ocrResult.amount} • Comercio: {ocrResult.merchant}
                    </div>
                  </div>
                )}
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
                <Label htmlFor="amount">Monto *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="25990"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
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
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
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
