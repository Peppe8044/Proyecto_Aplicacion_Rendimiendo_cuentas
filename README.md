# GastoÁgil

## 🚀 Descripción
Aplicación web completa para escanear boletas/recibos, extraer texto automáticamente usando OCR y gestionar gastos de forma inteligente. Incluye una landing page moderna, backend en FastAPI con OCR, y un dashboard completo en Next.js.

## ✨ Características Principales

### 🔍 **OCR Inteligente**
- Escaneo automático de recibos y boletas
- Extracción de texto con Tesseract OCR
- Detección automática de comercio, total y fecha
- Almacenamiento estructurado de datos

### 🎯 **Dashboard Completo**
- Sistema de autenticación (login/registro)
- Gestión de gastos y transacciones
- Panel de administración para usuarios admin
- Reportes y estadísticas en tiempo real
- Integración completa con OCR

### 🌐 **Landing Page Moderna**
- Diseño responsive y atractivo
- Navegación suave entre secciones
- Gráficos interactivos de ahorro de tiempo
- Call-to-action optimizado

## 🏗️ Estructura del Proyecto

```
Proyecto_Aplicacion_Rendimiendo_cuentas/
├── backend/                 # API FastAPI + OCR
│   ├── main.py             # Servidor principal
│   ├── requirements.txt    # Dependencias Python
│   └── boletas/           # Almacenamiento de boletas
├── frontend/               # Landing page
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos CSS
│   └── script.js          # Funcionalidad JavaScript
├── dashboard/              # App Next.js completa
│   ├── app/               # Páginas y rutas
│   ├── components/        # Componentes React
│   ├── package.json       # Dependencias Node.js
│   └── ...
├── start-project.bat      # Script de inicio automático
└── README.md              # Este archivo
```

## 🛠️ Requisitos

- **Python 3.8+** con pip
- **Node.js 18+** con npm
- **Tesseract-OCR** instalado en el sistema
- **Git** para clonar el repositorio

## 🚀 Instalación y Ejecución

### ⚡ **Opción 1: Script Automático (Recomendado)**
1. **Doble clic** en `start-project.bat`
2. Se abrirán automáticamente backend y frontend
3. Backend: http://127.0.0.1:8000
4. Frontend: http://localhost:3000

### 🔧 **Opción 2: Manual**

#### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

#### Frontend (Landing)
1. Abre `frontend/index.html` en tu navegador
2. Haz clic en "Iniciar Sesión" para ir al dashboard

#### Dashboard (GastoÁgil)
```bash
cd dashboard
npm install --legacy-peer-deps
npm run dev
```

## 🔌 API Endpoints

### POST `/ocr`
Sube una imagen y extrae texto usando OCR
- **Body**: `FormData` con archivo de imagen
- **Response**: JSON con texto extraído y metadatos

### GET `/boletas`
Lista todas las boletas procesadas
- **Response**: Array de boletas con información completa

## 🎨 Tecnologías Utilizadas

### Backend
- **FastAPI**: Framework web moderno y rápido
- **Pillow**: Procesamiento de imágenes
- **Tesseract**: OCR para extracción de texto
- **Uvicorn**: Servidor ASGI de alto rendimiento

### Frontend
- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mejor desarrollo
- **Tailwind CSS**: Framework CSS utility-first
- **Shadcn/ui**: Componentes UI modernos y accesibles

### Landing Page
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con animaciones
- **JavaScript**: Interactividad y funcionalidad
- **Chart.js**: Gráficos interactivos

## 📱 Funcionalidades del Dashboard

### 👤 **Gestión de Usuarios**
- Registro e inicio de sesión
- Diferentes roles: usuario, administrador
- Perfiles personalizables

### 💰 **Gestión de Gastos**
- Escaneo de recibos con OCR
- Categorización automática
- Historial completo de transacciones
- Aprobaciones y reembolsos

### 📊 **Reportes y Analytics**
- Estadísticas en tiempo real
- Gráficos de gastos por categoría
- Exportación de datos
- Dashboard personalizable

## 🔒 Seguridad

- Autenticación JWT
- Validación de archivos
- CORS configurado para desarrollo
- Sanitización de datos OCR

## 🚧 Estado del Proyecto

- ✅ **Backend OCR**: Completamente funcional
- ✅ **Landing Page**: Diseño moderno implementado
- ✅ **Dashboard**: Sistema completo de gestión
- ✅ **Integración**: OCR conectado al dashboard
- 🔄 **Base de Datos**: En desarrollo (actualmente JSON)
- 🔄 **Autenticación**: Sistema básico implementado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Issues**: Reporta bugs en GitHub Issues
- **Discusiones**: Únete a las discusiones del proyecto
- **Email**: [Tu email aquí]

## 🙏 Agradecimientos

- **Tesseract OCR**: Por la tecnología de reconocimiento de texto
- **FastAPI**: Por el framework web moderno y rápido
- **Next.js**: Por la excelente experiencia de desarrollo React
- **Shadcn/ui**: Por los componentes UI de alta calidad

---

**GastoÁgil** - Transformando la gestión de gastos para freelancers y PYMEs 🚀