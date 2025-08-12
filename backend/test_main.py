import pytest
import asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from main_clean import app
from db import get_db
from models import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Configurar base de datos de prueba
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# Crear tablas de prueba
Base.metadata.create_all(bind=engine)

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
def mock_user():
    return {"sub": "test-user-id"}

@pytest.fixture
def mock_token():
    return "Bearer test-token"

class TestHealthCheck:
    """Tests para el endpoint de salud"""
    
    def test_health_check(self, client):
        """Test del endpoint de salud"""
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data

class TestAuthentication:
    """Tests para autenticación"""
    
    def test_missing_authorization(self, client):
        """Test sin header de autorización"""
        response = client.get("/boletas")
        assert response.status_code == 401
        assert "Missing Authorization header" in response.json()["detail"]
    
    def test_invalid_authorization_scheme(self, client):
        """Test con esquema de autorización inválido"""
        response = client.get("/boletas", headers={"Authorization": "Invalid test-token"})
        assert response.status_code == 401
        assert "Invalid authorization scheme" in response.json()["detail"]

class TestOCR:
    """Tests para endpoints de OCR"""
    
    @patch('main_clean.get_current_user')
    @patch('main_clean.create_boleta')
    def test_ocr_endpoint_success(self, mock_create_boleta, mock_get_user, client):
        """Test exitoso del endpoint OCR"""
        # Mock del usuario autenticado
        mock_get_user.return_value = {"sub": "test-user-id"}
        
        # Mock de la creación de boleta
        mock_boleta = MagicMock()
        mock_boleta.id = 1
        mock_boleta.nombre_archivo = "test.jpg"
        mock_boleta.text = "Texto de prueba"
        mock_boleta.merchant = "Comercio Test"
        mock_boleta.total_amount = 100.50
        mock_boleta.date = "2024-01-01"
        mock_boleta.confidence = 0.85
        mock_boleta.fecha = "2024-01-01T00:00:00"
        mock_create_boleta.return_value = mock_boleta
        
        # Crear archivo de prueba
        test_file_content = b"fake image content"
        files = {"file": ("test.jpg", test_file_content, "image/jpeg")}
        
        response = client.post("/ocr", files=files)
        assert response.status_code == 200
        
        data = response.json()
        assert data["nombre_archivo"] == "test.jpg"
        assert data["id"] == 1
    
    def test_ocr_invalid_file_type(self, client):
        """Test con tipo de archivo inválido"""
        test_file_content = b"not an image"
        files = {"file": ("test.txt", test_file_content, "text/plain")}
        
        response = client.post("/ocr", files=files)
        assert response.status_code == 400
        assert "Archivo debe ser una imagen" in response.json()["detail"]

class TestBoletas:
    """Tests para endpoints de boletas"""
    
    @patch('main_clean.get_current_user')
    @patch('main_clean.list_boletas')
    def test_list_boletas_success(self, mock_list_boletas, mock_get_user, client):
        """Test exitoso del listado de boletas"""
        # Mock del usuario autenticado
        mock_get_user.return_value = {"sub": "test-user-id"}
        
        # Mock de la lista de boletas
        mock_boleta = MagicMock()
        mock_boleta.id = 1
        mock_boleta.nombre_archivo = "test.jpg"
        mock_boleta.text = "Texto de prueba"
        mock_boleta.merchant = "Comercio Test"
        mock_boleta.total_amount = 100.50
        mock_boleta.date = "2024-01-01"
        mock_boleta.confidence = 0.85
        mock_boleta.fecha = "2024-01-01T00:00:00"
        mock_boleta.user_id = "test-user-id"
        
        mock_list_boletas.return_value = ([mock_boleta], 1)
        
        response = client.get("/boletas?page=1&limit=20", headers={"Authorization": "Bearer test-token"})
        assert response.status_code == 200
        
        data = response.json()
        assert data["total"] == 1
        assert data["page"] == 1
        assert data["limit"] == 20
        assert len(data["items"]) == 1
        assert data["items"][0]["nombre_archivo"] == "test.jpg"

class TestParsing:
    """Tests para el parsing de texto OCR"""
    
    def test_parse_boleta_text_merchant(self):
        """Test del parsing de comercio"""
        from main_clean import parse_boleta_text
        
        text = "SUPERMERCADO ABC\nDirección 123\nTotal: $50.00"
        result = parse_boleta_text(text)
        
        assert result["merchant"] == "SUPERMERCADO ABC"
        assert result["total_amount"] == 50.0
    
    def test_parse_boleta_text_total(self):
        """Test del parsing de total"""
        from main_clean import parse_boleta_text
        
        text = "Comercio XYZ\nTOTAL: $125.50\nFecha: 15/01/2024"
        result = parse_boleta_text(text)
        
        assert result["total_amount"] == 125.50
        assert result["date"] is not None
    
    def test_parse_boleta_text_date(self):
        """Test del parsing de fecha"""
        from main_clean import parse_boleta_text
        
        text = "Tienda ABC\nFecha: 20-12-2023\nTotal: $75.25"
        result = parse_boleta_text(text)
        
        assert result["date"] is not None
        assert result["date"].year == 2023
        assert result["date"].month == 12
        assert result["date"].day == 20

if __name__ == "__main__":
    pytest.main([__file__])
