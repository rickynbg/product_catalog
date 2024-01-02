import schemas
import db.models as models
from db.database import SessionLocal

from decouple import config

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.orm import Session
from typing import Annotated, Union, Union, Any
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError


ACCESS_TOKEN_EXPIRE_MINUTES = config("ACCESS_TOKEN_EXPIRE_MINUTES", default=30, cast=int)
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * config("REFRESH_TOKEN_EXPIRE_DAYS", default=7, cast=int)

ALGORITHM = config('ALGORITHM', default='HS256')
JWT_SECRET_KEY = config('JWT_SECRET_KEY')
JWT_REFRESH_SECRET_KEY = config('JWT_REFRESH_SECRET_KEY')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# password_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(subject: Union[str, Any], expires_delta: int = 0) -> str:
    if expires_delta:
        expires_delta_time = datetime.utcnow() + timedelta(minutes=expires_delta) 
    else:
        expires_delta_time = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
         
    to_encode = {"exp": expires_delta_time, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, ALGORITHM)
     
    return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: int = 0) -> str:
    if expires_delta:
        expires_delta_time = datetime.utcnow() + timedelta(minutes=expires_delta)
    else:
        expires_delta_time = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expires_delta_time, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def create_user(user: schemas.UserCreate, db: Session):
    existing_user = db.query(models.User).filter_by(
        email=user.email.lower()).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Account already registered")

    encrypted_password = get_hashed_password(user.password)

    new_user = models.User(username=user.username, email=user.email, password=encrypted_password )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "user created successfully"}


async def get_current_user(request: Request, db: Session = Depends(get_db_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"Access-Control-Allow-Credentials": "true"},
    )
    username = await get_user_loged(request)
    if username is None:
        raise credentials_exception    
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is None:
        raise credentials_exception
    return user


async def get_user_loged(request: Request):
    try:
        token = request.cookies.get("access_token")
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        expires_time: str = str(payload.get("exp"))
        if username is None or expires_time < datetime.now().strftime('%s'):
            return None
        return username
    except:
        return None


async def get_current_user_admin(request: Request, db: Session = Depends(get_db_session)):
    user = await get_current_user(request, db)
    if not user.is_admin:
        raise HTTPException(status_code=400, detail="Only admin user")
    
    return user


def change_user_role(user: schemas.UserUpdateRole, current_user, db: Session):
    if current_user.email == user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not change own role",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_update = db.query(models.User).filter(models.User.email == user.email).first()
    user_update.is_admin = user.is_admin
    db.commit()
    db.refresh(user_update)

    return {"message":"update user successfully"}
