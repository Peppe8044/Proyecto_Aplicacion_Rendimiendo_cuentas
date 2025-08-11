"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, Loader2, CheckCircle, X, Receipt } from "lucide-react"
import { toast } from "sonner"

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

    // Start OCR processing
    setIsScanning(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://127.0.0.1:8000/ocr', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result: OCRResult = await response.json()
      setOcrResult(result)
      toast.success("¡Recibo escaneado exitosamente!")
      
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

  const handleSaveExpense = () => {
    if (ocrResult) {
      // Here you would typically save to your expense database
      toast.success("Gasto guardado exitosamente")
      console.log("Saving expense:", ocrResult)
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Comercio
                        </Label>
                        <p className="text-lg font-semibold text-gray-900">
                          {ocrResult.merchant}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Total
                        </Label>
                        <p className="text-lg font-semibold text-gray-900">
                          {ocrResult.total_amount ? `$${ocrResult.total_amount.toLocaleString()}` : 'No detectado'}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Fecha
                        </Label>
                        <p className="text-lg font-semibold text-gray-900">
                          {ocrResult.date}
                        </p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Archivo
                        </Label>
                        <p className="text-sm text-gray-600 truncate">
                          {ocrResult.nombre_archivo}
                        </p>
                      </div>
                    </div>

                    {/* Extracted Text */}
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-700">
                        Texto Extraído
                      </Label>
                      <div className="mt-2 p-3 bg-gray-50 rounded border text-sm text-gray-700 max-h-32 overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono">
                          {ocrResult.text}
                        </pre>
                      </div>
                    </div>

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
