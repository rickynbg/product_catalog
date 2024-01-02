
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from decouple import config


SQLITE_DB_USE = config('SQLITE_DB_USE', default=False, cast=bool)

if SQLITE_DB_USE:
    DATABASE_URL = config('SQLITE_DB_URL', 'sqlite:///./test.db')
else:
    POSTGRES_DB: str = config("POSTGRES_DB", "tdd")
    POSTGRES_USER: str = config("POSTGRES_USER")
    POSTGRES_PASSWORD = config("POSTGRES_PASSWORD")
    POSTGRES_SERVER: str = config("POSTGRES_SERVER", "localhost")
    POSTGRES_PORT: str = config("POSTGRES_PORT", 5432)  # default postgres port is 5432
    DATABASE_URL= f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()