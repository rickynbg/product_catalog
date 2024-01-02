import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float
from .database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.now)


class Car(Base):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    mark = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)
    year = Column(Integer, nullable=False)
    info = Column(Integer, nullable=True)
    photo = Column(String(100), nullable=True)
    color = Column(String(50), nullable=True)
    plate = Column(String(50), nullable=True)
    value = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.datetime.now)