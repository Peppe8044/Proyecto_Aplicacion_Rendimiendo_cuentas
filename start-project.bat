@echo off
chcp 65001 > nul
echo.
echo ========================================
echo    Iniciando GastoAgil Project
echo ========================================
echo.

REM Verificar si Python está instalado
python --version > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde: https://python.org
    pause
    exit /b 1
)

REM Verificar si Node.js está instalado
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js no está instalado o no está en el PATH
    echo Por favor instala Node.js desde: https://nodejs.org
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: npm no está instalado o no está en el PATH
    pause
    exit /b 1
)

echo ✅ Python y Node.js verificados correctamente
echo.

REM Verificar dependencias del backend
echo 🔍 Verificando dependencias del backend...
cd backend
if not exist "venv" (
    echo 📦 Creando entorno virtual...
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt > nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: No se pudieron instalar las dependencias del backend
    pause
    exit /b 1
)
cd ..

REM Verificar dependencias del dashboard
echo 🔍 Verificando dependencias del dashboard...
cd dashboard
if not exist "node_modules" (
    echo 📦 Instalando dependencias del dashboard...
    npm install --legacy-peer-deps > nul 2>&1
    if errorlevel 1 (
        echo ❌ ERROR: No se pudieron instalar las dependencias del dashboard
        pause
        exit /b 1
    )
)
cd ..

echo.
echo ✅ Todas las dependencias verificadas
echo.

echo 🚀 Iniciando servicios...
echo.

REM Iniciar Backend en una nueva ventana
start "Backend - FastAPI" cmd /k "cd backend && call venv\Scripts\activate.bat && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

REM Esperar 3 segundos
timeout /t 3 /nobreak > nul

REM Iniciar Dashboard en una nueva ventana
start "Frontend - Next.js" cmd /k "cd dashboard && npm run dev"

echo.
echo ========================================
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo Landing: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul
