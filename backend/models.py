from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Text, Numeric, Date, BigInteger, String
from datetime import datetime
from .db import Base

class Boleta(Base):
    __tablename__ = "boletas"
    
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    nombre_archivo: Mapped[str] = mapped_column(Text, nullable=False)
    text: Mapped[str | None] = mapped_column(Text, nullable=True)
    merchant: Mapped[str | None] = mapped_column(Text, nullable=True)
    total_amount: Mapped[float | None] = mapped_column(Numeric(12,2), nullable=True)
    date: Mapped[datetime | None] = mapped_column(Date, nullable=True)
    confidence: Mapped[float | None] = mapped_column(Numeric(4,3), nullable=True)
    fecha: Mapped[datetime] = mapped_column(default=datetime.utcnow, nullable=False)
    user_id: Mapped[str] = mapped_column(String, nullable=False)
    
    def __repr__(self):
        return f"<Boleta(id={self.id}, nombre_archivo='{self.nombre_archivo}', user_id='{self.user_id}')>"
