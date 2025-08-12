import os
import logging
import re
from datetime import datetime, date
from typing import Optional
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import pytesseract
from PIL import Image
import httpx

# Importar módulos locales
from .db import get_db, engine
from .models import Base
from .deps import get_current_user
from .crud import create_boleta, list_boletas, get_boletas_stats
from .schemas import BoletaOut, BoletaListResponse, OCRFromStorageRequest, OCRResponse

# Configurar logging
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO")),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GastoÁgil API",
    description="API para gestión de gastos con OCR",
    version="2.0.0"
)

# Configurar CORS
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def parse_boleta_text(text: str) -> dict:
    """
    Parsea el texto extraído por OCR para obtener información estructurada.
    
    Args:
        text: Texto extraído por OCR
        
    Returns:
        Diccionario con información parseada
    """
    try:
        # Buscar comercio (líneas que no contengan números)
        lines = text.split('\n')
        merchant = None
        for line in lines[:5]:  # Buscar en las primeras 5 líneas
            line_clean = line.strip()
            if line_clean and not re.search(r'\d', line_clean) and len(line_clean) > 3:
                merchant = line_clean
                break
        
        # Buscar total (patrón de moneda)
        total_pattern = r'[\$]?\s*(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)'
        total_match = re.search(total_pattern, text)
        total_amount = None
        if total_match:
            total_str = total_match.group(1).replace(',', '')
            try:
                total_amount = float(total_str)
            except ValueError:
                pass
        
        # Buscar fecha (patrón de fecha)
        date_pattern = r'(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})'
        date_match = re.search(date_pattern, text)
        detected_date = None
        if date_match:
            try:
                day, month, year = date_match.groups()
                if len(year) == 2:
                    year = '20' + year
                detected_date = date(int(year), int(month), int(day))
            except ValueError:
                pass
        
        return {
            "merchant": merchant,
            "total_amount": total_amount,
            "date": detected_date,
            "confidence": 0.85  # Valor por defecto
        }
    except Exception as e:
        logger.error(f"Error parseando texto OCR: {e}")
        return {
            "merchant": None,
            "total_amount": None,
            "date": None,
            "confidence": 0.0
        }

@app.post("/ocr", response_model=BoletaOut)
async def extract_text(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Extrae texto de una imagen usando OCR y guarda en base de datos.
    
    Args:
        file: Archivo de imagen a procesar
        user: Usuario autenticado
        db: Sesión de base de datos
        
    Returns:
        Boleta creada con información extraída
    """
    try:
        # Validar archivo
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Archivo debe ser una imagen")
        
        if file.size and file.size > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=400, detail="Archivo demasiado grande (máx 10MB)")
        
        # Procesar imagen con OCR
        image = Image.open(file.file)
        text = pytesseract.image_to_string(image, lang='spa')
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="No se pudo extraer texto de la imagen")
        
        # Parsear información
        parsed_info = parse_boleta_text(text)
        
        # Crear boleta en base de datos
        boleta_data = {
            "nombre_archivo": file.filename,
            "text": text,
            "user_id": user["sub"],
            **parsed_info
        }
        
        boleta = create_boleta(db, boleta_data)
        logger.info(f"OCR procesado exitosamente para usuario {user['sub']}")
        
        return boleta
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error procesando OCR: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.post("/ocr/from-storage", response_model=OCRResponse)
async def extract_text_from_storage(
    payload: OCRFromStorageRequest,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Extrae texto de una imagen desde Supabase Storage usando URL firmada.
    
    Args:
        payload: Request con URL firmada y nombre de archivo
        user: Usuario autenticado
        db: Sesión de base de datos
        
    Returns:
        Respuesta con resultado del OCR
    """
    try:
        # Descargar imagen desde URL firmada
        async with httpx.AsyncClient() as client:
            response = await client.get(payload.signedUrl)
            response.raise_for_status()
            
            # Procesar imagen
            image = Image.open(io.BytesIO(response.content))
            text = pytesseract.image_to_string(image, lang='spa')
            
            if not text.strip():
                return OCRResponse(
                    success=False,
                    error="No se pudo extraer texto de la imagen"
                )
            
            # Parsear información
            parsed_info = parse_boleta_text(text)
            
            # Crear boleta en base de datos
            boleta_data = {
                "nombre_archivo": payload.nombre_archivo,
                "text": text,
                "user_id": user["sub"],
                **parsed_info
            }
            
            boleta = create_boleta(db, boleta_data)
            logger.info(f"OCR desde storage procesado para usuario {user['sub']}")
            
            return OCRResponse(success=True, boleta=boleta)
            
    except httpx.HTTPError as e:
        logger.error(f"Error descargando imagen: {e}")
        return OCRResponse(
            success=False,
            error="Error descargando imagen desde storage"
        )
    except Exception as e:
        logger.error(f"Error procesando OCR desde storage: {e}")
        return OCRResponse(
            success=False,
            error="Error interno del servidor"
        )

@app.get("/boletas", response_model=BoletaListResponse)
async def list_user_boletas(
    page: int = Query(1, ge=1, description="Número de página"),
    limit: int = Query(20, ge=1, le=100, description="Items por página"),
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Lista boletas del usuario autenticado con paginación.
    
    Args:
        page: Número de página (1-based)
        limit: Límite de items por página (máx 100)
        user: Usuario autenticado
        db: Sesión de base de datos
        
    Returns:
        Lista paginada de boletas del usuario
    """
    try:
        items, total = list_boletas(db, user["sub"], page, limit)
        pages = (total + limit - 1) // limit  # Calcular total de páginas
        
        return BoletaListResponse(
            items=[BoletaOut.model_validate(item) for item in items],
            total=total,
            page=page,
            limit=limit,
            pages=pages
        )
        
    except Exception as e:
        logger.error(f"Error listando boletas: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.get("/boletas/stats")
async def get_user_stats(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Obtiene estadísticas de las boletas del usuario.
    
    Args:
        user: Usuario autenticado
        db: Sesión de base de datos
        
    Returns:
        Estadísticas de boletas del usuario
    """
    try:
        stats = get_boletas_stats(db, user["sub"])
        return stats
        
    except Exception as e:
        logger.error(f"Error obteniendo estadísticas: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")

@app.get("/health")
async def health_check():
    """Endpoint de salud del sistema."""
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host=os.getenv("FASTAPI_HOST", "127.0.0.1"), 
        port=int(os.getenv("FASTAPI_PORT", "8001"))
    )
