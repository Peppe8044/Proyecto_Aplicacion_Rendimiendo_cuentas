# GastoÁgil

## Descripción
Aplicación web para escanear boletas/recibos, extraer texto automáticamente usando OCR y almacenar los resultados. Incluye una landing page moderna y un backend en FastAPI.

## Requisitos
- Python 3.8+
- Node.js (opcional, solo si quieres usar algún servidor para frontend)
- Tesseract-OCR instalado (asegúrate de que la ruta esté bien configurada en backend/main.py)

## Instalación y ejecución

### Backend (FastAPI)
1. Instala dependencias:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
2. Ejecuta el backend:
   ```bash
   uvicorn main:app --reload
   ```
   El backend estará en http://127.0.0.1:8000

### Frontend
1. Abre el archivo `frontend/index.html` en tu navegador (puedes hacer doble clic o usar una extensión de servidor estático como Live Server en VSCode).
2. Asegúrate de que el backend esté corriendo para que el formulario de escaneo funcione.

## Pruebas manuales
- Sube una imagen de boleta en la sección "Escanear Boleta" y verifica que el texto extraído se muestre correctamente.
- Puedes consultar los resultados almacenados accediendo a http://127.0.0.1:8000/boletas

## Estructura del proyecto
- `backend/`: API en FastAPI y lógica OCR
- `frontend/`: Landing page, estilos y scripts

## Notas
- Para producción, ajusta CORS y considera usar una base de datos.