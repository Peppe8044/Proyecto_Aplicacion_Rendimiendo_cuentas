@echo off
echo ========================================
echo    Iniciando GastoAgil Project
echo ========================================
echo.

echo Iniciando Backend en puerto 8001...
start "Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn main_clean:app --reload --host 127.0.0.1 --port 8001"

echo Esperando 3 segundos...
timeout /t 3 /nobreak > nul

echo Iniciando Dashboard en puerto 3000...
start "Dashboard" cmd /k "cd /d %~dp0dashboard && npm run dev"

echo.
echo ========================================
echo.
echo Backend: http://127.0.0.1:8001
echo Dashboard: http://localhost:3000
echo Landing: frontend/index.html
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul
