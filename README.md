# GastoÁgil - Gestión Inteligente de Gastos

## Descripción

GastoÁgil es una aplicación web completa para escanear boletas/recibos, extraer texto automáticamente usando OCR y gestionar gastos de forma inteligente. Incluye una landing page moderna, backend en FastAPI con OCR, y un dashboard completo en Next.js.

## Características Principales

- **OCR Inteligente**: Escaneo automático de recibos y boletas
- **Dashboard Completo**: Gestión de gastos y transacciones
- **Landing Page Moderna**: Diseño responsive y atractivo
- **Inicio Automático**: Script que levanta todo el proyecto

## Tecnologías

### Backend
- **FastAPI** - Framework web moderno y rápido
- **Tesseract OCR** - Extracción de texto de imágenes
- **Python 3.12+** - Lenguaje principal

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes UI modernos

## Instalación y Ejecución

### Requisitos Previos
- **Python 3.8+** con pip
- **Node.js 18+** con npm
- **Tesseract-OCR** instalado en el sistema

### Inicio Automático (Recomendado)
1. **Clonar el repositorio**
2. **Doble clic** en `start-simple.bat`
3. **Esperar** a que se abran las ventanas automáticamente

### URLs Disponibles
- **Backend API**: http://127.0.0.1:8001
- **Dashboard**: http://localhost:3000
- **Documentación API**: http://127.0.0.1:8001/docs
- **Landing Page**: Abrir `frontend/index.html`

## Documentación Técnica

Para desarrolladores y contribuidores:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura del sistema y diagramas
- **[TECHNICAL-ANALYSIS.md](./TECHNICAL-ANALYSIS.md)** - Análisis exhaustivo y roadmap
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Guía para desarrolladores
- **[test-integration.md](./test-integration.md)** - Guía de pruebas

## Estado del Proyecto

- **Backend OCR**: Completamente funcional
- **Dashboard**: Sistema completo de gestión
- **Landing Page**: Diseño moderno implementado
- **Base de Datos**: En desarrollo (actualmente JSON)
- **Autenticación**: Sistema básico implementado

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