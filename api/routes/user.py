from . import *


router = APIRouter()


@router.get("/get-current-user", response_model=schemas.User)
async def get_current_user(request: Request,
    current_user: Annotated[schemas.User, Depends(depends.get_current_user)]):
    return current_user


@router.get("/get-user-loged", response_model=schemas.IsAuthenticated)
async def get_user_loged(
    request: Request,
    user: Annotated[str, Depends(depends.get_user_loged)]
):
    if user is None:
        return {'is_authenticated': False}
    return {'is_authenticated': True}

@router.get("/get-user-admin", response_model=schemas.IsAdmin)
async def get_current_user_admin(
    request: Request,
    user: Annotated[str, Depends(depends.get_current_user)]
):
    if user is None:
        return {'is_admin': False}
    return {'is_admin': user.is_admin}
 

@router.get("/get-users", response_model=list[schemas.User])
async def get_users(
    request: Request,
    current_user: Annotated[schemas.User, Depends(depends.get_current_user_admin)],
    db: Session = Depends(depends.get_db_session)
):
        return db.query(models.User).all()


@router.post("/change-role")
async def change_role(
    user: schemas.UserUpdateRole,
    request: Request,
    current_user: Annotated[schemas.User, Depends(depends.get_current_user_admin)],
    db: Session = Depends(depends.get_db_session)
):
    return depends.change_user_role(user, current_user, db)