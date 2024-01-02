from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session
import db.models as models, schemas, depends


router = APIRouter()

@router.get("/cars", response_model=list[schemas.Car])
def get_car(session: Session = Depends(depends.get_db_session)):
    return session.query(models.Car).all()