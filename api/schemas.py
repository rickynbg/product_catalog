from pydantic import BaseModel, EmailStr
import datetime


class UserBase(BaseModel):
    username: str
    email: EmailStr

class User(UserBase):
    is_admin: bool = False
    created_at: datetime.datetime

    class Config:
        from_attributes = True


class UserCreate(UserBase):
    password: str


class UserChangePassword(UserBase):
    old_password:str
    new_password:str


class UserUpdateRole(UserBase):
    is_admin: bool = False


class Car(BaseModel):
    id: int
    name: str
    mark: str
    model: str
    year: int
    info: str | None
    photo: str | None
    color: str | None
    plate: str | None
    value: float
    created_at: datetime.datetime


class Message(BaseModel):
    message: str

class IsAuthenticated(BaseModel):
    is_authenticated: bool


class IsAdmin(BaseModel):
    is_admin: bool


class UserUpdate(BaseModel):
    email: str
    is_admin: bool = False

class TokenData(BaseModel):
    username: str | None = None