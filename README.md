# GastoÁgil - Gestión Inteligente de Gastos

## Descripción

GastoÁgil es una aplicación web completa para escanear boletas/recibos, extraer texto automáticamente usando OCR y gestionar gastos de forma inteligente. Incluye una landing page moderna, backend en FastAPI con OCR, y un dashboard completo en Next.js.

## Características Principales

- **OCR Inteligente**: Escaneo automático de recibos y boletas
- **Dashboard Completo**: Gestión de gastos y transacciones
- **Landing Page Moderna**: Diseño responsive y atractivo
- **Inicio Automático**: Script que levanta todo el proyecto
- **Base de Datos PostgreSQL**: Almacenamiento robusto con Supabase
- **Autenticación JWT**: Sistema seguro de usuarios
- **Storage en la Nube**: Almacenamiento de imágenes en Supabase Storage

## Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **PostgreSQL** - Base de datos robusta
- **Supabase** - Backend-as-a-Service
- **Tesseract OCR** - Extracción de texto de imágenes
- **Python 3.12+** - Lenguaje principal

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes UI modernos
- **Supabase Client** - Cliente para autenticación y storage

## Instalación y Ejecución

### Requisitos Previos
- **Python 3.8+** con pip
- **Node.js 18+** con npm
- **Tesseract-OCR** instalado en el sistema
- **Cuenta de Supabase** configurada

### Configuración de Supabase

1. **Crear proyecto en Supabase**
   - Ve a [supabase.com](https://supabase.com)
   - Crea un nuevo proyecto
   - Anota la URL y las claves

2. **Configurar Base de Datos**
   - Ejecuta el script SQL en `backend/sql/001_boletas.sql`
   - Crea el bucket `receipts` en Storage

3. **Configurar Variables de Entorno**
   ```bash
   # Backend (.env)
   cp backend/env.example backend/.env
   # Editar con tus credenciales de Supabase
   
   # Frontend (.env.local)
   cp dashboard/env.local.example dashboard/.env.local
   # Editar con tus credenciales de Supabase
   ```

### Inicio Automático (Recomendado)
1. **Clonar el repositorio**
2. **Configurar variables de entorno**
3. **Doble clic** en `start-simple.bat`
4. **Esperar** a que se abran las ventanas automáticamente

### URLs Disponibles
- **Backend API**: http://127.0.0.1:8001
- **Dashboard**: http://localhost:3000
- **Documentación API**: http://127.0.0.1:8001/docs
- **Landing Page**: Abrir `frontend/index.html`

## Funcionalidades

### OCR y Procesamiento
- **POST /ocr**: Subir imagen directamente y procesar OCR
- **POST /ocr/from-storage**: Procesar imagen desde Supabase Storage
- **Parsing inteligente**: Extracción automática de comercio, total y fecha

### Gestión de Boletas
- **GET /boletas**: Lista paginada de boletas del usuario
- **GET /boletas/stats**: Estadísticas de gastos del usuario
- **Seguridad**: Cada usuario solo ve sus propias boletas

### Autenticación
- **JWT de Supabase**: Tokens seguros y renovables
- **Row Level Security**: Protección a nivel de base de datos
- **Sesiones persistentes**: Login automático en el dashboard

## Documentación Técnica

Para desarrolladores y contribuidores:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura del sistema y diagramas
- **[TECHNICAL-ANALYSIS.md](./TECHNICAL-ANALYSIS.md)** - Análisis exhaustivo y roadmap
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guía para desarrolladores
- **[test-integration.md](./test-integration.md)** - Guía de pruebas

## Estado del Proyecto

- **Backend OCR**: Completamente funcional con Supabase
- **Dashboard**: Sistema completo de gestión
- **Landing Page**: Diseño moderno implementado
- **Base de Datos**: PostgreSQL con Supabase implementado
- **Autenticación**: Sistema JWT completo implementado
- **Storage**: Supabase Storage para imágenes
- **Tests**: Suite básica de pruebas implementada

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.

## Soporte

- **Issues**: Reporta bugs en GitHub Issues
- **Documentación**: Revisa los archivos técnicos en `/docs`

---

**GastoÁgil** - Transformando la gestión de gastos para freelancers y PYMEs