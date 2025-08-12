import os
import logging
from fastapi import Header, HTTPException, Depends
from jose import jwt, JWTError
from typing import Dict, Optional

logger = logging.getLogger(__name__)

# Obtener secret JWT desde variables de entorno
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

if not SUPABASE_JWT_SECRET:
    raise ValueError("SUPABASE_JWT_SECRET environment variable is not set")

async def get_current_user(authorization: str = Header(...)) -> Dict[str, str]:
    """
    Valida el token JWT de Supabase y retorna el usuario autenticado.
    
    Args:
        authorization: Header de autorización con formato "Bearer <token>"
        
    Returns:
        Dict con el ID del usuario (sub)
        
    Raises:
        HTTPException: Si el token es inválido o está expirado
    """
    if not authorization:
        logger.warning("Missing Authorization header")
        raise HTTPException(
            status_code=401, 
            detail="Missing Authorization header"
        )

    try:
        # Separar scheme y token
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            logger.warning(f"Invalid authorization scheme: {scheme}")
            raise HTTPException(
                status_code=401, 
                detail="Invalid authorization scheme. Use 'Bearer <token>'"
            )
        
        # Decodificar JWT
        payload = jwt.decode(
            token, 
            SUPABASE_JWT_SECRET, 
            algorithms=["HS256"], 
            options={"verify_aud": False}
        )
        
        # Extraer sub (user ID)
        user_id = payload.get("sub")
        if not user_id:
            logger.warning("Missing 'sub' in JWT payload")
            raise HTTPException(
                status_code=401, 
                detail="Invalid token: missing user ID"
            )
        
        logger.info(f"User authenticated: {user_id}")
        return {"sub": user_id}
        
    except JWTError as e:
        logger.warning(f"JWT validation failed: {e}")
        raise HTTPException(
            status_code=401, 
            detail="Invalid or expired token"
        )
    except ValueError as e:
        logger.warning(f"Authorization header parsing failed: {e}")
        raise HTTPException(
            status_code=401, 
            detail="Invalid authorization header format"
        )
    except Exception as e:
        logger.error(f"Unexpected error in authentication: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Internal authentication error"
        )
