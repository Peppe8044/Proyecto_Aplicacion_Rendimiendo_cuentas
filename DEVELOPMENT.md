# 👨‍💻 Guía para Desarrolladores - GastoÁgil

## 🚀 Configuración del Entorno de Desarrollo

### **Requisitos Previos**
- **Python**: 3.8+ (recomendado 3.12+)
- **Node.js**: 18+ (recomendado 22+)
- **npm**: 10+ (incluido con Node.js)
- **Tesseract OCR**: Instalado en el sistema
- **Git**: Para control de versiones

### **Instalación de Dependencias**

#### **Backend (Python)**
```bash
cd backend
pip install -r requirements.txt
```

#### **Frontend (Node.js)**
```bash
cd dashboard
npm install --legacy-peer-deps
```

## 🛠️ Stack Tecnológico Detallado

### **Backend Stack**
```yaml
Runtime: Python 3.12+
Framework: FastAPI 0.116.1
Server: Uvicorn 0.35.0
OCR: Tesseract + pytesseract 0.3.13
Image Processing: Pillow 11.3.0
Validation: Pydantic 2.11.7
CORS: FastAPI CORS Middleware
```

**Archivos clave**: `backend/main_clean.py`, `backend/requirements.txt`

### **Frontend Dashboard Stack**
```yaml
Framework: Next.js 15.2.4
Language: TypeScript 5
UI Library: React 18.3.1
Styling: Tailwind CSS 3.4.17
Components: Shadcn/ui + Radix UI
State Management: React Hooks
Forms: React Hook Form + Zod
```

**Archivos clave**: `dashboard/package.json`, `dashboard/next.config.mjs`

### **Frontend Landing Stack**
```yaml
HTML: HTML5 semántico
CSS: CSS3 con animaciones
JavaScript: ES6+ vanilla
Charts: Chart.js
Fonts: Inter (Google Fonts)
```

**Archivos clave**: `frontend/index.html`, `frontend/styles.css`, `frontend/script.js`

## 🏗️ Estructura del Proyecto

```
Proyecto_Aplicacion_Rendimiendo_cuentas/
├── backend/                    # API FastAPI + OCR
│   ├── main_clean.py          # Servidor principal (4.1KB)
│   ├── requirements.txt       # Dependencias Python (680B)
│   └── boletas/              # Almacenamiento JSON
├── dashboard/                 # App Next.js completa
│   ├── app/                   # Páginas y rutas (App Router)
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base (Shadcn/ui)
│   │   └── gastoagil/        # Componentes específicos
│   ├── package.json           # Dependencias Node.js
│   └── next.config.mjs        # Configuración Next.js
├── frontend/                  # Landing page estática
│   ├── index.html             # Página principal (210 líneas)
│   ├── styles.css             # Estilos CSS (156 líneas)
│   ├── script.js              # JavaScript (260 líneas)
│   └── auth-handler.js        # Manejo de autenticación (66 líneas)
├── start-simple.bat           # Script de inicio automático (723B)
├── README.md                  # Documentación principal
├── ARCHITECTURE.md            # Arquitectura del sistema
├── TECHNICAL-ANALYSIS.md      # Análisis técnico exhaustivo
├── DEVELOPMENT.md             # Esta guía
└── test-integration.md        # Guía de pruebas
```

## 🔧 Scripts de Desarrollo

### **Inicio Automático**
```bash
# Windows
.\start-simple.bat

# Linux/Mac
./start-simple.sh  # (crear si no existe)
```

### **Inicio Manual**
```bash
# Terminal 1 - Backend
cd backend
python -m uvicorn main_clean:app --reload --host 127.0.0.1 --port 8001

# Terminal 2 - Frontend
cd dashboard
npm run dev
```

### **Scripts NPM Disponibles**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 📝 Estándares de Código

### **Python (Backend)**
- **PEP 8**: Estilo de código estándar
- **Type Hints**: Usar anotaciones de tipo
- **Docstrings**: Documentar funciones y clases
- **Line Length**: Máximo 88 caracteres (Black formatter)

#### **Ejemplo de Código**
```python
from fastapi import FastAPI, File, UploadFile, HTTPException
from typing import Optional, List
import logging

logger = logging.getLogger(__name__)

@app.post("/ocr")
async def extract_text(file: UploadFile = File(...)) -> dict:
    """
    Extrae texto de una imagen usando OCR.
    
    Args:
        file: Archivo de imagen a procesar
        
    Returns:
        dict: Datos extraídos de la imagen
        
    Raises:
        HTTPException: Si hay error en el procesamiento
    """
    try:
        # Lógica del endpoint
        pass
    except Exception as e:
        logger.error(f"Error procesando imagen: {e}")
        raise HTTPException(status_code=500, detail=str(e))
```

### **TypeScript/React (Frontend)**
- **ESLint**: Reglas de linting estándar
- **Prettier**: Formateo automático de código
- **TypeScript strict**: Configuración estricta
- **Componentes funcionales**: Usar hooks en lugar de clases

#### **Ejemplo de Código**
```typescript
import React from 'react';
import { Button } from '@/components/ui/button';

interface OCRScannerProps {
  onResult: (data: OCRResult) => void;
  disabled?: boolean;
}

export const OCRScanner: React.FC<OCRScannerProps> = ({ 
  onResult, 
  disabled = false 
}) => {
  const handleFileUpload = async (file: File) => {
    try {
      // Lógica de procesamiento
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="ocr-scanner">
      <Button 
        onClick={() => handleFileUpload} 
        disabled={disabled}
        className="w-full"
      >
        Escanear Recibo
      </Button>
    </div>
  );
};
```

### **CSS (Landing Page)**
- **BEM**: Metodología de nomenclatura CSS
- **Mobile First**: Diseño responsive
- **Variables CSS**: Usar custom properties
- **Flexbox/Grid**: Layouts modernos

#### **Ejemplo de Código**
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #1f2937;
  --text-color: #374151;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

.hero-section__title {
  font-size: clamp(2rem, 5vw, 4rem);
  color: white;
  text-align: center;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero-section {
    flex-direction: row;
    justify-content: space-between;
    padding: 4rem 2rem;
  }
}
```

## 🧪 Testing

### **Backend Testing**
```bash
# Instalar dependencias de testing
pip install pytest pytest-asyncio httpx

# Ejecutar tests
cd backend
pytest

# Con coverage
pytest --cov=main --cov-report=html
```

### **Frontend Testing**
```bash
# Instalar dependencias de testing
cd dashboard
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Ejecutar tests
npm test

# Con coverage
npm test -- --coverage
```

### **E2E Testing**
```bash
# Instalar Playwright
cd dashboard
npm install --save-dev @playwright/test

# Ejecutar tests E2E
npx playwright test
```

## 🔍 Debugging

### **Backend Debugging**
```python
import logging

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Usar en código
logger.debug(f"Variable value: {variable}")
logger.info("Operation completed")
logger.warning("Deprecated feature used")
logger.error(f"Error occurred: {error}")
```

### **Frontend Debugging**
```typescript
// Console logging
console.log('Debug info:', data);
console.warn('Warning:', warning);
console.error('Error:', error);

// React DevTools
// Instalar extensión del navegador

// Next.js debugging
// Agregar en next.config.mjs
const nextConfig = {
  experimental: {
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  },
};
```

## 🚀 Deployment

### **Backend Deployment**
```bash
# Instalar dependencias de producción
pip install -r requirements.txt

# Configurar variables de entorno
export FASTAPI_HOST=0.0.0.0
export FASTAPI_PORT=8001
export LOG_LEVEL=INFO

# Ejecutar en producción
python -m uvicorn main_clean:app --host 0.0.0.0 --port 8001
```

### **Frontend Deployment**
```bash
# Build de producción
cd dashboard
npm run build

# Ejecutar en producción
npm start

# O usar PM2
npm install -g pm2
pm2 start npm --name "gastoagil" -- start
```

## 📊 Monitoreo y Observabilidad

### **Métricas del Backend**
```python
import time
from fastapi import Request

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

### **Métricas del Frontend**
```typescript
// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance', {
      event_category: 'timing',
      event_label: metric,
      value: value,
    });
  }
};

// Error tracking
export const trackError = (error: Error, context?: string) => {
  console.error('Error tracked:', error, context);
  // Enviar a servicio de tracking
};
```

## 🔒 Seguridad

### **Variables de Entorno**
```bash
# .env.local
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8001
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:pass@localhost/gastoagil
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### **Validación de Entrada**
```python
from pydantic import BaseModel, validator
from typing import Optional

class OCRRequest(BaseModel):
    file: UploadFile
    
    @validator('file')
    def validate_file(cls, v):
        if not v.content_type.startswith('image/'):
            raise ValueError('File must be an image')
        if v.size > 10 * 1024 * 1024:  # 10MB
            raise ValueError('File too large')
        return v
```

### **CORS Seguro**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Solo orígenes específicos
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### **Herramientas Recomendadas**
- **Editor**: VS Code con extensiones Python y TypeScript
- **API Testing**: Postman o Insomnia
- **Database**: PostgreSQL (para migración futura)
- **Version Control**: Git con GitFlow

### **Comunidades**
- FastAPI Discord
- Next.js Discord
- React Community
- Python Discord

---

**Nota**: Esta guía se actualiza regularmente. Para la versión más reciente, consulta el repositorio principal.
