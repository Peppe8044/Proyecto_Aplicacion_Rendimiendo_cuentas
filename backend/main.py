from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
import pytesseract
import io
import json
import os
import re
import platform
from datetime import datetime

# 👇 Configuración automática del path de Tesseract según el sistema operativo
def get_tesseract_path():
    system = platform.system()
    if system == "Windows":
        # Rutas comunes en Windows
        possible_paths = [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            r"C:\Users\{}\AppData\Local\Programs\Tesseract-OCR\tesseract.exe".format(os.getenv('USERNAME', '')),
        ]
        for path in possible_paths:
            if os.path.exists(path):
                return path
        # Si no se encuentra, usar el path por defecto
        return r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    elif system == "Darwin":  # macOS
        return "/usr/local/bin/tesseract"
    else:  # Linux
        return "/usr/bin/tesseract"

# Configurar Tesseract
try:
    pytesseract.pytesseract.tesseract_cmd = get_tesseract_path()
except Exception as e:
    print(f"⚠️  Advertencia: No se pudo configurar Tesseract: {e}")

app = FastAPI()

# Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# POST /ocr - Subir imagen y guardar resultado
@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        text = pytesseract.image_to_string(image, lang='eng')

        # Extraer información útil del texto
        text_clean = text.strip()
        
        # Intentar extraer información estructurada
        lines = text_clean.split('\n')
        merchant = lines[0] if lines else "Desconocido"
        
        # Buscar total (patrón común: TOTAL, $, etc.)
        total_amount = None
        for line in lines:
            if 'TOTAL' in line.upper() or '$' in line:
                # Extraer números del texto
                numbers = re.findall(r'\$?(\d+\.?\d*)', line)
                if numbers:
                    total_amount = float(numbers[-1])  # Último número encontrado
                    break
        
        boleta = {
            "id": int(datetime.now().timestamp()),
            "nombre_archivo": file.filename,
            "text": text_clean,
            "merchant": merchant,
            "total_amount": total_amount,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "confidence": 0.85,  # Valor simulado de confianza
            "fecha": datetime.now().isoformat()
        }

        os.makedirs("boletas", exist_ok=True)
        ruta_archivo = "boletas/boletas.json"

        try:
            with open(ruta_archivo, "r", encoding="utf-8") as f:
                data = json.load(f)
        except FileNotFoundError:
            data = []

        data.append(boleta)

        with open(ruta_archivo, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        return boleta

    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="El archivo no es una imagen válida.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno al procesar la imagen: {str(e)}")

# GET /boletas - Listar boletas almacenadas
@app.get("/boletas")
def listar_boletas():
    ruta_archivo = "boletas/boletas.json"
    try:
        with open(ruta_archivo, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        return []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"No se pudieron leer las boletas: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
