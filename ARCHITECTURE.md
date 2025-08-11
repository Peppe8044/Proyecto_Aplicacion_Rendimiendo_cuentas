# 🏗️ Arquitectura del Sistema GastoÁgil

## 📋 Descripción General

GastoÁgil es una aplicación monolítica modular que separa claramente las responsabilidades entre frontend, backend y servicios de procesamiento. La arquitectura está diseñada para ser escalable, mantenible y fácil de entender.

## 🎯 Principios de Diseño

- **Separación de Responsabilidades**: Cada módulo tiene una función específica
- **Loose Coupling**: Módulos se comunican a través de APIs bien definidas
- **High Cohesion**: Funcionalidades relacionadas están agrupadas
- **Progressive Enhancement**: Funcionalidades básicas funcionan sin dependencias complejas

## 🏛️ Arquitectura de Alto Nivel

```mermaid
flowchart TB
    subgraph "Frontend Layer"
        LP[Landing Page<br/>HTML/CSS/JS]
        D[Dashboard<br/>Next.js + React]
    end
    
    subgraph "API Layer"
        API[FastAPI Server<br/>Puerto 8001]
        CORS[CORS Middleware]
        VAL[Validation Layer]
    end
    
    subgraph "Business Logic Layer"
        OCR[Tesseract OCR<br/>Procesamiento]
        PARSER[Text Parser<br/>Extract Data]
        STORAGE[Storage Manager<br/>JSON/DB]
    end
    
    subgraph "Infrastructure Layer"
        AUTH[Auth Handler<br/>Local Storage]
        IMG[Image Processing<br/>Pillow]
        LOG[Logging System]
    end
    
    LP -->|"Iniciar Sesión"| D
    D -->|"Subir Imagen"| API
    API -->|"Validar"| VAL
    VAL -->|"Procesar"| OCR
    OCR -->|"Extraer Texto"| PARSER
    PARSER -->|"Guardar"| STORAGE
    API -->|"Resultados"| D
    D -->|"Autenticación"| AUTH
    API -->|"Logs"| LOG
```

## 🔄 Flujo de Datos

### 1. Proceso de OCR
```mermaid
sequenceDiagram
    participant U as Usuario
    participant D as Dashboard
    participant API as FastAPI
    participant OCR as Tesseract
    participant S as Storage
    
    U->>D: Subir imagen
    D->>API: POST /ocr (FormData)
    API->>API: Validar archivo
    API->>OCR: Procesar imagen
    OCR->>API: Texto extraído
    API->>API: Parsear datos
    API->>S: Guardar boleta
    API->>D: Respuesta JSON
    D->>U: Mostrar resultados
```

### 2. Consulta de Boletas
```mermaid
sequenceDiagram
    participant U as Usuario
    participant D as Dashboard
    participant API as FastAPI
    participant S as Storage
    
    U->>D: Ver historial
    D->>API: GET /boletas
    API->>S: Leer datos
    S->>API: Array de boletas
    API->>D: JSON response
    D->>U: Mostrar lista
```

## 🧩 Módulos del Sistema

### **Frontend Module**
- **Responsabilidad**: Interfaz de usuario y experiencia del usuario
- **Tecnologías**: Next.js, React, TypeScript, Tailwind CSS
- **Dependencias**: Backend API
- **Archivos clave**: `dashboard/app/`, `dashboard/components/`

### **API Module**
- **Responsabilidad**: Endpoints REST y lógica de negocio
- **Tecnologías**: FastAPI, Python, Uvicorn
- **Dependencias**: OCR Module, Storage Module
- **Archivos clave**: `backend/main_clean.py`

### **OCR Module**
- **Responsabilidad**: Procesamiento de imágenes y extracción de texto
- **Tecnologías**: Tesseract, pytesseract, Pillow
- **Dependencias**: Image Processing Module
- **Archivos clave**: `backend/main_clean.py:55-56`

### **Storage Module**
- **Responsabilidad**: Persistencia de datos y gestión de archivos
- **Tecnologías**: JSON (temporal), File System
- **Dependencias**: None
- **Archivos clave**: `backend/main_clean.py:85-97`

### **Auth Module**
- **Responsabilidad**: Gestión de autenticación y sesiones
- **Tecnologías**: Local Storage, JWT (planeado)
- **Dependencias**: Frontend Module
- **Archivos clave**: `frontend/auth-handler.js`

## 🔌 Interfaces y Contratos

### **API Endpoints**

#### POST `/ocr`
```yaml
Request:
  - Content-Type: multipart/form-data
  - Body: file (image/jpeg, image/png, image/jpg)
  
Response:
  - Content-Type: application/json
  - Body: {
      "id": "timestamp",
      "nombre_archivo": "string",
      "text": "string",
      "merchant": "string",
      "total_amount": "float",
      "date": "string",
      "confidence": "float",
      "fecha": "ISO timestamp"
    }
```

#### GET `/boletas`
```yaml
Request:
  - Method: GET
  - Headers: None
  
Response:
  - Content-Type: application/json
  - Body: Array of boleta objects
```

### **Data Models**

#### Boleta Entity
```typescript
interface Boleta {
  id: number;              // Timestamp único
  nombre_archivo: string;  // Nombre del archivo original
  text: string;            // Texto extraído por OCR
  merchant: string;        // Nombre del comercio
  total_amount: number;    // Monto total
  date: string;            // Fecha en formato YYYY-MM-DD
  confidence: number;      // Nivel de confianza del OCR
  fecha: string;           // Timestamp ISO completo
}
```

## 🚀 Patrones de Diseño Utilizados

### **1. Repository Pattern**
- Abstracción de la capa de datos
- Fácil migración de JSON a base de datos

### **2. Service Layer Pattern**
- Lógica de negocio separada de la API
- Reutilización de servicios

### **3. Middleware Pattern**
- CORS, validación, logging
- Fácil agregar nuevos middlewares

### **4. Factory Pattern**
- Creación de objetos Boleta
- Validación y transformación de datos

## 🔧 Configuración del Sistema

### **Variables de Entorno (Planeado)**
```env
# Backend
FASTAPI_HOST=127.0.0.1
FASTAPI_PORT=8001
TESSERACT_PATH=/usr/bin/tesseract
LOG_LEVEL=INFO

# Frontend
NEXT_PUBLIC_API_URL=http://127.0.0.1:8001
NEXT_PUBLIC_APP_NAME=GastoÁgil

# Database (Futuro)
DATABASE_URL=postgresql://user:pass@localhost/gastoagil
```

### **Configuración de CORS**
```python
# backend/main_clean.py:41-47
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En desarrollo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 Métricas y Observabilidad

### **Métricas Actuales**
- Tiempo de respuesta de OCR
- Tasa de éxito de extracción
- Número de boletas procesadas

### **Métricas Planeadas**
- Latencia de API (p50, p95, p99)
- Throughput de OCR
- Uso de memoria y CPU
- Errores por endpoint

## 🔮 Evolución de la Arquitectura

### **Fase 1 (Actual)**
- Monolito con separación de módulos
- Almacenamiento JSON local
- Autenticación básica

### **Fase 2 (30 días)**
- Base de datos PostgreSQL
- Autenticación JWT
- Tests unitarios

### **Fase 3 (60 días)**
- Dockerización
- Cola de procesamiento
- CI/CD básico

### **Fase 4 (90 días)**
- Microservicios (opcional)
- Monitoreo y alertas
- Deployment en producción

## 🎯 Decisiones de Diseño

### **¿Por qué Monolito?**
- **Equipo pequeño**: Fácil de mantener y desarrollar
- **Complejidad baja**: No requiere orquestación compleja
- **Desarrollo rápido**: Menos overhead de infraestructura

### **¿Por qué FastAPI?**
- **Performance**: ASGI de alto rendimiento
- **Type Safety**: Validación automática con Pydantic
- **Documentación**: OpenAPI automática
- **Moderno**: Sintaxis Python 3.6+

### **¿Por qué Next.js?**
- **SSR/SSG**: Mejor SEO y performance
- **App Router**: Arquitectura moderna
- **TypeScript**: Tipado estático
- **Ecosistema**: Gran cantidad de componentes

---

**Nota**: Esta arquitectura está diseñada para evolucionar gradualmente sin requerir reescrituras masivas del código.
