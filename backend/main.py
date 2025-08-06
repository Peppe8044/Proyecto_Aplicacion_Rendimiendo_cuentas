from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
import pytesseract
import io
import json
import os
from datetime import datetime

# 👇 Fuerza el path manualmente (Windows)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

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

        boleta = {
            "id": int(datetime.now().timestamp()),
            "nombre_archivo": file.filename,
            "texto_extraido": text.strip(),
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

# --- TESTS BÁSICOS (puedes mover esto a test_main.py si lo prefieres) ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Pruebas automáticas con pytest
from fastapi.testclient import TestClient
client = TestClient(app)

def test_listar_boletas():
    response = client.get("/boletas")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
