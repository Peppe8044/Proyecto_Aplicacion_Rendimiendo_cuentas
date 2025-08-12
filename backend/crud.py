import logging
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Tuple, List
from .models import Boleta
from .schemas import BoletaCreate

logger = logging.getLogger(__name__)

def create_boleta(db: Session, boleta_data: dict) -> Boleta:
    """
    Crea una nueva boleta en la base de datos.
    
    Args:
        db: Sesión de base de datos
        boleta_data: Datos de la boleta a crear
        
    Returns:
        Boleta creada
    """
    try:
        boleta = Boleta(**boleta_data)
        db.add(boleta)
        db.commit()
        db.refresh(boleta)
        logger.info(f"Boleta creada exitosamente: ID {boleta.id}")
        return boleta
    except Exception as e:
        db.rollback()
        logger.error(f"Error creando boleta: {e}")
        raise

def get_boleta_by_id(db: Session, boleta_id: int, user_id: str) -> Boleta | None:
    """
    Obtiene una boleta por ID, solo si pertenece al usuario.
    
    Args:
        db: Sesión de base de datos
        boleta_id: ID de la boleta
        user_id: ID del usuario
        
    Returns:
        Boleta si existe y pertenece al usuario, None en caso contrario
    """
    try:
        return db.query(Boleta).filter(
            Boleta.id == boleta_id,
            Boleta.user_id == user_id
        ).first()
    except Exception as e:
        logger.error(f"Error obteniendo boleta {boleta_id}: {e}")
        return None

def list_boletas(
    db: Session, 
    user_id: str, 
    page: int = 1, 
    limit: int = 20
) -> Tuple[List[Boleta], int]:
    """
    Lista boletas del usuario con paginación.
    
    Args:
        db: Sesión de base de datos
        user_id: ID del usuario
        page: Número de página (1-based)
        limit: Límite de items por página
        
    Returns:
        Tupla con (items, total)
    """
    try:
        # Query base filtrada por usuario
        query = db.query(Boleta).filter(Boleta.user_id == user_id)
        
        # Contar total
        total = query.count()
        
        # Aplicar paginación y ordenamiento
        items = query.order_by(desc(Boleta.fecha)).offset(
            (page - 1) * limit
        ).limit(limit).all()
        
        logger.info(f"Listadas {len(items)} boletas para usuario {user_id}, página {page}")
        return items, total
        
    except Exception as e:
        logger.error(f"Error listando boletas para usuario {user_id}: {e}")
        return [], 0

def delete_boleta(db: Session, boleta_id: int, user_id: str) -> bool:
    """
    Elimina una boleta, solo si pertenece al usuario.
    
    Args:
        db: Sesión de base de datos
        boleta_id: ID de la boleta
        user_id: ID del usuario
        
    Returns:
        True si se eliminó, False en caso contrario
    """
    try:
        boleta = get_boleta_by_id(db, boleta_id, user_id)
        if not boleta:
            return False
            
        db.delete(boleta)
        db.commit()
        logger.info(f"Boleta {boleta_id} eliminada para usuario {user_id}")
        return True
        
    except Exception as e:
        db.rollback()
        logger.error(f"Error eliminando boleta {boleta_id}: {e}")
        return False

def get_boletas_stats(db: Session, user_id: str) -> dict:
    """
    Obtiene estadísticas básicas de las boletas del usuario.
    
    Args:
        db: Sesión de base de datos
        user_id: ID del usuario
        
    Returns:
        Diccionario con estadísticas
    """
    try:
        query = db.query(Boleta).filter(Boleta.user_id == user_id)
        
        total_boletas = query.count()
        total_amount = db.query(Boleta.total_amount).filter(
            Boleta.user_id == user_id,
            Boleta.total_amount.isnot(None)
        ).scalar() or 0
        
        return {
            "total_boletas": total_boletas,
            "total_amount": float(total_amount),
            "avg_confidence": db.query(Boleta.confidence).filter(
                Boleta.user_id == user_id,
                Boleta.confidence.isnot(None)
            ).scalar() or 0
        }
        
    except Exception as e:
        logger.error(f"Error obteniendo estadísticas para usuario {user_id}: {e}")
        return {"total_boletas": 0, "total_amount": 0, "avg_confidence": 0}
