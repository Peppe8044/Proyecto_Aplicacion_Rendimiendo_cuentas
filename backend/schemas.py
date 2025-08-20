from pydantic import BaseModel, Field
from datetime import date, datetime
from typing import Optional, List

class BoletaBase(BaseModel):
    """Esquema base para boletas"""
    nombre_archivo: str = Field(..., description="Nombre del archivo de imagen")
    text: Optional[str] = Field(None, description="Texto extraído por OCR")
    merchant: Optional[str] = Field(None, description="Nombre del comercio")
    total_amount: Optional[float] = Field(None, description="Monto total de la boleta")
    date: Optional[str] = Field(None, description="Fecha de la boleta (YYYY-MM-DD)")
    description: Optional[str] = Field(None, description="Descripción de productos/servicios")
    confidence: Optional[float] = Field(None, description="Nivel de confianza del OCR")

class BoletaCreate(BoletaBase):
    """Esquema para crear una nueva boleta"""
    user_id: str = Field(..., description="ID del usuario propietario")

class BoletaOut(BoletaBase):
    """Esquema para respuesta de boleta"""
    id: int = Field(..., description="ID único de la boleta")
    fecha: Optional[str] = Field(None, description="Fecha de creación del registro (ISO)")
    
    class Config:
        from_attributes = True

class BoletaListResponse(BaseModel):
    """Esquema para respuesta paginada de boletas"""
    items: List[BoletaOut] = Field(..., description="Lista de boletas")
    total: int = Field(..., description="Total de boletas")
    page: int = Field(..., description="Página actual")
    limit: int = Field(..., description="Límite de items por página")
    pages: int = Field(..., description="Total de páginas")

class OCRFromStorageRequest(BaseModel):
    """Esquema para request de OCR desde storage"""
    signedUrl: str = Field(..., description="URL firmada de la imagen")
    nombre_archivo: str = Field(..., description="Nombre del archivo")

class OCRResponse(BaseModel):
    """Esquema para respuesta de OCR"""
    merchant: Optional[str] = Field(None, description="Nombre del comercio")
    total_amount: Optional[float] = Field(None, description="Monto total de la boleta")
    date: Optional[str] = Field(None, description="Fecha de la boleta (YYYY-MM-DD)")
    description: Optional[str] = Field(None, description="Descripción de productos/servicios")
    confidence: Optional[float] = Field(None, description="Nivel de confianza del OCR")
    success: bool = Field(..., description="Indica si el OCR fue exitoso")
    boleta: Optional[BoletaOut] = Field(None, description="Boleta creada")
    error: Optional[str] = Field(None, description="Mensaje de error si falló")
