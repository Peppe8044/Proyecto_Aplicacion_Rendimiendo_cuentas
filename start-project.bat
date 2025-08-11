@echo off
echo ========================================
echo    Iniciando GastoAgil Project
echo ========================================
echo.

echo [1/3] Iniciando Backend (FastAPI)...
start "Backend - FastAPI" cmd /k "cd backend && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000"

echo [2/3] Esperando que el backend inicie...
timeout /t 3 /nobreak > nul

echo [3/3] Iniciando Frontend (Next.js)...
start "Frontend - Next.js" cmd /k "cd dashboard && npm run dev"

echo.
echo ========================================
echo    Proyecto iniciado exitosamente!
echo ========================================
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo Landing: http://localhost:3000
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul
