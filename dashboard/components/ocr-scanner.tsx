"use client"

import { useState, useRef } from "react"
import { uploadAndProcess } from "@/helpers/uploadAndProcess"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle, X, Receipt } from "lucide-react"
import { toast } from "sonner"
import { saveExpense } from "@/helpers/uploadAndProcess"

interface OCRResult {
  id: number
  nombre_archivo: string
  text: string
  merchant: string
  total_amount: number | null
  date: string
  confidence: number
  fecha: string
}

export default function OCRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Por favor selecciona una imagen válida")
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    setIsScanning(true)
    setError(null)

    try {
      // Usar el helper profesional con Supabase Auth y Storage
      const result = await uploadAndProcess(file)
      if (result.success && result.boleta) {
        setOcrResult(result.boleta)
        toast.success("¡Recibo escaneado exitosamente!")
      } else {
        setError(result.error || "No se pudo extraer información de la boleta")
        toast.error(result.error || "No se pudo extraer información de la boleta")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      toast.error(`Error al procesar la imagen: ${errorMessage}`)
    } finally {
      setIsScanning(false)
    }
  }

  const handleRetake = () => {
    setSelectedImage(null)
    setOcrResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSaveExpense = async () => {
    if (ocrResult) {
      try {
        await saveExpense(ocrResult)
        toast.success("Gasto guardado exitosamente")
        // Opcional: limpiar el formulario o redirigir
        setSelectedImage(null)
        setOcrResult(null)
      } catch (error) {
        toast.error("Error al guardar el gasto")
      }
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
          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">
                    Sube una imagen de tu recibo
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG o JPEG hasta 10MB
                  </p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isScanning}
                  >
                    Seleccionar Imagen
                  </Button>
                </div>
              </Label>
              <Input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isScanning}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Recibo escaneado"
                  className="w-full max-w-md mx-auto rounded-lg border"
                />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p>Procesando imagen...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* OCR Results */}
              {ocrResult && !isScanning && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Recibo procesado exitosamente
                      </span>
                      <Badge variant="secondary" className="ml-auto">
                        {Math.round(ocrResult.confidence * 100)}% confianza
                      </Badge>
                    </div>
                    {/* Editable fields */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Comercio</Label>
                        <Input
                          type="text"
                          value={ocrResult.merchant}
                          onChange={e => setOcrResult({ ...ocrResult, merchant: e.target.value })}
                          className="text-lg font-semibold text-gray-900"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Total</Label>
                        <Input
                          type="number"
                          value={ocrResult.total_amount ?? ''}
                          onChange={e => setOcrResult({ ...ocrResult, total_amount: Number(e.target.value) })}
                          className="text-lg font-semibold text-gray-900"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Fecha</Label>
                        <Input
                          type="date"
                          value={ocrResult.date}
                          onChange={e => setOcrResult({ ...ocrResult, date: e.target.value })}
                          className="text-lg font-semibold text-gray-900"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Archivo</Label>
                        <Input
                          type="text"
                          value={ocrResult.nombre_archivo}
                          onChange={e => setOcrResult({ ...ocrResult, nombre_archivo: e.target.value })}
                          className="text-sm text-gray-600 truncate"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Descripción</Label>
                        <Input
                          type="text"
                          value={ocrResult.text}
                          onChange={e => setOcrResult({ ...ocrResult, text: e.target.value })}
                          className="text-sm text-gray-700"
                        />
                      </div>
                    </form>
                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-4">
                      <Button onClick={handleSaveExpense} className="flex-1">
                        <Receipt className="w-4 h-4 mr-2" />
                        Guardar Gasto
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleRetake}
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Escanear Otro
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Display */}
              {error && !isScanning && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-800">
                      Error al procesar la imagen
                    </span>
                  </div>
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={handleRetake}
                    className="mt-3"
                  >
                    Intentar de Nuevo
                  </Button>
                </div>
              )}

              {/* Retake Button */}
              {selectedImage && !isScanning && !ocrResult && !error && (
                <div className="text-center">
                  <Button variant="outline" onClick={handleRetake}>
                    <X className="w-4 h-4 mr-2" />
                    Seleccionar Otra Imagen
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
